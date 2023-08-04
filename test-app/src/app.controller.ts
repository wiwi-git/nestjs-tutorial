import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  private looger = new Logger();
  constructor(private readonly appService: AppService) {}

  @Get('/favicon.ico')
  favicon(@Res() res) {
    res.status(HttpStatus.OK).end();
  }

  @Get('/throw')
  throwTest() {
    try {
      this.appService.throwFucntion();
    } catch (error) {
      const comment =
        '던진 에러를 잘 받았습니다! 이제 여기서 한번더 던지겠습니다! 여기서 던진 스테이터스는 400 입니다!';
      console.log(comment);

      throw new HttpException(error.message + comment, HttpStatus.BAD_REQUEST);
    }

    return '';
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/getJsonValue')
  getJsonValue(): string {
    const testValue = this.appService.getJsonValue();
    this.looger.verbose(testValue);

    return '-';
  }

  @Post('/encrypt')
  textEncryption(@Body('text') text: string) {
    // return this.appService.textEncryption(text);
    return this.appService.encryption(text);
  }

  @Post('/decrypt')
  textDecryption(@Body('text') text: string) {
    // return this.appService.textDecryption(text);
    return this.appService.decryption(text);
  }
}
