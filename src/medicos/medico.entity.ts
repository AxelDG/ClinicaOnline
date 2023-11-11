import { ApiProperty } from '@nestjs/swagger';
import { DateTime } from 'luxon';
import { Specialty } from 'src/common/enums/specialty.enum';
import { Historia } from 'src/historias/historia.entity';
import { Hospital } from 'src/hospitales/hospital.entity';
import { Paciente } from 'src/pacientes/paciente.entity';
import { Turno } from 'src/turnos/turno.entity';
import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany, ManyToMany } from 'typeorm';

@Entity('medicos')
export class Medico {
  @PrimaryGeneratedColumn()

  @ApiProperty({
    type: Number,
    description: 'This is a required property'
  })
  public id: number;

  @ApiProperty({
    type: String,
    description: 'This is a required property'
  })
  @Column()
  public medicName: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property'
  })
  @Column()
  public medicLastname: string;

  @ApiProperty({
    type: Specialty,
    description: 'This is a required property'
  })
  @Column({ type: 'enum', enum: Specialty })
  public specialty: Specialty;

  @ApiProperty({
    type: Number,
    description: 'This is a required property'
  })
  @Column({unique: true})
  public registrationNumber: number;

  @ApiProperty({
    type: DateTime,
    description: 'This is a required property'
  })
  @Column({ type: 'time', nullable: true })
  startTime: DateTime;

  @ApiProperty({
    type: DateTime,
    description: 'This is a required property'
  })
  @Column({ type: 'time', nullable: true })
  endTime: DateTime;

  @ApiProperty({
    type: Number,
    isArray: true,
    description: 'This is a required property'
  })
  @Column({ type: 'simple-array' })
  public workingDays: number[];

  @ApiProperty({
    type: Number,
    description: 'This is a required property'
  })
  @Column({nullable: false})
  public hospitalId: number;

  @ApiProperty({
    type: Number,
    description: 'This is a required property'
  })
  @Column({nullable: false})
  public userId: number;

  @ManyToMany(() => Paciente, paciente => paciente.medicos, {onDelete: 'CASCADE'})
  public pacientes: Paciente[]

  @ManyToMany(() => Historia, historia => historia.medicos)
  public historias: Historia[]

  @ManyToOne(() => Hospital, hospital => hospital.medicos)
  @JoinColumn({name: "hospitalId"})
  public hospital: Hospital

  @OneToMany(() => Turno, turno => turno.medico)
  public turnos: Turno[]

  @ManyToOne(() => User, usuario => usuario.medicos, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'userId'})
  public usuario: User
  
}
