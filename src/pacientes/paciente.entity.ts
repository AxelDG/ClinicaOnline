import { Historia } from 'src/historias/historia.entity';
import { Plan } from 'src/planes/plan.entity';
import { Turno } from 'src/turnos/turno.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne
} from 'typeorm';

@Entity('pacientes')
export class Paciente {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public lastname: string;

  @Column({ type: 'date' })
  public birthdate: Date;

  @Column()
  public dni: number;

  @OneToMany(() => Turno, turno => turno.paciente)
  public turnos: Turno[]

  @OneToOne(() => Plan, plan => plan.paciente)
  public plan: Plan

  @OneToMany(() => Historia, historia => historia.paciente)
  public historia: Historia[]
}
