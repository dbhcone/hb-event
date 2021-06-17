import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  history = {...history.state}
  data : {} = null;
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const eventId = params.get("id");
      console.log('event id ', eventId)
    })
    console.log('history', this.history);
    if (this.history.data) {
      this.data = this.history.data;
    } else {

    }
  }

  stringifyData() {
    return JSON.stringify(this.data, null, 4)
  }

}
