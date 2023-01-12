import {
  _decorator,
  Component,
  BoxCollider2D,
  CollisionEventType,
  Node,
  PhysicsSystem2D,
  Contact2DType,
  Vec3,
} from "cc";
import { bulletPool, GameControl } from "./const";
const { ccclass, property } = _decorator;



@ccclass("BoostMogu")
export class BoostMogu extends Component {
  // [1]
  // dummy = '';


  start() {
    const collider = this.getComponent(BoxCollider2D);
    collider.on(Contact2DType.BEGIN_CONTACT, this.onBeinContact, this);
  }

  onBeinContact() {

  }

  update(deltaTime: number) {

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
