import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Question } from './question.entity';
import { StudentAnswer } from './student_answer.entity';

@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  answer_id: string;

  @Column()
  text: string;

  @Column()
  is_correct: boolean;

  @ManyToOne(() => Question, (question) => question.answers, {onDelete: 'CASCADE'})
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @OneToMany(() => StudentAnswer, (stuanw) => stuanw.answer)
  student_answers: StudentAnswer[];
}
