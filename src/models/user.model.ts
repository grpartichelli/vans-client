
export class UserModel {

  public name = ''
  public vanCapacity = 15;

  constructor(public readonly username: string, public readonly password: string) {
    this.name = username.substring(0, username.indexOf("@"))
    this.name = this.name[0].toUpperCase() + this.name.substring(1);
  }
}
