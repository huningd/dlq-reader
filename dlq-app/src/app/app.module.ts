import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatIconRegistry,
    MatListModule,
    MatSnackBarModule,
    MatToolbarModule
} from "@angular/material";

import {AppComponent} from "./app.component";
import {KeysPipe} from "./keys.pipe";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import "hammerjs";

@NgModule({
    declarations: [
        AppComponent,
        KeysPipe,
        HeaderComponent,
        FooterComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        MatListModule,
        MatToolbarModule,
        MatSnackBarModule
    ],
    providers: [MatIconRegistry],
    bootstrap: [AppComponent]
})
export class AppModule {
}
