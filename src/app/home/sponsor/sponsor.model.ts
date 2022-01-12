export class Sponsor {
  public id: string;
  public name: string;
  public description: string;
  public slogan: string;
  public telephone: string;
  public email: string;
  public facebook: string;
  public twitter: string;
  public logo: string;

  // eslint-disable-next-line max-len
  constructor(id: string, name: string, description: string, slogan: string, telephone: string, email: string, facebook: string, twitter: string, logo: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.slogan = slogan;
    this.telephone = telephone;
    this.email = email;
    this.facebook = facebook;
    this.twitter = twitter;
    this.logo = logo;
  }
}
