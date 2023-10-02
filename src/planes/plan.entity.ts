import { Hospital } from 'src/hospitales/hospital.entity';
import { Paciente } from 'src/pacientes/paciente.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToMany, JoinColumn } from 'typeorm';

@Entity('planes')
export class Plan {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({default: 'Classic'})
  public type: string;

  @Column({nullable: false})
  public price: number;

  @Column({nullable: false})
  public hospitalId: number;

  @OneToOne(() => Paciente, paciente => paciente.plan)
  public paciente: Paciente;

  @ManyToMany(() => Hospital, hospital => hospital.planes)
  @JoinColumn({name: 'hospitalId'})
  public hospitales: Hospital[]
}
