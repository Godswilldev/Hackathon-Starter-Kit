import { Reflector } from "@nestjs/core";
import { ROLES_KEY, Role } from "src/auth/decorators/role.decorator";
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((r) => user.role?.includes(r));
  }
}
