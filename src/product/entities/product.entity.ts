import BaseModel from "src/entities/baseModel.entity";
import { Review } from "src/reviews/entities/reviews.entity";
import { Entity, Column, OneToMany, ManyToOne, BeforeInsert } from "typeorm";
import { Brand } from "./brand.entity";
import { SubCategory } from "./subCategory.entity";
import { Category } from "src/product/entities/category.entity";

@Entity()
export class Product extends BaseModel {
  @Column({ nullable: false, default: true })
  new: boolean;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  slug: string;

  @Column({ nullable: false, type: "text" })
  description: string;

  @Column({ nullable: true, type: "text" })
  features: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false, default: true })
  inStock: boolean;

  @Column({ nullable: true })
  quantityInStock: number;

  @Column({ nullable: false })
  coverImage: string;

  @Column({ nullable: false, type: "json" })
  imageGallery: JSON;

  @Column({ nullable: false, type: "json" })
  metaData: JSON;

  @Column({ nullable: false, default: 0 })
  averageRating: number;

  @Column({ nullable: false, default: 0 })
  noOfRatings: number;

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @ManyToOne(() => Brand, { nullable: false, eager: true })
  brand: Brand;

  @ManyToOne(() => Category, { nullable: false, eager: true })
  category: Category;

  @ManyToOne(() => SubCategory, { nullable: false, eager: true })
  subCategory: SubCategory;

  @BeforeInsert()
  async createProductSlug() {
    this.slug = this.name.toLowerCase().split(" ").join("-");
  }
}
