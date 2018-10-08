import {Injectable} from "@angular/core";
import {Observable, Observer, Subject} from "rxjs";

@Injectable()
export class WebsocketService {

    private subject: Subject<MessageEvent> = null;

    constructor() {
    }

    public createWebsocket(): Subject<MessageEvent> {
        if (this.subject !== null) {
            return this.subject;
        }
        let socket = new WebSocket('ws://localhost:8080/ws/dlq-messages');
        let observable = Observable.create(
            (observer: Observer<MessageEvent>) => {
                socket.onmessage = observer.next.bind(observer);
                socket.onerror = observer.error.bind(observer);
                socket.onclose = observer.complete.bind(observer);
                return socket.close.bind(socket);
            }
        );
        let observer = {
            next: (data: Object) => {
                if (socket.readyState === WebSocket.OPEN) {
                    socket.send(JSON.stringify(data));
                }
            }
        };
        this.subject = Subject.create(observer, observable);
        return this.subject;
    }
}
