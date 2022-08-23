
import { GameObject } from "./GameObject";
import { settings } from "../settings";

let canvas: HTMLCanvasElement;
let curTick = 0;

let objects: GameObject[] = [];

export function setupGame(cnvs: HTMLCanvasElement, initialObjects?: GameObject[])
{
    canvas = cnvs;
    setupCanvas();

    if(initialObjects)
        objects = sortObjects(initialObjects);

    loop();
    setInterval(loop, 1000 / settings.game.fps);
}

export function addObject(obj: GameObject)
{
    objects = sortObjects([...objects, obj]);
}

export function delObject(findFunc: (obj: GameObject) => boolean)
{
    objects.forEach((ob, i) => {
        if(findFunc(ob))
            objects.splice(i, 1);
    });
}

function sortObjects(objs: GameObject[])
{
    return objs.sort((a, b) => a.zIndex > b.zIndex ? 1 : -1);
}

function setupCanvas()
{
    const ctx = canvas.getContext("2d")!;

    ctx.imageSmoothingEnabled = false;

    resize(ctx);
    window.addEventListener("resize", () => resize(ctx));
}

function loop()
{
    console.log("objs", objects);

    objects.forEach(ob => {
        ob.tick(curTick);
    });

    canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);

    objects.forEach(ob => ob.drawInt());

    curTick++;
}

function resize(ctx: CanvasRenderingContext2D)
{
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}
