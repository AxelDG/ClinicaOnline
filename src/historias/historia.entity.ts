import { Admin } from 'src/admins/admin.entity';
import { Paciente } from 'src/pacientes/paciente.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity('historias')
export class Historia {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public patientName: string;

  @Column({ type: 'date' })
  public date: Date;

  @Column()
  public symptoms: string;

  @Column()
  public treatment: string;

  @OneToMany(() => Admin, (admin) => admin.historias)
  public admins: Admin[];

  @OneToOne(() => Paciente, (paciente) => paciente.historias)
  public pacientes: Paciente[];
}
