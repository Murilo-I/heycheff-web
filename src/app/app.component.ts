import { Component, OnInit } from '@angular/core';
import { TagService } from './service/tag.service';
import { Tag } from './model/tag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  tags: Tag[] = [];
  
  constructor(private tagService: TagService) { }


  ngOnInit(): void {
    this.tagService.listAll().subscribe(tags => this.tags = tags);
  }

}
