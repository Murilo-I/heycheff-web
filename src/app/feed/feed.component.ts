import { Component, OnInit } from '@angular/core';
import { ReceitaFeed } from '../model/receita-feed';
import { ReceitaService } from '../service/receita.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  feed: ReceitaFeed[] = [];

  constructor(private receitaService: ReceitaService) { }

  ngOnInit(): void {
    this.receitaService.loadFeed().subscribe(receitas => {
      receitas.forEach(r => r.thumb = environment.BaseUrl + r.thumb);
      this.feed = receitas;
    });
  }
}
