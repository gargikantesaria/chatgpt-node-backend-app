import { CustomError } from "./customError";
import { Constants } from "../config/constants";

class TooManyRequestsError extends CustomError {
  statusCode = Constants.RESPONSE_STATUS_CODE.TOO_MANY_REQUESTS;

  constructor(message?: string) {
    super( message?message:"Too many requests." );
    Object.setPrototypeOf(this, TooManyRequestsError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.message
      },
    ];
  }
}

export default TooManyRequestsError;