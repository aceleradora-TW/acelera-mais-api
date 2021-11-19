import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { IsNotEmpty } from 'class-validator'

@Entity()
export class Evaluation {
  @PrimaryGeneratedColumn()
  id: number;

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
