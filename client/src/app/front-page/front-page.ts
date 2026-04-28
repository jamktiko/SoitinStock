import { Component, inject, OnInit } from '@angular/core';
// ActivatedRouten avulla saadaan reitistä id komponenttiin
import { ActivatedRoute } from '@angular/router';
// ContentServicen avulla saadaan palvelimelta sisältö komponenttiin
// import { ContentService } from '../content.service';
import { Instruments } from '../.models/instrument';

@Component({
  selector: 'app-page',
  templateUrl: './front-page.html',
  styleUrl: './front-page.css',
})
export class FrontPage implements OnInit {
  // esitettävän "sivun" sisältö tulee pageContent-muuttujaan
  frontpagecontent: Instruments | undefined;
  // DI:llä otetaan käyttöön kaksi oliota
  // cservice = inject(ContentService);
  route = inject(ActivatedRoute);
  // user = inject(user);
  /*
  Kun komponentti latautuu muistiin, haetaan reitistä id,
  jonka perusteella haetaan komponenttiin id:tä vastaava sisältö.
  */
  ngOnInit(): void {
    // // Haetaan sivun id reitistä.
    // this.route.paramMap.subscribe((params) => {
    //   const pageId = Number(params.get('pageId'));
    //   // Haetaan sisältötaulukko palvelimelta. Se tulee sisään content-muuttujassa
    //   this.cservice.GetContents().subscribe((content) => {
    //     // Haetaan sisältötaulukosta olio, jonka id on sama kuin reitistä haettu id.
    //     // valitun "sivun" sisältö menee pageContent-muuttujaan
    //     this.pageContent = content.find((content) => content.id === pageId);
    //   });
    // });
  }
}
