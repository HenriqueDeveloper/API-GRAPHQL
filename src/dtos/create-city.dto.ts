import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateCityDto {   
  @Field(() => String)
  CO_MUNICIPIO: string;
  @Field(() => String)
  NO_MUNICIPIO: string;
  @Field(() => String)
  CO_SIGLA_ESTADO: string;
  @Field(() => String)
  TP_CADASTRO: string;
  @Field(() => String)
  TP_PACTO: string;
  @Field(() => String)
  TP_ENVIA: number;
  @Field(() => String)
  TP_ENVIA_CNES: string;
  @Field(() => String)
  TP_CIB_SAS: string;
  @Field(() => String)
  TP_PLENO_ORIGEM: string;
  @Field(() => String)
  TP_MAC: string;
  @Field(() => String)
  NU_POPULACAO: string;
  @Field(() => String)
  NU_DENSIDADE: number;
  @Field(() => String)
  CMTP_INICIO_MAC: number;    
  @Field(() => Boolean)
  status: boolean;
  }
