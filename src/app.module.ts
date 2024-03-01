import { MiddlewareConsumer, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { TreatmentModule } from './modules/treatment.module';
import { NotesModule } from './modules/notes.module';
import { ProjectModule } from './modules/project.module';

import { AppService } from './app.service';
import { DatabaseModule } from './modules/database.module';

import { ApiResponseMiddleware } from './util/apiResponseMiddleware'; // Update the path as needed
import { UserModule } from './modules/user.module';
import { AuthModule } from './modules/auth.module';

import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [ 
    ConfigModule.forRoot(),
    JwtModule.register({
    secret: 'sdasdcsdac', // replace with your actual secret key
    signOptions: { expiresIn: '1h' },
  }),
  DatabaseModule, AuthModule, UserModule, TreatmentModule, NotesModule, ProjectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiResponseMiddleware).forRoutes('*');
  }
}
