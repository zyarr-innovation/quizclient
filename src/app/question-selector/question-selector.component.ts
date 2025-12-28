import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { forkJoin } from 'rxjs';

import { QuizService } from '../quiz.service';
import { IQuestion } from '../data/questionCollection';

@Component({
  selector: 'app-question-selector',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  templateUrl: './question-selector.component.html',
  styleUrl: './question-selector.component.css',
})
export class QuestionSelectorComponent {
  questionsEnglish: IQuestion[] = [];
  questionsUrdu: IQuestion[] = [];

  /** Track selected questions */
  selectedMap = new Map<number, boolean>();

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    forkJoin({
      en: this.quizService.getAllQuestions('en'),
      ur: this.quizService.getAllQuestions('ur'),
    }).subscribe(({ en, ur }) => {
      this.questionsEnglish = en;
      this.questionsUrdu = ur;
    });
  }

  toggleSelection(questionId: number, checked: boolean) {
    this.selectedMap.set(questionId, checked);
  }

  saveSelectedQuestions() {
    const selectedQuestions = this.questionsEnglish
      .filter(q => this.selectedMap.get(q.id))
      .map(q => ({
        id: q.id,
        question: q.question,
        options: q.options,
        answer: q.answer,
      }));

    this.downloadJson(selectedQuestions);
  }

  private downloadJson(data: any) {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'selected-questions.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  getCorrectAnswerClass(
    indexQuestion: number,
    currentIndex: number,
    language: 'en' | 'ur'
  ): string {
    const question =
      language === 'en'
        ? this.questionsEnglish[indexQuestion]
        : this.questionsUrdu[indexQuestion];

    return currentIndex === question.answer - 1 ? 'correct-answer' : '';
  }
}
