import { IsDate } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Candidate } from "./Candidate";
import { Exercise } from "./Exercise";
import { HiringProcess } from "./HiringProcess";

@Entity()
export class Challenge {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'hiring_process_id' })
  @ManyToOne(() => HiringProcess, hiringProcess => hiringProcess.challenges, { onDelete: 'CASCADE' })
  hiringProcess: HiringProcess

  @OneToOne(() => Candidate, candidate => candidate.challenge, { eager: true })
  candidate: Candidate

  @OneToMany(() => Exercise, exercise => exercise.challenge, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'exercise_id' })
  exercises: Exercise[]

  @Column({ name: 'time_stamp', nullable: true, type: 'timestamptz' })
  @IsDate()
  timeStamp: Date;

  @Column({ name: 'address_email', nullable: false, type: 'varchar' })
  addressEmail: string;

  @Column({ name: 'name', nullable: true, type: 'varchar' })
  name: string;

  @Column({ name: 'phone', nullable: true, type: 'varchar' })
  phone: string;

  @Column({ name: 'challenge', nullable: true, type: 'varchar' })
  challenge: string;

  @Column({ name: 'file_type', nullable: true, type: 'varchar' })
  fileType: string;

  @Column({ name: 'file_zip', nullable: true, type: 'varchar' })
  zip: string;

  @Column({ name: 'file_github', nullable: true, type: 'varchar' })
  github: string;

  @Column({ name: 'have_computer', nullable: true, type: 'varchar' })
  haveComputer: string;

  @Column({ name: 'have_internet', nullable: true, type: 'varchar' })
  haveInternet: string;

  @Column({ name: 'have_webcam', nullable: true, type: 'varchar' })
  haveWebcam: string;

  @Column({ name: 'can_use_webcam', nullable: true, type: 'varchar' })
  canUseWebcam: string;

  @Column({ name: 'exercise_statement', nullable: true, type: 'varchar' })
  exerciseStatement: string;

  @Column({ name: 'exercise_type', nullable: true, type: 'varchar' })
  exerciseType: string;

  @Column({ name: 'city_state', nullable: true, type: 'varchar' })
  cityState: string;

  @Column({ name: 'type', type: 'varchar', nullable: true })
  type: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMPTZ(6)',
    onUpdate: 'CURRENT_TIMESTAMPTZ(6)'
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMPTZ(6)',
    onUpdate: 'CURRENT_TIMESTAMPTZ(6)'
  })
  updatedAt: Date;

}