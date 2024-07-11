import {
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { UserRepository } from "src/modules/users/user.repository";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepos: UserRepository
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException("Token not found");
    }

    try {
      const verifyToken = await this.jwtService.verify(token, {
        secret: process.env.ACCESS_SECRET_KEY
      });
      if (verifyToken) {
        const checkUserWithId = await this.userRepos.findById(
          verifyToken.user_id
        );
        if (
          checkUserWithId.email === verifyToken.email &&
          checkUserWithId.status === 1
        ) {
          return true;
        }
      }
    } catch (err) {
      throw new UnauthorizedException("Invalid token");
    }

    return false;
  }

  private extractTokenFromHeader(request: any): string | null {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return null;
    }
    const token = authHeader.split(" ")[1];
    return token;
  }
}
