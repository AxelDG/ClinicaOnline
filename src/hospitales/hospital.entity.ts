import { Admin } from 'src/admins/admin.entity';
import { Medico } from 'src/medicos/medico.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity('hospitales')
export class Hospital {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public hospitalName: string;

  @Column()
  public hospitalAdress: string;

  @OneToMany(() => Medico, medico => medico.hospital)
  public medicos: Medico[]

  @OneToOne(() => Admin, admin => admin.hospital)
  public admin: Admin
  
}
