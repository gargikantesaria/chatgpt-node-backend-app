import { Request, Response, NextFunction } from "express";
import { ValidationError } from "express-json-validator-middleware";
import { CustomError } from "../customError";
import { Log } from "../../helpers/logger";

const ErrorLogHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const logger = Log.getLogger();

    if (err instanceof ValidationError) {
        return next(err);
    }

    if (err instanceof CustomError) {
        return next(err);
    }

    logger.error(err.stack);
    next(err);
}

export default ErrorLogHandler;