import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { HiringProcess } from "./HiringProcess"

@Entity()
export class IncompleteCandidate {
  @PrimaryGeneratedColumn()
  id: number

  @JoinColumn({ name: "hiring_process_id" })
  @ManyToOne(() => HiringProcess, (hiringProcess) => hiringProcess.challenges, {
    onDelete: "CASCADE",
  })
  hiringProcess: HiringProcess

  @Column({ name: "adress_email", nullable: true, type: "varchar" })
  adressEmail: String

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
