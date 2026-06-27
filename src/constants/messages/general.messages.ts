export const GENERAL_MESSAGES = {
  OBJECT_NOT_FOUND_ERROR: "Error, object not found",
  OBJECT_FOUND_SUCCESS: "Success, object found",
  SECRET_KEY_VALIDATION: "SECRET_KEY is required",
  DATABASE_URL_VALIDATION: "DATABASE_URL is required",
  JWT_EXPIRE_TIME_VALIDATION: "JWT_EXPIRE_TIME is required",
  PORT_RANGE_VALIDATION: "PORT must be between 1 and 65535",
  PORT_TYPE_VALIDATION: "PORT must be an integer",
  JWT_ALGORITHM_VALIDATION: "JWT_ALGORITHM is required",
  CORS_ALLOWED_ORIGINS_VALIDATION: "CORS_ALLOWED_ORIGINS is required",
  INVALID_ENV: "Invalid environment configuration",
  VALIDATION_FAILED: "Validation failed",
  CORS_ORIGIN_NOT_ALLOWED: "CORS origin not allowed",
} as const;
