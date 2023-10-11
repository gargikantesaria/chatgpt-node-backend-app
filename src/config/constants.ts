export class Constants {
    // time formats
    public static readonly TIME_STAMP_FORMAT = "YYYY-MM-DD HH:mm:ss";

    // response status codes
    public static readonly RESPONSE_STATUS_CODE = {
        SUCCESS_CODE: 200,
        CREATED_SUCCESS_CODE: 200,
        UPDATE_SUCCESS_CODE: 204,
        FAIL_CODE: 400,
        UNAUTHORIZED_CODE: 401,
        NOT_FOUND_CODE: 404,
        CONFLICT_CODE: 409,
        INTERNAL_SERVER_ERROR_CODE: 500,
        TOO_MANY_REQUESTS: 429,
        TIMEOUT_CODE: 408
    }

    // it's latest & most capable chatGPT model that can understand and generate natural language text
    public static readonly OPENAI_GPT3_TEXT_MODEL = "text-davinci-003";

    public static readonly OPENAI_GPT_TURBO_CHAT_MODEL = "gpt-3.5-turbo";
    public static readonly OPENAI_GPT_4_MODEL = "gpt-4";

    public static readonly ASSISTANCE_ROLE_KEYWORDS = ['help', 'advice', 'guidance', 'support', 'suggestion', 'recommend', 'direction', 'instruction', 'tutorial', 'explain', 'clarify', 'define', 'outline', 'illustrate'];
    public static readonly SYSTEM_ROLE_KEYWORDS = ['error', 'issue', 'problem', 'bug', 'glitch', 'technical', 'malfunction', 'troubleshoot', 'debug', 'fix', 'resolve'];
}
