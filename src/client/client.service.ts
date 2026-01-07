import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Not } from 'typeorm/browser';

@Injectable()
export class ClientService {

  constructor(

    @InjectRepository(Client)
    private readonly clientRepository : Repository<Client>,

  ){}

   async create(createClientDto: CreateClientDto) {

    try {
      const client = this.clientRepository.create(createClientDto)
      await this.clientRepository.save(client);
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('error')
    }

  }

  findAll() {
    return this.clientRepository.find({});
  }

   async findOne(id: string) {
    const client = await this.clientRepository.findOneBy({id});
    if(!client)
      throw new NotFoundException(`client with id ${ id} not found `)
    return client

  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  async remove(id: string) {
    const client = await this.findOne(id);
    await this.clientRepository.remove(client);

  }
}
