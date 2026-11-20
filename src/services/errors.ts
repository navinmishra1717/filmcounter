export class ServiceError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly details?: Record<string, string>,
  ) {
    super(message);
    this.name = "ServiceError";
  }
}

export class ValidationError extends ServiceError {
  constructor(details: Record<string, string>) {
    super("Validation failed", 400, details);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends ServiceError {
  constructor(message = "Not found") {
    super(message, 404);
    this.name = "NotFoundError";
  }
}

export class ConflictError extends ServiceError {
  constructor(message: string) {
    super(message, 409);
    this.name = "ConflictError";
  }
}
