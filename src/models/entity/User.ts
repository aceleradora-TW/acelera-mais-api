
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar' })
  name: String;

  @Column({ name: 'email', type: 'varchar' })
  email: String;

  @Column({ name: 'telephone', type: 'varchar' })
  telephone: String;

  @Column({ name: 'type', type: 'varchar' })
  type: String;

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