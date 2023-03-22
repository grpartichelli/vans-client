export class UserModel {

  public name = ''
  public vanCapacity = 15;
  public _id?: string;

  constructor(public readonly username: string, public password: string) {
    this.name = username.substring(0, username.indexOf("@"))
    this.name = this.name[0]?.toUpperCase() + this.name.substring(1);
  }
}
