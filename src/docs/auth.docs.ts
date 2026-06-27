import { registry } from "@/config/openapi";
import { LoginRequestSchema, LoginResponseSchema } from "@/dtos/auth.dto";
import { ErrorResponseSchema, SuccessResponseSchema } from "@/dtos/general.dto";

registry.register("LoginRequest", LoginRequestSchema);
registry.register("LoginResponse", LoginResponseSchema);

const LoginSuccessResponse = SuccessResponseSchema(LoginResponseSchema);

registry.registerPath({
  method: "post",
  path: "/api/auth/login",
  summary: "Login with username and password",
  tags: ["Auth"],
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: LoginRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Login successful",
      content: {
        "application/json": {
          schema: LoginSuccessResponse,
        },
      },
    },
    400: {
      description: "Validation failed or invalid credentials",
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
    },
    500: {
      description: "Login failed",
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
    },
  },
});
