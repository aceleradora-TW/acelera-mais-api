import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: "name", type: "varchar" })
  name: String

  @Column({ name: "email", type: "varchar", unique: true })
  email: String

  @Column({ name: "telephone", type: "varchar" })
  telephone: String

  @Column({ name: "type", type: "varchar" })
  type: String

  @Column({ name: "password", type: "varchar" })
  password: String

  @Column({ name: "flag", type: "varchar" })
  flag: String

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
