import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLinkActive, RouterLinkWithHref} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, MatIconModule, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(protected authService: AuthService) { }

  ngOnInit(): void {
  }

  logout(): void {

    this.authService.logout();

  }
}
