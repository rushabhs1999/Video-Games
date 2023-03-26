import { Component, OnInit } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { VideoDataService } from './../video-data.service';
import { VideogameData } from './../videodata.model';

@Component({
  selector: 'app-video-games',
  templateUrl: './video-games.component.html',
  styleUrls: ['./video-games.component.css'],
})
export class VideoGamesComponent implements OnInit {
  videoData: VideogameData[] = [];
  filteredData: VideogameData[] = [];
  videoGameNames: string[] = [];
  sortList: string[] = ['Release Date', 'Score', 'Name'];
  isLoading = true;
  name: string = '';
  rating: number = 0;
  ascending: boolean = true;
  selectedSort: 'first_release_date' | 'rating' | 'name' = 'first_release_date';

  constructor(private videoDataService: VideoDataService) {}

  ngOnInit() {
    this.videoDataService.fetchGameData().subscribe((data) => {
      this.videoDataService.setGameData = data;
      this.videoData = data;
      this.filteredData = data;
      this.isLoading = false;
    });
  }

  onApplyFilter() {
    this.isLoading = true;
    this.filteredData = this.videoDataService.getGameData
      .filter((data) => data.name.toLowerCase().includes(this.name))
      .filter((data) => data.rating >= this.rating);
    this.isLoading = false;
  }

  onTypeSort() {
    this.ascending = !this.ascending;
    this.onSort();
  }

  onSort() {
    if (this.ascending) {
      this.filteredData.sort((a, b) =>
        String(a[this.selectedSort]).localeCompare(String(b[this.selectedSort]))
      );
    } else {
      this.filteredData.sort((a, b) =>
        String(b[this.selectedSort]).localeCompare(String(a[this.selectedSort]))
      );
    }
  }

  onClear() {
    this.name = '';
    this.rating = 0;
    this.onApplyFilter();
  }
}
