import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBell } from '@ng-icons/lucide';
import { Component, signal } from '@angular/core';
import { ZardCardImports } from '@/shared/components/card/card.imports';
import { ZardButtonComponent } from '@/shared/components/button';

@Component({
  selector: 'app-notifications',
  imports: [NgIcon, ZardCardImports, ZardButtonComponent],
  viewProviders: [provideIcons({ lucideBell })],
  templateUrl: './notifications.html',
})
export class Notifications {
  protected readonly notifications = ['Sarra vous a ajouté en ami', 'Nouvelle conférence : Signals Workshop'];
  protected readonly visible = signal(false);
}
