import { Admin } from 'src/admins/admin.entity';
import { Medico } from 'src/medicos/medico.entity';
import { Paciente } from 'src/pacientes/paciente.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne
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

  @OneToOne(() => Paciente, paciente => paciente.historia)
  public paciente: Paciente

  // ManyToMany(() => Medico, medico => medicos.historias)
  // @JoinTable()
  // public medicos: Medico[]
}
