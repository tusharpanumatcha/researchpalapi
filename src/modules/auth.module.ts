import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
// import { UserModule } from '../modules/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../controllers/auth.controller';
import { jwtConstants } from '../util/constants';

import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from '../services/user.service';
import { User, UserSchema } from '../schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, UserService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
