import {
  _decorator,
  Component,
  BoxCollider2D,
  CollisionEventType,
  Node,
  PhysicsSystem2D,
  Contact2DType,
  Vec3,
  math,
} from "cc";
import { bulletPool, GameControl } from "./const";
const { ccclass, property } = _decorator;

//  ref: https://blog.csdn.net/ykl970719/article/details/124106963https://blog.csdn.net/ykl970719/article/details/124106963

@ccclass("Bullet")
export class Bullet extends Component {
  // [1]
  // dummy = '';

  // [2]
  @property
  speed: number = 800;


  start() {
    const collider = this.getComponent(BoxCollider2D);
    collider.on(Contact2DType.BEGIN_CONTACT, this.onBeinContact, this);
  }

  onBeinContact() {
    GameControl.addScore();
    this._removeFromParent();
  }

  update(deltaTime: number) {
    // console.log("mat")
    if (this.node.rotation != new math.Quat(0, 0, 0, 0) ) { // todo
      // 直飞
      this.node.translate(new Vec3(0, this.speed * deltaTime, 0));
      

    } else {// 有角度
      // this.x += Math.round(this[__.speed] * Math.sin(this.angle/180*Math.PI))
      // this.y -= Math.round(this[__.speed] * Math.cos(this.angle/180*Math.PI))
    }
    // [4]
    // this.node.setPosition(this.node.position.add3f(0,this.speed * deltaTime,0));
    if (this.node.position.y > 667) { // (this.y < -this.height || this.x < -this.width || this.x > screenWidth) 
      this._removeFromParent();
    }
  }

  _removeFromParent() {
    this.node.removeFromParent();
    bulletPool.put(this.node);
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
