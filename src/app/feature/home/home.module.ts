import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./pages/home.component";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule,
    HomeRoutingModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class HomeModule {}
