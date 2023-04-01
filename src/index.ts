import express, { RequestHandler } from "express";
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import { v4 as uuidv4 } from 'uuid';
import { usersController } from "./controllers/users_controller";
import { reptilesController } from "./controllers/reptiles_controller";
import { feedingController } from "./controllers/feeding_controller";
import { husbandryController } from "./controllers/husbandry_controller";
import { scheduleController } from "./controllers/schedule_controller";

dotenv.config();
const client = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

//sign up
type LoginBody = {
  email: string,
  password: string
}

// log in
app.post("/sessions",  async (req, res) => {
  const {email, password} = req.body as LoginBody;
  const user = await client.user.findFirst({
    where: {
      email,
    },
    include: {
      sessions: true,
      reptiles: true
    }
  });

  if (!user) {
    res.status(404).json({ message: "Invalid email or password" });
    return;
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    res.status(404).json({ message: "Invalid email or password" });
    return;
  }
  const token = uuidv4();
  const session = await client.session.create({
    data: {
      userId: user.id,
      token,
    }
  })

  res.cookie("session-token", session.token, {
    httpOnly: true,
    maxAge: 3600000
  })

  res.json({user});
});

// log out
app.post("/logout", async (req, res) => {
  const sessionToken = req.cookies["session-token"];
  if (!sessionToken) {
    res.status(400).json({ message: "You are not currently logged in" });
    return;
  }

  const session = await client.session.findUnique({
    where: {
      token: sessionToken,
    },
  });
  if (!session) {
    res.status(400).json({ message: "You are not currently logged in" });
    return;
  }

  await client.session.delete({
    where: {
      id: session.id,
    },
  });

  res.clearCookie("session-token");
  res.json({ message: "You have been logged out" });
});


usersController(app, client);
reptilesController(app, client);
feedingController(app, client);
scheduleController(app, client);
husbandryController(app, client);

app.listen(parseInt(process.env.PORT || "3000", 10), () => {
  console.log(`App running on port ${process.env.PORT}`);
});

export default app;