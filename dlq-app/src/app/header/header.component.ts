import {Component, OnInit} from "@angular/core";
import {MatSnackBar} from "@angular/material";
import {WebsocketService} from "../websocket.service";
import {Subject} from "rxjs/Subject";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    providers: [WebsocketService]
})
export class HeaderComponent implements OnInit {

    private socket: Subject<MessageEvent>;
    connected: boolean = false;

    constructor(public snackBar: MatSnackBar, websocketService: WebsocketService) {
        this.socket = websocketService.createWebsocket();
    }

    ngOnInit() {
        let observable = this.socket.asObservable();
        this.connected = !this.socket.isStopped;
        observable.subscribe(n => {
                this.connected = true;
                console.log(n);
            },
            e => {
                this.connected = false;
                console.log(e);
            },
            () => {
                this.connected = false;
                console.log("Close!");
            }
        )
    }

    openSnackBar() {
        this.snackBar.open("message", "action", {
            duration: 2000,
        });
    }

}
