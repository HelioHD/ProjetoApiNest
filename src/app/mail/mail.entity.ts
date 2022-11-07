import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MailStatusEnum } from './enum/mail-status.enum';

@Entity({ name: 'mails' }) // nome da tabela
export class MailEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'destination_name', nullable: false })
  destinationName: string;

  @Column({ name: 'destination_address', nullable: false })
  destinationAddress: string;

  @Column({ name: 'due_date', type: 'timestamp', nullable: false })
  dueDate: string;

  @Column({ nullable: false })
  subject: string;

  @Column({ type: 'text', nullable: false })
  body: string;

  @Column({ default: MailStatusEnum.WAITING })
  status: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deletedAt' })
  deletedAt: string;
}
