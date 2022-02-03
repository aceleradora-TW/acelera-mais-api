import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import { IsNotEmpty, IsDate } from 'class-validator'
import { Match } from '@models/validators/date'
import { Candidate } from './Candidate'
import { Challenge } from './Challenge';
@Entity()
export class HiringProcess {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', nullable: false })
  @IsNotEmpty()
  name: string;

  @OneToMany(() => Candidate, candidate => candidate.hiringProcess)
  candidates: Candidate[]

  @OneToMany(() => Challenge, exercise => exercise.hiringProcess)
  exercises: Challenge[]

  @Column({ name: 'start_date', type: 'timestamptz' })
  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @Column({ name: 'end_date', type: 'timestamptz' })
  @IsDate()
  @Match('startDate')
  endDate: Date;

  @Column({ name: 'description', type: 'varchar' })
  description: string;

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
