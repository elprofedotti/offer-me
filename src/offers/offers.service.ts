// src/offers/offers.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Offer } from './offer.entity';
import { CreateOfferDto } from './dto/create-offer.dto';


@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offersRepository: Repository<Offer>,

    private readonly dataSource: DataSource,
  ) {}

  async createOffer(createOfferDto: CreateOfferDto){
    const {productId, userId, ...rest} = createOfferDto;

    const offer = this.offersRepository.create({...rest, product: {id: productId}, user: {id: userId}});
    return this.offersRepository.save(offer);
  }

  async getOffersByProduct(productId: number): Promise<Offer[]> {
    
    return this.offersRepository.find({ where: { product: { id: productId.toString() } } });
  }

  async getOffersByUser(userId: string): Promise<Offer[]> {
    return this.offersRepository.find({ where: { user: { id: userId } } });
  }

  async getReceivedOffersByUser(userId: string): Promise<Offer[]> {
    return this.offersRepository.find({
      where: { product: { user: { id: userId } } }, // Relación producto -> usuario
      relations: ['product'],
    });
  }

  // Otros métodos necesarios
}