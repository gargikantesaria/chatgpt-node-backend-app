import { Request, Response, NextFunction } from "express";
import { ValidationError } from "express-json-validator-middleware";
import { CustomError } from "../customError";


const ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    if (err instanceof ValidationError) {
        return res.status(400).json({
            errors: err.validationErrors
        });
    }

    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
            errors: err.serializeErrors()
        });
    }

    return res.status(500).send({
        errors: [{ message: "Internal server error" }]
    });
}

export default ErrorHandler;
