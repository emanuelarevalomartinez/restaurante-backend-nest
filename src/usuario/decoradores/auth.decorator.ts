import { UseGuards, applyDecorators } from "@nestjs/common";
import { Roles } from "../interfaces";
import { RolesProtected } from "./roles-protected.decorator";
import { UserRolesGuard } from "../guards/user-roles/user-roles.guard";
import { AuthGuard } from "@nestjs/passport";


export function Auth(...roles: Roles[]){
    return applyDecorators(
        RolesProtected(...roles),
        UseGuards( AuthGuard() ,UserRolesGuard ),
    )
}