import {
  _decorator,
  Component,
  CircleCollider2D,
  CollisionEventType,
  Node,
  PhysicsSystem2D,
  Contact2DType,
  Vec3,
  AudioSourceComponent,
} from "cc";
import { fireMode, GameControl, screenSize } from "./const";
const { ccclass, property } = _decorator;

const randomAngle = [10, -10, 30, -30, 15, -15, 5, -5, 5, -5, 0, 0, 0];


@ccclass("BoostMoguStar")
export class BoostMoguStar extends Component {
  // [1]
  // dummy = '';
  @property
  angle = 0;

  @property
  speed: number = 200;

  private _audio: AudioSourceComponent

  start() {
    this._audio = this.getComponent(AudioSourceComponent);
    this.node.angle = randomAngle[~~(Math.random() * randomAngle.length)]
    const collider = this.getComponent(CircleCollider2D);
    collider.on(Contact2DType.BEGIN_CONTACT, this.onBeinContact, this);
  }

  reset() {
    
  }

  onBeinContact() {
    this.node.removeFromParent();
    // !(fireMode.level < fireMode.MAX_FIRE_LEVEL) || (fireMode.level += 1);
    this._audio.play();
  }

  update(deltaTime: number) {
    
    this.node.translate(new Vec3(0, -deltaTime * this.speed, 0))

    if ( this.node.position.x <  -screenSize.x/2 || this.node.position.x > screenSize.x/2) {
      this.node.angle = -this.node.angle;
    }
    if (this.node.position.y < -screenSize.y / 2 - 100) {
      this.node.removeFromParent();
    }
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
