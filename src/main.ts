import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as config from "config";

async function bootstrap() {
    const logger = new Logger();
    const app = await NestFactory.create(AppModule);

    const serverConfig = config.get("server");

    const PORT = serverConfig.port;
    await app.listen(PORT);

    logger.log(`Application runnin on port ${PORT}`);
}

bootstrap();
