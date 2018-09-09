import { Injectable } from "@nestjs/common";
import { log } from "util";

@Injectable()
export class AuthService {

    validateAccess(token: String) {
        log('validating access')
        return false
    }
}