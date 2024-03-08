import { Component, DoCheck } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Priority, Status } from '../../shared/models/interfaces/task.interface';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

interface CreateTaskForm {
  title: FormControl<string | null>;
  description: FormControl<string | null>;
  status: FormControl<Status | null>;
  priority: FormControl<Priority | null>;
  deadlineDate: FormControl<Date | null>;
  executorId: FormControl<string | null>;
}
/** @title Input with a custom ErrorStateMatcher */
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
})
export class CreateTaskComponent implements DoCheck {
  selected = 'option2';
  formGroup: FormGroup;
  titleFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('', [Validators.required]);
  // descriptionFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  constructor() {
    this.formGroup = new FormGroup<CreateTaskForm>({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      status: new FormControl(Status.Open, [Validators.required]),
      priority: new FormControl(null, [Validators.required]),
      deadlineDate: new FormControl(null, [Validators.required]), // маску юзнуть
      executorId: new FormControl(null, [Validators.required]),
    });
  }
  ngDoCheck() {
    console.log('прикол');
    // console.log(this.titleFormControl.errors);
    // console.log(this.titleFormControl);
  }

  test() {
    console.log(this.formGroup);
    console.log(this.formGroup.value);
  }
}
// ДЛЯ ОПИСАНИЯ TEXT AREA
// ПРОСТО ОБЬЕКТ С ПОЛЬЗОВАТЕЛЯМИ
// добавить маску в дату
// enum передавать в status
// Должно сохраняться в один обьект
