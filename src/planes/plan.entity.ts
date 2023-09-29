import { Hospital } from 'src/hospitales/hospital.entity';
import { Paciente } from 'src/pacientes/paciente.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToMany, JoinTable } from 'typeorm';

@Entity('planes')
export class Plan {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({default: 'Classic'})
  public type: string;

  @OneToOne(() => Paciente, paciente => paciente.plan)
  public paciente: Paciente;

  // @ManyToMany(() => Hospital)
  // @JoinTable()
  // hospitales: Hospital[]
}
