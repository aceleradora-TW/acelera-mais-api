import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm'
import { IsNotEmpty } from 'class-validator'
import { Exercise } from './Exercise';

@Entity()
export class Evaluation {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'exercise_id' })
  @OneToOne(() => Exercise, exercise => exercise.evaluation)
  exercise: Exercise

  @Column({ name: 'mentor_name', type: 'varchar', nullable: false })
  @IsNotEmpty()
  mentorName: string;

  @Column({ name: 'feedback', type: 'varchar', nullable: false })
  @IsNotEmpty()
  feedback: string;

  @Column({ name: 'score', type: 'int', nullable: false })
  @IsNotEmpty()
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
