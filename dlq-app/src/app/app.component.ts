import {Component, OnInit} from "@angular/core";

import {DlqServiceService} from "./dlq-service.service";
import {WebsocketService} from "./websocket.service";
import {Subject} from "rxjs/Rx";

import {Message} from "./message";
import {isNull, isUndefined} from "util";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DlqServiceService, WebsocketService]
})
export class AppComponent implements OnInit {
  title = 'DLQ Reader';
  messages: Message[];
  private socket: Subject<any>;
  private selectedMessage: Message;
  connected: boolean;

  constructor(private dlqService: DlqServiceService, websocketService: WebsocketService) {
    this.socket = websocketService.createWebsocket();
  }

  onSelect(message: Message): void {
    this.selectedMessage = message;
  }

  deleteMessage(): void {
    this.dlqService.deleteMessage(this.selectedMessage.headers['id']).then(
      () => {
        this.selectedMessage = null;
        this.getMessages();
      });
  }

  noMessage(): boolean {
    return isUndefined(this.messages) || isNull(this.messages) || this.messages.length == 0;
  }

  getMessages(): void {
    this.dlqService.getMessage().then(m => {
      console.log("Messages: " + m);
      this.messages = m;
    });
  }

  ngOnInit(): void {
    this.getMessages();
    this.socket.subscribe(
      message => {
        console.log("Message:" + message);
        var t = JSON.parse(message.data);
        if (t.payload) {
          this.messages.push(t);
        }
      },
      error => {
        console.log("Error: " + error);
      },
      () => {
        console.log("OnClose: ");
      }
    );
  }
}
