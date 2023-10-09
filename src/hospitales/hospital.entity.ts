import { ApiProperty } from '@nestjs/swagger';
import { Admin } from 'src/admins/admin.entity';
import { Medico } from 'src/medicos/medico.entity';
import { Paciente } from 'src/pacientes/paciente.entity';
import { Plan } from 'src/planes/plan.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

@Entity('hospitales')
export class Hospital {

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
  public hospitalName: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property'
  })
  @Column()
  public hospitalAdress: string;

  @OneToMany(() => Medico, medico => medico.hospital)
  public medicos: Medico[]

  @ManyToOne(() => Admin, admins => admins.hospital)
  public admins: Admin[];

  @ManyToMany(() => Paciente, paciente => paciente.hospitales)
  @JoinTable()
  pacientes: Paciente[]

  @ManyToMany(() => Plan, plan => plan.hospitales)
  @JoinTable()
  planes: Plan[]
  
}
