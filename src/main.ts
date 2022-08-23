import { addObject, setupGame } from "./lib/game";
import { Player } from "./objects/Player";
import "./main.css";
import { EmptyObject } from "./objects/EmptyObject";

const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;

function run()
{
    setupGame(canvas, [
        new Player(canvas),
    ]);

    setTimeout(
        () => addObject(new EmptyObject(canvas, { size: 100 })),
        1000 * 10,
    );
}

run();
