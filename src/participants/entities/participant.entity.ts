import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Participant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    full_name: string;

    @Column()
    phone: string;

    @Column()
    address: string;

    @Column()
    image_path: string;

    @Column({default:true})
    is_accepted: boolean;

    @Column({default:false})
    winner: boolean;
}