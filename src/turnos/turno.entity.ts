import { Medico } from 'src/medicos/medico.entity';
import { Paciente } from 'src/pacientes/paciente.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';

@Entity('turnos')
export class Turno {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public lastName: string;

  //COMO PODRIAMOS USAR DATETIME EN TYPEORM?
  // POR AHORA USAMOS DIA PERO HAY QUE PONER HORA TMB

  @Column()
  public date: Date;

  @ManyToOne(() => Medico, medico => medico.turnos)
  public medico: Medico

  // @ManyToMany(() => Paciente)
  // public turnos: Paciente[]

}
