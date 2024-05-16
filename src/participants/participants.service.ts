import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { Participant } from './entities/participant.entity'; // Assuming your entity file is named participant.entity.ts
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Winner } from 'src/winners/entities/winner.entity';


@Injectable()
export class ParticipantsService {
  constructor(
    @InjectRepository(Participant)
    private participantsRepository: Repository<Participant>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private usersService: UsersService,
    @InjectRepository(Winner)
    private winnersRepository: Repository<Winner>,
  ) {}

  async create(createParticipantDto: CreateParticipantDto, file: Express.Multer.File): Promise<Participant> {
    
    const fileName = file.filename;    
    
    const newParticipant = this.participantsRepository.create({
      ...createParticipantDto,
      image_path: fileName
    });
    
    await this.participantsRepository.save(newParticipant);

    return newParticipant
  }

  async findAll(): Promise<Participant[]> {
    const participants = await this.participantsRepository.find();

    const formattedImages = participants.map((participant) => ({
      ...participant,
      image_path: `http://localhost:3001/${participant.image_path}`
    }))

    return formattedImages;
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

  async drawWinners(token: string, numberOfWinners: number): Promise<Participant[]> {
    const decodedToken = this.usersService.decodeJWT(token)

    const user = await this.usersRepository.findOne({ where: { email: decodedToken.email } });

    if (!user.is_enable) throw new UnauthorizedException("Not authorized")
      

    const eligibleParticipants = await this.participantsRepository.find({
      where: { is_accepted: true },
    });
    
    const shuffled = eligibleParticipants.sort(() => 0.5 - Math.random());
    const selectedWinners = shuffled.slice(0, numberOfWinners);

    selectedWinners.map(async (participant) => {
        const winner = new Winner()

        winner.address = participant.address
        winner.full_name = participant.full_name
        winner.image_path = participant.image_path
        winner.phone = participant.phone

        await this.winnersRepository.save(winner)

        await this.participantsRepository.remove(participant)
    });

    return this.participantsRepository.find()

  }
}
