import { Request, Response } from "express";
import { z } from "zod";
import { userService } from "@/services/user.service";
import {
  RegisterUserDto,
  RegisterUserSchema,
  UserDto,
  UserSchema,
} from "@/dtos/user.dto";
import { USER_MESSAGES } from "@/constants/messages/user.messages";
import { GENERAL_MESSAGES } from "@/constants/messages/general.messages";
import { ErrorResponse, SuccessResponse } from "@/dtos/general.dto";

export const userController = {
  async register(req: Request, res: Response) {
    try {
      const validatedData: RegisterUserDto = RegisterUserSchema.parse(req.body);

      const existingUser = await userService.find(validatedData.username);
      if (existingUser) {
        const errorResponse: ErrorResponse = {
          success: false,
          message: USER_MESSAGES.USERNAME_ALREADY_TAKEN,
        };
        return res.status(409).json(errorResponse);
      }

      const user = await userService.create(
        validatedData.username,
        validatedData.password,
      );
      const userData = UserSchema.parse(user);

      const successResponse: SuccessResponse<UserDto> = {
        success: true,
        message: USER_MESSAGES.USER_REGISTER_SUCCESS,
        data: userData,
      };

      return res.status(201).json(successResponse);
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
        message: USER_MESSAGES.REGISTRATION_FAILED,
      };
      return res.status(500).json(errorResponse);
    }
  },

  async current(req: Request, res: Response) {
    if (!req.user) {
      const errorResponse: ErrorResponse = {
        success: false,
        message: USER_MESSAGES.USER_NOT_FOUND,
      };
      return res.status(401).json(errorResponse);
    }

    const userData = UserSchema.parse(req.user);
    const successResponse: SuccessResponse<UserDto> = {
      success: true,
      message: USER_MESSAGES.CURRENT_USER_SUCCESS,
      data: userData,
    };

    return res.status(200).json(successResponse);
  },
};
