import { Component, OnInit, TemplateRef } from '@angular/core';
import { ReceitaService } from './service/receita.service';
import { ReceitaFeed } from './model/receita-feed';
import { environment } from 'src/environments/environment';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  feed: ReceitaFeed[] = [];

  constructor(private receitaService: ReceitaService, private offcanvasService: NgbOffcanvas) { }

  ngOnInit(): void {
    this.receitaService.loadFeed().subscribe(receitas => {
      receitas.forEach(r => r.thumb = environment.BaseUrl + r.thumb);
      this.feed = receitas;
    });
  }

  openMenu(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' });
  }
}
