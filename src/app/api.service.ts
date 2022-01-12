import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, map, take, tap } from 'rxjs/operators';
import { User } from './auth/user.model';
import { Commitee } from './home/commitee/commitee.model';
import { Event } from './home/event.model';
import { Speaker } from './home/speaker.model';
import { Sponsor } from './home/sponsor/sponsor.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  events = new BehaviorSubject<Event[]>(null);
  event = new BehaviorSubject<Event>(null);
  speaker = new BehaviorSubject<Speaker>(null);
  speakers = new BehaviorSubject<Speaker[]>(null);
  titleChanged = new BehaviorSubject<boolean>(true);
  startDateSub = new BehaviorSubject<Date>(null);
  endDateSub = new BehaviorSubject<Date>(null);
  searchBy = new BehaviorSubject<string>(null);
  startDate: Date;
  endDate: Date;

  titleDidNotChange = true;
  eventsArray = new Array();

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  findEvents() {
    this.eventsArray = [];
    const sqlData = JSON.stringify(null);
    return this.http.post<any[]>(`${this.baseUrl}/EventFunctions/getEvent`, sqlData).pipe(
      map((data) => {
        for (const d of data) {
          const event = new Event(
            d.id,
            d.title,
            d.logo,
            d.startdate,
            d.enddate,
            d.duration,
            d.description,
            this.findSpeakersOfEvent(d.id),
            this.findComitteeOfEvent(d.id),
            this.findSponsorsOfEvent(d.id),
            d.price
          );
          this.eventsArray.push(event);
        }
        return this.eventsArray;
      }),
      tap((events) => {
        this.events.next(this.eventsArray);
      })
    );
  }

  findEventByTitle(title) {
    const sqlData = JSON.stringify({ title });
    return this.http.post<any[]>(`${this.baseUrl}/EventFunctions/getEventByTitle`, sqlData).pipe(
      map((data) => {
        for (const d of data) {
          const event = new Event(
            d.id,
            d.title,
            d.logo,
            d.startdate,
            d.enddate,
            d.duration,
            d.description,
            this.findSpeakersOfEvent(d.id),
            this.findComitteeOfEvent(d.id),
            this.findSponsorsOfEvent(d.id),
            d.price
          );
          return event;
        }
      }),
      tap((event) => {
        this.event.next(event);
      })
    );
  }

  findEventById(id) {
    const sqlData = JSON.stringify({ id });
    return this.http.post<any[]>(`${this.baseUrl}/EventFunctions/getEventById`, sqlData).pipe(
      map((data) => {
        for (const d of data) {
          const event = new Event(
            d.id,
            d.title,
            d.logo,
            d.startdate,
            d.enddate,
            d.duration,
            d.description,
            this.findSpeakersOfEvent(d.id),
            this.findComitteeOfEvent(d.id),
            this.findSponsorsOfEvent(d.id),
            d.price
          );
          return event;
        }
      })
    );
  }

  searchFilter(datafilter) {
    this.titleChanged.next(datafilter);
  }

  findSpeakers(name) {
    const speakerArray = [];
    const sqlData = JSON.stringify({ name });
    return this.http.post<any[]>(`${this.baseUrl}/SpeakerFunctions/findSpeakers`, sqlData).pipe(
      map((data) => {
        for (const d of data) {
          const speaker = new Speaker(
            d.id,
            d.name,
            d.image,
            d.email,
            d.biography,
            d.telephone
          );
          speakerArray.push(speaker);
        }
        return speakerArray;
      }),
      tap((speakers) => {
        this.speakers.next(speakers);
      })
    );
  }

  payment(eventid, userid) {
    const sqlData = JSON.stringify({ eventid, userid });
    this.http.post<string>(`${this.baseUrl}/PaidEventsFunctions/payment`, sqlData).subscribe();
  }

  getPaidEvents(id) {
    const sqlData = JSON.stringify({ id });
    return this.http.post<string[]>(`${this.baseUrl}/PaidEventsFunctions/getpaidevents`, sqlData);
  }

  checkPayment(eventid, userid) {
    const sqlData = JSON.stringify({ eventid, userid });
    return this.http
      .post<string[]>(`${this.baseUrl}/PaidEventsFunctions/checkIfTheUserPaidTheEvent`, sqlData)
      .pipe(
        map((data) => {
          if (data) {
            return true;
          } else {
            return false;
          }
        })
      );
  }

  addToLoveList(eventid, userid) {
    const sqlData = JSON.stringify({ eventid, userid });
    this.http.post<any>(`${this.baseUrl}/LoveListFunctions/addtoLoveList`, sqlData).subscribe(data =>{
      console.log(data);
    }
    );
  }

  isEventInLoveList(eventid, userid) {
    const sqlData = JSON.stringify({ eventid, userid });
    return this.http
      .post<any>(`${this.baseUrl}/LoveListFunctions/isEventInLoveList`, sqlData);
  }

  getLoveList(userid) {
    const sqlData = JSON.stringify({ userid });
    return this.http.post<string[]>(`${this.baseUrl}/LoveListFunctions/getLoveEvents`, sqlData);
  }

  deleteFromLoveList(eventid, userid){
    const sqlData = JSON.stringify({ eventid, userid });
    this.http.post<any>(`${this.baseUrl}/LoveListFunctions/deleteFromLoveList`, sqlData).subscribe();
  }

  findSpeakerswithId(id) {
    const sqlData = JSON.stringify({ id });
    return this.http.post<any>(`${this.baseUrl}/SpeakerFunctions/findSpeaker`, sqlData).pipe(
      map((data) => {
        const speaker = new Speaker(
          data.id,
          data.name,
          data.image,
          data.email,
          data.biography,
          data.telephone
        );
        return speaker;
      })
    );
  }
  findCommiteeWithId(id) {
    const sqlData = JSON.stringify({ id });
    return this.http.post<any>(`${this.baseUrl}/CommitteeFunctions/findCommitee`, sqlData).pipe(
      map((data) => {
        const commitee = new Commitee(
          data.id,
          data.name,
          data.image,
          data.university,
          data.email,
          data.biography
        );
        return commitee;
      })
    );
  }

  findSponsorWithId(id) {
    const sqlData = JSON.stringify({ id });
    return this.http.post<any>(`${this.baseUrl}/SponsorFunctions/findSponsor`, sqlData).pipe(
      map((data) => {
        const sponsor = new Sponsor(
          data.id,
          data.name,
          data.description,
          data.slogan,
          data.telephone,
          data.email,
          data.facebook,
          data.twitter,
          data.logo,
        );
        return sponsor;
      })
    );
  }


  private findComitteeOfEvent(idEvent){
    const commiteeArray = new Array();
    const sqlData = JSON.stringify({ idEvent });
    this.http
      .post<any[]>(`${this.baseUrl}/CommitteeFunctions/findCommiteeOfEvent`, sqlData)
      .pipe(
        map((data) => {
          for (const d of data) {
            const commitee = new Commitee(
              d.id,
              d.name,
              d.image,
              d.university,
              d.email,
              d.biography
            );
            commiteeArray.push(commitee);
          }
        })
      )
      .subscribe();
    return commiteeArray;
  }


  private findSponsorsOfEvent(idEvent){
    const sponsorsArray = new Array();
    const sqlData = JSON.stringify({ idEvent });
    this.http
      .post<any[]>(`${this.baseUrl}/SponsorFunctions/findSponsorsOfEvent`, sqlData)
      .pipe(
        map((data) => {
          for (const d of data) {
            const sponsor = new Sponsor(
              d.id,
              d.name,
              d.description,
              d.slogan,
              d.telephone,
              d.email,
              d.facebook,
              d.twitter,
              d.logo,
            );
            sponsorsArray.push(sponsor);
          }
        })
      )
      .subscribe();
    return sponsorsArray;
  }


  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError('Error! something went wrong.');
  }

  private findSpeakersOfEvent(idEvent) {
    const speakerArray = new Array();
    const sqlData = JSON.stringify({ idEvent });
    this.http
      .post<any[]>(`${this.baseUrl}/SpeakerFunctions/findSpeakersofEvent`, sqlData)
      .pipe(
        map((data) => {
          for (const d of data) {
            const speaker = new Speaker(
              d.id,
              d.name,
              d.image,
              d.email,
              d.biography,
              d.telephone
            );
            speakerArray.push(speaker);
          }
        })
      )
      .subscribe();
    return speakerArray;
  }
}
