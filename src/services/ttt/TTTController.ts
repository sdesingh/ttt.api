import {Response } from 'express';
import Game, { IGame } from './model/TicTacToe';


export function listGames(res: Response): void {
  res.json(Game.find())
}