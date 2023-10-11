import { CustomError } from "./customError";
import { Constants } from "../config/constants";

class ConflictError extends CustomError {
  statusCode = Constants.RESPONSE_STATUS_CODE.CONFLICT_CODE;

  constructor(message?: string) {
    super( message?message:"User already exists" );
    Object.setPrototypeOf(this, ConflictError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.message
      },
    ];
  }
}

export default ConflictError;