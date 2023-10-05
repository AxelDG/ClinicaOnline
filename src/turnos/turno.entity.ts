import { ApiProperty } from '@nestjs/swagger';
import { Medico } from 'src/medicos/medico.entity';
import { Paciente } from 'src/pacientes/paciente.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';

@Entity('turnos')
export class Turno {
  @PrimaryGeneratedColumn()

  @ApiProperty({
    type: Number,
    description: 'This is a required property'
  })
  public id: number;

  @ApiProperty({
    type: Number,
    description: 'This is a required property'
  })
  @Column({nullable: false})
  public patientId: number;

  @ApiProperty({
    type: Number,
    description: 'This is a required property'
  })
  @Column({nullable: false})
  public medicId: number;

  @ApiProperty({
    type: Date,
    description: 'This is a required property'
  })
  @Column({ type: 'date' })
  public date: Date;

  @ManyToOne(() => Medico, medico => medico.turnos, {eager: true})
  @JoinColumn({name: 'medicId'})
  public medico: Medico

  @ManyToOne(() => Paciente, paciente => paciente.turnos, {eager: true})
  @JoinColumn({name: 'patientId'})
  public paciente: Paciente;

}
