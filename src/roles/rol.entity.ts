import { Login } from 'src/logins/login.entity';
import { Entity, PrimaryGeneratedColumn, OneToOne, Column } from 'typeorm';

@Entity('roles')
export class Rol {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public administrador: boolean;

  @Column()
  public usuario: boolean;

  @OneToOne(() => Login, (login) => login.roles)
  public logins: Login[];

  // Otros atributos y métodos de la entidad Rol
}
