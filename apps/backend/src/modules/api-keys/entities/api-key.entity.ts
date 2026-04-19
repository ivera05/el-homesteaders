/* eslint-disable prettier/prettier */
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiKeyType } from '@modules/api-keys/enums/api-key-type.enum';

@Entity('api_keys')
export class ApiKeyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  key: string;

  @Column({ type: 'enum', enum: ApiKeyType, default: ApiKeyType.CLIENT })
  type: ApiKeyType;

  @Column({ name: 'issued_to', nullable: true })
  issuedTo: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'expires_at', nullable: true })
  expiresAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
