export const USER_MESSAGES = {
  USER_REGISTER_SUCCESS: "User registered successfully",
  CURRENT_USER_SUCCESS: "User retrieved successfully",

  USERNAME_MIN_LENGTH_VALIDATION: "Username must be at least 3 characters",
  USERNAME_MAX_LENGTH_VALIDATION: "Username must be at most 30 characters",
  PASSWORD_MIN_LENGTH_VALIDATION: "Password must be at least 6 characters",

  USERNAME_PASSWORD_REQUIRED: "Username and password are required",
  USERNAME_ALREADY_TAKEN: "Username already taken",
  REGISTRATION_FAILED: "Registration failed",
  USER_NOT_FOUND: "User not found",
} as const;
