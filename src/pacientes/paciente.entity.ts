import { ApiProperty } from '@nestjs/swagger';
import { Historia } from 'src/historias/historia.entity';
import { Medico } from 'src/medicos/medico.entity';
import { Plan } from 'src/planes/plan.entity';
import { Turno } from 'src/turnos/turno.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pacientes')
export class Paciente{

  @ApiProperty({
    type: Number,
    description: 'This is a required property'
  })
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty({
    type: String,
    description: 'This is a required property'
  })
  @Column()
  public patientName: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property'
  })
  @Column()
  public patientLastname: string;

  @ApiProperty({
    type: Date,
    description: 'This is a required property'
  })
  @Column({ type: 'date' })
  public birthdate: Date;

  @ApiProperty({
    type: Number,
    description: 'This is a required property'
  })
  @Column({unique: true, nullable: false})
  public dni: number;

  @ApiProperty({
    type: Number,
    description: 'This is a required property'
  })
  @Column({nullable: false})
  public userId: number;

  @ApiProperty({
    type: Number,
    description: 'This is a required property'
  })
  @Column({nullable: false})
  public planId: number;

  @ManyToMany(() => Medico, medico => medico.pacientes)
  @JoinTable()
  medicos: Medico[]

  @OneToOne(() => Plan, plan => plan.paciente)
  @JoinColumn({name: 'planId'})
  public plan: Plan

  @OneToOne(() => Historia, historia => historia.paciente, {eager: true})
  public historia: Historia

  @ManyToOne(() => User, usuario => usuario.pacientes)
  @JoinColumn({name: 'userId'})
  public usuario: User

  @OneToMany(() => Turno, turno => turno.paciente)
  public turnos: Turno[]
}
