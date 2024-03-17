import { Directive, HostBinding, Input, OnInit } from '@angular/core';
import { Priority } from '../models/interfaces/task.interface';
import { PRIORITY_MAP } from '../constants/priority.const';

@Directive({
  selector: '[appPriorityColor]',
  standalone: true,
})
export class PriorityColorDirective implements OnInit {
  @HostBinding('style.background') background?: string;
  @Input() appPriorityColor!: string;

  ngOnInit() {
    this.colorDetection(this.appPriorityColor);
  }
  colorDetection(priority: string) {
    switch (priority) {
      case PRIORITY_MAP[Priority.Low]:
        this.background = 'green';
        break;
      case PRIORITY_MAP[Priority.Medium]:
        this.background = 'orange';
        break;
      case PRIORITY_MAP[Priority.Hard]:
        this.background = 'red';
        break;
    }
  }
}
