import { Historia } from 'src/historias/historia.entity';
import { Medico } from 'src/medicos/medico.entity';
import { Plan } from 'src/planes/plan.entity';
import { Turno } from 'src/turnos/turno.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  ManyToMany,
  JoinTable
} from 'typeorm';

@Entity('pacientes')
export class Paciente {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public lastName: string;

  @Column({ type: 'date' })
  public birthdate: Date;

  @Column()
  public dni: number;

  // @ManyToMany(() => Medico)
  // @JoinTable()
  // medicos: Medico[]

  // @ManyToMany(() => Turno)
  // public turnos: Turno[]

  @OneToOne(() => Plan, plan => plan.paciente)
  public plan: Plan

  @OneToOne(() => Historia, historia => historia.paciente)
  public historia: Historia
}
