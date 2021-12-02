import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { IsDate } from 'class-validator'
import { HiringProcess } from './HiringProcess'

@Entity()
export class Candidate {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'hiring_process_id' })
  @ManyToOne(() => HiringProcess, hiringProcess => hiringProcess.candidates)
  hiringProcess: HiringProcess

  @Column({ name: 'time_stamp', type: 'timestamptz' })
  @IsDate()
  timeStamp: Date;

  @Column({ name: 'address_email', type: 'varchar' })
  addressEmail: string;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'email', type: 'varchar' })
  email: string;

  @Column({ name: 'phone', type: 'varchar' })
  phone: string;

  @Column({ name: 'birth_date', type: 'timestamptz' })
  birthDate: Date;

  @Column({ name: 'genre', type: 'varchar' })
  genre: string;

  @Column({ name: 'skin_color', type: 'varchar' })
  skinColor: string;

  @Column({ name: 'instituition_name', type: 'varchar' })
  instituitionName: string;

  @Column({ name: 'course_name', type: 'varchar' })
  courseName: string;

  @Column({ name: 'milestone', type: 'varchar' })
  milestone: string;

  @Column({ name: 'how_found', type: 'varchar' })
  howFound: string;

  @Column({ name: 'expectation', type: 'varchar' })
  expectation: string;

  @Column({ name: 'motivation', type: 'varchar' })
  motivation: string;

  @Column({ name: 'curriculum', type: 'varchar' })
  curriculum: string;

  @Column({ name: 'ok_CI', type: 'boolean' })
  okCI: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)'
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)'
  })
  updatedAt: Date;
}
