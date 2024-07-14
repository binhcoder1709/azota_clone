import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Quiz } from './quiz.entity';
import { StudentAnswer } from './student_answer.entity';

@Entity('student_quizzes')
export class StudentQuiz {
  @PrimaryGeneratedColumn('uuid')
  student_quiz_id: string;

  @Column({ type: 'datetime' })
  start_time: Date;

  @Column({ type: 'datetime' })
  end_time: Date;

  @Column({ default: 0 })
  score: number;

  @ManyToOne(() => User, (user) => user.student_quizzes)
  @JoinColumn({ name: 'student_id' })
  student: User;

  @ManyToOne(() => Quiz, (quiz) => quiz.student_quizzes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'quiz_id' })
  quiz: Quiz;

  @OneToMany(() => StudentAnswer, (studentAnswer) => studentAnswer.student_quiz)
  student_answers: StudentAnswer[];
}
