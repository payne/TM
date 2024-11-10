
// pages/home/home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { DataService } from '../../services/data.service';
import { Member } from '../../models/member.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <h2>Roles for {{ selectedDate }}</h2>

    <div class="roles-grid">
      @for (member of membersWithRoles; track member['Last Name']) {
        <mat-card>
          <mat-card-header>
            <mat-card-title>
              {{ member['First Name'] }} {{ member['Last Name'] }}
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            Role: {{ member[selectedDate] }}
          </mat-card-content>
        </mat-card>
      }
    </div>
  `,
  styles: [`
    .roles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 16px;
      padding: 16px;
    }
  `]
})
export class HomeComponent {
  selectedDate = '';
  membersWithRoles: Member[] = [];

  constructor(private dataService: DataService) {
    this.dataService.getSelectedDate().subscribe(date => {
      this.selectedDate = date;
      this.membersWithRoles = this.dataService.getMembersWithRoles(date);
    });
  }
}


