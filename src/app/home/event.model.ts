import { Commitee } from './commitee/commitee.model';
import { Speaker } from './speaker.model';
import { Sponsor } from './sponsor/sponsor.model';

export class Event {
  public id: string;
  public title: string;
  public logo: string;
  public startDate: Date;
  public endDate: Date;
  public duration: number;
  public description: string;
  public speakers: Speaker[];
  public commitee: Commitee[];
  public sponsor: Sponsor[];
  public price: number;

  // eslint-disable-next-line max-len
  constructor(id: string, title: string, logo: string, startDate: string, endDate: string, duration: number, description: string, speakers: Speaker[], commitee: Commitee[], sponsor: Sponsor[], price: number) {
    this.id = id;
    this.title = title;
    this.logo = logo;
    this.startDate = new Date(startDate);
    this.endDate = new Date(startDate);
    this.duration = duration;
    this.description = description;
    this.speakers = speakers;
    this.commitee = commitee;
    this.sponsor = sponsor;
    this.price = price;
  }
}
