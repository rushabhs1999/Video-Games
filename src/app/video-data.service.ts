import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VideogameData } from './videodata.model';

@Injectable({
  providedIn: 'root',
})
export class VideoDataService {
  gameData: VideogameData[] = [];

  constructor(private http: HttpClient) {}

  fetchGameData() {
    return this.http.get<VideogameData[]>('http://localhost:3000/videoData');
  }

  set setGameData(data: VideogameData[]) {
    this.gameData = data;
  }

  get getGameData(): VideogameData[] {
    return this.gameData;
  }
}
