import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Classroom } from './classroom.entity';

@Entity('student_classrooms')
export class StudentClassroom {
  @PrimaryGeneratedColumn('uuid')
  student_classroom_id: string;

  @ManyToOne(() => User, (user) => user.student_classrooms)
  @JoinColumn({ name: 'student_id' })
  student: User;

  @ManyToOne(() => Classroom, (classroom) => classroom.student_classrooms, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'classroom_id' })
  classroom: Classroom;
}
