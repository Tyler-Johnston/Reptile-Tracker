import { PrismaClient } from "@prisma/client";
import { Express, RequestHandler } from "express";
import { RequestWithJWTBody } from "../dto/jwt";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { controller } from "../lib/controller";

type CreateHusbandryBody = {
  reptileId: number,
  length: number,
  weight: number,
  temperature: number,
  humidity: number
}

const createHusbandry = (client: PrismaClient): RequestHandler =>
  async (req, res) => {
    const {reptileId, length, weight, temperature, humidity} = req.body as CreateHusbandryBody;
    const husbandry = await client.husbandryRecord.create({
      data: {
        reptileId,
        length,
        weight,
        temperature,
        humidity
      },
    });
    
  }


export const husbandryController = controller(
  "husbandry",
  [
    { path: "/", method: "post", endpointBuilder: createHusbandry, skipAuth: true }
  ]
)