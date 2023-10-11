import { CustomError } from "./customError";
import { Constants } from "../config/constants";

class InputInvalidError extends CustomError {
  statusCode = Constants.RESPONSE_STATUS_CODE.FAIL_CODE;

  constructor(message?: string) {
    super( message?message:"Input value invalid" );
    Object.setPrototypeOf(this, InputInvalidError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.message
      },
    ];
  }
}

export default InputInvalidError;