import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "@/dtos/general.dto";
import { mariiaStepService } from "@/services/mariiaStep.service";
import { MariiaStepDto, MariiaStepSchema } from "@/dtos/mariiaStep.dto";
import { GENERAL_MESSAGES } from "@/constants/messages/general.messages";

export const mariiaStepController = {
  async getHead(_req: Request, res: Response) {
    const mariiaStepHead = await mariiaStepService.findHead();
    if (!mariiaStepHead) {
      const errorResponse: ErrorResponse = {
        success: false,
        message: GENERAL_MESSAGES.OBJECT_NOT_FOUND_ERROR,
      };
      return res.status(404).json(errorResponse);
    }

    const mariiaStepHeadObject = MariiaStepSchema.parse(mariiaStepHead);
    const successResponse: SuccessResponse<MariiaStepDto> = {
      success: true,
      message: GENERAL_MESSAGES.OBJECT_FOUND_SUCCESS,
      data: mariiaStepHeadObject,
    };

    return res.status(200).json(successResponse);
  },

  async getById(req: Request, res: Response) {
    const id: number = Number(req.params.id);
    const mariiaStep = await mariiaStepService.findById(id);
    if (!mariiaStep) {
      const errorResponse: ErrorResponse = {
        success: false,
        message: GENERAL_MESSAGES.OBJECT_NOT_FOUND_ERROR,
      };
      return res.status(404).json(errorResponse);
    }

    const mariiaStepObject = MariiaStepSchema.parse(mariiaStep);
    const successResponse: SuccessResponse<MariiaStepDto> = {
      success: true,
      message: GENERAL_MESSAGES.OBJECT_FOUND_SUCCESS,
      data: mariiaStepObject,
    };

    return res.status(200).json(successResponse);
  },
};
