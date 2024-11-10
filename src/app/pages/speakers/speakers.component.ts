// pages/speakers/speakers.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { DataService } from '../../services/data.services';
import { Member } from '../../models/member.model';

@Component({
  selector: 'app-speakers',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <h2>Speakers & Evaluators for {{ selectedDate }}</h2>

    <div class="speakers-grid">
      @for (member of speakersAndEvaluators; track member['Last Name']) {
        <mat-card>
          <mat-card-header>
            <mat-card-title>
              {{ member['First Name'] }} {{ member['Last Name'] }}
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            Role: {{ member[selectedDate] === 'S' ? 'Speaker' : 'Evaluator' }}
          </mat-card-content>
        </mat-card>
      }
    </div>
  `,
  styles: [`
    .speakers-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 16px;
      padding: 16px;
    }
  `]
})
export class SpeakersComponent {
  selectedDate = '';
  speakersAndEvaluators: Member[] = [];

  constructor(private dataService: DataService) {
    this.dataService.getSelectedDate().subscribe(date => {
      this.selectedDate = date;
      this.speakersAndEvaluators = this.dataService.getSpeakersAndEvaluators(date);
    });
  }
}

