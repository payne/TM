// services/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Member } from '../models/member.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private members: Member[] = [];
  private selectedDate = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
    this.loadData();
  }

  private loadData() {
    this.http.get<Member[]>('https://payne.github.io/TMtoday1/tm.json').subscribe(data => {
      this.members = data;
      console.log(`just loaded ${this.members.length} members`);
      console.log(`first member is ${this.members[0]['First Name']} ${this.members[0]['Last Name']}`);
      console.log(data);
      // Set initial date to first available date
      const dates = this.getAvailableDates();
      if (dates.length > 0) {
        this.selectedDate.next(dates[0]);
      }
    });
  }

  getAvailableDates(): string[] {
    if (this.members.length === 0) return [];
    return Object.keys(this.members[0])
      .filter(key => key.includes('/'));
  }

  getMembers(): Member[] {
    return this.members;
  }

  getSelectedDate(): Observable<string> {
    return this.selectedDate.asObservable();
  }

  setSelectedDate(date: string) {
    this.selectedDate.next(date);
  }

  getMembersWithRoles(date: string): Member[] {
    return this.members.filter(member => member[date]?.trim() !== '');
  }

  getSpeakersAndEvaluators(date: string): Member[] {
    return this.members.filter(member =>
      ['S', 'E'].includes(member[date]?.trim())
    );
  }
}

