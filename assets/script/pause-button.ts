import { _decorator, Component, Node, Button, director, view, Vec3, AudioSourceComponent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('pause_button')
export class pause_button extends Component {

    status: boolean = true; // true 就是 || 状态  false就是 > 状态

    private _audio: AudioSourceComponent;
    
    onLoad () {
        var screenSize = view.getVisibleSize()
        this.node.setWorldPosition(new Vec3(screenSize.width*0.93, screenSize.height*0.96, 0))
        this.node.on(Button.EventType.CLICK, this.callback, this);
    }

    callback (button: Button) {
        // console.log(button);
        var tmp = button.pressedSprite
        button.pressedSprite = button.normalSprite
        button.normalSprite  =  tmp ;
        if (this.status) {
            this._audio.pause()
            director.pause()
        } else {
            director.resume()
            this._audio.pause()
        }
        this.status = !this.status;
        // 注意这种方式注册的事件，无法传递 customEventData
    }

    start() {

        this._audio = this.node.parent.getComponent(AudioSourceComponent)

    }

    update(deltaTime: number) {
        
    }
}

