import * as dotenv from "dotenv";
dotenv.config();
import { App } from "./app";
import { Log } from "./helpers/logger";

const PORT = process.env.PORT ;

// create logger
const logger = Log.getLogger();

const expr = new App();

expr.app.listen(PORT, () => {    
  logger.info(
    `The server is running in port localhost: ${PORT}`
  );
});
