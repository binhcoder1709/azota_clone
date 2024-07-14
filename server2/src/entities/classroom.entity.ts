import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import { User } from './user.entity';
import { StudentClassroom } from './student_classroom.entity';
import { Quiz } from './quiz.entity';

@Entity('classrooms')
export class Classroom {
  @PrimaryGeneratedColumn('uuid')
  classroom_id: string;

  @Column()
  classroom_code: string;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.classrooms)
  @JoinColumn({ name: 'teacher_id' })
  teacher: User;

  @OneToMany(
    () => StudentClassroom,
    (studentClassroom) => studentClassroom.classroom,
    { cascade: true },
  )
  student_classrooms: StudentClassroom[];

  @OneToMany(() => Quiz, (quiz) => quiz.classroom, { cascade: true })
  quizzes: Quiz[];

  @BeforeInsert()
  generateClassroomCode() {
    this.classroom_code = crypto.randomUUID();
  }
}
