import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { UserRepository } from "src/modules/users/user.repository";

@Injectable()
export class ManagerGuard extends AuthGuard("jwt") {
  constructor(
    private readonly userRepos: UserRepository,
    private readonly jwtService: JwtService
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException("Token not found");
    }

    const decodePayload: any = this.jwtService.decode(token);

    if (!decodePayload || !decodePayload.user_id) {
      throw new UnauthorizedException("Invalid token");
    }

    try {
      const user = await this.userRepos.findById(decodePayload.user_id);
      if (user.role === 3) {
        return true;
      }
    } catch (error) {
      console.log(error);
      throw new ForbiddenException(
        "You dont have the required role to perform this action"
      );
    }
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
