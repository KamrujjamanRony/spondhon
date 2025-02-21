import { Component, Input } from '@angular/core';
import { NewsCardComponent } from "../news-card/news-card.component";
import { RouterLink } from '@angular/router';
import { VideoCardComponent } from "../video-card/video-card.component";

@Component({
  selector: 'news-container',
  imports: [NewsCardComponent, RouterLink, VideoCardComponent],
  templateUrl: './news-container.component.html',
  styleUrl: './news-container.component.css'
})
export class NewsContainerComponent {
  @Input() news: any = [];
  @Input() title: any;
  @Input() isShowMore: boolean = false;
}
