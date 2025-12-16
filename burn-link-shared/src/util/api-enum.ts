import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

// Decorator factory for enums (that supports adding the IsOptional decorator conditionally)
// This helper allows us to have a single instance of an enum in the resulting openapi.yaml
// instead of each Dto having its own version. This is achieved by using @ApiProperty({ enumName })

type ApiEnumParams = {
  optional?: boolean
} | undefined;

export function ApiEnum(enumType: object, enumName: string): (params?: ApiEnumParams) => PropertyDecorator {
  return (params?: ApiEnumParams) =>
    applyDecorators(
      ...(params?.optional ? [IsOptional()] : []),
      IsEnum(enumType),
      ApiProperty({ enum: enumType, enumName }),
    );
}
