import { Request, Response } from "express";
import { z } from "zod";
import { userService } from "@/services/user.service";
import { GENERAL_MESSAGES } from "@/constants/messages/general.messages";
import { ErrorResponse, SuccessResponse } from "@/dtos/general.dto";
import {
  LoginRequestDto,
  LoginRequestSchema,
  LoginResponseDto,
} from "@/dtos/auth.dto";
import { AUTH_MESSAGES } from "@/constants/messages/auth.messages";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import type { StringValue } from "ms";
import { env } from "@/config/env";

export const authController = {
  async login(req: Request, res: Response) {
    try {
      const validatedData: LoginRequestDto = LoginRequestSchema.parse(req.body);
      const secretKey: string = env.SECRET_KEY;
      const jwtExpireTime: StringValue = env.JWT_EXPIRE_TIME as StringValue;

      const user = await userService.find(validatedData.username);
      if (!user) {
        const errorResponse: ErrorResponse = {
          success: false,
          message: AUTH_MESSAGES.LOGIN_WRONG_CREDENTIALS,
        };
        return res.status(401).json(errorResponse);
      }

      const isPasswordValid: boolean = await bcrypt.compare(
        validatedData.password,
        user.password,
      );
      if (!isPasswordValid) {
        const errorResponse: ErrorResponse = {
          success: false,
          message: AUTH_MESSAGES.LOGIN_WRONG_CREDENTIALS,
        };
        return res.status(401).json(errorResponse);
      }

      const token: string = jwt.sign(
        { username: validatedData.username },
        secretKey,
        {
          expiresIn: jwtExpireTime,
          algorithm: env.JWT_ALGORITHM as jwt.Algorithm,
        },
      );

      const successResponse: SuccessResponse<LoginResponseDto> = {
        success: true,
        message: AUTH_MESSAGES.LOGIN_SUCCESS,
        data: { token },
      };

      return res.status(200).json(successResponse);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorResponse: ErrorResponse = {
          success: false,
          message: GENERAL_MESSAGES.VALIDATION_FAILED,
          errors: error.issues.map((issue) => ({ message: issue.message })),
        };
        return res.status(400).json(errorResponse);
      }

      console.error(error);
      const errorResponse: ErrorResponse = {
        success: false,
        message: AUTH_MESSAGES.LOGIN_FAILED,
      };
      return res.status(500).json(errorResponse);
    }
  },
};
