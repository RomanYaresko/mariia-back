import { z } from "zod";
import { registry } from "@/config/openapi";
import { MariiaStepSchema } from "@/dtos/mariiaStep.dto";
import { ErrorResponseSchema, SuccessResponseSchema } from "@/dtos/general.dto";

registry.register("MariiaStep", MariiaStepSchema);

const MariiaStepSuccessResponse = SuccessResponseSchema(MariiaStepSchema);

registry.registerPath({
  method: "get",
  path: "/api/mariia-steps/head",
  summary: "Get head Mariia step",
  tags: ["Mariia Steps"],
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: "Head Mariia step retrieved successfully",
      content: {
        "application/json": {
          schema: MariiaStepSuccessResponse,
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
    404: {
      description: "Head Mariia step not found",
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/mariia-steps/{id}",
  summary: "Get Mariia step by id",
  tags: ["Mariia Steps"],
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({
      id: z.coerce.number(),
    }),
  },
  responses: {
    200: {
      description: "Mariia step retrieved successfully",
      content: {
        "application/json": {
          schema: MariiaStepSuccessResponse,
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
    404: {
      description: "Mariia step not found",
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
    },
  },
});
