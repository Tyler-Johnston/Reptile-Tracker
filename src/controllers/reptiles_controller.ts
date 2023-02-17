import { PrismaClient } from "@prisma/client";
import { Express, RequestHandler } from "express";
import { RequestWithJWTBody } from "../dto/jwt";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { controller } from "../lib/controller";

type CreateReptileBody = {
  species: string,
  userId: number
  name: string,
  sex: string,
}

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


export const reptileController = controller(
  "reptiles",
  [
    { path: "/", method: "post", endpointBuilder: createReptile, skipAuth: true }
  ]
)