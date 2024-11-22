import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { GeminiController } from "./gemini.controller";
import { GeminiService } from "./gemini.service";

@Module({
  controllers: [GeminiController],
  providers: [GeminiService, ConfigService]
})
export class GeminiModule { }
