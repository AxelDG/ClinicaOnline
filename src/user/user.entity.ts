import {
    BeforeInsert,
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import * as bcrypt from 'bcrypt';
import { Role } from 'src/common/enums/rol.enum';
  
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

    @Column({ type: 'enum', default: Role.user, enum: Role})
    role: Role
  
    @BeforeInsert()
    async hashPassword() {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
  