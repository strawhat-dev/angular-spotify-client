import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ResourceData } from '../../data/resource-data';
import { ArtistData } from '../../data/artist-data';
import { AlbumData } from '../../data/album-data';
import { TrackData } from '../../data/track-data';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SpotifyService],
})
export class SearchComponent implements OnInit {
  ngOnInit() {}
  query: string;
  category: string;
  categories: string[];
  artistResults: ArtistData[];
  albumResults: AlbumData[];
  trackResults: TrackData[];
  mapResults: { [key: string]: (results: ResourceData[]) => void };

  constructor(private spotifyService: SpotifyService) {
    this.category = 'artist';
    this.mapResults = {
      artist: (results: ArtistData[]) => (this.artistResults = results),
      album: (results: AlbumData[]) => (this.albumResults = results),
      track: (results: TrackData[]) => (this.trackResults = results),
    };

    this.categories = Object.keys(this.mapResults);
  }

  async search() {
    const results = await this.spotifyService.searchFor(
      this.category,
      this.query
    );

    this.mapResults[this.category](results);
    console.log(results);
  }
}
