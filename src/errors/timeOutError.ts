import { CustomError } from "./customError";
import { Constants } from "../config/constants";

class TimeOutError extends CustomError {
  statusCode = Constants.RESPONSE_STATUS_CODE.TIMEOUT_CODE;

  constructor(message?: string) {
    super( message?message:"Page/method not found" );
    Object.setPrototypeOf(this, TimeOutError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.message
      },
    ];
  }
}

export default TimeOutError;