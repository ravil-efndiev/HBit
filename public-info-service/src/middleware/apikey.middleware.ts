import {
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  constructor(private config: ConfigService) {}

  use(req: Request, _: Response, next: (error?: any) => void) {
    const key = req.headers["x-api-key"];
    if (!key || key !== this.config.get("API_KEY")) {
      Logger.error(`Rejected request to ${req.url}, no API key`);
      throw new UnauthorizedException("API key is incorrect or not provided.");
    }
    next();
  }
}
