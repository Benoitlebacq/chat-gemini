import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GeminiModule } from "./gemini/gemini.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Rendre les variables d'environnement accessibles globalement
    }), GeminiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
