import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  getOnlineStatus() {
    return { online: true };
  }
}
