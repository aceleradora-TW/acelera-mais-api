import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne
} from 'typeorm'
import { IsDate } from 'class-validator'
import { HiringProcess } from './HiringProcess'
<<<<<<< HEAD
import { Exercise } from './Exercise';
import { isDate } from 'util/types';
=======
import { Challenge } from './Challenge';
>>>>>>> 0cf2c1498f13ddc1c5f427b08588383e9bda34e4

@Entity()
export class Candidate {
  @PrimaryGeneratedColumn()
  id: number;


  @JoinColumn({ name: 'hiring_process_id' })
  @ManyToOne(() => HiringProcess, hiringProcess => hiringProcess.candidates, { onDelete: 'CASCADE' })
  hiringProcess: HiringProcess

  @OneToOne(() => Challenge, challenge => challenge.candidate, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'challenge_id' })
  challenge: Challenge;

  @Column({ name: 'email', type: 'varchar' })
  email: string;

  @Column({ name: 'time_stamp', type: 'timestamptz' })
  @IsDate()
  timeStamp: Date;

  @Column({ name: 'address_email', type: 'varchar' })
  addressEmail: string;

  @Column({ name: 'name', type: 'varchar', nullable: true })
  name: string;

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

  @Column({ name: 'city', type: 'varchar' })
  city: string;

  @Column({ name: 'sexual_orientation', type: 'varchar' })
  sexualOrientation: string;

  @Column({ name: 'photo', type: 'varchar' })
  photo: string;

  @Column({ name: 'dev_profile', type: 'varchar' })
  devProfile: string;

  @Column({ name: 'equipment', type: 'varchar' })
  equipment: string;


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
