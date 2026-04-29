import { Component, inject, OnInit } from '@angular/core';
// With ActivatedRoute we get id from route to component
import { ActivatedRoute } from '@angular/router';
// With ContentService we get content from server to component
// import { ContentService } from '../content.service';
import { Instruments } from '../.models/instrument';

@Component({
  selector: 'app-page',
  templateUrl: './front-page.html',
  styleUrl: './front-page.css',
})
export class FrontPage implements OnInit {
  // The content of the "page" to be displayed comes to pageContent variable
  frontpagecontent: Instruments | undefined;
  // With DI we initialize two objects
  // cservice = inject(ContentService);
  route = inject(ActivatedRoute);
  // user = inject(user);
  /*
  When component loads into memory, we get id from route,
  based on which we fetch the corresponding content to the component.
  */
  ngOnInit(): void {
    // // Get page id from route.
    // this.route.paramMap.subscribe((params) => {
    //   const pageId = Number(params.get('pageId'));
    //   // Get content table from server. It comes in content variable
    //   this.cservice.GetContents().subscribe((content) => {
    //     // Get object from content table whose id is the same as the id fetched from route.
    //     // The content of the selected "page" goes to pageContent variable
    //     this.pageContent = content.find((content) => content.id === pageId);
    //   });
    // });
  }
}
