import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../service/question.service';
import { DxChartModule } from 'devextreme-angular';
import { GrossProduct } from '../service/prueba.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  // providers: [Service],
})
export class QuestionComponent implements OnInit {
  // grossProductData: GrossProduct[] = [];

  grossProductData: GrossProduct[] = [
    {
      letter: 'D',
      value: 1,
    },
    {
      letter: 'I',
      value: 55,
    },
    {
      letter: 'S',
      value: 15,
    },
    {
      letter: 'C',
      value: 91,
    },
  ];

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

  constructor(private questionService: QuestionService) {
    // this.grossProductData;
  }

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
    // this.disabledButtons.push(this.resultados.indexOf(this.temp));
    // const temp = this.selectedValue;
    console.log('Array de resultados: ' + this.resultados);
    // console.log(this.questionList[this.currentPosition].options[this.currentPosition].value);

    // console.log('Array constante');
    // console.log(
    //   this.questionList[this.currentPosition].options.indexOf('ORIGINAL')
    // );

    //  console.log(this,this.resultados.slice(-1)[0] );

    // console.log(
    //   'Tamaño de arreglo botones disable: ' + this.disabledButtons.length
    // );
    // if (this.disabledButtons.length === 1) {
    //   this.disabledButtons = [];
    //   console.log('Hay un dato');
    // }

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
    let result = text.includes('M');

    if (
      this.questionList[this.currentPosition].options[index].type ==
      'Motivacional'
    ) {
      this.valuesM.push(
        this.questionList[this.currentPosition].options[index].value
        // this.valuesM.id=5
      );
    } else {
      this.valuesL.push(
        this.questionList[this.currentPosition].options[index].value
      );
    }
    // console.log(result);
    console.log(this.valuesM);
    console.log(this.valuesL);

    // this.values.push(
    //   this.questionList[this.currentPosition].options[index].value
    // );
    console.log('Arreglo de values: ' + this.values);

    // let countObj = this.values.reduce(
    //   (acc: any, val: any) => ((acc[val] = acc[val] ? acc[val] + 1 : 1), acc),
    //   {}
    // );
    // console.log(countObj);

    let countObjM = this.valuesM.reduce(
      (acc: any, val: any) => ((acc[val] = acc[val] ? acc[val] + 1 : 1), acc),
      {}
    );
    console.log(countObjM);

    const keys = Object.keys(countObjM);

    const finalResults = keys.map((key) => ({
      letter: key,
      value: countObjM[key],
    }));

    this.finalM = finalResults;
    
    console.log('Final results: ', finalResults);
    delete this.finalM['X']
    // let resultS = Object.entries(countObjM).map(([k, v]) => ({ [k]: v }));

    // console.log(resultS);

    // this.finalM = resultS;

    let countObjL = this.valuesL.reduce(
      (acc: any, val: any) => ((acc[val] = acc[val] ? acc[val] + 1 : 1), acc),
      {}
    );
    console.log(countObjL);

    this.disabledButtons.push(index);

    // if (this.resultados.includes(temp)) {
    //   console.log('true');
    // } else {
    //   console.log('false');
    // }

    // this.disabledButtons = [];

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
    }

    if (this.currentQuestion == 7) {
      console.log('7');
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
