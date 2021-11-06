import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { TrackData } from '../../data/track-data';
import { TrackFeature } from '../../data/track-feature';

@Component({
  selector: 'app-track-page',
  templateUrl: './track-page.component.html',
  styleUrls: ['./track-page.component.css'],
})
export class TrackPageComponent implements OnInit {
  trackId: string;
  track: TrackData;
  audioFeatures: TrackFeature[];

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService
  ) {}

  async ngOnInit() {
    this.trackId = this.route.snapshot.paramMap.get('id');
    const track = this.spotifyService.getTrack(this.trackId);
    const audioFeatures = this.spotifyService.getTrackAudioFeatures(
      this.trackId
    );

    [this.track, this.audioFeatures] = await Promise.all([
      track,
      audioFeatures,
    ]);
  }
}
