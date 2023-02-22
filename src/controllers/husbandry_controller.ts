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
    //TODO User specific
    const {length, weight, temperature, humidity} = req.body as CreateHusbandryBody;
    const {reptileId} = req.params;
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
    
  }



const getHusbandry = (client: PrismaClient): RequestHandler =>
//TODO Param or body
// TODO user specific
async (req, res) => {
  const {reptileId} = req.params;
  const data = await client.husbandryRecord.findMany(
    {where: {
      reptileId:parseInt(reptileId)
    }}
  );
  res.json({data});
}





export const husbandryController = controller(
  "husbandry",
  [
    { path: "/:reptileId", method: "post", endpointBuilder: createHusbandry, skipAuth: true },
    { path: "/:reptileId", method: "get", endpointBuilder: getHusbandry, skipAuth: true }
  ]
)