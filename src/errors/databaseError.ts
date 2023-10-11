import { CustomError } from "./customError";
import { Constants } from "../config/constants";

class DatabaseError extends CustomError {
  statusCode = Constants.RESPONSE_STATUS_CODE.INTERNAL_SERVER_ERROR_CODE;

  constructor(message?: string) {
    super( message?message:"Database error" );
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.message
      },
    ];
  }
}

export default DatabaseError;