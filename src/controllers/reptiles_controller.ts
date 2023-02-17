import { PrismaClient } from "@prisma/client";
import { Express, RequestHandler } from "express";
import { RequestWithJWTBody } from "../dto/jwt";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { controller } from "../lib/controller";

// const getMe = (client: PrismaClient): RequestHandler =>
//   async (req: RequestWithJWTBody, res) => {
//     const userId = req.jwtBody?.userId;
//     if (!userId) {
//       res.status(401).json({ message: "Unauthorized" });
//       return;
//     }

//     const user = await client.user.findFirst({
//       where: {
//         id: userId
//       }
//     });

//     res.json({ user });
//     // TODO get the user
//   }

type CreateReptileBody = {
  species: string,
  userId: number
  name: string,
  sex: string,
}

const createReptile = (client: PrismaClient): RequestHandler =>
  async (req, res) => {
    const {userId, species, name, sex} = req.body as CreateReptileBody;
    // const passwordHash = await bcrypt.hash(password, 10);
    const reptile = await client.reptile.create({
      data: {
        userId,
        species,
        name,
        sex,
      },
    });

    const token = jwt.sign({
      reptileId: reptile.id
    }, process.env.ENCRYPTION_KEY!!, {
      expiresIn: '1m'
    });

    res.json({ reptile, token });
  }


export const usersController = controller(
  "reptiles",
  [
    // { path: "/me", endpointBuilder: getMe, method: "get" },
    { path: "/", method: "post", endpointBuilder: createReptile, skipAuth: true }
  ]
)