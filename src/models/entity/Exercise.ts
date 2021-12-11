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
  @ManyToOne(() => HiringProcess, hiringProcess => hiringProcess.exercises)
  hiringProcess: HiringProcess

  @JoinColumn({ name: 'candidate_id' })
  @ManyToOne(() => Candidate, candidate => candidate.exercises)
  candidate: Candidate

  @OneToOne(() => Evaluation, evaluation => evaluation.exercise, {
    cascade: true
  })
  @JoinColumn({ name: 'exercise_id' })
  evaluation: Evaluation

  @Column({ name: 'time_stamp', type: 'timestamptz' })
  @IsDate()
  timeStamp: Date;

  @Column({ name: 'address_email', type: 'varchar' })
  addressEmail: string;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'phone', type: 'varchar' })
  phone: string;

  @Column({ name: 'exercise', type: 'varchar' })
  exercise: string;

  @Column({ name: 'file_type', type: 'varchar' })
  fileType: string;

  @Column({ name: 'file_zip', type: 'varchar' })
  fileZip: string;

  @Column({ name: 'file_github', type: 'varchar' })
  fileGithub: string;

  @Column({ name: 'have_computer', type: 'varchar' })
  haveComputer: string;

  @Column({ name: 'have_internet', type: 'varchar' })
  haveInternet: string;

  @Column({ name: 'have_webcam', type: 'varchar', nullable: true })
  haveWebcam: string;

  @Column({ name: 'can_use_webcam', type: 'varchar' })
  canUseWebcam: string;

  @Column({ name: 'city_state', type: 'varchar' })
  cityState: string;

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