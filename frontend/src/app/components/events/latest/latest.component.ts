import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import 'swiper/swiper-bundle.css'

import SwiperCore, {Navigation, Pagination, Scrollbar, Autoplay, A11y} from 'swiper/core';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

@Component({
  selector: 'event-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LatestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  onSlideChange () {
    console.log('On slide Change')
  }
  onSwiper(event) {
    console.log('On swiper', event);
  }

}
