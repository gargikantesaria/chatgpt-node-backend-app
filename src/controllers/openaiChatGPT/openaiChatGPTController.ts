import { Request, Response, NextFunction } from "express";
import { Constants } from "../../config/constants";
import { OpenaiChatGPTService } from "../../services/openaichatGPTServices";

export interface uploadAudioFileInputRequest extends Request {
    files: { audio_file: File }
}

export class OpenaiChatGPTController {

    // to generate openai chatGPT completions(response based on request text)
    public generateOpenaiChatGPTCompletions = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const openaiChatGPTService = new OpenaiChatGPTService();
            const generatedCompletions = await openaiChatGPTService.generateCompletions(req.body.text_message);

            res.status(Constants.RESPONSE_STATUS_CODE.SUCCESS_CODE).json(generatedCompletions);
        } catch (error) {
            next(error);
        }
    };

    // to generate openai chatGPT chat completions(response based on request user chat message)
    public generateOpenaiChatGPTChatCompletions = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const openaiChatGPTService = new OpenaiChatGPTService();
            const generatedChatCompletions = await openaiChatGPTService.generateChatCompletions(req.body.text_message);

            res.status(Constants.RESPONSE_STATUS_CODE.SUCCESS_CODE).json(generatedChatCompletions);
        } catch (error) {
            next(error);
        }
    }

    // speech to text conversion
    public openaiSpeechToTextConversion = async (req: uploadAudioFileInputRequest, res: Response, next: NextFunction) => {
        try {
            const openaiChatGPTService = new OpenaiChatGPTService();
            const audioFile = req.files.audio_file;

            const generatedConversion = await openaiChatGPTService.speechToTextCoversion(audioFile);

            res.status(Constants.RESPONSE_STATUS_CODE.SUCCESS_CODE).json(generatedConversion);
        } catch (error) {
            next(error);
        }
    }

    // generate image based on text
    public openaiGenerateImage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const openaiChatGPTService = new OpenaiChatGPTService();
            const inputData = req.body;

            const generatedResponse = await openaiChatGPTService.createImageBasedOnText(inputData);
            res.status(Constants.RESPONSE_STATUS_CODE.SUCCESS_CODE).json(generatedResponse);
        } catch (error) {
            next(error);
        }
    }



    public openaiGenerateSQLQuery = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const openaiChatGPTService = new OpenaiChatGPTService();
            const inputQuery = req.body.query;

            const generatedResponse = await openaiChatGPTService.generateSQLQueryBasedOnText(inputQuery);
            res.status(Constants.RESPONSE_STATUS_CODE.SUCCESS_CODE).json(generatedResponse);
        } catch (error) {
            next(error);
        }
    }
}