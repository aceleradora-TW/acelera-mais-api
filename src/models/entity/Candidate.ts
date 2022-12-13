import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from "typeorm"
import { IsDate } from "class-validator"
import { HiringProcess } from "./HiringProcess"
import { Challenge } from "./Challenge"

@Entity()
export class Candidate {
  @PrimaryGeneratedColumn()
  id: number

  @JoinColumn({ name: "hiring_process_id" })
  @ManyToOne(() => HiringProcess, (hiringProcess) => hiringProcess.candidates, {
    onDelete: "CASCADE",
  })
  hiringProcess: HiringProcess

  @OneToOne(() => Challenge, (challenge) => challenge.candidate, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "challenge_id" })
  challenge: Challenge

  @Column({ name: "email", type: "varchar" })
  email: string

  @Column({ name: "time_stamp", type: "timestamptz" })
  @IsDate()
  timeStamp: Date

  @Column({ name: "address_email", type: "varchar" })
  addressEmail: string

  @CreateDateColumn({
    name: "created_at",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt: Date

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updatedAt: Date
}
