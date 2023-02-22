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
    const {userId, species, name, sex} = req.body as CreateReptileBody
    //TODO user specific
    //NOTE REMOVE THIS: No :reptileId cause auto generated
    if ((species === "ball_python" ||  species === "king_snake" || species === "corn_snake" || species === "redtail_boa") && (sex === "m" || sex === "f")) {
    const reptile = await client.reptile.create({
      data: {
        userId,
        species,
        name,
        sex,
      }
    });
    res.json({ reptile });
  } else {
    return res.status(400).json({ message: "Reptile species or sex does not match required type"});
  }
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

    if ((species === "ball_python" ||  species === "king_snake" || species === "corn_snake" || species === "redtail_boa" || species === undefined) && (sex === "m" || sex === "f" || sex === undefined)) {
      const reptile = await client.reptile.findFirst({
        where: {
          id: parseInt(reptileId)
        },
      });

      if (reptile === null) {
        return res.status(404).json({ message: "Reptile not found" });
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
    else {
      return res.status(400).json({ message: "Reptile species or sex does not match required type"});
    }
   }

const getAllReptiles = (client: PrismaClient): RequestHandler =>
   async (req, res) => {
    //TODO param or body
    //TODO user specific
     const data = await client.reptile.findMany();
     res.json({data});
   }

const deleteReptile = (client: PrismaClient): RequestHandler =>
   async (req, res) => {
    const reptileId = req.body.reptileId;

    const reptile = await client.reptile.findFirst({
      where: {
        id: parseInt(reptileId),
      },
    });

    if (reptile === null) {
      return res.status(404).json({ message: "Reptile not found" });
    }

    const deletedReptile = await client.reptile.delete({
      where: {
        id: parseInt(reptileId),
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