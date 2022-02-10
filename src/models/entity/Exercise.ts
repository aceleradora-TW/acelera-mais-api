import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Evaluation } from "./Evaluation";
import { Challenge } from "./Challenge";

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Challenge, challenge => challenge.exercises)
  challenge: Challenge

  @OneToOne(() => Evaluation, evaluation => evaluation.exercise, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'evaluation_id' })
  evaluation: Evaluation

  @Column({ name: 'type', nullable: true, type: 'varchar' })
  type: string;

  @Column({ name: 'link', nullable: true, type: 'varchar' })
  link: string;

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