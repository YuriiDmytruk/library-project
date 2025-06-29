import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('books')
export class Book {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'varchar', length: 255 })
    author: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    imageUrl: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    isbn: string;

    @Column({ type: 'int', nullable: true })
    publicationYear: number;

    @Column({ type: 'varchar', length: 100, nullable: true })
    genre: string;

    @Column({ type: 'int', default: 0 })
    pages: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
} 