import { Component, OnInit } from '@angular/core';
import { Robot } from './robot.model';
import { FormControl, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Robot';
  MyRobot: Robot;
  xPos: FormControl;
  yPos: FormControl;
  face: FormControl;
  reports: any[] = [];

  exampleData = [{
    step: [
      { action: 'move'},
      { action: 'report'}
    ],
    text: 'Move, Report'},
    {   
    step: [
      { action: { 'place' : {x:0, y:0, f:'North'} }},
      { action: 'report'}
    ],
    text: 'Place [0, 0, North], Report'},
    {   
    step: [
      { action: { 'place' : {x:0, y:0, f:'North'} }},
      { action: 'move'},
      { action: 'move'},
      { action: 'report'}
    ],
    text: 'Place [0, 0, North], Move, Move, Report'},
    {   
    step: [
      { action: { 'place' : {x:1, y:2, f:'East'} }},
      { action: { 'turn' : 'left' }},
      { action: 'move'},
      { action: 'report'}
    ],
    text: 'Place [1, 2, East], Turn left, Move, Report'},    
  ]

  ngOnInit() {
    this.MyRobot = new Robot([]);
    this.xPos = new FormControl(null, [Validators.required, Validators.max(5), Validators.min(0)]);
    this.yPos = new FormControl(null, [Validators.required, Validators.max(5), Validators.min(0)]);
    this.face = new FormControl(null, [Validators.required]);
  }

  place() {
    this.MyRobot.Place(this.xPos.value, this.yPos.value, this.face.value);
    this.reports.push('Placed ' + this.MyRobot.Report());
    // this.reports.push(this.MyRobot.Report());
  }

  move() {
    this.MyRobot.Move();
    this.reports.push('Move');
  }

  report() {
    this.reports.push(this.MyRobot.Report());
  }

  turn(direction) {
    this.MyRobot.Turn(direction);
    this.reports.push('Turn ' + direction);
  }

  sample() {
    this.exampleData.map(data => {
      this.reports.push('<strong>Sample set: ' + data.text + '</strong>');
      data.step.map(step => {
        switch (step.action) {
          case 'move':
            this.move();
            return;
          case 'report':
            this.report();
            return;
          default:
            if (step.action['place']) {
              this.MyRobot.Place(step.action['place'].x, step.action['place'].y, step.action['place'].f);
            }
            else if (step.action['turn']){
              this.turn(step.action['turn']);
            }
        }
      })
    });
  }

}
