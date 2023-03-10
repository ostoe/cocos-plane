import { director, game, NodePool, view, Prefab } from "cc";

export const bulletPool = new NodePool();
// export const planetPool = new NodePool();
// export const PublicBoostPool = new NodePool();
export const fireMode = {level: 0, MAX_FIRE_LEVEL: 10, DEFAULT_Level: 0, GenBoostThreshold: 0.8};
export const screenSize = view.getVisibleSize()

export class GameControl {
  public static score = 0;

  public static addScore(score: number | null) {
    GameControl.score += (score || 1)
  }

  public static restart() {
    fireMode.level = fireMode.DEFAULT_Level;
    bulletPool.clear();
    // planetPool.clear();
    PublicNodePool.clear();
    PublicBoostPool.clear();
    PublicBulletPool.clear();
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

export class PublicBulletPool {

  public static NodePools  = {}
  public static getPoolByName(obj: string): NodePool {
    if (PublicBulletPool.NodePools[obj]) {
      return PublicBulletPool.NodePools[obj]
    } else {
      let tmpPool = new NodePool();
      PublicBulletPool.NodePools[obj] = tmpPool
      return tmpPool;
    }
  }
  public static clear() {
    PublicBulletPool.NodePools = {}
  }

}