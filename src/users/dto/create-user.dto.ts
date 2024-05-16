// create-user.dto.ts
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).*$/, {
        message: 'password too weak',
    })
    password: string;
}

