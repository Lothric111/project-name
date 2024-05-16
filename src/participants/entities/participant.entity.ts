import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

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

    @Column({ name: "image_path", nullable: true })
    image_path: string;

    @CreateDateColumn()
    created_time:Date;

    @Column({ default: true })
    is_accepted: boolean;
}