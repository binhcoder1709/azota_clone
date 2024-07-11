import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { StudentClassroom } from "./student_classroom.entity";
import { StudentQuiz } from "./student_quiz.entity";
import { Classroom } from "./classroom.entity";
import { Quiz } from "./quiz.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column()
  user_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({nullable: true})
  avatar:string

  @Column({default: 1})
  role: number;

  @Column({default: 1})
  status: number;

  @Column({ type: 'datetime', default:()=> 'current_timestamp' })
  created_at: Date;

  @OneToMany(() => Classroom, classroom => classroom.teacher)
  classrooms: Classroom[];

  @OneToMany(() => Quiz, quiz => quiz.teacher)
  quizzes: Quiz[];

  @OneToMany(() => StudentClassroom, studentClassroom => studentClassroom.student)
  student_classrooms: StudentClassroom[];

  @OneToMany(() => StudentQuiz, studentQuiz => studentQuiz.student)
  student_quizzes: StudentQuiz[];
}
