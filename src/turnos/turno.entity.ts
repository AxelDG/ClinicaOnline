import { Medico } from 'src/medicos/medico.entity';
import { Paciente } from 'src/pacientes/paciente.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('turnos')
export class Turno {
  @PrimaryGeneratedColumn()
  public id: number;

  //@Column({ type: 'timestamptz' })
  //public schedule: Date;

  @Column({ type: 'date' })
  public date: Date;

  @ManyToOne(() => Medico, medico => medico.turnos)
  public medico: Medico

  @ManyToOne(() => Paciente, paciente => paciente.turnos)
  public paciente: Paciente

}
