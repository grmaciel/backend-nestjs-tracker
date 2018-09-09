import { Get, Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { log } from 'util';

@Controller()
export class UserController {
    constructor() { }

    @Get('user')
    @UseGuards(AuthGuard('bearer'))
    findAll(): string {
        log('user calling')
        return 'userrrrrr';
    }
}
