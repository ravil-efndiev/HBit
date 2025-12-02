import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  use(req: Request, _: Response, next: (error?: any) => void) {
    const key = req.headers["x-api-key"];
    if (!key || key !== process.env.API_KEY) {
      throw new UnauthorizedException("API key is incorrect or not provided.");
    }
    next();
  }
}
