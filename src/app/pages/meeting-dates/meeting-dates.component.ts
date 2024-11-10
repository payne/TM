
// pages/meeting-dates/meeting-dates.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { DataService } from '../../services/data.services';

@Component({
  selector: 'app-meeting-dates',
  standalone: true,
  imports: [CommonModule, MatListModule],
  template: `
    <h2>Select Meeting Date</h2>

    <mat-selection-list [multiple]="false">
      @for (date of availableDates; track date) {
        <mat-list-option
          [selected]="date === selectedDate"
          (click)="selectDate(date)"
        >
          {{ date }}
        </mat-list-option>
      }
    </mat-selection-list>
  `,
  styles: [`
    mat-selection-list {
      max-width: 600px;
      margin: 0 auto;
    }
  `]
})
export class MeetingDatesComponent {
  availableDates: string[] = [];
  selectedDate = '';

  constructor(private dataService: DataService) {
    this.availableDates = this.dataService.getAvailableDates();
    this.dataService.getSelectedDate().subscribe(date => {
      this.selectedDate = date;
    });
  }

  selectDate(date: string) {
    this.dataService.setSelectedDate(date);
  }
}

