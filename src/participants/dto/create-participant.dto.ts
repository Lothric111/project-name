import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateParticipantDto {
    @IsNotEmpty()
    @IsString()
    full_name: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsOptional()
    @IsString()
    image_path?: string;
}
