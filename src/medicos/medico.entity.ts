import { Historia } from 'src/historias/historia.entity';
import { Hospital } from 'src/hospitales/hospital.entity';
import { Paciente } from 'src/pacientes/paciente.entity';
import { Turno } from 'src/turnos/turno.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, JoinTable, ManyToOne, OneToMany, ManyToMany } from 'typeorm';

@Entity('medicos')
export class Medico {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public medicName: string;

  @Column()
  public medicLastname: string;

  @Column()
  public specialty: string;

  @Column()
  public registrationNumber: number;

  @Column()
  public hospitalId: number;

  // @ManyToMany(() => Paciente)
  // @JoinTable()
  // pacientes: Paciente[]

  // ManyToMany(() => Historia, historia => historias.medicos)
  // public historias: Historia[]

  @ManyToOne(() => Hospital, hospital => hospital.medicos)
  @JoinColumn({name: "hospitalId"})
  hospital: Hospital

  @OneToMany(() => Turno, turno => turno.medico)
  public turnos: Turno[]
  
}
