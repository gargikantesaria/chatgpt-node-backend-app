import { AllowedSchema } from "express-json-validator-middleware";

export const generateCompletionSchema: AllowedSchema = {
    $id: "http://openaiChatGPT/schemas/generateCompletionSchema.json",
    type: "object",
    required: ["text_message"],
    properties: {
        text_message: {
            type: "string",
            minLength: 1
        }
    },
    additionalProperties: false
};

export const generateImageSchema: AllowedSchema = {
    $id: "http://openaiChatGPT/schemas/generateImageSchema.json",
    type: "object",
    required: ["prompt"],
    properties: {
        prompt: {
            type: "string",
            maxLength: 1000
        },
        n: {
            type: "number",
            minimum: 1,
            maximum: 10
        },
        size: {
            type: "string",
            enum: ['256x256', '512x512', '1024x1024']
        }
    },
    additionalProperties: false
};
