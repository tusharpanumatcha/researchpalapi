import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { api } from './types/api.types';
import { Public } from './util/guard/public.guard';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  getApiVersion(): api {
    return this.appService.getVersion();
  }
}
