import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { RequestWithSession } from "../dto/jwt";
import bcrypt from "bcrypt";
import { controller } from "../lib/controller";
import { v4 as uuidv4 } from 'uuid';

const getMe = (client: PrismaClient): RequestHandler =>
  async (req: RequestWithSession, res) => {

    if (req.session) {
      const user = await client.user.findUnique({
         where: { 
          id: req.user.id
         }
         });
      res.json({ user })
    } else {
      res.status(400).json({message: "you are not signed in"});
    }
  }

type CreateUserBody = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}

const createUser = (client: PrismaClient): RequestHandler =>
  async (req, res) => {
    const {firstName, lastName, email, password} = req.body as CreateUserBody;
    const passwordHash = await bcrypt.hash(password, 10);

    const userCount = await client.user.count();
    if (userCount > 1) {
      // check if an email is already in use
      const existingEmail = await client.user.findFirst({
        where: {
          email,
        }
      });
      if (existingEmail) {
        return res.status(400).json({message: "this email is already in use"});
      }
    }

    const user = await client.user.create({
      data: {
        firstName,
        lastName,
        email,
        passwordHash,
        sessions: {
          create: [{
            token: uuidv4()
          }]
        }
      },
      include: { 
        sessions: true
       }
    });
    
    res.cookie("session-token", user.sessions[0].token, {
      httpOnly: true,
      maxAge: 60000 * 10
    });
    res.json({ user });
  }

export const usersController = controller(
  "users",
  [
    { path: "/me", endpointBuilder: getMe, method: "get", skipAuth: false},
    { path: "/", method: "post", endpointBuilder: createUser, skipAuth: true }
  ]
);
