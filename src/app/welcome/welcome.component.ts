import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SignupModel } from './signupModel';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  @ViewChild('name') nameKey!: ElementRef;

  public name: string = '';
  constructor() {}

  ngOnInit(): void {
    this.name = localStorage.getItem('name')!;
  }
  startQuiz() {
    localStorage.setItem('name', this.nameKey.nativeElement.value);
  }

  sexos = ['Femenino', 'Masculino'];
  estadoCivil = ['Soltero', 'Casado', 'Divorciado', 'Viudo', 'Unión libre'];
  model = new SignupModel();
  submitted = false;
  confirm = false;

  onSubmit() {
    this.submitted = true;
  }

  confirmSubmit() {
    this.confirm = true;
    this.submitted = false;

    console.log('Confirm');
  }
}
