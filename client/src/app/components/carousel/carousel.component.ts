import { Component, OnInit, Input } from '@angular/core';
import { ResourceData } from '../../data/resource-data';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  @Input() resources: ResourceData[];
  current: number;
  constructor() {
    this.current = 0;
  }

  ngOnInit() {}
  prev() {
    const prev = this.current - 1;
    this.current = prev < 0 ? this.resources.length - 1 : prev;
  }
  next() {
    const next = this.current + 1;
    this.current = next === this.resources.length ? 0 : next;
  }
}
