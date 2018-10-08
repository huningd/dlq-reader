import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

import "rxjs/add/operator/toPromise";

import {Message} from "./message";

@Injectable()
export class DlqServiceService {

    private serviceUrl = 'http://localhost:8080/dlqs';

    constructor(private http: Http) {
    }

    getMessage(): Promise<Message[]> {
        console.log("Fetch messages")
        return this.http.get(this.serviceUrl)
            .toPromise()
            .then(response => {
                console.log(response.status);
                return response.json() as Message[];
            })
            .catch(this.handleError);
    }

    deleteMessage(id: string): Promise<any> {
        const url = `${this.serviceUrl}/${id}`;
        return this.http.delete(url)
            .toPromise()
            .then(response => console.log("Delete message status: " + response.status))
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
