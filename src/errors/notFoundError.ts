import { CustomError } from "./customError";
import { Constants } from "../config/constants";

class NotFoundError extends CustomError {
  statusCode = Constants.RESPONSE_STATUS_CODE.NOT_FOUND_CODE;

  constructor(message?: string) {
    super( message?message:"Page/method not found" );
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.message
      },
    ];
  }
}

export default NotFoundError;