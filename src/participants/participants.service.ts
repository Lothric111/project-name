import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { Participant } from './entities/participant.entity'; // Assuming your entity file is named participant.entity.ts

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectRepository(Participant)
    private participantsRepository: Repository<Participant>,
  ) {}

  async create(createParticipantDto: CreateParticipantDto): Promise<Participant> {
    const newParticipant = this.participantsRepository.create(createParticipantDto);
    return await this.participantsRepository.save(newParticipant);
  }

  async findAll(): Promise<Participant[]> {
    return await this.participantsRepository.find();
  }

  async findOne(id: number): Promise<Participant> {
    return await this.participantsRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto): Promise<Participant> {
    const participantToUpdate = await this.participantsRepository.findOne({ where: { id: id } });
    if (!participantToUpdate) {
      // Handle not found error
      return null;
    }
    const updatedParticipant = Object.assign(participantToUpdate, updateParticipantDto);
    return await this.participantsRepository.save(updatedParticipant);
  }

  async remove(id: number): Promise<boolean> {
    const deleteResult = await this.participantsRepository.delete(id);
    return deleteResult.affected > 0;
  }
}
