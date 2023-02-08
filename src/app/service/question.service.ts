import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  getQuestionJson() {
    return this.http.get<any>('assets/questions.json');
  }

  // results motivacional

  getResultsDM() {
    return this.http.get<any>('assets/motivacional/dm.json');
  }

  getResultsIM() {
    return this.http.get<any>('assets/motivacional/im.json');
  }

  getResultsSM() {
    return this.http.get<any>('assets/motivacional/sm.json');
  }

  getResultsCM() {
    return this.http.get<any>('assets/motivacional/cm.json');
  }

  // results low

  getResultsDL() {
    return this.http.get<any>('assets/low/dl.json');
  }

  getResultsIL() {
    return this.http.get<any>('assets/low/il.json');
  }

  getResultsSL() {
    return this.http.get<any>('assets/low/sl.json');
  }

  getResultsCL() {
    return this.http.get<any>('assets/low/cl.json');
  }

  // results total

  getResultsDT(){
    return this.http.get<any>('assets/general/dt.json');
  }

  getResultsIT(){
    return this.http.get<any>('assets/general/it.json');
  }

  getResultsST(){
    return this.http.get<any>('assets/general/st.json');
  }

  getResultsCT(){
    return this.http.get<any>('assets/general/ct.json');
  }
}
