// user.controller.ts
import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() body: { username: string; email: string; password: string }): Promise<any> {
    const { username, email, password } = body;
    console.log(body, "body")
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const newUser = await this.userService.createUser(username, email, password);
    return { id: newUser._id, username: newUser.username, email: newUser.email };
  }
}
