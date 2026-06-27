import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "@/dtos/general.dto";
import { EMAIL_MESSAGES } from "@/constants/messages/mail.messages";
import { env } from "@/config/env";
import { Resend } from "resend";

export const mariiaNotifyController = {
  async notify(req: Request, res: Response) {
    const resend = new Resend(env.RESEND_API_KEY);

    const reponse = await resend.emails.send({
      from: "roman@resend.dev",
      to: [env.EMAIL],
      subject: EMAIL_MESSAGES.MAIL_SUBJECT,
      text: `${req.user?.username} - ${EMAIL_MESSAGES.MAIL_TEXT}`,
    });

    if (reponse.error) {
      console.error(reponse.error);
      const errorResponse: ErrorResponse = {
        success: false,
        message: EMAIL_MESSAGES.MAIL_FAILED,
      };

      return res.status(500).json(errorResponse);
    }

    const successResponse: SuccessResponse<object> = {
      success: true,
      message: EMAIL_MESSAGES.MAIL_SENT,
      data: {},
    };

    res.status(200).json(successResponse);
  },
};
