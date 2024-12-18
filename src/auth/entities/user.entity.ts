import { ApiProperty } from "@nestjs/swagger";
import { Product } from "src/products/entities";
import { Offer } from "src/offers/offer.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {



    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    email: string;

    @Column('text', {
        select: false
    })
    password: string;

    @Column('text')
    fullName: string;

    @Column('bool', {
        default: true
    })
    isActive: boolean;

    @ApiProperty({
        example: ['buyer','seller','admin','super'],
        description: 'User roles',
        
    })
    @Column('text',{
        array: true,
        default: ['buyer']
    })      
    roles: string[];

    @OneToMany(
        () => Product,
        ( product ) => product.user
    )
    product: Product;
    
    @OneToMany(() => Offer, (offer) => offer.user)
    offers: Offer[];


    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();   
    }

}
