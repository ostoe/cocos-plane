import { director, game, NodePool, view } from "cc";

export const bulletPool = new NodePool();
export const planetPool = new NodePool();
export const boostPool = new NodePool();
export const fireMode = {level: 8, MAX_FIRE_LEVEL: 10};
export const screenSize = view.getVisibleSize()
export class GameControl {
  public static score = 0;

  public static addScore() {
    GameControl.score += 1;
  }

  public static restart() {
    bulletPool.clear();
    planetPool.clear();
    GameControl.score = 0;
    director.resume();
    game.restart();
  }

  public static end() {
    director.pause();
  }
}
