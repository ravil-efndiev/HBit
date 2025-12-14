import { Injectable, Logger, NestMiddleware } from "@nestjs/common";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, _: Response, next: (error?: any) => void) {
    Logger.log(`Request: ${req.method} to ${req.url}`);
    next();
  }
}
