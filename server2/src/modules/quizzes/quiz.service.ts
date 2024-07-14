import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { QuizRepository } from './quiz.repository';
import { CreateQuizDto } from 'src/dtos/quiz/createQuiz.dto';
import { JwtService } from '@nestjs/jwt';
import { Quiz } from 'src/entities/quiz.entity';
import { UserRepository } from '../users/user.repository';
import { ClassroomRepository } from '../classroom/classroom.repository';
import { CreateQuestionDto } from 'src/dtos/question/createQuestion.dto';
import { CreateAnswerDto } from 'src/dtos/answer/createAnswer.dto';
import { Question } from 'src/entities/question.entity';
import { Answer } from 'src/entities/answer.entity';

@Injectable()
export class QuizService {
  constructor(
    private readonly quizRepos: QuizRepository,
    private readonly jwtService: JwtService,
    private readonly userRepos: UserRepository,
    private readonly classroomRepos: ClassroomRepository,
  ) {}

  async createQuizService(
    token: string,
    quizDto: CreateQuizDto,
  ): Promise<Quiz> {
    const payload = this.jwtService.decode(token);

    const user = await this.userRepos.findById(payload.user_id);
    if (!user) {
      throw new NotFoundException('Not found user');
    }

    const classroom = await this.classroomRepos.findById(quizDto.classroom);
    if (!classroom) {
      throw new NotFoundException('Not found classroom');
    }
    const quiz = new Quiz();
    quiz.title = quizDto.title;
    quiz.start_time = new Date(quizDto.start_time);
    quiz.end_time = new Date(quizDto.end_time);
    quiz.classroom = classroom;
    quiz.teacher = user;

    const quizSaved = await this.quizRepos.createOne(quiz);
    return quizSaved;
  }

  // async createQuestion(data:CreateQuestionDto[], quiz_id:string)
  // {
  //   const quiz = await this.quizRepos.findById(quiz_id)
  //   return Promise.all(data.map(question => {
  //     return this.quizRepos.createQuestion({ ...question, quiz: quiz });
  //   }));
  // }

  // async createAnswers(data: CreateQuestionDto[]) {
  //   const answers = data.flatMap(question => 
  //     question.answers.map(answer => ({
  //       ...answer,
  //       questionId: question.answers // Use actual question ID
  //     }))
  //   );
  //   return this.answerRepository.create(answers);
  // }
}
