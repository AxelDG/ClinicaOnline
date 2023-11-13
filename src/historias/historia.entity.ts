import { ApiProperty } from '@nestjs/swagger';
import { Medico } from 'src/medicos/medico.entity';
import { Paciente } from 'src/pacientes/paciente.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';

@Entity('historias')
export class Historia {

  @ApiProperty({
    type: Number,
    description: 'This is a required property'
  })
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty({
    type: Date,
    description: 'This is a required property'
  })
  @Column({ type: 'date', nullable: true})
  public date: Date;

  @ApiProperty({
    type: String,
    description: 'This is a required property'
  })
  @Column({nullable: true})
  public symptoms: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property'
  })
  @Column({nullable: true})
  public treatment: string;

  @ApiProperty({
    type: Number,
    description: 'This is a required property'
  })
  @Column({nullable: false})
  public patientId: number;

  @OneToOne(() => Paciente, paciente => paciente.historia, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'patientId'})
  public paciente: Paciente

  @ManyToMany(() => Medico, medico => medico.historias)
  @JoinTable()
  public medicos: Medico[]
}
