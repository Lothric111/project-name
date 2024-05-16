import { Body, Controller, Post, Req, Res, UnauthorizedException, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthGuard } from './local/local-auth.guard';
import { Request, Response } from 'express';
import * as dayjs from 'dayjs'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @UsePipes(new ValidationPipe({ transform: true }))
    async login(
      @Res({ passthrough: true }) res: Response,
      @Req() request: Request,
    ) {
        const { access_token } = await this.authService.login(request?.user);

        if (!access_token) throw new UnauthorizedException("Couldn't login user");



      res.cookie('token', access_token, {
        httpOnly: true,
        secure: true,
        expires: dayjs().add(30, 'days').toDate(),
      });

      return {
        success: true,
        data: access_token
    }
    }

}