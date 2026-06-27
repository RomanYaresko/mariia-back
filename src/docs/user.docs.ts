import { registry } from "@/config/openapi";
import { RegisterUserSchema, UserSchema } from "@/dtos/user.dto";
import { ErrorResponseSchema, SuccessResponseSchema } from "@/dtos/general.dto";

registry.register("RegisterUser", RegisterUserSchema);
registry.register("User", UserSchema);
registry.register("ErrorResponse", ErrorResponseSchema);

const RegisterUserSuccessResponse = SuccessResponseSchema(UserSchema);
const CurrentUserSuccessResponse = SuccessResponseSchema(UserSchema);

registry.registerPath({
  method: "post",
  path: "/api/users/register",
  summary: "Register a new user",
  tags: ["Users"],
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: RegisterUserSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "User registered successfully",
      content: {
        "application/json": {
          schema: RegisterUserSuccessResponse,
        },
      },
    },
    400: {
      description: "Validation failed",
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
    },
    409: {
      description: "Username already taken",
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
    },
    500: {
      description: "Registration failed",
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
  path: "/api/users/current",
  summary: "Get current user",
  tags: ["Users"],
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: "Current user retrieved successfully",
      content: {
        "application/json": {
          schema: CurrentUserSuccessResponse,
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
  },
});
