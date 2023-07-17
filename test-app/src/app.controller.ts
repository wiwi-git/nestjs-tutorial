import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private looger = new Logger();
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/getJsonValue')
  getJsonValue() : string {
    const testValue = this.appService.getJsonValue();
    this.looger.verbose(testValue);
    
    return '-'
  }


  @Post('/encrypt')
  textEncryption(@Body('text') text: string) {
    // return this.appService.textEncryption(text);
    return this.appService.encryption(text);
  }

  @Post('/decrypt')
  textDecryption (@Body('text') text: string) {
    // return this.appService.textDecryption(text);
    return this.appService.decryption(text);
  }

}
