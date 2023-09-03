import { Paciente } from 'src/pacientes/paciente.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('planes')
export class Plan {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public classic: string;

  @Column()
  public family: string;

  @ManyToOne(() => Paciente, paciente => paciente.planes)
  public pacientes: Paciente[];
}
