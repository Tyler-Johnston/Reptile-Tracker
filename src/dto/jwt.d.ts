
import { Request } from "express"

export type JWTBody = {
  userId: number
}

export type RequestWithSession = Request & {
  session?: Session
  user?: User
}

export type RequestWithJWTBody = Request & {
  jwtBody?: JWTBody
}