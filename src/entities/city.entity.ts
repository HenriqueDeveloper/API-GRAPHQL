import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity, Column,
  CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { User } from './user.entity';

@Entity()
@ObjectType()
export class City extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  @Field(() => String)
  co_municipio: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  @Field(() => String)
  no_municipio: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  @Field(() => String)
  co_sigla_estado: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  @Field(() => String)
  tp_cadastro: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  @Field(() => String)
  tp_pacto: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  @Field(() => Number)
  tp_envia: number;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  @Field(() => String)
  tp_envia_cnes: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  @Field(() => String)
  tp_cib_sas: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  @Field(() => String)
  tp_pleno_origem: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  @Field(() => String)
  tp_mac: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  @Field(() => String)
  nu_populacao: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  @Field(() => String)
  nu_densidade: number;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  @Field(() => Number)
  cmtp_inicio_mac: number;

  @Column()
  @Field(() => Boolean)
  status: boolean;

  @OneToMany(() => User, (user) => user.city)
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

}
