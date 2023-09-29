import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/common/enums/rol.enum';
import { Admin } from 'src/admins/admin.entity';
import { Paciente } from 'src/pacientes/paciente.entity';
import { Medico } from 'src/medicos/medico.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: 'enum', default: Role.user, enum: Role })
  role: Role;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @OneToMany(() => Admin, admin => admin.usuario)
  public admins: Admin[];

  @OneToMany(() => Paciente, paciente => paciente.usuario)
  public pacientes: Paciente[];

  @OneToMany(() => Medico, medico => medico.usuario)
  public medicos: Medico[];
}
