import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class HiringProcess {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'timestamptz' })
    startDate: Date;

    @Column({ type: 'timestamptz' })
    endDate: Date;

    @Column()
    description: string;
}
