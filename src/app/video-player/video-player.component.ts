import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.sass']
})
export class VideoPlayerComponent {

  @ViewChild('videoPlayer', { static: false }) videoPlayer ?: ElementRef;

  videoReady : boolean = true;
  isPlaying : boolean = false;
  videoUrl : string = "assets/Videos/1000.mp4";
  videoId : string = "1000";


  getVideoPhase(videoId : string) : string{
    return '1/5'
  }

  playPauseClicked(){
    if(this.videoPlayer){
      const video: HTMLVideoElement = this.videoPlayer.nativeElement;
      if (this.isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      this.isPlaying=!this.isPlaying;
    }
  }

  skipBackward(skip : number){
    if(this.videoPlayer){
      const video: HTMLVideoElement = this.videoPlayer.nativeElement;
      video.currentTime = Math.max(video.currentTime + skip, 0);
      if (!this.isPlaying) {
        video.pause();
      } else {
        video.play();
      }
    }
  }

  skipForward(skip : number){
    if(this.videoPlayer){
      const video: HTMLVideoElement = this.videoPlayer.nativeElement;
      video.currentTime = Math.min(video.currentTime + skip, video.duration);
      if (!this.isPlaying) {
        video.pause();
      } else {
        video.play();
      }
    }
  }

  onLoadedData(){

  }
}
