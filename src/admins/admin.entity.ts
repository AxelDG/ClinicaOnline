import { Historia } from 'src/historias/historia.entity';
import { Hospital } from 'src/hospitales/hospital.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public adminName: string;

  @OneToMany(() => Historia, (historia) => historia.admins)
  public historias: Historia[];

  @OneToOne(() => Hospital, (hospital) => hospital.admins)
  public hospitales: Hospital[];
}
