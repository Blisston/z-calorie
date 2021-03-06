import { Component, OnInit } from '@angular/core';
import {ChatService  , Message} from '../../Services/chat.service';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messages: Observable<Message[]>;
  formValue: string;

  constructor(public chat: ChatService) { }

  ngOnInit() {
    // appends to array after each new message is added to feedSource
    this.messages = this.chat.conversation.asObservable().pipe(
              scan((acc, val) => acc.concat(val) ));
  }

  sendMessage() {
    this.chat.converse(this.formValue);
    this.formValue = '';
  }
}
