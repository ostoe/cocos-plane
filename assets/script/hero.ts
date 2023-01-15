import {
  _decorator,
  Component,
  Node,
  EventTouch,
  UITransform,
  Vec3,
  Prefab,
  instantiate,
  BoxCollider2D,
  Contact2DType,
  director,
  AudioClip,
  AudioSourceComponent,
  Collider2D,
  IPhysics2DContact,
  view,
  ProgressBar,
} from "cc";
import { Bullet } from "./bullet";
import { bulletPool, fireMode, GameControl } from "./const";
const { ccclass, property } = _decorator;
const BULLET_LEVEL = {
  0: [0],
  1: [-5, 5],
  2: [-5, 0, 5],
  3: [-10, -5, 0, 5],
  4: [-10, -5, 0, 5, 10],
  5: [-15, -10, -5, 0, 5, 10],
  6: [-15, -10, -5, 0, 5, 10, 15],
  7: [-30, -15, -10, -5, 0, 5, 10, 15],
  8: [-30, -15, -10, -5, 0, 5, 10, 15, 30],
  9: [-30, -15, -10, -5, 0, 5, 10, 15, 30],
  10: [-30, -22, -15, -10, -5, 0, 5, 10, 15, 22, 30],
}
/**
 * Predefined variables
 * Name = Hero
 * DateTime = Sat Oct 30 2021 11:59:30 GMT+0800 (中国标准时间)
 * Author = Simon-bin
 * FileBasename = hero.ts
 * FileBasenameNoExtension = hero
 * URL = db://assets/script/hero.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass("Hero")
export class Hero extends Component {
  // [1]
  // dummy = '';

  // [2]
  // @property
  // serializableDummy = 0;

  @property(Prefab)
  bulletPrefab: Prefab;

  @property(Prefab)
  endWindowPrefab: Prefab;

  @property(Node)
  bulletPoolNode: Node;

  @property(Node)
  endWindow: Node;

  @property
  shutTime: number = 0.5;

  private locked: boolean = false;
  private localOffset: Vec3;
  private level: number = 1;
  // public fireLevel = 0;
  private collectionProgressBar: ProgressBar;
  onLoad() {}

  start() {
    const collider = this.getComponent(BoxCollider2D);
    collider.on(Contact2DType.BEGIN_CONTACT, this.onBeinContact, this);
    this.collectionProgressBar = this.node.children[0].getComponent(ProgressBar);
    console.log(this.collectionProgressBar);
    this.collectionProgressBar.progress = 0;
  }

  onBeinContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    // console.log(selfCollider.node, otherCollider.node.name,  )
    console.log("碰撞一次");
    if (otherCollider.node.name.toLowerCase().includes("enemy")) {
      console.log("end...");
      this.node.parent.addChild(instantiate(this.endWindowPrefab));
      GameControl.end();
    } else if(otherCollider.node.name.toLowerCase().includes("boost")) {
      if (fireMode.level < fireMode.MAX_FIRE_LEVEL) {
        fireMode.level += 1;
      } else {
        (this.collectionProgressBar.progress > 1) || ( this.collectionProgressBar.progress += parseFloat((1/18).toFixed(3)));
      }
      !(fireMode.level < fireMode.MAX_FIRE_LEVEL) || (fireMode.level += 1);
      
    }
    
  }

  onEnable() {
    // [3]
    this.node.on(Node.EventType.TOUCH_START, this.startDrag, this, true);
    this.node.on(Node.EventType.TOUCH_MOVE, this.onDragMove, this, true);
    this.node.on(Node.EventType.TOUCH_END, this.endDrag, this, true);
    this.node.on(Node.EventType.TOUCH_CANCEL, this.endDrag, this, true);
    this.schedule(this.authoShut, this.shutTime);
  }

  onDisable() {
    this.node.off(Node.EventType.TOUCH_START, this.startDrag, this, true);
    this.node.off(Node.EventType.TOUCH_MOVE, this.onDragMove, this, true);
    this.node.off(Node.EventType.TOUCH_END, this.endDrag, this, true);
    this.node.off(Node.EventType.TOUCH_CANCEL, this.endDrag, this, true);
    this.unschedule(this.authoShut);
  }

  // update (deltaTime: number) {
  //     // [4]
  // }

  onDragMove(e: EventTouch) {
    if (!this.locked) return;
    const { x, y } = e.getLocation();
    const location = this.convertToWorldPosition(x, y);
    this.node.setPosition(location);
  }

  startDrag(e: EventTouch) {
    const { x, y } = e.getLocation();
    const position = new Vec3(x, y, 0);
    this.localOffset = this.node
      .getComponent(UITransform)
      .convertToNodeSpaceAR(position);
    this.locked = true;
  }

  endDrag() {
    this.locked = false;
  }

  convertToWorldPosition(x: number, y: number) {
    const position = new Vec3(x, y, 0);
    const result = this.node.parent
      .getComponent(UITransform)
      .convertToNodeSpaceAR(position)
      .subtract(this.localOffset);
    return result;
  }

  generateBullet(angle: number) {
    
    let b = bulletPool.get(); // 有返回Node
    if (!b) { // 有Node对象
      b = instantiate(this.bulletPrefab);
    }
    b.getComponent(Bullet).fixedAngle(angle)
    b.setPosition(this.node.position);
    return b;
  }

  authoShut() {
    let index = 0;
    if (fireMode.level == 0 ) {
      const bullet = this.generateBullet(0);
      this.bulletPoolNode.insertChild(bullet, 0);
    } else if (fireMode.level <=fireMode.MAX_FIRE_LEVEL) {
      BULLET_LEVEL[fireMode.level].forEach((angle: number) => {
        const bullet = this.generateBullet(angle);
        this.bulletPoolNode.addChild(bullet);
        // this.bulletPoolNode.insertChild(bullet, 0);
        index++;
      });
      index = 0;
    }
    this.getComponent(AudioSourceComponent).play();
    
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
