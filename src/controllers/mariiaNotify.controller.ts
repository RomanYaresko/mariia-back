import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "@/dtos/general.dto";
import { transporter } from "@/config/nodemailer";
import { EMAIL_MESSAGES } from "@/constants/messages/mail.messages";
import { env } from "@/config/env";

export const mariiaNotifyController = {
  async notify(req: Request, res: Response) {
    try {
      const mailOptions = {
        from: env.SMTP_USER,
        to: env.SMTP_USER,
        subject: EMAIL_MESSAGES.MAIL_SUBJECT,
        text: `${req.user?.username} - ${EMAIL_MESSAGES.MAIL_TEXT}`,
      };

      await transporter.sendMail(mailOptions);
      const successResponse: SuccessResponse<object> = {
        success: true,
        message: EMAIL_MESSAGES.MAIL_SENT,
        data: {},
      };

      res.status(200).json(successResponse);
    } catch (error) {
      console.error(error);
      const errorResponse: ErrorResponse = {
        success: false,
        message: EMAIL_MESSAGES.MAIL_FAILED,
      };

      return res.status(500).json(errorResponse);
    }
  },
};
