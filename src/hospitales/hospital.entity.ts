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

  @OneToOne(() => Admin, (admin) => admin.hospitales)
  public admins: Admin[];

  @OneToMany(() => Medico, (medico) => medico.hospitales)
  public medicos: Medico[];
}
