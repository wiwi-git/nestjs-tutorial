import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(authCredentialDto: AuthCredentialDto): Promise<void>;
    signIn(authCredentialDto: AuthCredentialDto): Promise<{
        accessToken: string;
    }>;
    test(req: any): void;
}
