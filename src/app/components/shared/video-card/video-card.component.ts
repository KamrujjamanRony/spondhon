import { Component, input } from '@angular/core';
import { VideoPopupComponent } from '../video-popup/video-popup.component';

@Component({
  selector: 'app-video-card',
  imports: [VideoPopupComponent],
  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.css'
})
export class VideoCardComponent {
  readonly title = input.required<any>();
  readonly content = input.required<any>();
  readonly img = input.required<any>();
  readonly videoId = input.required<any>();
  showVideoPopup = false;

  openVideo(): void {
    this.showVideoPopup = true;
  }
  closeVideo(): void {
    this.showVideoPopup = false;
  }

}
