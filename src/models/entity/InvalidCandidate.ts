import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"

@Entity()
export class InvalidCandidate {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: "adress_email", nullable: true, type: "varchar" })
  adress_email: String

  @Column({ name: "hiring_process_id", nullable: true, type: "varchar" })
  hiring_process_id: String

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
