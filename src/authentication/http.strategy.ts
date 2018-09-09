import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { log } from 'util';

export class HttpStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(token: any, done: Function) {
        log('validating http strategy')
        const user = this.authService.validateAccess(token);
        if (!user) {
            return done(new UnauthorizedException(), false);
        }
        done(null, user);
    }
}