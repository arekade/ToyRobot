import { Component, OnInit } from '@angular/core';
import { Robot } from './robot.model';
import { FormControl, Validators } from '@angular/forms';

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

}
