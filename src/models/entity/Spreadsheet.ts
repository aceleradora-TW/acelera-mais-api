import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, RelationId } from 'typeorm'
import { IsDate, IsNotEmpty } from 'class-validator'
// import { HiringProcess } from '@models/entity/HiringProcess'

@Entity()
export class Spreadsheet {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column({ name: 'hiring_process_id', type: 'number' })
  // @IsNotEmpty()
  // hiringProcessID: number;

  // @ManyToOne(type => HiringProcess)
  // hiringProcessID: HiringProcess;

  // @RelationId((post: Post) => post.category) // you need to specify target relation
  // categoryId: number;

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

  @Column({ name: 'how_found', type: 'varchar' })
  @IsNotEmpty()
  howFound: string;

  @Column({ name: 'expectation', type: 'varchar' })
  @IsNotEmpty()
  expectation: string;

  @Column({ name: 'motivation', type: 'varchar' })
  @IsNotEmpty()
  motivation: string;

  @Column({ name: 'curriculum', type: 'varchar' })
  @IsNotEmpty()
  curriculum: string;

  @Column({ name: 'ok_CI', type: 'boolean' })
  @IsNotEmpty()
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
