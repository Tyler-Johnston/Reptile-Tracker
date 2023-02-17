import { PrismaClient } from "@prisma/client";
import { Express, RequestHandler } from "express";
import { RequestWithJWTBody } from "../dto/jwt";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { controller } from "../lib/controller";

type CreateReptileBody = {
  species: "ball_python" | "king_snake" | "corn_snake" | "redtail_boa",
  userId: number
  name: string,
  sex: "m" | "f",
}

// TODO: 1) create reptile 2) update reptile 3) delete reptile 4) list all reptiles

const createReptile = (client: PrismaClient): RequestHandler =>
  async (req, res) => {
    const {userId, species, name, sex} = req.body as CreateReptileBody;
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

  const updateReptile = (client: PrismaClient): RequestHandler =>
   async (req, res) => {

   }


export const reptilesController = controller(
  "reptiles",
  [
    { path: "/", method: "post", endpointBuilder: createReptile, skipAuth: true },
    { path: "/:reptileId", method: "put", endpointBuilder: updateReptile }
  ]
)