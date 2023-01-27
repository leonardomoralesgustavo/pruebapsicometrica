import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  public name: string = '';
  public questionList: any = [];
  public resultados: any = [];
  public values: any = [];
  public valuesM: any = [];
  public valuesL: any = [];
  public currentQuestion: number = 0;
  public currentPosition: number = 0;
  public points: number = 0;
  public temp = '';
  public elementClicked: any = '';
  counter = 60;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$: any;
  progress: string = '0';
  isQuizCompleted: boolean = false;
  selectedValue = '';
  disabledButtons: any = [];

  auxValue: number = 0;

  public finalM: any = [];
  public finalL: any = [];

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.name = localStorage.getItem('name')!;
    this.getAllQuestions();
    // this.startCounter();
  }

  callAction(action: any) {
    console.log(action);
  }

  onClick(e: any) {
    // this.elementClicked = e.target.innerHTML;
    // console.log((this.elementClicked = e.target.innerHTML));
    // if ((this.elementClicked = e.target.innerHTML = 'GENTIL')) {
    //   document.getElementById('lista')!.style.pointerEvents = 'none';
    // }
  }

  radioFun() {
    console.log(this.selectedValue);
  }

  getAllQuestions() {
    this.questionService.getQuestionJson().subscribe((res) => {
      this.questionList = res.questions;
    });
  }

  nextQuestion() {
    this.resultados.push(this.selectedValue);
    this.temp = this.selectedValue;

    console.log('Temporal: ' + this.temp);
    console.log('Posición del temporal:' + this.resultados.indexOf(this.temp));
    console.log('Array de resultados: ' + this.resultados);

    let lastElement = this.resultados[this.resultados.length - 1];

    console.log(lastElement);

    let index: any;
    for (
      let idx = 0;
      idx < this.questionList[this.currentPosition].options.length;
      idx++
    ) {
      if (
        this.questionList[this.currentPosition].options[idx].text ===
        lastElement
      ) {
        index = idx;
        break;
      }
    }

    console.log(index);
    this.auxValue = index;
    console.log(
      'Value: ' + this.questionList[this.currentPosition].options[index].value
    );

    let text = this.questionList[this.currentPosition].options[index].value;

    if (
      this.questionList[this.currentPosition].options[index].type ==
      'Motivacional'
    ) {
      this.valuesM.push(
        this.questionList[this.currentPosition].options[index].value
      );
    } else {
      this.valuesL.push(
        this.questionList[this.currentPosition].options[index].value
      );
    }

    console.log(this.valuesM);
    while (this.valuesM.indexOf('X') !== -1) {
      this.valuesM.splice(this.valuesM.indexOf('X'), 1);
    }
    console.log('Elimnando la X en Motivacional: ', this.valuesM);
    console.log(this.valuesL);
    while (this.valuesL.indexOf('X') !== -1) {
      this.valuesL.splice(this.valuesL.indexOf('X'), 1);
    }
    console.log('Elimnando la X en Low: ', this.valuesL);
    console.log('Arreglo de values: ' + this.values);

    // iteracion de array Motivacional
    //Aquí va el código que se agregué en la función al detectar el fin de las preguntas de Motivacional
    // iteracion de array Motivacional

    // iteracion de arra Low

    // iteracion de arra Low

    // orde disc
    // function move(from: any, to: any, arr: any) {
    //   const newArr = [...arr];
    //   const item = newArr.splice(from, 1)[0];
    //   newArr.splice(to, 0, item);
    //   return newArr;
    // }

    // console.log(move(3, 1, this.finalM));
    // order disc

    this.disabledButtons.push(index);

    this.selectedValue = '';
    this.currentQuestion++;
    console.log(this.currentQuestion);
    this.currentPosition++;

    if (this.currentPosition % 2 == 0) {
      this.disabledButtons = [];
    }

    console.log(this.questionList.length);

    if (this.currentQuestion == this.questionList.length) {
      this.isQuizCompleted = true;

      let countObjM = this.valuesM.reduce(
        (acc: any, val: any) => ((acc[val] = acc[val] ? acc[val] + 1 : 1), acc),
        {}
      );
      console.log(countObjM);

      //agregar aqu]i ceros
      ['D', 'I', 'S', 'C'].forEach((element) => {
        if (!(element in countObjM)) countObjM[element] = 0;
      });

      const keysM = Object.keys(countObjM);
      const finalResultsM = keysM.map((key) => ({
        letter: key,
        value: countObjM[key],
        index:
          key === 'D'
            ? 0
            : key === 'I'
            ? 1
            : key === 'S'
            ? 2
            : key === 'C' && 3,
      }));

      this.finalM = finalResultsM;
      console.log('Final resultsM: ', finalResultsM);
      this.finalM.sort((a: any, b: any) => a.index - b.index);
      console.log('Ordenado Motivacional ', this.finalM);

      let countObjL = this.valuesL.reduce(
        (acc: any, val: any) => ((acc[val] = acc[val] ? acc[val] + 1 : 1), acc),
        {}
      );
      console.log(countObjL);
      //Agregar aqui la acción de
      ['D', 'I', 'S', 'C'].forEach((element) => {
        if (!(element in countObjL)) countObjL[element] = 0;
      });

      const keysL = Object.keys(countObjL);
      const finalResultsL = keysL.map((key) => ({
        letter: key,
        value: countObjL[key],
        index:
          key === 'D'
            ? 0
            : key === 'I'
            ? 1
            : key === 'S'
            ? 2
            : key === 'C' && 3,
      }));

      this.finalL = finalResultsL;
      console.log('Final resultsL: ', finalResultsL);
      this.finalL.sort((a: any, b: any) => a.index - b.index);
      console.log('Ordenado Low ', this.finalL);

      console.log(countObjM);
      console.log(countObjL);
    }

    // this.resetCounter();
    // this.getProgressPercent();
  }

  convertArray() {
    const keys = Object.keys;
  }

  previousQuestion() {
    this.currentQuestion--;
  }

  answer(currentQno: number, option: any) {
    // if (currentQno === this.questionList.length) {
    //   this.isQuizCompleted = true;
    //   this.stopCounter();
    // }
    if (option.correct) {
      this.points += 10;
      this.correctAnswer++;
      // setTimeout(() => {
      //   this.currentQuestion++;
      //   this.resetCounter();
      //   this.getProgressPercent();
      // }, 1000);
    } else {
      // setTimeout(() => {
      //   this.currentQuestion++;
      //   this.inCorrectAnswer++;
      //   this.resetCounter();
      //   this.getProgressPercent();
      // }, 1000);

      this.points -= 10;
    }
  }

  startCounter() {
    this.interval$ = interval(1000).subscribe((val) => {
      this.counter--;
      if (this.counter === 0) {
        this.currentQuestion++;
        this.counter = 60;
        this.points -= 10;
      }
    });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }

  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }

  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }

  resetQuiz() {
    this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.counter = 60;
    this.currentQuestion = 0;
    this.progress = '0';
  }

  getProgressPercent() {
    this.progress = (
      (this.currentQuestion / this.questionList.length) *
      100
    ).toString();
    return this.progress;
  }
}
