import { IsDate } from "class-validator";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { HiringProcess } from "./HiringProcess";

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Exercise, hiring_process => HiringProcess)
  hiringProcess: HiringProcess

  @Column({ name: 'time_stamp', type: 'timestamptz' })
  @IsDate()
  timeStamp: Date;

  @Column({ name: 'address_email', type: 'varchar' })
  addressEmail: string;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'phone', type: 'varchar' })
  phone: string;

  @Column({ name: 'exercise', type: 'varchar' })
  exercise: string;

  @Column({ name: 'file_type', type: 'varchar' })
  fileType: string;

  @Column({ name: 'file_zip', type: 'varchar' })
  fileZip: string;

  @Column({ name: 'file_github', type: 'varchar' })
  fileGithub: string;

  @Column({ name: 'have_computer', type: 'varchar' })
  haveComputer: string;

  @Column({ name: 'have_internet', type: 'varchar' })
  haveInternet: string;

  @Column({ name: 'have_webcam', type: 'varchar', nullable: true })
  haveWebcam: string;

  @Column({ name: 'can_use_webcam', type: 'varchar' })
  canUseWebcam: string;

  @Column({ name: 'city_state', type: 'varchar' })
  cityState: string;

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