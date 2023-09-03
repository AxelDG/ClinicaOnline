import { Historia } from 'src/historias/historia.entity';
import { Plan } from 'src/planes/plan.entity';
import { Turno } from 'src/turnos/turno.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  OneToMany,
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

  @OneToOne(() => Historia, (historia) => historia.pacientes)
  public historias: Historia[];

  @ManyToOne(() => Plan, (plan) => plan.pacientes)
  public planes: Plan[];

  @OneToMany(() => Turno, (turno) => turno.pacientes)
  public turnos: Turno[];
}
