import { ChatCompletionRequestMessageRoleEnum, ChatCompletionResponseMessageRoleEnum, CreateChatCompletionRequest, CreateCompletionRequest, CreateImageRequest } from "openai";
import { Constants } from "../config/constants";
import { Openai } from "../helpers/openai";
import * as fs from 'fs';
import * as path from 'path';
import * as Errors from "../errors";

export interface speechToTextRequestInterface {
    filePath: string,
    model: string
}
export class OpenaiChatGPTService {

    // to generate openai chatGPT completion response based on requested text input
    public generateCompletions = async (text_message: string) => {
        const reqData: CreateCompletionRequest = {
            model: Constants.OPENAI_GPT3_TEXT_MODEL,
            prompt: text_message,
            max_tokens: 4000
        };
        return await Openai.generateCompletions(reqData);
    };

    // to choose role based on user input text message
    public chooseRole = (input: string) => {
        if (Constants.ASSISTANCE_ROLE_KEYWORDS.some(keyword => input.toLowerCase().includes(keyword.toLowerCase())) || input.endsWith('?')) {
            return ChatCompletionResponseMessageRoleEnum.Assistant;
        }
        else if (Constants.SYSTEM_ROLE_KEYWORDS.some(keyword => input.toLowerCase().includes(keyword.toLowerCase()))) {
            return ChatCompletionRequestMessageRoleEnum.System;
        }
        else {
            return ChatCompletionResponseMessageRoleEnum.User;
        }
    }

    // to generate openai chatGPT chat completion response based on requested text message input
    public generateChatCompletions = async (message: string) => {
        const reqData: CreateChatCompletionRequest = {
            model: Constants.OPENAI_GPT_TURBO_CHAT_MODEL,
            messages: [{
                role: this.chooseRole(message),
                content: message,
            }],
            temperature: this.chooseRole(message) === ChatCompletionResponseMessageRoleEnum.Assistant ? 0.7 : 0.5 // "0.7" for more creative and varied responses & "0.5" for more conservative and coherent(accordingly) responses.
        };
        return await Openai.generateChatCompletions(reqData);
    }

    // write file on temp directory
    public writeFileOnTempDir = (file: File) => {
        return new Promise((resolve, reject) => {
            // get buffer data of file
            const fileData = fs.readFileSync(file['tempFilePath']);
            const fileBuffer = Buffer.from(fileData.buffer);

            fs.writeFile(file.name, fileBuffer, async (error) => {
                if (error) {
                    reject(error);
                    throw new Errors.DatabaseError(`Error writing file: ${error}`);
                } else {
                    console.log("File created successfully!");
                    resolve(true);
                }
            });
        });
    }

    // speech to text conversion
    public speechToTextCoversion = async (audioFile: File) => {
        // create file on temp directory
        await this.writeFileOnTempDir(audioFile);

        const cretaedTempFilePath = path.join(__dirname, `../../${audioFile.name}`);

        const reqData: speechToTextRequestInterface = {
            filePath: cretaedTempFilePath,
            model: 'whisper-1'
        };

        const translation = await Openai.createTranslationOfSpeechToText(reqData);

        // delete file from temp directory
        fs.unlink(audioFile.name, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            }

            console.log('File deleted successfully!');
        });

        return translation;
    }

    // generate image
    public createImageBasedOnText = async (data: CreateImageRequest) => {
        return await Openai.generateImage(data);
    }


    public generateSQLQueryBasedOnText = async (userMessage: string) => {
        const systemMessage = `
        Given the following SQL tables, your job is to write queries given a user’s request.\n
        CREATE TABLE users (
            user_uuid CHAR(36),
            name VARCHAR(100),
            email VARCHAR(100),
            password VARCHAR(100),
            role_uuid CHAR(36),
            created_by CHAR(36),
            updated_by CHAR(36),
            created_at DATETIME,
            updated_at DATETIME,
            last_login_datetime,
            last_activity_datetime,
            PRIMARY KEY (user_uuid)
        );
        CREATE TABLE threads (
            thread_uuid CHAR(36),
            thread_subject VARCHAR(245),
            thread_status VARCHAR(45),
            job_uuid CHAR(36),
            created_by CHAR(36),
            updated_by CHAR(36),
            created_at DATETIME,
            updated_at DATETIME,
            PRIMARY KEY (thread_uuid)
        );
        CREATE TABLE staffs (
            staff_uuid char(36),
            name varchar(100),
            email varchar(100),
            user_uuid char(36),
            is_active tinyint(1),
            created_by char(36),
            updated_by char(36),
            created_at datetime,
            updated_at datetime,
            PRIMARY KEY (staff_uuid)
        );
        CREATE TABLE roles (
            role_uuid char(36),
            role_type varchar(45),
            PRIMARY KEY (role_uuid)
        );
        CREATE TABLE messages (
            message_uuid char(36),
            thread_uuid char(36),
            message text,
            user_uuid char(36),
            created_by char(36),
            created_at datetime,
            PRIMARY KEY (message_uuid)
        );
        CREATE TABLE jobs (
            job_uuid char(36),
            job_type varchar(45),
            job_name varchar(245),
            entity_uuid char(36),
            is_archived tinyint(1),
            created_by char(36),
            updated_by char(36),
            created_at datetime,
            updated_at datetime,
            due_date date,
            PRIMARY KEY (job_uuid)
        );
        CREATE TABLE entity_users_map (
            entity_user_map_uuid char(36),
            entity_uuid char(36),
            user_uuid char(36),
            role_uuid char(36),
            created_by char(36),
            updated_by char(36),
            created_at datetime,
            updated_at datetime,
            PRIMARY KEY (entity_user_map_uuid)
        );
        CREATE TABLE entities (
            entity_uuid char(36),
            entity_name varchar(245),
            is_archived tinyint(1),
            created_by char(36),
            updated_by char(36),
            created_at datetime,
            updated_at datetime,
            PRIMARY KEY (entity_uuid)
        );
        CREATE TABLE documents (
            document_uuid char(36),
            path text,
            name varchar(245),
            job_uuid char(36),
            created_by char(36),
            created_at datetime,
            message_uuid char(36),
            PRIMARY KEY (document_uuid)
        );
        CREATE TABLE clients (
            client_uuid char(36),
            name varchar(100),
            email varchar(100),
            user_uuid char(36),
            is_active tinyint(1),
            created_by char(36),
            updated_by char(36),
            created_at datetime,
            updated_at datetime,
            PRIMARY KEY (client_uuid)
        );
        `;

        const reqData: CreateChatCompletionRequest = {
            model: Constants.OPENAI_GPT_TURBO_CHAT_MODEL,
            messages: [
                {
                    role: ChatCompletionRequestMessageRoleEnum.System,
                    content: systemMessage,
                }, {
                    role: ChatCompletionRequestMessageRoleEnum.User,
                    content: `Write a SQL query ${userMessage}`
                }
            ]
        };

        return await Openai.generateChatCompletions(reqData);
    }
}