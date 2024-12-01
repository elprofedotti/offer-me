import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-image.entity";
import { User } from "src/auth/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Offer } from "src/offers/offer.entity";

@Entity({name: 'products'})
export class Product {

    @ApiProperty({
        example: '0f48ec90-7ba7-4ae3-b55f-c9e131b81573',
        description: 'This is the id of the product',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'T-Shirt Teslo',
        description: 'Product Title',
        uniqueItems: true
    })
    @Column('text',{
        unique: true,
    })
    title: string;


    @ApiProperty({
        example: 0,
        description: 'Product price/precio',

    })
    @Column('float',{
        default: 0
    })
    price: number;

    @ApiProperty({
        example: 'Cillum tempor incididunt nisi proident esse consequat elit ea aliquip pariatur qui.',
        description: 'Magna magna adipisicing dolor nulla in ex velit irure nulla adipisicing quis est. Quis labore elit ad adipisicing. Mollit exercitation anim cupidatat enim exercitation laboris sit voluptate ad anim consequat sunt aliqua cupidatat.',
        default:null,
    })
    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @ApiProperty({
        example:'t_shirt_teslo',
        description:'Product SLUG - for SEO'
    })
    @Column('text',{
        unique: true,
    })
    slug: string;

    @ApiProperty({
        example: 10,
        description: 'Product stock',
        default:0,
    })    @Column('int',{
        default: 0,
    })
    stock: number;

    @ApiProperty({
        example: ['M','L','XL'],
        description: 'Product sizes',
        
    })
    @Column('text',{
        array: true,
    })      
    sizes: string[];

    @ApiProperty({
        example: 'men',
        description: 'Product gender',
        
    })
    @Column('text')
    gender: string;

    @ApiProperty()
    @Column('text', {
        array: true,
        default: []
    })
    tags: string[];

    

    @ApiProperty()
    // images
    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        { cascade: true, eager: true }
    )
    images?: ProductImage[];

    @ManyToOne(
        () => User,
        ( user ) => user.product,
        { eager: true }
    )
    user: User
    

    @OneToMany(() => Offer, (offer) => offer.product, { cascade: true })
    offers: Offer[];

    @BeforeInsert()
    checkSlugInsert() {

        if ( !this.slug ) {
            this.slug = this.title;
        }

        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ','_')
            .replaceAll("'",'')

    }

    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ','_')
            .replaceAll("'",'')
    }

}
