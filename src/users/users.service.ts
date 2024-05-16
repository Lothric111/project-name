import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @Inject(JwtService)
        private jwtService: JwtService,
    ) {}

    // Trouver un utilisateur par son email
    async findOne(email: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { email } });
    }

    async findAll(token: string): Promise<User[] | null> {
        const decodedToken = this.decodeJWT(token)
        const user = await this.usersRepository.findOne({ where: { email: decodedToken.email } });
        
        
        if (!user.is_enable) throw new UnauthorizedException("Not authorized")

        return await this.usersRepository.find();
    }

decodeJWT(token:string) {
   return this.jwtService.decode(token)
}

async getOne(token: string): Promise<User | null> {
    const decodedToken = this.decodeJWT(token)
const user = await this.usersRepository.findOne({ where: { email: decodedToken.email } });

delete user.password
    return user
}

async setUser(token: string, id:number){
    const decodedToken = this.decodeJWT(token)
const user = await this.usersRepository.findOne({ where: { email: decodedToken.email } });


if (!user.is_enable) throw new UnauthorizedException("Not authorized")


    const foundUser = await this.usersRepository.findOne({
        where: {
            id
        }
    })

    return await this.usersRepository.update({
        id: foundUser.id
    }, {
        is_enable: !foundUser.is_enable
    })

}
}