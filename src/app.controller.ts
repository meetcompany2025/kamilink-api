import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  @Get('hello')
  async getHello() {
    return 'Hello, Kimalink API!';
  }
}
