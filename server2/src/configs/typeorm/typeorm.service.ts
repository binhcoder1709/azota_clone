import { Classroom } from 'src/entities/classroom.entity'; 
import { StudentClassroom } from 'src/entities/student_classroom.entity';
import { User } from 'src/entities/user.entity';
import { DataSource } from 'typeorm';
import { Question } from 'src/entities/question.entity';
import { Quiz } from 'src/entities/quiz.entity';
import { StudentAnswer } from 'src/entities/student_answer.entity';
import { StudentQuiz } from 'src/entities/student_quiz.entity';
import { Answer } from 'src/entities/answer.entity';

export const ormProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        entities: [
          Quiz,
          User,
          Classroom,
          Question,
          Answer,
          StudentAnswer,
          StudentClassroom, 
          StudentQuiz,
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
