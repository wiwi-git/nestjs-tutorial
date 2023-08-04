import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class AppService {
  throwFucntion() {
    try {
      throw new Error('에러가 발생했습니다 ㅠㅠ');
    } catch {
      throw new HttpException(
        '에러 던집니다! 여기서 던진 스테이터스는 500 입니다!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  footer = {
    en: {
      section1: '',
    },
    ja: {
      section1: '会社',
    },
    ko: {
      section1: '회사',
    },
  };

  getHello(): string {
    return 'Hello World!';
  }

  getJsonValue() {
    const footer = this.footer['ko'];
    return footer;
  }

  // private key = crypto.randomBytes(32);
  private key = Buffer.from('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
  // private iv = crypto.randomBytes(16);
  private iv: Buffer = Buffer.from('1234567890123456');
  private algorithm = 'aes-256-cbc';

  textEncryption(text: string) {
    const cipher = crypto.createCipheriv(
      this.algorithm,
      Buffer.from(this.key),
      this.iv,
    );
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    // return { iv: this.iv.toString('hex'), encryptedData: encrypted.toString('hex') };
    return {
      iv: this.iv,
      ivs: this.iv.toString('hex'),
      key: this.key,
      encryptedData: encrypted.toString('hex'),
    };
  }

  textDecryption(text: string) {
    const cipher = crypto.createCipheriv(
      this.algorithm,
      Buffer.from(this.key),
      this.iv,
    );
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return {
      iv: this.iv.toString('hex'),
      encryptedData: encrypted.toString('hex'),
    };
  }

  encryption(text: string) {
    const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
    let result = cipher.update(text, 'utf8', 'base64');
    result += cipher.final('base64');
    // result += cipher.final();
    return result;
  }

  decryption(text: string) {
    try {
      const decipher = crypto.createDecipheriv(
        this.algorithm,
        this.key,
        this.iv,
      );
      let result2 = decipher.update(text, 'base64', 'utf8');
      result2 += decipher.final('utf8');
      return result2;
    } catch (error) {
      return {
        error,
      };
    }
  }
}
