import { Priority } from '../models/interfaces/task.interface';

interface PriorityOption {
  value: Priority;
  label: string;
}

export const PRIORITY_MAP: Record<Priority, string> = {
  [Priority.Low]: 'Низкий',
  [Priority.Medium]: 'Средний',
  [Priority.Hard]: 'Высокий',
};

export const PRIORITY_OPTIONS: PriorityOption[] = [
  {
    value: Priority.Low,
    label: PRIORITY_MAP[Priority.Low],
  },
  {
    value: Priority.Medium,
    label: PRIORITY_MAP[Priority.Medium],
  },
  {
    value: Priority.Hard,
    label: PRIORITY_MAP[Priority.Hard],
  },
];
