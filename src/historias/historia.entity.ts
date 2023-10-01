import { Admin } from 'src/admins/admin.entity';
import { Medico } from 'src/medicos/medico.entity';
import { Paciente } from 'src/pacientes/paciente.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';

@Entity('historias')
export class Historia {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'date' })
  public date: Date;

  @Column()
  public symptoms: string;

  @Column()
  public treatment: string;

  @Column({nullable: false})
  public patientId: number;

  @OneToOne(() => Paciente, paciente => paciente.historia)
  @JoinColumn({name: 'patientId'})
  public paciente: Paciente

  @ManyToMany(() => Medico, medico => medico.historias)
  @JoinTable()
  public medicos: Medico[]
}
