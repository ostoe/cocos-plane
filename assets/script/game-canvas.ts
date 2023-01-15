import {
  _decorator,
  Component,
  Node,
  instantiate,
  Prefab,
  randomRange,
  Vec3,
  AudioSourceComponent, NodePool,
  resources
} from "cc";
const { ccclass, property } = _decorator;

import { fireMode, PublicNodePool } from "./const";
import { Enemy } from "./enemy";


@ccclass("Game")
export class Game extends Component {
  // [1]
  // dummy = '';

  // [2]
  @property(Node)
  planeViewPool: Node;

  @property([Node])
  planeNodePool: Node[] = [];

  @property(Prefab)
  planPrefab_0: Prefab;

  @property(Prefab)
  planPrefab_1: Prefab;

  @property(Prefab)
  planPrefab_2: Prefab;

  @property(Prefab)
  planPrefab_3: Prefab;

  @property(Prefab)
  planPrefab_4: Prefab;


  onLoad() { }
  prefabList: Prefab[];
  enemyPoolList: NodePool[];

  boostStar: Prefab;
  boostMogu: Prefab;


  start() {
    resources.load("prefabs/boost-star", Prefab, (err, prefab) => {
      if (!err) this.boostStar = prefab 
      else console.log("加载预制资源[boostStar]失败")
      });
    resources.load("prefabs/boost-mogu", Prefab, (err, prefab) => {
      if (!err) this.boostMogu = prefab
      else console.log("加载预制资源[boostStar]失败")
      });

    this.prefabList = [this.planPrefab_0, this.planPrefab_1, this.planPrefab_2, this.planPrefab_3, this.planPrefab_4]
    this.enemyPoolList = [
      PublicNodePool.getPoolByName(this.planPrefab_0.name),
      PublicNodePool.getPoolByName(this.planPrefab_1.name),
      PublicNodePool.getPoolByName(this.planPrefab_2.name),
      PublicNodePool.getPoolByName(this.planPrefab_3.name),
      PublicNodePool.getPoolByName(this.planPrefab_4.name)
    ];
    this.getComponent(AudioSourceComponent).play();
    // [3]
    this.schedule(this.doIt, 0.5);
  }

  // update (deltaTime: number) {
  //     // [4]
  // }

  doIt() {
    const plane = this.genreteEnemy();
    this.planeViewPool.addChild(plane);
  }

  genreteEnemy() {
    
    let index = 0;
    if (fireMode.level > 4) {
      let rnd = Math.random();
      if (rnd < 0.2) {
        index = 1
      } else if (rnd < 0.4) {
        index = 2
      } else if (rnd < 0.6) {
        index = 3
      } else if (rnd < 0.8) {
        index = 4
      } else {
        index = 0 // 小蜜蜂
      }
    }
    let plane: Node = this.enemyPoolList[index].get();
      plane = instantiate(this.prefabList[index]);
    if (!plane) {
      plane = instantiate(this.prefabList[index]);
    }
    if (fireMode.level < fireMode.MAX_FIRE_LEVEL) {
      plane.getComponent(Enemy).reset(this.boostStar);
    } else {
      plane.getComponent(Enemy).reset(this.boostMogu);
    }
    return plane;
  }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/zh/scripting/life-cycle-callbacks.html
 */
