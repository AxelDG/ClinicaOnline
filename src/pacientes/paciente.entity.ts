import { Historia } from 'src/historias/historia.entity';
import { Medico } from 'src/medicos/medico.entity';
import { Plan } from 'src/planes/plan.entity';
import { Turno } from 'src/turnos/turno.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pacientes')
export class Paciente{
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public patientName: string;

  @Column()
  public patientLastname: string;

  @Column({ type: 'date' })
  public birthdate: Date;

  @Column({unique: true})
  public dni: number;

  @Column({nullable: false})
  public userId: number;

  @Column({nullable: false})
  public planId: number;

  @ManyToMany(() => Medico, medico => medico.pacientes)
  @JoinTable()
  medicos: Medico[]

  @OneToOne(() => Plan, plan => plan.paciente, {eager: true})
  @JoinColumn({name: 'planId'})
  public plan: Plan

  @OneToOne(() => Historia, historia => historia.paciente)
  public historia: Historia

  @ManyToOne(() => User, usuario => usuario.pacientes)
  @JoinColumn({name: 'userId'})
  public usuario: User

  @OneToMany(() => Turno, turno => turno.paciente)
  public turnos: Turno[]
}
