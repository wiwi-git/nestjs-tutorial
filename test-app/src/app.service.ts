import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class AppService {
  footer = {
    "en": {
      "section1": ""
    },
    "ja": {
      "section1": "株式会社EmoticBox\n\n〒100-0005 東京都千代田区丸の内 3-2-2 丸の内二重橋ビル2階\nEmoticBox カスタマーサービス担当\n\nCopyright © 2020 EmoticBox. All rights reserved.\n\n\nこのメールアドレスは配信専用です。"
    },
    "ko": {
      "section1": "(주)이모틱박스\n서울특별시 강남구 역삼동 826-26 패스트파이브빌딩 1008호 대표이사 이재원\n사업자등록번호 299-88-01437 통신판매신고 2021-서울서초-2851\nCopyright ⓒ EmoticBox. All Rights Reserved\n\n※ 본 메일은 발신 전용입니다."
    }
  }

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
    const cipher = crypto.createCipheriv(this.algorithm, Buffer.from(this.key), this.iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    // return { iv: this.iv.toString('hex'), encryptedData: encrypted.toString('hex') };
    return { iv: this.iv, ivs: this.iv.toString('hex'), key: this.key, encryptedData: encrypted.toString('hex') };
  }


  textDecryption(text: string) {
    const cipher = crypto.createCipheriv(this.algorithm, Buffer.from(this.key), this.iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return { iv: this.iv.toString('hex'), encryptedData: encrypted.toString('hex') };
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
      const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
      let result2 = decipher.update(text, 'base64', 'utf8');
      result2 += decipher.final('utf8');
      return result2;
    } catch (error) {
      return {
        error
      }
    }
  }
  
}
