import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css'],
  providers: [SpotifyService],
})
export class ArtistPageComponent implements OnInit {
  artistId: string;
  artist: ArtistData;
  relatedArtists: ArtistData[];
  topTracks: TrackData[];
  albums: AlbumData[];
  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService
  ) {}

  async ngOnInit() {
    this.artistId = this.route.snapshot.paramMap.get('id');
    const artist = this.spotifyService.getArtist(this.artistId);
    const relatedArtists = this.spotifyService.getRelatedArtists(this.artistId);
    const topTracks = this.spotifyService.getArtistTopTracks(this.artistId);
    const albums = this.spotifyService.getArtistAlbums(this.artistId);
    [
      this.artist,
      this.relatedArtists,
      this.topTracks,
      this.albums,
    ] = await Promise.all([artist, relatedArtists, topTracks, albums]);
  }
}
