import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Goal } from '../../models/goal.model';
@Injectable({
  providedIn: 'root',
})
export class GoalService {
  private _goals$ = new BehaviorSubject<Goal[]>([]);
  goals$ = this._goals$.asObservable();
  constructor() {
    this.load();
  }
  private load(): void {
    const data = localStorage.getItem('goal');
    if (data) {
      this._goals$.next(JSON.parse(data));
    }
  }
  private save(goals: Goal[]): void {
    localStorage.setItem('goal', JSON.stringify(goals));
    this._goals$.next(goals);
  }

  addGoal(title: string, description: string): void {
    const newGoal: Goal = {
      id: Date.now(),
      title,
      description,
      createdAt: new Date(),
      completed: false,
    };
    this.save([...this._goals$.value, newGoal]);
  }
  toggleGoal(id: number) {
    const updated = this._goals$.value.map((g) =>
      g.id === id ? { ...g, completed: !g.completed } : g,
    );
    this.save(updated);
  }

  deleteGoal(id: number) {
    const updated = this._goals$.value.filter((g) => g.id !== id);
    this.save(updated);
  }
}
