export class Speaker {
  public id: string;
  public name: string;
  public image: string;
  public email: string;
  public biography: string;
  public telephone: number;

  // eslint-disable-next-line max-len
  constructor(id: string, name: string, image: string, email: string, biography: string, telephone: number) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.email = email;
    this.biography = biography;
    this.telephone = telephone;
  }
}
