import { IsDate } from "class-validator"
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { Candidate } from "./Candidate"
import { Exercise } from "./Exercise"
import { HiringProcess } from "./HiringProcess"

@Entity()
export class Challenge {
  @PrimaryGeneratedColumn()
  id: number

  @JoinColumn({ name: "hiring_process_id" })
  @ManyToOne(() => HiringProcess, (hiringProcess) => hiringProcess.challenges, {
    onDelete: "CASCADE",
  })
  hiringProcess: HiringProcess

  @OneToOne(() => Candidate, (candidate) => candidate.challenge, {
    eager: true,
  })
  candidate: Candidate

  @OneToMany(() => Exercise, (exercise) => exercise.challenge, {
    eager: true,
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "exercise_id" })
  exercises: Exercise[]

  @Column({ name: "time_stamp", nullable: true, type: "timestamptz" })
  @IsDate()
  timeStamp: Date

  @Column({ name: "address_email", nullable: false, type: "varchar" })
  addressEmail: string

  @Column({ name: "challenge", nullable: true, type: "varchar" })
  challenge: string

  @Column({ name: "file_type", nullable: true, type: "varchar" })
  fileType: string

  @Column({ name: "file_zip", nullable: true, type: "varchar" })
  zip: string

  @Column({ name: "file_github", nullable: true, type: "varchar" })
  github: string

  @Column({ name: "exercise_statement", nullable: true, type: "varchar" })
  exerciseStatement: string

  @Column({ name: "type", type: "varchar", nullable: true })
  type: string

  @CreateDateColumn({
    name: "created_at",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMPTZ(6)",
    onUpdate: "CURRENT_TIMESTAMPTZ(6)",
  })
  createdAt: Date

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMPTZ(6)",
    onUpdate: "CURRENT_TIMESTAMPTZ(6)",
  })
  updatedAt: Date
}
