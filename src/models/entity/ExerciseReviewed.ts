import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { IsNotEmpty } from 'class-validator'

@Entity()
export class ExerciseReviewed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', nullable: false })
  @IsNotEmpty()
  name: string;

  @Column({ name: 'feedback', type: 'varchar', nullable: false })
  @IsNotEmpty()
  feedback: string;

  @Column({ name: 'score', type: 'varchar', nullable: false })
  @IsNotEmpty()
  score: string;

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
