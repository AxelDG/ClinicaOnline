import { Hospital } from 'src/hospitales/hospital.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public adminName: string;

  @Column({nullable: false})
  public userId: number;

  @OneToOne(() => Hospital, (hospital) => hospital.admin)
  public hospital: Hospital;

  @ManyToOne(() => User, (usuario) => usuario.admins)
  @JoinColumn({name: 'userId'})
  public usuario: User;
}
