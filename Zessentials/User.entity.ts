// Import decorators from TypeORM
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

// @Entity() tells TypeORM: "This is a database table"
@Entity()
export class User {
  // @PrimaryGeneratedColumn() = Auto-incrementing ID (1, 2, 3...)
  @PrimaryGeneratedColumn()
  id: number;

  // @Column() = A column in the table
  @Column()
  name: string;

  @Column({ unique: true })  // unique: true = No duplicate emails
  email: string;

  @Column()
  password: string;

  // We'll add relationships later (orders)
}
