import { ApiProperty } from '@nestjs/swagger';
import { Admin } from 'src/admins/admin.entity';
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('articles')
export class Article {

  @ApiProperty({
    type: Number,
    description: 'ID of Article'
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
    description: 'Title of Article'
  })
  @Column({ nullable: false })
  title: string;

  @ApiProperty({
    type: String,
    description: 'Content of Article'
  })
  @Column({ nullable: false })
  content: string;

  @ApiProperty({
    type: String,
    description: 'Url of the image'
  })
  @Column({nullable: true})
  imageUrl: string;

  @ApiProperty({
    type: Date,
    description: 'Creation date of Article'
  })
  @CreateDateColumn()
  creationDate: Date;

  @ManyToMany(() => Admin, admin => admin.articles)
  public admins: Admin[]
}
