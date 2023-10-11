import { Configuration, CreateCompletionRequest, CreateChatCompletionRequest, OpenAIApi, CreateImageRequest } from "openai";
import * as Errors from "../errors";
import { speechToTextRequestInterface } from "../services/openaichatGPTServices";
const fs = require('fs');

// openai configuration
const openaiConfiguration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

// openai instance
const openaiInstance = new OpenAIApi(openaiConfiguration);

export class Openai {
    public static generateCompletions = async (data: CreateCompletionRequest) => {
        try {
            const completion = await openaiInstance.createCompletion(data);
            return { result: completion.data.choices[0].text };
        } catch (error) {
            if (error.response) {
                console.log(error.response);
                // invalid authentication, incorrect API key provided, your account is not part of organization will give 401 status code authentication error.
                console.log(error.response.data);
                throw new Errors.DatabaseError(error.response.data.error.message);
            } else {
                // if rate limit reached for requests(sending too many request quickly), exceed current quota, engine overloaded will give 429 status code error.
                console.log(error.message);
                throw new Errors.TooManyRequestsError(error.message);
            }
        }
    };

    // create chat completion
    public static generateChatCompletions = async (data: CreateChatCompletionRequest) => {
        try {
            const chatCompletion = await openaiInstance.createChatCompletion(data);
            return { result: chatCompletion.data.choices[0].message };
        } catch (error) {
            if (error.response) {
                console.log(error.response);
                // invalid authentication, incorrect API key provided, your account is not part of organization will give 401 status code authentication error.
                console.log(error.response.data);
                throw new Errors.DatabaseError(error.response.data.error.message);
            } else {
                // if rate limit reached for requests(sending too many request quickly), exceed current quota, engine overloaded will give 429 status code error.
                console.log(error.message);
                throw new Errors.TooManyRequestsError(error.message);
            }
        }
    }

    // create translation (speech to text conversion)
    public static createTranslationOfSpeechToText = async (data: speechToTextRequestInterface) => {
        try {
            const translation = await openaiInstance.createTranslation(
                fs.createReadStream(data.filePath),
                data.model,
            );

            return { result: translation.data.text };
        } catch (error) {
            if (error.response) {
                console.log(error.response);
                // invalid authentication, incorrect API key provided, your account is not part of organization will give 401 status code authentication error.
                console.log(error.response.data);
                throw new Errors.DatabaseError(error.response.data.error.message);
            } else {
                // if rate limit reached for requests(sending too many request quickly), exceed current quota, engine overloaded will give 429 status code error.
                console.log(error.message);
                throw new Errors.TooManyRequestsError(error.message);
            }
        }
    }

    // create image (generate image based on prompt text)
    public static generateImage = async (data: CreateImageRequest) => {
        try {
            const response = await openaiInstance.createImage(data);
            return { result: response.data.data };
        } catch (error) {
            if (error.response) {
                console.log(error.response);
                // invalid authentication, incorrect API key provided, your account is not part of organization will give 401 status code authentication error.
                console.log(error.response.data);
                throw new Errors.DatabaseError(error.response.data.error.message);
            } else {
                // if rate limit reached for requests(sending too many request quickly), exceed current quota, engine overloaded will give 429 status code error.
                console.log(error.message);
                throw new Errors.TooManyRequestsError(error.message);
            }
        }
    }
}