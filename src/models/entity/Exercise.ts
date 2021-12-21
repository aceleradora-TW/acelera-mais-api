import { IsDate } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Candidate } from "./Candidate";
import { Evaluation } from "./Evaluation";
import { HiringProcess } from "./HiringProcess";

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'hiring_process_id' })
  @ManyToOne(() => HiringProcess, hiringProcess => hiringProcess.exercises, { onDelete: 'CASCADE' })
  hiringProcess: HiringProcess

  @OneToOne(() => Candidate, candidate => candidate.exercise, { eager: true })
  candidate: Candidate

  @OneToOne(() => Evaluation, evaluation => evaluation.exercise, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'exercise_id' })
  evaluation: Evaluation




  @Column({ name: 'time_stamp', nullable: true, type: 'timestamptz' })
  @IsDate()
  timeStamp: Date;

  @Column({ name: 'address_email', nullable: false, type: 'varchar' })
  addressEmail: string;

  @Column({ name: 'name', nullable: true, type: 'varchar' })
  name: string;

  @Column({ name: 'phone', nullable: true, type: 'varchar' })
  phone: string;

  @Column({ name: 'exercise', nullable: true, type: 'varchar' })
  exercise: string;

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