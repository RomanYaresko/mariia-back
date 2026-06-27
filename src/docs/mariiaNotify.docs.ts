import { z } from "zod";
import { registry } from "@/config/openapi";
import { ErrorResponseSchema, SuccessResponseSchema } from "@/dtos/general.dto";

const MariiaNotifySuccessResponse = SuccessResponseSchema(z.null());

registry.registerPath({
  method: "post",
  path: "/api/mariia-notify",
  summary: "Send Mariia notification email",
  tags: ["Mariia Notify"],
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: "Notification email sent successfully",
      content: {
        "application/json": {
          schema: MariiaNotifySuccessResponse,
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
    },
    500: {
      description: "Failed to send notification email",
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
    },
  },
});
