// src/offers/dto/create-offer.dto.ts
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateOfferDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}