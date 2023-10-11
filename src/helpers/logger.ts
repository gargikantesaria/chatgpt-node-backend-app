import { Constants } from "../config/constants";
import { createLogger, format, transports } from "winston";
import * as dayjs from "dayjs";
const { combine, timestamp, prettyPrint, colorize } = format;

export class Log {
  public static getLogger() {
    const timestampFormat: string = dayjs().format(
      Constants.TIME_STAMP_FORMAT
    );
    
    return createLogger({
      format: combine(
        timestamp({ format: timestampFormat }),
        prettyPrint(),
        colorize()
      ),
      level: "debug",
      transports: [new transports.Console()],
    });
  }
}