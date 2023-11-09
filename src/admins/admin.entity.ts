import { ApiProperty } from '@nestjs/swagger';
import { Article } from 'src/articles/article.entity';
import { Hospital } from 'src/hospitales/hospital.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('admins')
export class Admin {

  @ApiProperty({
    type: Number,
    description: 'This is a required property'
  })
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty({
    type: String,
    description: 'This is a required property'
  })
  @Column()
  public adminName: string;

  @ApiProperty({
    type: Number,
    description: 'This is a required property'
  })
  @Column({nullable: false})
  public userId: number;

  @ApiProperty({
    type: Number,
    description: 'This is a required property'
  })
  @Column({nullable: false})
  public hospitalId: number;  

  @OneToMany(() => Hospital, (hospital) => hospital.admins)
  @JoinColumn({name: 'hospitalId'})
  public hospital: Hospital;

  @ManyToOne(() => User, (usuario) => usuario.admins)
  @JoinColumn({name: 'userId'})
  public usuario: User;

  @ManyToMany(() => Article, article => article.admins, {onDelete: 'CASCADE'})
  @JoinTable()
  public articles: Article[]
}
