class AppError {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string, errorCode = 400) {
    this.message = message;
    this.statusCode = errorCode;
  }
}

export default AppError;
