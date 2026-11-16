import { Component, computed, signal } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZardCardImports } from '@/shared/components/card/card.imports';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardInputComponent } from '@/shared/components/input';
import { Conference } from '@/models/conference';

@Component({
  selector: 'app-conference-list',
  imports: [ZardCardImports, ZardButtonComponent, ZardInputComponent, FormsModule, UpperCasePipe, DatePipe],
  templateUrl: './conference-list.html',
})
export class ConferenceList {
  protected readonly conferences = signal<Conference[]>([
    { id: 1, title: 'Angular 21 Conference', description: 'Nouveautés d’Angular 21', date: new Date(2027, 10, 15), place: 'Tunis', maxParticipants: 100, nbParticipants: 75 },
    { id: 2, title: 'Signals Workshop', description: 'Atelier pratique sur les signals', date: new Date(2027, 10, 30), place: 'Ariana', maxParticipants: 30, nbParticipants: 24 },
    { id: 3, title: 'Web Conference', description: 'Tendances du web moderne', date: new Date(2027, 10, 20), place: 'Sousse', maxParticipants: 50, nbParticipants: 50 },
  ]);

  protected readonly search = signal('');

  protected readonly filtered = computed(() => {
    const term = this.search().trim().toLowerCase();
    return this.conferences().filter(c => c.title.toLowerCase().includes(term));
  });

  protected remaining(c: Conference): number {
    return c.maxParticipants - c.nbParticipants;
  }

  protected buttonClass(c: Conference): string {
    const r = this.remaining(c);
    if (r === 0) return 'bg-red-600 text-white';
    return r < 10 ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-green-600 text-white hover:bg-green-700';
  }

  protected register(id: number): void {
    this.conferences.update(list =>
      list.map(c => (c.id === id && this.remaining(c) > 0 ? { ...c, nbParticipants: c.nbParticipants + 1 } : c)),
    );
  }
}
