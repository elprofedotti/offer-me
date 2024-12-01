// src/offers/offers.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './offer.entity';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators';
@ApiTags('Offers')
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  
  @Post()
  async createOffer(
    @Body() createOfferDto: CreateOfferDto): Promise<Offer> {
    return this.offersService.createOffer(createOfferDto);
  }

  @Get('product/:productId')
  async getOffersByProduct(@Param('productId') productId: number): Promise<Offer[]> {
    return this.offersService.getOffersByProduct(productId);
  }

  @Get('by-user/:userId')
async getOffersByUser(@Param('userId') userId: string): Promise<Offer[]> {
  return this.offersService.getOffersByUser(userId);
}

@Get('received-by-user/:userId')
async getReceivedOffersByUser(@Param('userId') userId: string): Promise<Offer[]> {
  return this.offersService.getReceivedOffersByUser(userId);
}

  // Otros métodos necesarios
}