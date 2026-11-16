import { TestBed } from '@angular/core/testing';
import { ConferenceList } from './conference-list';

describe('ConferenceList', () => {
  it('filters by title, registers, and colors buttons by remaining places', async () => {
    const fixture = TestBed.createComponent(ConferenceList);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const buttons = () => [...el.querySelectorAll('button')];

    expect(el.textContent).toContain('ANGULAR 21 CONFERENCE');
    expect(el.textContent).toContain('15/11/2027');
    expect(buttons().some(b => b.classList.contains('bg-primary'))).toBe(false);
    expect(buttons().map(b => b.className.match(/bg-(green|orange|red)-\d+/)?.[1])).toEqual(['green', 'orange', 'red']);

    buttons()[0].click(); // 25 -> 24
    await fixture.whenStable();
    expect(el.textContent).toContain('Places restantes : 24');

    buttons()[2].click(); // full: stays at 0
    await fixture.whenStable();
    expect(el.textContent).not.toContain('Places restantes : -1');

    (fixture.componentInstance as any).search.set('sign');
    await fixture.whenStable();
    expect(el.querySelectorAll('button').length).toBe(1);

    (fixture.componentInstance as any).search.set('zzz');
    await fixture.whenStable();
    expect(el.textContent).toContain('Aucune conférence ne correspond');
  });
});
