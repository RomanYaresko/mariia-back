export const AUTH_MESSAGES = {
  LOGIN_SUCCESS: "Success login",

  LOGIN_WRONG_CREDENTIALS: "Invalid credentials",

  ACCESS_DENIED_MISSING_AUTH_HEADER: "Access denied, missing auth header",
  ACCESS_DENIED_WRONG_AUTH_PREFIX: "Access denied, wrong auth prefix",
  ACCESS_DENIED_WRONG_AUTH_TOKEN: "Access denied, wrong auth token",
  ACCESS_DENIED_MISSING_AUTH_TOKEN: "Access denied, missing auth token",
  LOGIN_FAILED: "Login failed",
  INVALID_TOKEN: "Invalid token",
} as const;
