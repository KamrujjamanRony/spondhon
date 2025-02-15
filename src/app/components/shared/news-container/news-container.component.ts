import { Component, Input } from '@angular/core';
import { NewsCardComponent } from "../news-card/news-card.component";

@Component({
  selector: 'news-container',
  imports: [NewsCardComponent],
  templateUrl: './news-container.component.html',
  styleUrl: './news-container.component.css'
})
export class NewsContainerComponent {
  @Input() news: any = [];
  @Input() title: any;
}
