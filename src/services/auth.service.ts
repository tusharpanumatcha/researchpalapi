import { Injectable, Dependencies, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';

type access_token = {
  access_token: string,
  userId: any
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}
  async signIn(
    username: string,
    pass: string,
  ): Promise<{  }> {
    const user = await this.usersService.findByEmail(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.username, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
      userId: user._id
    };
  }
}