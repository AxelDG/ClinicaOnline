import { ApiProperty } from '@nestjs/swagger';
import { Medico } from 'src/medicos/medico.entity';
import { Paciente } from 'src/pacientes/paciente.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

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

  @ManyToOne(() => Medico, medico => medico.turnos)
  public medico: Medico

  @ManyToOne(() => Paciente, paciente => paciente.turnos)
  public paciente: Paciente;

}
