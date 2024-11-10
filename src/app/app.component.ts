// app.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule
  ],
  template: `
    <mat-toolbar color="primary" class="toolbar">
      <button mat-icon-button (click)="sidenav.toggle()" class="menu-button">
        <mat-icon class="menu-icon">menu</mat-icon>
      </button>
      <span class="title">Meeting Roles</span>
    </mat-toolbar>

    <mat-sidenav-container>
      <mat-sidenav #sidenav mode="over" class="sidenav">
        <mat-nav-list>
          <a mat-list-item routerLink="/home" (click)="sidenav.close()" class="nav-item">
            <span class="nav-text">Home</span>
          </a>
          <a mat-list-item routerLink="/speakers" (click)="sidenav.close()" class="nav-item">
            <span class="nav-text">Speakers</span>
          </a>
          <a mat-list-item routerLink="/dates" (click)="sidenav.close()" class="nav-item">
            <span class="nav-text">Meeting Dates</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }

    .toolbar {
      height: 80px;  /* Taller toolbar */
      font-size: 1.5rem;
    }

    .menu-button {
      transform: scale(1.5);  /* Larger menu button */
      margin-right: 1rem;
    }

    .menu-icon {
      font-size: 2rem;
      height: 2rem;
      width: 2rem;
    }

    .title {
      font-size: 1.8rem;
    }

    mat-sidenav-container {
      height: calc(100% - 80px);  /* Adjust for taller toolbar */
    }

    .sidenav {
      width: 300px;  /* Wider sidenav */
    }

    mat-sidenav-content {
      padding: 16px;
    }

    :host ::ng-deep {
      .nav-item {
        height: 80px !important;  /* Taller nav items */

        .mdc-list-item__primary-text {
          font-size: 1.8rem !important;
        }

        /* Add some padding for better touch targets */
        padding: 1rem 1.5rem !important;
        margin: 0.5rem 0 !important;

        /* Hover effect */
        &:hover {
          background-color: rgba(0, 0, 0, 0.04) !important;
        }
      }

      /* Active route styling */
      .mat-mdc-list-item-active {
        background-color: rgba(0, 0, 0, 0.08) !important;
      }
    }

    @media (max-width: 600px) {
      .toolbar {
        height: 70px;
      }

      .title {
        font-size: 1.5rem;
      }

      mat-sidenav-container {
        height: calc(100% - 70px);
      }
    }
  `]
})
export class AppComponent {}

