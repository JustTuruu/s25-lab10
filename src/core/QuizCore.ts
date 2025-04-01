import quizData from '../data/quizData';
import QuizQuestion from './QuizQuestion';

class QuizCore {
  private questions: QuizQuestion[];
  private currentQuestionIndex: number;
  private score: number;

  constructor() {
    this.questions = quizData;
    this.currentQuestionIndex = 0;
    this.score = 0;
  }

  public getCurrentQuestion(): QuizQuestion | null {
    return this.currentQuestionIndex < this.questions.length ? this.questions[this.currentQuestionIndex] : null;
  }

  public nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length) {
      this.currentQuestionIndex++;
    }
  }

  public answerQuestion(answer: string): void {
    const currentQuestion = this.getCurrentQuestion();
    if (currentQuestion && answer === currentQuestion.correctAnswer) {
      this.score++;
    }
  }

  public getScore(): number {
    return this.score;
  }

  public getTotalQuestions(): number {
    return this.questions.length;
  }
}

export default QuizCore;
