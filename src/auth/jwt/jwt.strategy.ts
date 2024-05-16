// jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                  const token = request?.cookies['token'];
                  return token;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: 'taztoz1234AAA',
        });
    }

    async validate(payload: any) {
        return { email: payload.email };
    }
}
