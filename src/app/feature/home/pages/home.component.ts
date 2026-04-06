import { Component } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  readonly author = "Rafael Aquino";
  readonly testDate = "2026-04-06";
}
