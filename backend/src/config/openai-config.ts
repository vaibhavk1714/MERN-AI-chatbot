import { Configuration } from 'openai';

export const configureOpenAI = () => {
    const config = new Configuration({
        apiKey: process.env.OPEN_AI_API_KEY,
        organization: process.env.OPEN_AI_ORGANIZATION,
    });

    return config;
}