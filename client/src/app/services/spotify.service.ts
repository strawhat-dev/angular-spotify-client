import axios from 'axios';
import { Injectable } from '@angular/core';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';

@Injectable({ providedIn: 'root' })
export class SpotifyService {
  expressBaseUrl: string;

  constructor() {
    this.expressBaseUrl = 'http://localhost:8888';
  }

  private async sendRequest(endpoint: string): Promise<any> {
    const res = await axios.get(`${this.expressBaseUrl}/${endpoint}`);
    return res.data;
  }

  async aboutMe(): Promise<ProfileData> {
    const data = await this.sendRequest('me');
    const profileData = new ProfileData(data);
    return profileData;
  }

  async searchFor(category: string, resource: string): Promise<ResourceData[]> {
    const encoded = encodeURIComponent(resource);
    const categoryDispatch = {
      artist: (data: {}) => new ArtistData(data),
      album: (data: {}) => new AlbumData(data),
      track: (data: {}) => new TrackData(data),
    };

    const data = await this.sendRequest(`search/${category}/${encoded}`);
    const items = await data[`${category}s`].items;
    return items.map((item: {}) => categoryDispatch[category](item));
  }

  async getArtist(artistId: string): Promise<ArtistData> {
    const encoded = encodeURIComponent(artistId);
    const data = await this.sendRequest(`artist/${encoded}`);
    const artistData = new ArtistData(data);

    return artistData;
  }

  async getRelatedArtists(artistId: string): Promise<ArtistData[]> {
    const encoded = encodeURIComponent(artistId);
    const data = await this.sendRequest(`artist-related-artists/${encoded}`);
    const relatedArtists = data.artists.map(
      (artist: {}) => new ArtistData(artist)
    );

    return relatedArtists;
  }

  async getArtistTopTracks(artistId: string): Promise<TrackData[]> {
    const encoded = encodeURIComponent(artistId);
    const data = await this.sendRequest(`artist-top-tracks/${encoded}`);
    const artistTopTracks = data.tracks.map(
      (track: {}) => new TrackData(track)
    );

    return artistTopTracks;
  }

  async getArtistAlbums(artistId: string): Promise<AlbumData[]> {
    const encoded = encodeURIComponent(artistId);
    const data = await this.sendRequest(`artist-albums/${encoded}`);
    const artistAlbums = await data.items.map(
      (album: {}) => new AlbumData(album)
    );

    return artistAlbums;
  }

  async getAlbum(albumId: string): Promise<AlbumData> {
    const encoded = encodeURIComponent(albumId);
    const data = await this.sendRequest(`album/${encoded}`);
    const album = new AlbumData(data);

    return album;
  }

  async getAlbumTracks(albumId: string): Promise<TrackData[]> {
    const encoded = encodeURIComponent(albumId);
    const data = await this.sendRequest(`album-tracks/${encoded}`);
    const albumTracks = data.items.map((track: {}) => new TrackData(track));

    return albumTracks;
  }

  async getTrack(trackId: string): Promise<TrackData> {
    const encoded = encodeURIComponent(trackId);
    const data = await this.sendRequest(`track/${encoded}`);
    const track = new TrackData(data);

    return track;
  }

  async getTrackAudioFeatures(trackId: string): Promise<TrackFeature[]> {
    const types = new Set(TrackFeature.FeatureTypes);
    const encoded = encodeURIComponent(trackId);
    const data = await this.sendRequest(`track-audio-features/${encoded}`);
    const filtered = Object.entries(data).filter(([feature, _]) =>
      types.has(feature)
    );

    return filtered.map(
      ([feature, percent]: [string, number]) =>
        new TrackFeature(feature, percent)
    );
  }
}
