import { _decorator, Component, Node, UITransform, math, Sprite, Vec3 } from "cc";
import { screenSize } from "./const";
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Bg
 * DateTime = Thu Oct 28 2021 00:26:33 GMT+0800 (中国标准时间)
 * Author = Simon-bin
 * FileBasename = bg.ts
 * FileBasenameNoExtension = bg
 * URL = db://assets/script/bg.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass("Bg")
export class Bg extends Component {
  @property
  speed: number = 90;

  @property([Node])
  private bgNode: Node[] = [];
  // private top: Node;
  // private bottom: Node;
  start() {
    // this.top = this.bgNode[1];
    // this.bottom = this.bgNode[0];
    // const uit = this.top.getComponent(UITransform);
    // uit.setContentSize(new math.Size(uit.contentSize.x, screenSize.height));
    // const uit1 = this.bottom.getComponent(UITransform);
    // uit1.setContentSize(new math.Size(uit1.contentSize.x, screenSize.height));
    //     // set position
    // this.reset()
    
  }

  // reset() {
  //   this.bottom.setPosition( new Vec3(0, -screenSize.height/2, 0) )
  //   this.top.setPosition( new Vec3(0, screenSize.height/2, 0) )
  // }

  update(deltaTime: number) {
    // console.log(this.bgNode[0]);
    // (this.top.components[1] as Sprite).fillRange = 0.5;

    // // move
    // this.top.setPosition(
    //   this.top.position.subtract3f(0, this.speed * deltaTime, 0)
    // )
    // // move
    // this.bottom.setPosition(
    //   this.bottom.position.subtract3f(0, this.speed * deltaTime, 0)
    // )
    // if (this.bottom.position.y < -screenSize.height * 1.5 ){
    //   this.reset();
    // }
    for (let i = 0; i < this.bgNode.length; i++) {
      const bgNode = this.bgNode[i];
      bgNode.setPosition(
        bgNode.position.subtract3f(0, this.speed * deltaTime, 0)
      );
      if (bgNode.position.y < -(750 + 850)) {
        bgNode.setPosition(bgNode.position.add3f(0, 750 * 4, 0));
      }
    }
  }

  bgMove() {}
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
