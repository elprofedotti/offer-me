// src/offers/offers.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './offer.entity';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  async createOffer(@Body() createOfferDto: CreateOfferDto): Promise<Offer> {
    return this.offersService.createOffer(createOfferDto);
  }

  @Get('product/:productId')
  async getOffersByProduct(@Param('productId') productId: number): Promise<Offer[]> {
    return this.offersService.getOffersByProduct(productId);
  }

  // Otros métodos necesarios
}