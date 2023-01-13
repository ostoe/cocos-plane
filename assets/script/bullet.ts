import {
  _decorator,
  Component,
  BoxCollider2D,
  CollisionEventType,
  Node,
  PhysicsSystem2D,
  Contact2DType,
  Vec3,
  math, view
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

  private screenSize = view.getVisibleSize()
  start() {
    const collider = this.getComponent(BoxCollider2D);
    collider.on(Contact2DType.BEGIN_CONTACT, this.onBeinContact, this);
  }

  fixedAngle(angle: number) {
    this.node.angle = angle;
  }

  onBeinContact() {
    GameControl.addScore();
    this._removeFromParent();
  }

  update(deltaTime: number) {
    if (this.node.angle == 0 ) { // todo
      // 直飞
      this.node.translate(new Vec3(0, this.speed * deltaTime, 0));
    } else {// 有角度
      let anglePI = this.node.angle / 180 * Math.PI;
      // 这种方式也可以
      // this.node.setPosition(this.node.getPosition().add3f(this.speed * deltaTime * Math.sin(-anglePI), this.speed * deltaTime * Math.cos(anglePI), 0));
      // console.log("has angle", this.speed * deltaTime * Math.sin(anglePI),this.speed * deltaTime * Math.cos(anglePI),);
      // this.node.translate(new Vec3(
      //   ,
      //   this.speed * deltaTime * Math.cos(anglePI), 
      //   0
      // ))
      this.node.translate(new Vec3(0, this.speed * deltaTime, 0));
    }
    // [4]
    // this.node.setPosition(this.node.position.add3f(0,this.speed * deltaTime,0));
    let pos = this.node.position
    if (pos.y > this.screenSize.height/2 + 100 || pos.x < -this.screenSize.width/2 -100 || pos.x > this.screenSize.width/2 + 100) { // (this.y < -this.height || this.x < -this.width || this.x > screenWidth) 
      this._removeFromParent();
    }
  }

  _removeFromParent() {
    // this.node.removeFromParent();
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
