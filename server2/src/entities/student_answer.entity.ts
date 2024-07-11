import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { StudentQuiz } from "./student_quiz.entity";
import { Answer } from "./answer.entity";

@Entity("student_answers")
export class StudentAnswer {
  @PrimaryGeneratedColumn('uuid')
  student_answer_id: string;

  @ManyToOne(() => StudentQuiz, studentQuiz => studentQuiz.student_answers)
  @JoinColumn({ name: 'student_quiz_id' })
  student_quiz: StudentQuiz;

  @ManyToOne(() => Answer, answer => answer.student_answers)
  @JoinColumn({ name: 'answer_id' })
  answer: Answer;
}
