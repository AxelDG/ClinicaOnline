import { ApiProperty } from '@nestjs/swagger';
import { Hospital } from 'src/hospitales/hospital.entity';
import { Paciente } from 'src/pacientes/paciente.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToMany,
  JoinColumn,
} from 'typeorm';

@Entity('planes')
export class Plan {
  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @Column()
  public type: string;

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @Column({ nullable: false })
  public price: number;

  @ApiProperty({
    type: Number,
    description: 'This is a required property'
  })
  @Column({ nullable: false })
  public hospitalId: number;

  @OneToOne(() => Paciente, (paciente) => paciente.plan)
  public paciente: Paciente;

  @ManyToMany(() => Hospital, (hospital) => hospital.planes)
  @JoinColumn({ name: 'hospitalId' })
  public hospitales: Hospital[];
}
