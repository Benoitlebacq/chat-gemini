import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Active CORS pour permettre l'accès depuis d'autres origines
  app.enableCors({
    origin: 'http://localhost:5173', // Autorise uniquement cette origine
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Méthodes HTTP autorisées
    credentials: true, // Si des cookies ou des en-têtes d'autorisation sont nécessaires
  });


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
