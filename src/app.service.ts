import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to my api, add /apidoc in the link to access the api.';
  }
}
