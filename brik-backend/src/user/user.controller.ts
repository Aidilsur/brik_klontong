import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { UserService } from './user.service';

interface UserRequest extends Request {
  user: {
    sub: number; // atau string, sesuai dengan tipe ID
  };
}

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(@Request() req: UserRequest) {
    return this.userService.findById(req.user.sub);
  }
}
