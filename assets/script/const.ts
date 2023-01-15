import { director, game, NodePool, view, Prefab } from "cc";

export const bulletPool = new NodePool();
export const planetPool = new NodePool();
// export const PublicBoostPool = new NodePool();
export const fireMode = {level: 2, MAX_FIRE_LEVEL: 10, DEFAULT_Level: 2, GenBoostThreshold: 0.5};
export const screenSize = view.getVisibleSize()

export class GameControl {
  public static score = 0;

  public static addScore(score: number | null) {
    GameControl.score += (score || 1)
  }

  public static restart() {
    fireMode.level = fireMode.DEFAULT_Level;
    bulletPool.clear();
    planetPool.clear();
    PublicNodePool.clear();
    PublicBoostPool.clear()
    GameControl.score = 0;
    director.resume();
    game.restart();
  }

  public static end() {
    director.pause();
  }
}

export class PublicNodePool {

  public static NodePools  = {}
  public static getPoolByName(obj: string): NodePool {
    if (PublicNodePool.NodePools[obj]) {
      return PublicNodePool.NodePools[obj]
    } else {
      let tmpPool = new NodePool();
      PublicNodePool.NodePools[obj] = tmpPool
      return tmpPool;
    }
  }
  public static clear() {
    PublicNodePool.NodePools = {}
  }

}

export class PublicBoostPool {

  public static NodePools  = {}
  public static getPoolByName(obj: string): NodePool {
    if (PublicBoostPool.NodePools[obj]) {
      return PublicBoostPool.NodePools[obj]
    } else {
      let tmpPool = new NodePool();
      PublicBoostPool.NodePools[obj] = tmpPool
      return tmpPool;
    }
  }
  public static clear() {
    PublicBoostPool.NodePools = {}
  }

}