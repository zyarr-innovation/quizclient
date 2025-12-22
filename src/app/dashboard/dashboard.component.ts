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
  displayedColumns: string[] = ['name', 'score', 'timeSpent', 'targetData']; // Define column names here
  data: any[] = [];
  sortedData: any[] = [];
  groupedAndSortedData = {}

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>('/assets/dashboard.json').subscribe((response) => {
      this.data = response;
      this.sortedData = this.groupByTargetAndSort(this.data);
    });
  }

  groupByTargetAndSort(data: any[]) {
    const grouped: Record<'en' | 'ur', any[]> = {
      en: [],
      ur: []
    };

    // 1️⃣ Grouping
    data.forEach((item) => {
      const lang: 'en' | 'ur' | undefined = item?.message_data?.TargetData;

      if (lang) {
        grouped[lang].push(item);
      }
    });

    // 2️⃣ Sorting (EXPLICIT union type)
    const languages: Array<'en' | 'ur'> = ['en', 'ur'];

    languages.forEach((lang) => {
      grouped[lang].sort((a, b) => {
        const scoreA = a.message_data.Score;
        const scoreB = b.message_data.Score;

        const timeA = a.message_data.TimeSpent;
        const timeB = b.message_data.TimeSpent;

        return scoreB - scoreA || timeA - timeB;
      });
    });

    // 3️⃣ Flatten (push into one array)
    return [
      ...grouped.en,
      ...grouped.ur
    ];
  }

}
