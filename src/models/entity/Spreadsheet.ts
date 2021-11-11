import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { IsDate, IsNotEmpty } from 'class-validator'

@Entity()
export class Spreadsheet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'time_stamp', type: 'timestamptz' })
  @IsNotEmpty()
  @IsDate()
  timeStamp: Date;

  @Column({ name: 'adress_email', type: 'varchar' })
  @IsNotEmpty()
  adressEmail: string;

  @Column({ name: 'name', type: 'varchar' })
  @IsNotEmpty()
  name: string;

  @Column({ name: 'hiring_process_id', type: 'number' })
  @IsNotEmpty()
  hiringProcessID: number;

  @Column({ name: 'email', type: 'varchar' })
  @IsNotEmpty()
  email: string;

  @Column({ name: 'phone', type: 'varchar' })
  @IsNotEmpty()
  phone: string;

  @Column({ name: 'birth_date', type: 'timestamptz' })
  @IsNotEmpty()
  birthDate: Date;

  @Column({ name: 'instituition_name', type: 'varchar' })
  @IsNotEmpty()
  instituitionName: string;

  @Column({ name: 'course_name', type: 'varchar' })
  @IsNotEmpty()
  courseName: string;

  @Column({ name: 'milestone', type: 'varchar' })
  @IsNotEmpty()
  milestone: string;

  // @CreateDateColumn({
  //   name: 'created_at',
  //   type: 'timestamptz',
  //   default: () => 'CURRENT_TIMESTAMP(6)'
  // })
  // createdAt: Date;

  // @UpdateDateColumn({
  //   name: 'updated_at',
  //   type: 'timestamptz',
  //   default: () => 'CURRENT_TIMESTAMP(6)',
  //   onUpdate: 'CURRENT_TIMESTAMP(6)'
  // })
  // updatedAt: Date;
}
