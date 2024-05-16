import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);

        if (!user) throw new NotFoundException('User not found')

        const isPasswordMatching = await bcrypt.compare(pass, user.password)

        if (!isPasswordMatching) throw new BadRequestException("Invalid credentials")

        if (!user.is_enable) throw new UnauthorizedException("En attente de validation")

        const { password, ...result } = user;
        
        return result;
        
    }

    async login(user: any) {
        const payload = { email: user.email, status: user.is_enable };

        return {
            access_token: this.jwtService.sign(payload, { expiresIn: '1h' }),
        };
    }

    async register(user: CreateUserDto) {
        const isExistingUser = await this.usersRepository.findOneBy({
            email: user.email
    })

    if (isExistingUser)throw new BadRequestException("User Already existing")


        const hashedPassword = await bcrypt.hash(user.password, 10);

        return await this.usersRepository.save({
            ...user,
            is_enable: false,
            password: hashedPassword,
        });
    }
}