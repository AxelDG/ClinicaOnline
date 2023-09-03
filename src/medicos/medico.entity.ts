import { Hospital } from 'src/hospitales/hospital.entity';
import { Turno } from 'src/turnos/turno.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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
  public registrationNumber: string;

  @OneToMany(() => Turno, (turno) => turno.medicos)
  public turnos: Turno[];

  @OneToMany(() => Hospital, (hospital) => hospital.medicos)
  public hospitales: Hospital[];
}
