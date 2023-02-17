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

// TODO: 1) create a husbandry 2) list all husbandries

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

const getAllHusbandry = (client: PrismaClient): RequestHandler =>
async (req, res) => {
  const data = await client.husbandryRecord.findMany();

  res.json({data});
  // TODO get the user
}



export const husbandryController = controller(
  "husbandry",
  [
    { path: "/", method: "post", endpointBuilder: createHusbandry, skipAuth: true },
    { path: "/all", method: "get", endpointBuilder: getAllHusbandry, skipAuth: true }
  ]
)