import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class LoggerIntercepter implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any>  {
    const request = context.switchToHttp().getRequest();
    const controller = context.getClass().name;
     
    Logger.log(`Request [${controller}]: ${request.method} to ${request.url}`);
    return next.handle();
  }
}
