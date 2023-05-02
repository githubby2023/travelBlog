// class Profile {
//   constructor({
//     uid,
//     username,
//     nationality,
//     email,
//     gender,
//     address,
//     viewarray,
//   }) {
//     this.uid = uid;
//     this.username = username;
//     this.nationality = nationality;
//     this.email = email;
//     this.gender = gender;
//     this.address = address;
//     this.viewarray = viewarray;
//   }
// }

class ProfileModel {
    constructor({
      uid,
      username,
      nationality,
      email,
      gender,
      address,
      viewarray,
    }) {
      this._uid = uid;
      this._username = username;
      this._nationality = nationality;
      this._email = email;
      this._gender = gender;
      this._address = address;
      this._viewarray = viewarray;
    }
  
    get uid() {
      return this._uid;
    }
  
    set uid(uid) {
      this._uid = uid;
    }
  
    get username() {
      return this._username;
    }
  
    set username(username) {
      this._username = username;
    }
  
    get nationality() {
      return this._nationality;
    }
  
    set nationality(nationality) {
      this._nationality = nationality;
    }
  
    get email() {
      return this._email;
    }
  
    set email(email) {
      this._email = email;
    }
  
    get gender() {
      return this._gender;
    }
  
    set gender(gender) {
      this._gender = gender;
    }
  
    get address() {
      return this._address;
    }
  
    set address(address) {
      this._address = address;
    }
  
    get viewarray() {
      return this._viewarray;
    }
  
    set viewarray(viewarray) {
      this._viewarray = viewarray;
    }
  }
  