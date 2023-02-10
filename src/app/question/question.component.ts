import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  public name: string = '';
  public questionList: any = [];
  public resultsDM: any = [];
  public resultsIM: any = [];
  public resultsSM: any = [];
  public resultsCM: any = [];
  public resultsDL: any = [];
  public resultsIL: any = [];
  public resultsSL: any = [];
  public resultsCL: any = [];
  public resultsDT: any = [];
  public resultsIT: any = [];
  public resultsST: any = [];
  public resultsCT: any = [];
  public resultados: any = [];
  public values: any = [];
  public valuesM: any = [];
  public valuesL: any = [];
  public currentQuestion: number = 0;
  public currentPosition: number = 0;
  public points: number = 0;
  public temp = '';
  public elementClicked: any = '';
  correctAnswer: number = 0;
  isQuizCompleted: boolean = false;
  selectedValue = '';
  disabledButtons: any = [];

  auxValue: number = 0;

  public finalM: any = [];
  public finalL: any = [];

  public finalMReOrder: any = [];
  public finalLReOrder: any = [];
  public graficaTotales: any = [];

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.name = localStorage.getItem('name')!;
    this.getAllQuestions();
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

    // results motivacional
    this.questionService.getResultsDM().subscribe((res) => {
      this.resultsDM = res.results;
    });

    this.questionService.getResultsIM().subscribe((res) => {
      this.resultsIM = res.results;
    });

    this.questionService.getResultsSM().subscribe((res) => {
      this.resultsSM = res.results;
    });

    this.questionService.getResultsCM().subscribe((res) => {
      this.resultsCM = res.results;
    });

    // results low
    this.questionService.getResultsDL().subscribe((res) => {
      this.resultsDL = res.results;
    });

    this.questionService.getResultsIL().subscribe((res) => {
      this.resultsIL = res.results;
    });

    this.questionService.getResultsSL().subscribe((res) => {
      this.resultsSL = res.results;
    });

    this.questionService.getResultsCL().subscribe((res) => {
      this.resultsCL = res.results;
    });

    // results total
    this.questionService.getResultsDT().subscribe((res) => {
      this.resultsDT = res.results;
    });

    this.questionService.getResultsIT().subscribe((res) => {
      this.resultsIT = res.results;
    });

    this.questionService.getResultsST().subscribe((res) => {
      this.resultsST = res.results;
    });

    this.questionService.getResultsCT().subscribe((res) => {
      this.resultsCT = res.results;
    });
  }

  nextQuestion() {
    this.resultados.push(this.selectedValue);
    this.temp = this.selectedValue;

    // console.log('Temporal: ' + this.temp);
    // console.log('Posición del temporal:' + this.resultados.indexOf(this.temp));
    // console.log('Array de resultados: ' + this.resultados);

    let lastElement = this.resultados[this.resultados.length - 1];

    // console.log(lastElement);

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

    // console.log(index);
    this.auxValue = index;
    console.log(
      'Value: ' + this.questionList[this.currentPosition].options[index].value
    );

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

    // console.log(this.valuesM);
    while (this.valuesM.indexOf('X') !== -1) {
      this.valuesM.splice(this.valuesM.indexOf('X'), 1);
    }
    // console.log('Elimnando la X en Motivacional: ', this.valuesM);
    console.log(this.valuesL);
    while (this.valuesL.indexOf('X') !== -1) {
      this.valuesL.splice(this.valuesL.indexOf('X'), 1);
    }
    // console.log('Elimnando la X en Low: ', this.valuesL);
    // console.log('Arreglo de values: ' + this.values);

    this.disabledButtons.push(index);

    this.selectedValue = '';
    this.currentQuestion++;
    // console.log(this.currentQuestion);
    this.currentPosition++;

    if (this.currentPosition % 2 == 0) {
      this.disabledButtons = [];
    }

    // console.log(this.questionList.length);

    if (this.currentQuestion == this.questionList.length) {
      this.isQuizCompleted = true;

      // iteracion de values and data en Motivacional
      let countObjM = this.valuesM.reduce(
        (acc: any, val: any) => ((acc[val] = acc[val] ? acc[val] + 1 : 1), acc),
        {}
      );
      console.log(countObjM);

      //se agregan 0 si no hay algún valor
      ['D', 'I', 'S', 'C'].forEach((element) => {
        if (!(element in countObjM)) countObjM[element] = 0;
      });
      //se agregan 0 si no hay algún valor

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

      const foundDM = this.resultsDM.find((obj: any) => {
        return obj.result === this.finalM[0].value;
      });

      const foundIM = this.resultsIM.find((obj: any) => {
        return obj.result === this.finalM[1].value;
      });

      const foundSM = this.resultsSM.find((obj: any) => {
        return obj.result === this.finalM[2].value;
      });

      const foundCM = this.resultsCM.find((obj: any) => {
        return obj.result === this.finalM[3].value;
      });

      const finalResultsMNew = keysM.map((key) => ({
        letter: key,
        value:
          key === 'D'
            ? foundDM.value
            : key === 'I'
            ? foundIM.value
            : key === 'S'
            ? foundSM.value
            : key === 'C' && foundCM.value,
        index:
          key === 'D'
            ? 0
            : key === 'I'
            ? 1
            : key === 'S'
            ? 2
            : key === 'C' && 3,
      }));
      console.log(finalResultsMNew);
      this.finalMReOrder = finalResultsMNew;
      this.finalMReOrder.sort((a: any, b: any) => a.index - b.index);

      console.log('Nuevo ordenamiento en M: ', this.finalMReOrder);

      // iteracion de values and data en Motivacional

      // iteracion de values and data en Low

      let countObjL = this.valuesL.reduce(
        (acc: any, val: any) => ((acc[val] = acc[val] ? acc[val] + 1 : 1), acc),
        {}
      );
      console.log(countObjL);

      //se agregan 0 si no hay algún valor
      ['D', 'I', 'S', 'C'].forEach((element) => {
        if (!(element in countObjL)) countObjL[element] = 0;
      });
      //se agregan 0 si no hay algún valor

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

      const foundDL = this.resultsDL.find((obj: any) => {
        return obj.result === this.finalL[0].value;
      });

      const foundIL = this.resultsIL.find((obj: any) => {
        return obj.result === this.finalL[1].value;
      });

      const foundSL = this.resultsSL.find((obj: any) => {
        return obj.result === this.finalL[2].value;
      });

      const foundCL = this.resultsCL.find((obj: any) => {
        return obj.result === this.finalL[3].value;
      });

      const finalResultsLNew = keysM.map((key) => ({
        letter: key,
        value:
          key === 'D'
            ? foundDL.value
            : key === 'I'
            ? foundIL.value
            : key === 'S'
            ? foundSL.value
            : key === 'C' && foundCL.value,
        index:
          key === 'D'
            ? 0
            : key === 'I'
            ? 1
            : key === 'S'
            ? 2
            : key === 'C' && 3,
      }));
      console.log(finalResultsLNew);
      this.finalLReOrder = finalResultsLNew;
      this.finalLReOrder.sort((a: any, b: any) => a.index - b.index);

      console.log('Nuevo ordenamiento en L: ', this.finalLReOrder);

      // iteracion de values and data en Low

      // iteración array de totales

      const finArray = keysM.map((key) => ({
        letter: key,
        value: countObjM[key] - countObjL[key],
        index:
          key === 'D'
            ? 0
            : key === 'I'
            ? 1
            : key === 'S'
            ? 2
            : key === 'C' && 3,
      }));
      console.log(finArray);

      finArray.sort((a: any, b: any) => a.index - b.index);

      console.log('Ordenamiento final: ', finArray);

      const foundDT = this.resultsDT.find((obj: any) => {
        return obj.result === finArray[0].value;
      });
      console.log(foundDT);

      const foundIT = this.resultsIT.find((obj: any) => {
        return obj.result === finArray[1].value;
      });
      console.log(foundIT);

      const foundST = this.resultsST.find((obj: any) => {
        return obj.result === finArray[2].value;
      });
      console.log(foundST);

      const foundCT = this.resultsCT.find((obj: any) => {
        return obj.result === finArray[3].value;
      });
      console.log(foundCT);

      const graficaTotales = keysM.map((key) => ({
        letter: key,
        value:
          key === 'D'
            ? foundDT.value
            : key === 'I'
            ? foundIT.value
            : key === 'S'
            ? foundST.value
            : key === 'C' && foundCT.value,
        index:
          key === 'D'
            ? 0
            : key === 'I'
            ? 1
            : key === 'S'
            ? 2
            : key === 'C' && 3,
      }));
      console.log(graficaTotales);
      this.graficaTotales = graficaTotales;
      graficaTotales.sort((a: any, b: any) => a.index - b.index);

      console.log('Ordenamiento gráfica totales: ', this.graficaTotales);

      // iteración array de totales
    }
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
}
