// https://fullcalendar.io/docs/duration
// https://www.npmjs.com/package/ng-fullcalendar
// https://github.com/Jamaks/ng-fullcalendar-demo

import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { EventSesrvice } from './event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  calendarOptions: Options;
  displayEvent: any;
  events = null;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(protected eventService: EventSesrvice) { }

  ngOnInit() {
    this.calendarOptions = {
      defaultView: 'agendaWeek',
      editable: false,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      events: [],
      businessHours: [ // specify an array instead
        {
          dow: [1, 2, 3, 4, 5], // Monday, Tuesday, Wednesday
          start: '08:15', // 8am
          end: '17:00' // 6pm
        },
        {
          dow: [6], // Thursday, Friday
          start: '10:00', // 10am
          end: '16:00' // 4pm
        }
      ]
    };
  }
  loadevents() {
    this.eventService.getEvents().subscribe(data => {
      this.events = data;
    });
  }
  clickButton(model: any) {
    this.displayEvent = model;
  }
  dayClick(model: any) {
    console.log(model);
  }
  eventClick(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        allDay: model.event.allDay
        // other params
      },
      duration: {}
    }
    this.displayEvent = model;
  }
  updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
        // other params
      },
      duration: {
        _data: model.duration._data
      }
    }
    this.displayEvent = model;
  }
}
