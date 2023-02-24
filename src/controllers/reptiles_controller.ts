import { PrismaClient } from "@prisma/client";
import { Express, RequestHandler } from "express";
import { RequestWithJWTBody, RequestWithSession } from "../dto/jwt";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { controller } from "../lib/controller";

type CreateReptileBody = {
  species: "ball_python" | "king_snake" | "corn_snake" | "redtail_boa",
  name: string,
  sex: "m" | "f",
}

const createReptile = (client: PrismaClient): RequestHandler =>
  async (req: RequestWithSession, res) => {
    const {species, name, sex} = req.body as CreateReptileBody

    if (!species || !name || !sex) {
      return res.status(400).json({message: "a species, name, and sex is required"});
    }

    if (req.session) {
      const user = await client.user.findUnique({
         where: { 
          id: req.user.id 
        },
          include: {
            reptiles: true,
          }
         });

         if (user) {

          if ((species === "ball_python" ||  species === "king_snake" || species === "corn_snake" || species === "redtail_boa") && (sex === "m" || sex === "f")) {
            const reptile = await client.reptile.create({
              data: {
                userId: req.user.id,
                species,
                name,
                sex,
              }
            });
            user?.reptiles.push(reptile);
            res.json({ reptile });
         }
    } else {
      res.status(404).json({message: "invalid user"});
    }
    } 
    else {
      res.status(400).json({message: "you are not signed in"});
    }
  }

const updateReptile = (client: PrismaClient): RequestHandler =>
   async (req: RequestWithSession, res) => {

    const {species, name, sex} = req.body as CreateReptileBody;
    const {reptileId} = req.params
    
    if (req.session) {
      const user = await client.user.findUnique({
        where: { 
         id: req.user.id 
       },
         include: {
           reptiles: true,
         }
        });
          if (user) {
            if ((species === "ball_python" ||  species === "king_snake" || species === "corn_snake" || species === "redtail_boa" || species === undefined) && (sex === "m" || sex === "f" || sex === undefined)) {

              const reptile = await client.reptile.findUnique({
                where: {
                  id: parseInt(reptileId)
                }
              });
              
              if (!reptile) {
                return res.status(404).json({ message: "Reptile not found" });
              }
              if(req.user.id != reptile.userId){
                return res.status(401).json({message: "you are not authorized"});
              }
              const updatedReptile = await client.reptile.update({
                where: {
                  id: parseInt(reptileId),
                },
                data: {
                  userId: req.user.id,
                  species: species ?? reptile.species,
                  name: name ?? reptile.name,
                  sex: sex ?? reptile.sex
                }
              });
              res.json({updatedReptile})

           }
           else {
            return res.status(404).json({message: "Reptile species or sex does not match required type"});
           }

    }
    }
    else {
      return res.status(400).json({ message: "you are not signed in"});
    }
   }

const getAllReptiles = (client: PrismaClient): RequestHandler =>
   async (req: RequestWithSession, res) => {

    if (req.session) {
      const user = await client.user.findUnique({
         where: { 
          id: req.user.id 
        },
          include: {
            reptiles: true,
          }
         });

         if (user) {
          const reptiles = user?.reptiles;
          res.json({reptiles})
         }
         else {
          res.status(404).json({message: "invalid user"})
         }
    }
    else {
      res.status(400).json({message: "you are not signed in"});
    }
   }

const deleteReptile = (client: PrismaClient): RequestHandler =>
   async (req: RequestWithSession, res) => {

    const {reptileId} = req.params
    if (req.session) {
      const user = await client.user.findUnique({
        where: { 
         id: req.user.id 
       },
         include: {
           reptiles: true,
         }
        });

        if (user) {
          const reptileToDel = await client.reptile.findFirst({
            where: {
              id: parseInt(reptileId)
            }
          });
          if (!reptileToDel){
            return res.status(404).json({message: "Not Found"});
          }
          if(req.user.id != reptileToDel?.userId){
            return res.status(401).json({message: "you are not authorized"});
          }
          const deletedReptile = await client.reptile.delete({
            where: {
              id: parseInt(reptileId)
            }
          });
          res.json({deletedReptile})
         }
         else {
          return res.status(404).json({message: "invalid user"})
         }
    }
    else {
      return res.status(401).json({message: "you are not logged in"});
    }
  }

export const reptilesController = controller(
  "reptile",
  [
    { path: "/", method: "post", endpointBuilder: createReptile, skipAuth: false },
    { path: "/:reptileId", method: "put", endpointBuilder: updateReptile, skipAuth: false },
    { path: "/", method: "get", endpointBuilder: getAllReptiles, skipAuth: false },
    { path: "/:reptileId", method: "delete", endpointBuilder: deleteReptile, skipAuth: false }
  ]
)