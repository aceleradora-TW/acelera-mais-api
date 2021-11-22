import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { IsDate, IsNotEmpty } from 'class-validator'
import { HiringProcess } from '@models/entity/HiringProcess'

@Entity()
export class Spreadsheet {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => HiringProcess, HiringProcessFK => HiringProcessFK)
  @JoinColumn({ name: 'hiring_process_id' })
  public HiringProcessFK: HiringProcess;

  @Column({ name: 'hiring_process_id', type: 'integer' })
  hiringProcessId: number;

  @Column({ name: 'time_stamp', type: 'timestamptz' })
  @IsDate()
  timeStamp: Date;

  @Column({ name: 'adress_email', type: 'varchar' })
  adressEmail: string;

  @Column({ name: 'name', type: 'varchar' })
  @IsNotEmpty()
  name: string;

  @Column({ name: 'email', type: 'varchar' })
  @IsNotEmpty()
  email: string;

  @Column({ name: 'phone', type: 'varchar' })
  @IsNotEmpty()
  phone: string;

  @Column({ name: 'birth_date', type: 'timestamptz' })
  @IsNotEmpty()
  birthDate: Date;

  @Column({ name: 'genre', type: 'varchar' })
  @IsNotEmpty()
  genre: string;

  @Column({ name: 'skin_color', type: 'varchar' })
  @IsNotEmpty()
  skinColor: string;

  @Column({ name: 'institution_name', type: 'varchar' })
  @IsNotEmpty()
  institutionName: string;

  @Column({ name: 'course_name', type: 'varchar' })
  @IsNotEmpty()
  courseName: string;

  @Column({ name: 'milestone', type: 'varchar' })
  @IsNotEmpty()
  milestone: string;

  @Column({ name: 'how_found', type: 'varchar' })
  howFound: string;

  @Column({ name: 'expectation', type: 'varchar' })
  expectation: string;

  @Column({ name: 'motivation', type: 'varchar' })
  motivation: string;

  @Column({ name: 'curriculum', type: 'varchar' })
  curriculum: string;

  @Column({ name: 'ok_CI', type: 'boolean' })
  okCI: boolean;

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
