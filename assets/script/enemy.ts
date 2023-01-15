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
import { BoostMoguStar } from "./boost-mogu-star";
const { ccclass, property } = _decorator;
import { planetPool, PublicBoostPool, fireMode, screenSize, PublicNodePool, GameControl } from "./const";
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

  private _animation: Animation;
  private _audio: AudioSourceComponent;
  private hasDied = false;
  private _HP: number;
  public GenBoostThreshold = 0.1;
  start() {
    this.GenBoostThreshold = fireMode.GenBoostThreshold;
    this._HP = this.HP;
    // console.log(this.HP)
    this._animation = this.getComponent(Animation);
    this._audio = this.getComponent(AudioSourceComponent);
    // this.reset();
    this._animation.on(
      Animation.EventType.FINISHED,
      this._removeFromParent,
      this
    );
    // const collider = this.getComponent(BoxCollider2D);
    // collider.on(Contact2DType.BEGIN_CONTACT, this.onBeinContact, this);
    // console.log("start", this._animation.getState('bom'))

    let aniClipWithSpriteF = AnimationClip.createWithSpriteFrames([this.getComponent(Sprite).spriteFrame], 1);
    aniClipWithSpriteF.speed = 1;
    aniClipWithSpriteF.sample = 60;
    aniClipWithSpriteF.wrapMode = 2;
    aniClipWithSpriteF.name = 'idle' // internal name
    // aniClipWithSpriteF.duration = 
    this._animation.addClip(aniClipWithSpriteF, "idle");
    // this.compareObj(this._animation.clips[1], this._animation.clips[2])
    // default
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
      this._removeFromParent();
    }
  }

  reset(boost: Prefab) {
    this.boost = boost;// 必须先执行
    const collider = this.getComponent(BoxCollider2D);
    collider.on(Contact2DType.BEGIN_CONTACT, this.onBeinContact, this);
    this._HP = this.HP;
    this.hasDied = false;
    // console.log("reset", this._animation.getState('bom'))
    // this._animation.stop()
    // this._animation && this._animation.removeState('bom') // this._animation.setCurrentTime(0) && this._animation.stop() && 
    this._animation && this._animation.play("idle"); // 能不能去掉？
    const position = new Vec3(randomRange(-screenSize.width*0.9/2, screenSize.width*0.9/2), screenSize.height/2-50, 0); //TODO
    this.node.setPosition(position);
  }

  onBeinContact() {
    if (this.hasDied) return;
    if (this._HP > 1) {
      this._HP--;
      
      return;
    }
    this.hasDied = true;
    this._audio.play();
    this._animation.play("bom");
    // console.log("boom-posi:", this.node.position.x)
    GameControl.addScore(this.HP);
    if (Math.random() <  this.GenBoostThreshold){ // 0.1/(fireMode.level + 1) ) {
      setTimeout(() => { // 闪过爆炸画面
        let b = PublicBoostPool.getPoolByName(this.boost.name).get();
        if (b) {
          b.getComponent(BoostMoguStar).reset();
        } else {
          b = instantiate(this.boost);
        }
        b.setPosition(this.node.position);
        this.node.parent.getComponent(planeViewPool).node.addChild(b); // 加到PlaneViewPool;
        // this.node.parent.addChild(b)
  
      }, 0.4);
    }
  }

  _removeFromParent() {
    // console.log(this.node.parent.parent)
    // console.log("callb-posi:", this.node.position.x, this);
    this.node.removeFromParent();
    PublicNodePool.getPoolByName(this.node.name).put(this.node)
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
