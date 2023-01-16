import { _decorator, Component, Node, AudioSourceComponent,
    Animation,



} from 'cc';
import { PublicNodePool } from './const';
const { ccclass, property } = _decorator;

@ccclass('BomCommon')
export class BomCommon extends Component {

    private _animation: Animation;
    private _audio: AudioSourceComponent;
    start() {
        console.log("- ani start", this.node.position.x, )
        this._animation = this.getComponent(Animation);
        this._audio = this.getComponent(AudioSourceComponent);
        // this.reset();
        this._animation.on(
        Animation.EventType.FINISHED,
        this._removeFromParent,
        this)
        //   this._animation.play('bom-common');
    }

    onLoad() {
        console.log("- ani onLoad",)
    }


    reset(x: number, y: number) {
        this.node.setPosition(x, y);
        
    }

    update(deltaTime: number) {
    }

    _removeFromParent() {
        setTimeout(() => {
            console.log("回收统计:", this.node.position.x)
            this.node.removeFromParent();
            PublicNodePool.getPoolByName(this.node.name).put(this.node)
        }, 5000);
        
      }
}

