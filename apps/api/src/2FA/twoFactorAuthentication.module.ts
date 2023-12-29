import { Module } from "@nestjs/common";
import { TwoFactorAuthenticationController } from "./twoFactorAuthentication.controller";
import { TwoFactorAuthenticationService } from "./twoFactorAuthentication.service";
import { PrismaService } from "src/prisma.service";

@Module({
    controllers:[TwoFactorAuthenticationController],
    providers:[TwoFactorAuthenticationService, PrismaService,]
})
export class TwoFactorAuthenticationModule{}