import { Router } from "express";
import { Validator } from "express-json-validator-middleware";
import { OpenaiChatGPTController } from "../controllers/openaiChatGPT/openaiChatGPTController";
import { generateCompletionSchema, generateImageSchema } from "../schemas/openaiChatGPTSchema";

// Assign router to the express.Router() instance
const router: Router = Router();
const { validate } = new Validator({ schemas: [generateCompletionSchema, generateImageSchema] });
const openaiChatGPTController = new OpenaiChatGPTController();

router.post("/generateCompletions", validate({ body: generateCompletionSchema }), openaiChatGPTController.generateOpenaiChatGPTCompletions);
router.post("/generateChatCompletions", validate({ body: generateCompletionSchema }), openaiChatGPTController.generateOpenaiChatGPTChatCompletions);
router.post("/speechToTextConversion", openaiChatGPTController.openaiSpeechToTextConversion);
router.post("/generateImage", validate({ body: generateImageSchema }), openaiChatGPTController.openaiGenerateImage);

router.post("/generateSQLQuery", openaiChatGPTController.openaiGenerateSQLQuery);

export const OpenaiChatGPTRoute: Router = router;