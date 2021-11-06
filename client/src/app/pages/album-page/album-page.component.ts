import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';

@Component({
  selector: 'app-album-page',
  templateUrl: './album-page.component.html',
  styleUrls: ['./album-page.component.css'],
})
export class AlbumPageComponent implements OnInit {
  albumId: string;
  album: AlbumData;
  tracks: TrackData[];

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService
  ) {}

  async ngOnInit() {
    this.albumId = this.route.snapshot.paramMap.get('id');
    const album = this.spotifyService.getAlbum(this.albumId);
    const tracks = this.spotifyService.getAlbumTracks(this.albumId);
    [this.album, this.tracks] = await Promise.all([album, tracks]);
  }
}
