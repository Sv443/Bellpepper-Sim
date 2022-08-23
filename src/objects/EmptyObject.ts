import { GameObject, GameObjectDef } from "../lib/GameObject";

export class EmptyObject extends GameObject
{
    constructor(canvas: HTMLCanvasElement, def: GameObjectDef)
    {
        super(canvas, "empty", def);
    }

    tick(num: number)
    {
        if(num % 200 === 0)
            this.setPos([
                Math.floor(Math.random() * this.canvas.width),
                Math.floor(Math.random() * this.canvas.height),
            ]);
    }
}
