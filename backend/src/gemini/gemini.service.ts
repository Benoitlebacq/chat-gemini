import { formatText } from "utils";

import { Content, GoogleGenerativeAI } from "@google/generative-ai";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class GeminiService {
    private genAi: GoogleGenerativeAI

    constructor(private configService: ConfigService) {
        const apiKey = this.configService.get<string>('GOOGLE_API_KEY')
        this.genAi = new GoogleGenerativeAI(apiKey)
    }

    async getGemini(message: string, history: Content[]) {

        try {
            const model = this.genAi.getGenerativeModel({ model: 'gemini-pro' })
            const chat = model.startChat({ history })
            const result = await chat.sendMessage(message)
            const response = await result.response

            return formatText(response.text())
        } catch (error) {
            throw new Error(`Failed to generate response: ${error.message}`)
        }

    }
}
