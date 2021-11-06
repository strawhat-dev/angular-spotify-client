import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-thermometer',
  templateUrl: './thermometer.component.html',
  styleUrls: ['./thermometer.component.css'],
})
export class ThermometerComponent implements OnInit {
  @Input() feature: any;
  constructor() {}
  ngOnInit() {}
}
