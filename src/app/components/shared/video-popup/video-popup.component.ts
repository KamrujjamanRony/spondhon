import { Component, input, output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-popup',
  imports: [],
  templateUrl: './video-popup.component.html',
  styleUrl: './video-popup.component.css'
})
export class VideoPopupComponent {
  readonly videoUrl = input.required<any>();
  readonly closeVideo = output<void>();
  safeVideoUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnChanges(): void {
    this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl());
  }

  closePopup(): void {
    this.closeVideo.emit();
  }

}
