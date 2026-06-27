import { AUTH_MESSAGES } from "@/constants/messages/auth.messages";
import { ErrorResponse } from "@/dtos/general.dto";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { env } from "@/config/env";
import { userService } from "@/services/user.service";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const secretKey: string = env.SECRET_KEY;

  const authHeader: string | undefined = req.header("Authorization");
  if (!authHeader) {
    const errorResponse: ErrorResponse = {
      success: false,
      message: AUTH_MESSAGES.ACCESS_DENIED_MISSING_AUTH_HEADER,
    };
    return res.status(401).json(errorResponse);
  }

  const authPrefix: string | undefined = authHeader.split(" ")[0];
  if (!authPrefix || authPrefix != "Bearer") {
    const errorResponse: ErrorResponse = {
      success: false,
      message: AUTH_MESSAGES.ACCESS_DENIED_WRONG_AUTH_PREFIX,
    };
    return res.status(401).json(errorResponse);
  }

  const authToken: string | undefined = authHeader.split(" ")[1];
  if (!authToken) {
    const errorResponse: ErrorResponse = {
      success: false,
      message: AUTH_MESSAGES.ACCESS_DENIED_MISSING_AUTH_TOKEN,
    };
    return res.status(401).json(errorResponse);
  }

  let decodedAuthToken: jwt.JwtPayload;
  try {
    decodedAuthToken = jwt.verify(authToken, secretKey, {
      algorithms: [env.JWT_ALGORITHM as jwt.Algorithm],
    }) as jwt.JwtPayload;
  } catch {
    const errorResponse: ErrorResponse = {
      success: false,
      message: AUTH_MESSAGES.INVALID_TOKEN,
    };
    return res.status(401).json(errorResponse);
  }

  const username: string | undefined = decodedAuthToken.username;
  if (!username) {
    const errorResponse: ErrorResponse = {
      success: false,
      message: AUTH_MESSAGES.INVALID_TOKEN,
    };
    return res.status(401).json(errorResponse);
  }

  const user = await userService.find(username);
  if (!user) {
    const errorResponse: ErrorResponse = {
      success: false,
      message: AUTH_MESSAGES.INVALID_TOKEN,
    };
    return res.status(401).json(errorResponse);
  }

  req.user = user;
  next();
};
