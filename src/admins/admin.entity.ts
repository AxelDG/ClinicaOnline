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

 @OneToOne(() => Hospital, hospital => hospital.admin)
 public hospital: Hospital
}
