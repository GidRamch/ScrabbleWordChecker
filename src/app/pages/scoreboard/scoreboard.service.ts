import { Injectable } from '@angular/core';
import { Player } from 'src/app/models/Player';
import { StorageService } from 'src/app/services/storage/storage.service';

const SCRABBLE_PLAYERS_KEY = 'scrabble-players';

@Injectable()
export class ScoreboardService {
  constructor(
    private storage: StorageService,
  ) { }

  public async addPlayer(name: string): Promise<void> {
    const players = await this.getPlayers();

    if (players.find(el => el.name === name)) {
      return;
    }

    players.push({
      name,
      score: 0,
    });

    this.setPlayers(players);
  }


  public async removePlayer(name: string): Promise<void> {
    const players = await this.getPlayers();
    let newPlayers = players.filter(el => el.name !== name);
    this.setPlayers(newPlayers);
  }


  public async getPlayers(): Promise<Player[]> {
    return await this.storage.get(SCRABBLE_PLAYERS_KEY) as Player[] ?? [];
  }


  public async setPlayers(players: Player[]): Promise<void> {
    return await this.storage.set(SCRABBLE_PLAYERS_KEY, players);
  }

  public async resetScores(): Promise<void> {
    const players = await this.getPlayers();
    players.forEach(el => el.score = 0);
    this.setPlayers(players);
  }

  public async setScore(score: number, playerName: string): Promise<void> {
    const players = await this.getPlayers();
    players.forEach(el => {
      if (el.name === playerName) {
        el.score = score;
      }
    });
    this.setPlayers(players);
  }
}
