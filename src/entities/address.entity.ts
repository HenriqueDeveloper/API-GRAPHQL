import { Field, ID, ObjectType } from "@nestjs/graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity('address')
export class Address extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;
    
    @Field(() => String)
    @Column({ name: 'cep', nullable: false, type: 'varchar' })
    CEP: string;
  
    @Field(() => String)
    @Column({ name: 'type_street', nullable: false, type: 'varchar' })
    typeStreet: string;
  
    @Field(() => String)
    @Column({ nullable: false, type: 'varchar' })
    street: string;
  
    @Field(() => Number)
    @Column({ nullable: false, type: 'integer' })
    number: number;
  
    @Field(() => String)
    @Column({ nullable: true, type: 'varchar' })
    complement: string;
  
    @Field(() => String)
    @Column({ nullable: false, type: 'varchar' })
    neighborhood: string;
  
    @Field(() => String)
    @Column({ nullable: false, type: 'varchar' })
    city: string;
  
    @Field(() => String)
    @Column({ nullable: false, type: 'varchar' })
    state: string;
  
    @Field(() => Boolean)
    @Column({ name: 'street_situation', nullable: false, type: 'boolean' })
    streetSituation: boolean;
}
