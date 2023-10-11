import { CustomError } from "./customError";
import { Constants } from "../config/constants";

class UnauthorisedError extends CustomError {
  statusCode = Constants.RESPONSE_STATUS_CODE.UNAUTHORIZED_CODE;

  constructor(message?: string) {
    super( message?message:"User already exists" );
    Object.setPrototypeOf(this, UnauthorisedError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.message
      },
    ];
  }
}

export default UnauthorisedError;