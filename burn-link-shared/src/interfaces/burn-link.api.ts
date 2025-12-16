import { Type } from "class-transformer";
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

export class CreateBurnLinkRequest {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  expirationMin?: number | null;
}

export class CreateBurnLinkResponse {
  id: number;
}

export class GetBurnLinkResponse {
  message: string;
}
