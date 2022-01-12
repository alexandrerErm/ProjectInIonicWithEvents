export class Commitee {
  public id: string;
  public name: string;
  public image: string;
  public university: string;
  public email: string;
  public biography: string;

  // eslint-disable-next-line max-len
  constructor(id: string, name: string, image: string, university: string, email: string, biography: string) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.university = university;
    this.email = email;
    this.biography = biography;
  }
}
