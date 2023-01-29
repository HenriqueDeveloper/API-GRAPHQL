import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCityDto } from 'src/dtos/create-city.dto'; 
import { City } from 'src/entities/city.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CityService {

  constructor(
      @InjectRepository(City)
      private cityRepo: Repository<City>
  ){}
  
  async createCity(createCityDto: CreateCityDto) {
    const { 
      CO_MUNICIPIO,
      NO_MUNICIPIO,
      CO_SIGLA_ESTADO,
      TP_CADASTRO,
      TP_PACTO,
      TP_ENVIA,
      TP_ENVIA_CNES,
      TP_CIB_SAS,
      TP_PLENO_ORIGEM,
      TP_MAC,
      NU_POPULACAO,
      NU_DENSIDADE,
      CMTP_INICIO_MAC,    
      status
    } = createCityDto;

    const city = new City();

    city.co_municipio = CO_MUNICIPIO;
    city.no_municipio = NO_MUNICIPIO;
    city.co_sigla_estado = CO_SIGLA_ESTADO;
    city.tp_cadastro = TP_CADASTRO;
    city.tp_pacto = TP_PACTO;
    city.tp_envia = TP_ENVIA;
    city.tp_envia_cnes = TP_ENVIA_CNES;
    city.tp_cib_sas = TP_CIB_SAS;
    city.tp_pleno_origem = TP_PLENO_ORIGEM;
    city.tp_mac = TP_MAC;
    city.nu_populacao = NU_POPULACAO;
    city.nu_densidade = NU_DENSIDADE;
    city.cmtp_inicio_mac = CMTP_INICIO_MAC;
    city.status = status

    await this.cityRepo.save(city)

    return city
  }

  public async getCities(): Promise<City[]> {
    return await this.cityRepo.find();
  }

  public async getCity(id: string): Promise<City> {
    const ExistCity = await this.cityRepo.findOneBy({id: id});
    if (!ExistCity) {
      throw new NotFoundException('City not found');
    }
    return ExistCity;
  }
}
