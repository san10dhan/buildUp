export interface Goal {
  id: number;
  title: string;
  description?: string;
  createdAt: Date;
  completed: boolean;
}
