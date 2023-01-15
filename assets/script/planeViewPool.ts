import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('planeViewPool')
export class planeViewPool extends Component {
    @property(Node)
    boostViewPool: Node;


    start() {

    }

    update(deltaTime: number) {
        
    }
}

