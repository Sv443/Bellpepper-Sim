import { GameObject } from "../lib/GameObject";
import { Input } from "../lib/Input";
import { settings } from "../settings";

export class Player extends GameObject
{
    constructor(canvas: HTMLCanvasElement)
    {
        const playerSize = 200;
        super(canvas, "player", {
            size: playerSize,
            sprite: "./bellpepper.png",
            pos: [
                canvas.width / 2 - playerSize / 2,
                canvas.height / 2 - playerSize / 2,
            ],
            zIndex: 10,
        });
    }

    tick()
    {
        this.tryMove(settings.player.moveSpeed);

        const input = Input.getCurrent();

        let changeBy = 0;
        if(input["+"])
            changeBy = 5;
        else if(input["-"])
            changeBy = -5;

        this.setSize([this.w + changeBy, this.h + changeBy]);
    }
}
