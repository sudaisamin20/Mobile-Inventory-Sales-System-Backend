/**
 * Custom error class for API responses
 */
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public errors: Record<string, string> = {}
  ) {
    super(message);
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

/**
 * Error response handler
 */
export const handleError = (error: any) => {
  console.error("Error:", error);

  if (error instanceof ApiError) {
    return {
      success: false,
      message: error.message,
      statusCode: error.statusCode,
      errors: error.errors,
    };
  }

  if (error.message.includes("Invalid email or password")) {
    return {
      success: false,
      message: "Invalid email or password",
      statusCode: 401,
    };
  }

  if (error.message.includes("Email already in use")) {
    return {
      success: false,
      message: "Email already in use",
      statusCode: 409,
      errors: { email: "This email is already registered" },
    };
  }

  if (error.message.includes("IMEI already in use")) {
    return {
      success: false,
      message: "IMEI already in use",
      statusCode: 409,
      errors: { imei: "This IMEI is already registered" },
    };
  }

  if (error.message.includes("User not found")) {
    return {
      success: false,
      message: "User not found",
      statusCode: 404,
    };
  }

  if (error.message.includes("Device not found")) {
    return {
      success: false,
      message: "Device not found",
      statusCode: 404,
    };
  }

  return {
    success: false,
    message: error.message || "Internal server error",
    statusCode: 500,
  };
};
