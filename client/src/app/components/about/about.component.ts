import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  providers: [SpotifyService],
})
export class AboutComponent implements OnInit {
  name: string;
  profile_pic: string;
  profile_link: string;
  constructor(private spotifyService: SpotifyService) {}
  async ngOnInit() {
    await this.loadProfile();
  }

  async loadProfile() {
    const me = await this.spotifyService.aboutMe();
    this.name = me.name;
    this.profile_pic = me.imageURL;
    this.profile_link = me.spotifyProfile;
  }
}
