import { Hospital } from 'src/hospitales/hospital.entity';
import { Rol } from 'src/roles/rol.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
} from 'typeorm';

@Entity('logins')
export class Login {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public lastname: string;

  @Column()
  public dni: string;

  @Column({ type: 'date' })
  public birthdate: Date;

  @Column()
  public street: string;

  @Column()
  public phone: string;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @Column()
  public type: string;

  @ManyToOne(() => Hospital, (hospital) => hospital.logins)
  public hospitales: Hospital[];

  @OneToOne(() => Rol, (rol) => rol.logins)
  public roles: Rol;

  // Otros atributos y métodos de la entidad Usuario
}
