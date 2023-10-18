import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, OneToMany, AfterInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/common/enums/rol.enum';
import { Admin } from 'src/admins/admin.entity';
import { Paciente } from 'src/pacientes/paciente.entity';
import { Medico } from 'src/medicos/medico.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {

  @ApiProperty({
    type: Number,
    description: 'This is a required property'
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
    description: 'This is a required property'
  })
  @Column({nullable: false })
  name: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property'
  })
  @Column({ nullable: false, unique: true })
  email: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property'
  })
  @Column({ nullable: false})
  password: string;

  @ApiProperty({
    type: Role,
    description: 'This is a required property'
  })
  @Column({ type: 'enum', enum: Role })
  role: Role;

  @BeforeInsert()
  @BeforeUpdate()
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
