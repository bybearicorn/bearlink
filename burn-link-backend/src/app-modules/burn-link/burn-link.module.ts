import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { BurnLinkEntity } from "@backend/entities/burn-link.entity";
import { BurnLinkController } from "./burn-link.controller";
import { BurnLinkScheduler } from "./burn-link.scheduler";
import { BurnLinkService } from "./burn-link.service";

@Module({
  imports: [TypeOrmModule.forFeature([BurnLinkEntity])],
  controllers: [BurnLinkController],
  providers: [BurnLinkService, BurnLinkScheduler],
})
export class BurnLinkModule {}
