import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { CreateBurnLinkRequest, CreateBurnLinkResponse, GetBurnLinkResponse } from "@shared/interfaces/burn-link.api";

import { BurnLinkService } from "./burn-link.service";

@Controller("api")
@UsePipes(new ValidationPipe({ transform: true }))
export class BurnLinkController {
  private readonly logger = new Logger(BurnLinkController.name);

  constructor(private burnLinkService: BurnLinkService) {}

  @Post("burn-link")
  @ApiOperation({ description: "Create new burn link" })
  public async createBurnLink(
    @Body() { message, expirationMin }: CreateBurnLinkRequest,
  ): Promise<CreateBurnLinkResponse> {
    const id = await this.burnLinkService.create(message, expirationMin);
    this.logger.log(`Created burn-link ${id}`);
    return { id };
  }

  @Get("burn-link/:id")
  @ApiOperation({ description: "Get burn-link content" })
  public async getBurnLink(@Param("id", new ParseIntPipe()) id: number): Promise<GetBurnLinkResponse> {
    this.logger.log(`Getting burn-link ${id}`);
    const { message } = await this.burnLinkService.get(id);
    return { message };
  }

  @Delete("burn-link/:id")
  @ApiOperation({ description: "Delete burn-link" })
  public async delete(@Param("id", new ParseIntPipe()) id: number) {
    this.logger.log(`Deleting burn-link ${id}`);
    await this.burnLinkService.remove(id);
  }
}
