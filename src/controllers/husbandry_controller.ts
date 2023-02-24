import { PrismaClient } from "@prisma/client";
import { Express, RequestHandler } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { controller } from "../lib/controller";
import { RequestWithJWTBody, RequestWithSession } from "../dto/jwt";

type CreateHusbandryBody = {
  reptileId: number,
  length: number,
  weight: number,
  temperature: number,
  humidity: number
}

const createHusbandry = (client: PrismaClient): RequestHandler =>
  async (req: RequestWithSession, res) => {
    const {length, weight, temperature, humidity} = req.body as CreateHusbandryBody;
    const {reptileId} = req.params;

    if (req.session) {

      if (!length || !weight || !temperature || !humidity) {
        return res.status(400).json({message: "you are missing the required fields: length, weight, temperature, and humidity"});
      }

      const reptile = await client.reptile.findUnique({
        where: {
          id: parseInt(reptileId),
        }
      });

      if (!reptile) {
        return res.status(404).json({ message: "Reptile not found" });
      }

      const husbandry = await client.husbandryRecord.create({
        data: {
          reptileId:parseInt(reptileId),
          length,
          weight,
          temperature,
          humidity
        },
      });
      
      res.json({husbandry});

    } else {
      res.status(401).json({message: "you are not authorized"});
    }
    
  }

const getHusbandry = (client: PrismaClient): RequestHandler =>

async (req: RequestWithSession, res) => {
  const {reptileId} = req.params;

  if (req.session) {

    const reptile = await client.reptile.findFirst({
      where: {
        id: parseInt(reptileId),
        userId: req.user.id
      }
    })

    if (!reptile) {
      return res.status(404).json({message: "you are not authorized"})
    }

    const data = await client.husbandryRecord.findMany({
      where: {
        reptileId:parseInt(reptileId)
      }}
    );

    res.json({data});

  } else {
    res.status(401).json({message: "you are not signed in"});
  }
}

export const husbandryController = controller(
  "husbandry",
  [
    { path: "/:reptileId", method: "post", endpointBuilder: createHusbandry, skipAuth: false },
    { path: "/:reptileId", method: "get", endpointBuilder: getHusbandry, skipAuth: false }
  ]
)