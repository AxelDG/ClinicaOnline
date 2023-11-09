import { ApiProperty } from '@nestjs/swagger';
import { Medico } from 'src/medicos/medico.entity';
import { DateTime } from 'luxon';
import { Paciente } from 'src/pacientes/paciente.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BeforeInsert} from 'typeorm';

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

  @ApiProperty({ type: Date, description: 'Date of the shift' })
  @Column() 
  public startDate: Date;

  @ApiProperty({ type: Date, description: 'End time of the shift' })
  @Column()
  public endDate: Date;

  @ManyToOne(() => Medico, medico => medico.turnos, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'medicId'})
  public medico: Medico

  @ManyToOne(() => Paciente, paciente => paciente.turnos, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'patientId'})
  public paciente: Paciente;

}
