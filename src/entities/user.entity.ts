import {
    BaseEntity,
    Entity,
    Unique,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { City } from './city.entity';

@Entity()
@ObjectType()
@Unique(["email"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ nullable: false, type: "varchar", length: 200 })
  @Field(() => String)
  email: string;

  @Column({ nullable: false, type: "varchar", length: 11 })
  @Field(() => String)
  cpf: string;

  @Column({ nullable: false, type: "varchar", length: 200 })
  @Field(() => String)
  name: string;

  @Column({ nullable: false, type: "varchar", length: 20 })
  role: string;

  @Column({ nullable: false, default: true })
  @Field(() => Boolean)
  status: boolean;

  @ManyToOne(() => City, (city) => city.user)
  @JoinColumn({ name: "city_id" })
  city: City;

  @Column({ nullable: false })
  @Field(() => String)
  password: string;

  @Column({ nullable: false })
  salt: string;    

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}

