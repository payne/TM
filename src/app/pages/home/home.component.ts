// pages/home/home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { DataService} from '../../services/data.services';
import { Member } from '../../models/member.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <h2 class="page-heading">Roles for {{ selectedDate }}</h2>

    <div class="roles-grid">
      @for (member of membersWithRoles; track member['Last Name']) {
        <mat-card class="role-card">
          <mat-card-header>
            <mat-card-title class="member-name">
              {{ member['First Name'] }} {{ member['Last Name'] }}
            </mat-card-title>
          </mat-card-header>
          <mat-card-content class="role-content">
            Role: {{ member[selectedDate] }}
          </mat-card-content>
        </mat-card>
      }
    </div>
  `,
  styles: [`
    .page-heading {
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
    }

    .roles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
      padding: 16px;
    }

    .role-card {
      .member-name {
        font-size: 1.3em !important;
        margin-bottom: 0.5rem;
      }
    }

    :host ::ng-deep {
      .role-card {
        mat-card-title {
          font-size: 1.6rem !important;
          line-height: 1.3 !important;
        }

        .role-content {
          font-size: 1.3rem !important;
          padding: 1rem;
        }
      }
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
