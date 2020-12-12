import { Injectable } from '@angular/core';
import { STUDENTS } from './mock.data';

@Injectable({
    providedIn: 'root'
})

export class DummyService {
    students = STUDENTS["0"]["data"];

    constructor(){}

    getData(){
        return this.students;
    }
}