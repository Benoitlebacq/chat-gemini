import { Content } from "@google/generative-ai";
import { Body, Controller, Post } from "@nestjs/common";

import { GeminiService } from "./gemini.service";

@Controller('gemini')
export class GeminiController {
    constructor(private readonly geminiService: GeminiService) { }

    @Post('chat')
    async getGemini(@Body('message') message: string, @Body('history') history: Content[]) {

        const data = await this.geminiService.getGemini(message, history);
        return data
    }
}