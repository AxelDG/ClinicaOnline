import { ApiProperty } from '@nestjs/swagger';
import { Hospital } from 'src/hospitales/hospital.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
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

  @OneToOne(() => Hospital, (hospital) => hospital.admin)
  public hospital: Hospital;

  @ManyToOne(() => User, (usuario) => usuario.admins)
  @JoinColumn({name: 'userId'})
  public usuario: User;
}
