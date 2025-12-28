import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './result/result.component';
import { AuthGuard } from './auth/auth.guard';
import { QuestionDisplayComponent } from './question-display/question-display.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestionSelectorComponent } from './question-selector/question-selector.component';

export const routes: Routes = [
  // { path: 'register', component: RegisterComponent },
  { path: 'quiz', component: QuizComponent, canActivate: [AuthGuard] },
  { path: 'result', component: ResultComponent, canActivate: [AuthGuard] },
  { path: 'revise', component: QuestionDisplayComponent },
  { path: 'review', component: QuestionDisplayComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'select', component: QuestionSelectorComponent},
  { path: 'en', component: RegisterComponent }, // Route for English
  { path: 'ur', component: RegisterComponent }, // Route for Urdu
  { path: '', redirectTo: '/en', pathMatch: 'full' },
];
