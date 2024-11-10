// pages/meeting-dates/meeting-dates.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { DataService} from '../../services/data.services';

@Component({
  selector: 'app-meeting-dates',
  standalone: true,
  imports: [CommonModule, MatListModule],
  template: `
    <h2 class="page-title">Select Meeting Date</h2>

    <mat-selection-list [multiple]="false" class="date-list">
      @for (date of availableDates; track date) {
        <mat-list-option
          [selected]="date === selectedDate"
          (click)="selectDate(date)"
          class="date-option"
        >
          {{ date }}
        </mat-list-option>
      }
    </mat-selection-list>
  `,
  styles: [`
    .page-title {
      font-size: 1.8rem;
      text-align: center;
      margin: 1rem 0 2rem;
      color: #333;
    }

    .date-list {
      max-width: 600px;
      margin: 0 auto;
    }

    :host ::ng-deep {
      .date-option {
        margin-bottom: 0.5rem;

        /* Make the text larger */
        .mat-list-item-title,
        .mdc-list-item__primary-text {
          font-size: 1.3rem !important;
          padding: 1rem 0;
        }

        /* Increase touch target size */
        .mdc-list-item {
          height: 3.5rem !important;
          padding: 1rem !important;
        }
      }

      /* Style selected state */
      .mdc-list-item--selected {
        background-color: rgba(0, 0, 0, 0.08) !important;
      }
    }

    @media (max-width: 600px) {
      .page-title {
        font-size: 1.5rem;
      }

      :host ::ng-deep .date-option {
        .mat-list-item-title,
        .mdc-list-item__primary-text {
          font-size: 1.2rem !important;
        }
      }
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
