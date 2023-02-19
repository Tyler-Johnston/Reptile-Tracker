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
    const {userId, species, name, sex} = req.body as CreateReptileBody;
    const {reptileId} = req.params
    
    const reptile = await client.reptile.findFirst({
      where: {
        id: parseInt(reptileId)
      },
    });

    if (reptile === null) {
      return res.status(404).json({ message: 'Reptile not found' });
    }

    const updatedReptile = await client.reptile.update({
      where: {
        id: parseInt(reptileId)
      },
      data: {
        userId: userId ?? reptile.userId,
        species: species ?? reptile.species,
        name: name ?? reptile.name,
        sex: sex ?? reptile.sex
      },
    });

    res.json({updatedReptile});

   }

   const getAllReptiles = (client: PrismaClient): RequestHandler =>
   async (req, res) => {
     const data = await client.reptile.findMany();
     res.json({data});
   }

   const deleteReptile = (client: PrismaClient): RequestHandler =>
   async (req, res) => {
    const reptileId = req.body.reptileId;

    const reptile = await client.reptile.findFirst({
      where: {
        id: reptileId,
      },
    });

    if (reptile === null) {
      return res.status(404).json({ message: 'Reptile not found' });
    }

    const deletedReptile = await client.reptile.delete({
      where: {
        id: reptileId,
      },
    });
    res.json({ deletedReptile });

   }

export const reptilesController = controller(
  "reptile",
  [
    { path: "/", method: "post", endpointBuilder: createReptile, skipAuth: true },
    { path: "/update/:reptileId", method: "put", endpointBuilder: updateReptile },
    { path: "/all", method: "get", endpointBuilder: getAllReptiles, skipAuth: true },
    { path: "/delete", method: "delete", endpointBuilder: deleteReptile, skipAuth: true }
  ]
)