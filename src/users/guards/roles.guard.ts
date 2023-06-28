import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../entities/role.enum";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { User } from "../entities/user.entity";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());

    const user: User = {
      name: "Jomer",
      permission: [Role.USER],
    };

    if(!requiredRoles) {
      return true;
    }

    return requiredRoles.some((role) => user.permission.includes(role));
  }
}