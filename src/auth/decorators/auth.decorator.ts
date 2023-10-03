import { UseGuards, applyDecorators } from "@nestjs/common";
import { Role } from "src/common/enums/rol.enum";
import { Roles } from "./roles.decorator";
import { JwtGuard } from "../guards/jwt-auth.guard";
import { RolesGuard } from "../guards/roles.guard";
import { AuthGuard } from "../guards/auth.guard";

export function Auth(role: Role) {
    return applyDecorators(Roles(role), UseGuards(AuthGuard, RolesGuard))
}