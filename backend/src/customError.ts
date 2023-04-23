// customError.ts
export class CustomError extends Error {
    constructor(message: string, public statusCode: number) {
      super(message);
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export class NotFoundError extends CustomError {
    constructor(message = 'Resource not found') {
      super(message, 404);
    }
  }
  
  export class InternalServerError extends CustomError {
    constructor(message = 'Internal server error') {
      super(message, 500);
    }
  }
  