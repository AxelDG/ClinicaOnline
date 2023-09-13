import { Paciente } from 'src/pacientes/paciente.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity('planes')
export class Plan {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public classic: string;

  @Column()
  public family: string;

  @OneToOne(() => Paciente, paciente => paciente.plan)
  public paciente: Paciente
}
