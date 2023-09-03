import { Medico } from 'src/medicos/medico.entity';
import { Paciente } from 'src/pacientes/paciente.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('turnos')
export class Turno {
  @PrimaryGeneratedColumn()
  public id: number;

  //@Column({ type: 'timestamptz' })
  //public schedule: Date;

  @Column({ type: 'date' })
  public date: Date;

  @OneToMany(() => Paciente, (paciente) => paciente.turnos)
  public pacientes: Paciente[];

  @OneToMany(() => Medico, (medico) => medico.turnos)
  public medicos: Medico[];
}
