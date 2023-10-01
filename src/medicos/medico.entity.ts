import { Historia } from 'src/historias/historia.entity';
import { Hospital } from 'src/hospitales/hospital.entity';
import { Paciente } from 'src/pacientes/paciente.entity';
import { Turno } from 'src/turnos/turno.entity';
import { User } from 'src/user/user.entity';
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

  @Column({unique: true})
  public registrationNumber: number;

  @Column({nullable: false})
  public hospitalId: number;

  @Column({nullable: false})
  public userId: number;

  @ManyToMany(() => Paciente, paciente => paciente.medicos)
  public pacientes: Paciente[]

  @ManyToMany(() => Historia, historia => historia.medicos)
  public historias: Historia[]

  @ManyToOne(() => Hospital, hospital => hospital.medicos, {nullable: false})
  @JoinColumn({name: "hospitalId"})
  public hospital: Hospital

  @OneToMany(() => Turno, turno => turno.medico)
  public turnos: Turno[]

  @ManyToOne(() => User, usuario => usuario.medicos)
  @JoinColumn({name: 'userId'})
  public usuario: User
  
}
