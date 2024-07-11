import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { StudentQuiz } from './student_quiz.entity';
import { Question } from './question.entity';

@Entity('quizzes')
export class Quiz {
  @PrimaryGeneratedColumn('uuid')
  quiz_id: string;

  @Column()
  title: string;

  @Column({ type: 'datetime' })
  start_time: Date;

  @Column({ type: 'datetime' })
  end_time: Date;

  @ManyToOne(() => User, (user) => user.quizzes)
  @JoinColumn({ name: 'teacher_id' })
  teacher: User;

  @OneToMany(() => StudentQuiz, (studentQuiz) => studentQuiz.quiz)
  student_quizzes: StudentQuiz[];

  @OneToMany(() => Question, (question) => question.quiz)
  questions: Question[];
}
