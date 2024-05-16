// users.controller.ts
import { Controller, Post, Body, Get, Req, UseGuards, Param, Patch } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Request } from 'express';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}


    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(@Req() req:Request) {
        const token = req?.cookies?.token        

        return this.usersService.findAll(token);
    }

    @UseGuards(JwtAuthGuard)
    @Get("me")
    getUser(@Req() req:Request) {
        const token = req?.cookies?.token        

        return this.usersService.getOne(token);

    }


    @UseGuards(JwtAuthGuard)
    @Patch("approve/:id")
    setUser(
        @Param("id") id:number,
        @Req() req:Request,
    ) {
        const token = req?.cookies?.token      
        

        return this.usersService.setUser(token,id);

    }

    
}
