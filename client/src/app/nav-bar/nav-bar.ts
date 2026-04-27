import { Component, inject, OnInit } from '@angular/core';
import { Content } from '../content';
import { RouterLink } from '@angular/router';
import { ContentService } from '../content.service';

@Component({
  standalone: true,
  selector: 'app-nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar implements OnInit {
  content: Content[] | undefined;
  //Otetaan contentsevice käyttöön ja haetaan content aina, kun komponentti latautuu muistiin
  private cservice = inject(ContentService);
  ngOnInit(): void {
    this.cservice.GetContents().subscribe((data) => (this.content = data));
  }
}
