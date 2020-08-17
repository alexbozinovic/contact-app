import { Component, OnInit } from '@angular/core';
import { Contacts } from '../contact-arr';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  _id: string = "";
  index: number = 0;
  firstName: string = "";
  lastName: string = "";
  company: string = "";
  phone: string = "";
  email: string = "";
  address: string = "";

  error_msg: string = "none";
  success_msg: string = "none";

  rand_string: string = "";
  string_arr: string = "0123456789abcdefghijklmnopqrstuvwxyz";
  string_arr_length: number = this.string_arr.length;

  contacts: Contacts[];

  constructor(private _http: HttpService) { }

  ngOnInit() {
    this._http.getContacts().subscribe(data => {
      this.contacts = data;
      this.contacts.sort().reverse();
    });
  }

  // GENERATE A RANDOM ID FOR NEW CONTACTS
  generateId(){
    for( var i = 0; i < 24; i++ ){
      this.rand_string += this.string_arr.charAt(Math.floor(Math.random() * this.string_arr_length));
    }
    return this.rand_string;
  }

  addContact(){

    // VALIDATE INPUT FIELDS (CHECK TO SEE IF EMPTY)
    if( this.firstName == "" ){
      this.error_msg = "Please enter a First Name.";
      document.getElementById("fname").focus();
    }else if ( this.lastName == "" ){
      this.error_msg = "Please enter a Last Name.";
      document.getElementById("lname").focus();
    }else if( this.company == "" ){
      this.error_msg = "Please enter a company.";
      document.getElementById("company").focus();
    }else if( this.phone == "" ){
      this.error_msg = "Please enter a phone number.";
      document.getElementById("phone").focus();
    }else if( this.email == "" ){
      this.error_msg = "Please enter an email address.";
      document.getElementById("email").focus();
    }else if( this.address == "" ){
      this.error_msg = "Please enter an address.";
      document.getElementById("address").focus();
    }else {

      if( this.email.includes('@') && this.email.includes('.') ){
        this.error_msg = "none";

        this.contacts.unshift({
          _id: this.generateId(),
          index: this.contacts.length,
          firstName: this.firstName,
          lastName: this.lastName,
          company: this.company,
          phone: this.phone,
          email: this.email,
          address: this.address
        });
    
        // DISPLAY DATA IN ASCENDING ORDER IN CONSOLE
        console.log(this.contacts.sort().reverse());

        // DISPLAY DATA IN DESCENDING ORDER ON THE SCREEN
        this.contacts.sort().reverse();
    
        this.firstName = "";
        this.lastName = "";
        this.company = "";
        this.phone = "";
        this.email = "";
        this.address = "";

        this.success_msg = "You've added a new contact!";
      }
      // IF EMAILS ARE INCORRECTLY FORMATTED SET THIS ERROR
      else{
        this.error_msg = "Please enter a valid email address";
        document.getElementById("email").focus();
      }
      
    }
  }

}
