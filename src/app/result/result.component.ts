import { Component } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { EncryptionService } from '../encryption.service';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css',
})
export class ResultComponent {
  public isResultSubmitted: Boolean;

  constructor(public quizService: QuizService, 
    public encryptionService: EncryptionService, 
    private router: Router) {
    this.isResultSubmitted = false;
  }

  ngOnInit() {
    if (
      parseInt(localStorage.getItem('qnProgress')!) ==
      this.quizService.qns.length
    ) {
      this.quizService.seconds = parseInt(localStorage.getItem('seconds')!);
      this.quizService.qnProgress = parseInt(
        localStorage.getItem('qnProgress')!
      );
      this.quizService.qns = JSON.parse(localStorage.getItem('qns')!);

      this.quizService.correctAnswerCount = 0;
      this.quizService.qns.forEach(eachQuestion => {
        if (eachQuestion.choice == eachQuestion.answer) {
          this.quizService.correctAnswerCount++;
        }
        eachQuestion.correct = eachQuestion.answer;
      });

      // this.quizService.getAnswers().subscribe((data: any) => {
      //   this.quizService.correctAnswerCount = 0;
      //   this.quizService.qns.forEach((e, i) => {
      //     if (e.answer == data[i]) {
      //       this.quizService.correctAnswerCount++;
      //     }
      //     e.correct = data[i];
      //   });
      // });
    } else {
      this.router.navigate(["/quiz"]);
    }
  }

  OnSubmit() {
    //alert('Submission is closed now!')
    this.quizService.submitScore().subscribe(async (data: any) => {
      //this.restart();
      this.isResultSubmitted = true;
      try {
        const encryptedData = await this.encryptionService.encryptResults(data);
        console.log('Encrypted Data:', encryptedData);

        // Send the encrypted data via email or other methods
        this.sendEmail(encryptedData);
      } catch (error) {
        console.error('Error encrypting data:', error);
      }
    });
  }

  sendEmail(encryptedData: string) {
    // Define the mailto link with pre-filled email data
    const email = 'quiz.zyinnovators@gmail.com';
    const subject = 'Momin Girls High School - Quiz Results:' + this.quizService.getSubject();
    const body = `Hello,\n\nHere are the encrypted quiz results:\n\n${encodeURIComponent(
      encryptedData
    )}`;

    // Create a mailto link and open it in the default email client
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${body}`;

    // Open the default mail client (e.g., Gmail) with pre-filled fields
    window.location.href = mailtoLink;
  }

  restart() {
    this.isResultSubmitted = false;
    localStorage.setItem('qnProgress', '0');
    localStorage.setItem('qns', '');
    localStorage.setItem('seconds', '0');
    this.router.navigate(['/quiz']);
  }
}
