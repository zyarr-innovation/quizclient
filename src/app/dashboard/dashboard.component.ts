import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatTableModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  displayedColumns: string[] = ['name', 'score', 'timeSpent']; // Define column names here
  data: any[] = [];
  sortedData: any[] = [];
  groupedAndSortedData = {}

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>('/assets/dashboard.json').subscribe((response) => {
      this.data = response;
      this.groupedAndSortedData = this.groupByTargetAndSort(this.data);
    });
  }

  groupAndSortByLanguage(data: any[]) {
    const grouped: Record<'en' | 'ur', any[]> = {
      en: [],
      ur: []
    };

    // 1️⃣ Grouping
    data.forEach(item => {
      const lang = item?.message_data?.TargetData;

      if (lang === 'en' || lang === 'ur') {
        grouped[lang].push(item);
      }
    });

    // 2️⃣ Sorting (explicit key typing)
    (['en', 'ur'] as const).forEach(lang => {
      grouped[lang].sort((a, b) => {
        const scoreA = a.message_data.Score;
        const scoreB = b.message_data.Score;

        const timeA = a.message_data.TimeSpent;
        const timeB = b.message_data.TimeSpent;

        return scoreB - scoreA || timeA - timeB;
      });
    });

    return grouped;
  }
}
