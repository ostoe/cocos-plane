import {
  _decorator,
  Component,
  Animation,
  Vec3,
  BoxCollider2D,
  Contact2DType,
  PhysicsSystem2D,
  animation,
  AnimationClip,
  randomRange,
  AudioClip,
  AudioSourceComponent,Prefab,instantiate, ObjectCurve ,Sprite, resources
} from "cc";
import { BomCommon  } from "./bom-common";
import { BoostMoguStar } from "./boost-mogu-star";
const { ccclass, property } = _decorator;
import { PublicBoostPool, fireMode, screenSize, PublicNodePool, GameControl } from "./const";
import { planeViewPool } from "./planeViewPool";

/**
 * Predefined variables
 * Name = Enemy
 * DateTime = Sat Oct 30 2021 18:06:24 GMT+0800 (中国标准时间)
 * Author = Simon-bin
 * FileBasename = enemy.ts
 * FileBasenameNoExtension = enemy
 * URL = db://assets/script/enemy.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass("Enemy")
export class Enemy extends Component {
  // [1]
  // dummy = '';

  @property
  speed: number = 200;

  @property
  HP: number = 2;

  boost: Prefab;
  bomAnimation: Prefab;

  private _animation: Animation;
  private _audio: AudioSourceComponent;
  private hasDied = false;
  private _HP: number;
  public GenBoostThreshold = 0.1;

  onLoad() { // load bom animation
    // console.log("onLoad");
  }
  start() {
    this.GenBoostThreshold = fireMode.GenBoostThreshold;
    this._HP = this.HP;
    this._animation = this.getComponent(Animation);
    this._audio = this.getComponent(AudioSourceComponent);
    this._animation.on(
      Animation.EventType.FINISHED,
      () => this._removeFromParent(true),
      this
    );
    // this.reset();
    // const collider = this.getComponent(BoxCollider2D);
    // collider.on(Contact2DType.BEGIN_CONTACT, this.onBeinContact, this);
    // console.log("start", this._animation.getState('bom'))
    // 创建动画
    let aniClipWithSpriteF = AnimationClip.createWithSpriteFrames([this.getComponent(Sprite).spriteFrame], 1);
    aniClipWithSpriteF.speed = 1;
    aniClipWithSpriteF.sample = 60;
    aniClipWithSpriteF.wrapMode = 2;
    aniClipWithSpriteF.name = 'idle' // internal name
    // aniClipWithSpriteF.duration = 
    this._animation.addClip(aniClipWithSpriteF, "idle");
    // this.compareObj(this._animation.clips[1], this._animation.clips[2])
    // default
    // console.log("start");
  }

  compareObj(a, b) {
    Object.keys(a).forEach(e=> {
      if (a[e] != b[e]) {
        console.log(e+":", a[e], b[e])
      }
    })
  }

  update(deltaTime: number) {
    this.node.translate(new Vec3(0, -this.speed * deltaTime, 0));
    if (this.node.position.y < -screenSize.height/2-100) {
      this._removeFromParent(false);
    }
  }

  reset(boost: Prefab, bom: Prefab) {
    // console.log("reset");
    this.bomAnimation = bom
    this.node.active = true;
    this.boost = boost;// 必须先执行
    const collider = this.getComponent(BoxCollider2D);
    collider.on(Contact2DType.BEGIN_CONTACT, this.onBeinContact, this);
    this._HP = this.HP;
    this.hasDied = false;
    // console.log("reset", this._animation.getState('bom'))
    // this._animation.stop()
    // this._animation && this._animation.removeState('bom') // this._animation.setCurrentTime(0) && this._animation.stop() && 
    // this._animation && this._animation.play("idle"); // 不能去掉
    const position = new Vec3(randomRange(-screenSize.width*0.9/2, screenSize.width*0.9/2), screenSize.height/2-50, 0); //TODO
    this.node.setPosition(position);
  }

  onBeinContact() {
    if (this.hasDied) return; // 先后两个子弹碰撞！
    if (this._HP > 1) {
      this._HP--;
      
      return;
    }
    this.hasDied = true;
    // this._audio.play();
    // this._animation.play("bom");
    // console.log("boom-posi:", this.node.position.x)
    GameControl.addScore(this.HP);
    this.node.active = false;
    // setTimeout(() => {
    //   this._removeFromParent();
    // }, 2000);
    // console.log("- bom", this.node.position.x)
    let anyPrefab = PublicNodePool.getPoolByName(this.bomAnimation.name).get();
    // console.log("prefab:", anyPrefab ? anyPrefab.name : "null");
    anyPrefab || (anyPrefab = instantiate(this.bomAnimation))
    anyPrefab.setPosition(this.node.position);
    this.node.parent.addChild(anyPrefab)
    if (this.node.parent.children.length == 20) {
      // console.log("      :", this.node.parent.children);

    }
    this._removeFromParent(true);
    
  }

  _removeFromParent(isGenBoost: boolean) {
    if (isGenBoost && Math.random() <  0){// this.GenBoostThreshold) { // 0.1/(fireMode.level + 1) ) {
        // setTimeout(() => { // 闪过爆炸画面
          let b = PublicBoostPool.getPoolByName(this.boost.name).get();
          if (b) {
            b.getComponent(BoostMoguStar).reset();
          } else {
            b = instantiate(this.boost);
          }
          b.setPosition(this.node.position);
          this.node.parent.getComponent(planeViewPool).node.addChild(b); // 加到PlaneViewPool;
          // this.node.parent.addChild(b)
        // }, 0.4);
    }
    // console.log(this.node.parent.parent)
    // console.log("callb-posi:", this.node.position.x, this);
    // setTimeout(() => {
      // console.log("- bom remove ", this.node.position.x)
      this.node.removeFromParent();
      PublicNodePool.getPoolByName(this.node.name).put(this.node)
    // }, 5000);
  }
}

