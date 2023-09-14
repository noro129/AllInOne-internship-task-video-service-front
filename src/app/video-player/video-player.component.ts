import { Component, ElementRef, ViewChild } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

}



@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent {

  @ViewChild('videoPlayer', { static: false }) videoPlayer ?: ElementRef;
  @ViewChild('videoVolume', { static: false }) videoVolume ?: ElementRef;

  videoReady : boolean = true;
  isPlaying : boolean = false;
  videoUrl : string = "assets/Videos/1000.mp4";
  videoId : string = "1000";
  isLoading : boolean = false;
  isMuted : boolean = false;
  currentVolume : number = 1;


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

  onWaiting(){
    this.isLoading = true;
  }
  
  onPlaying(){
    this.isLoading = false;
  }

  @ViewChild('videoSeeker', { static: false }) videoSeeker ?: ElementRef;
  videoDuration : number = 0;
  currentVideoTime : number = 0;

  ngAfterViewInit() {
    if(this.videoPlayer){
      const video: HTMLVideoElement = this.videoPlayer.nativeElement;
      video.onloadedmetadata = () => {
        this.videoDuration = video.duration;
      };
      video.ontimeupdate = () => {
        this.currentVideoTime = video.currentTime;
        if (this.currentVideoTime==this.videoDuration) {
          this.isPlaying = false;
        }
      };
    }
  }

  seekVideo(){
    if(this.videoPlayer && this.videoSeeker){
      const video: HTMLVideoElement = this.videoPlayer.nativeElement;
      const seeker: HTMLInputElement = this.videoSeeker.nativeElement;
      video.currentTime = seeker.valueAsNumber;
    }
  }

  toggleMute(){
    if(this.videoPlayer){
        const video: HTMLVideoElement = this.videoPlayer.nativeElement;
        if (this.isMuted) {
            video.muted = false;
        } else {
            video.muted = true;
        }
        this.isMuted = !this.isMuted;
    }
  }

  changeVolume(){
      if(this.videoPlayer && this.videoVolume){
          const video: HTMLVideoElement = this.videoPlayer.nativeElement;
          const volume: HTMLInputElement = this.videoVolume.nativeElement;
          video.volume = volume.valueAsNumber;
      }
  }
}