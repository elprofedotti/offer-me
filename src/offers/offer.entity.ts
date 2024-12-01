// src/offers/offer.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { User } from "../auth/entities/user.entity";
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Offer {
    @ApiProperty() 
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('decimal')
  amount: number;

  @ApiProperty()
  @Column('text')
  message: string;

  @ApiProperty()
  @ManyToOne(
    () => Product,
    ( product ) => product.offers,
    { eager: true }
)
product: Product;



    @ApiProperty()
    @ManyToOne(
        () => User,
        ( user ) => user.offers,
        { eager: true }
    )
    user: User

  @ApiProperty()
  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}