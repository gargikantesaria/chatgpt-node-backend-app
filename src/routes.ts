import * as express from "express";
import NotFoundError from "./errors/notFoundError";
import { OpenaiChatGPTRoute } from "./routes/openaichatGPTRoutes";

export class Routes{

    // Diff Routes to Load
    public path(){
        const router = express.Router();

        router.use("/openaiChatGPT" , OpenaiChatGPTRoute);

        // For all other irrelevent routes
        router.all("/*", (req, res) => {
            throw new NotFoundError();
        });

        return router;
    }
}
