import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm'
import { Challenge } from './Challenge';

@Entity()
export class Evaluation {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Challenge, exercise => exercise.evaluation)
  exercise: Challenge;

  @Column({ name: 'mentor_name', type: 'varchar', nullable: true })
  mentorName: string;

  @Column({ name: 'feedback', type: 'varchar', nullable: true })
  feedback: string;

  @Column({ name: 'score', type: 'int', nullable: true })
  score: number;

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
