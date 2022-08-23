import { settings } from "../settings";
import { Input } from "./Input";
import { clamp } from "./util";

export interface GameObjectDef {
    size: [w: number, h: number] | number;
    pos?: [x: number, y: number];
    // rot: number;
    sprite?: string;
    drawBoundingBox?: boolean;
    zIndex?: number;
}

export abstract class GameObject
{
    protected canvas;
    protected ctx;

    readonly objectName;
    readonly uid = "";

    public x;
    public y;
    public zIndex;

    public w;
    public h;

    protected spriteUri?: string;
    protected spriteImg?: HTMLImageElement;

    private readonly drawBoundingBox;

    constructor(canvas: HTMLCanvasElement, objectName: string, objectDef: GameObjectDef)
    {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        this.objectName = objectName;

        const { pos, size, sprite, drawBoundingBox, zIndex } = objectDef;

        this.x = pos?.[0] ?? 0;
        this.y = pos?.[1] ?? 0;

        this.zIndex = zIndex ?? 0;

        if(Array.isArray(size))
        {
            this.w = size[0];
            this.h = size[1];
        }
        else
            this.w = this.h = size;

        this.spriteUri = sprite;
        if(this.spriteUri)
        {
            this.spriteImg = new Image();
            this.spriteImg.src = this.spriteUri;
        }

        this.drawBoundingBox = drawBoundingBox;
    }

    public getBounds()
    {
        return [
            [this.x, this.y],
            [this.x + this.w, this.y + this.h],
        ];
    }

    /**
     * @param param0 new x and y position
     * @param free set to true to disable restricting object pos to canvas area
     */
    public setPos([x, y]: number[], free = false)
    {
        this.x = free ? x : clamp(x, 0, this.canvas.width - this.w);
        this.y = free ? y : clamp(y, 0, this.canvas.height - this.h);
    }

    /**
     * @param param0 new width and height
     * @param free set to true to disable restricting object size to canvas area
     */
    public setSize([w, h]: number[], free = false)
    {
        this.w = free ? w : clamp(w, 0, this.canvas.width - 1);
        this.h = free ? h : clamp(h, 0, this.canvas.height - 1);
    }

    /**
     * @param speed in pixels per tick
     */
    public tryMove(speed: number)
    {
        const input = Input.getCurrent();

        if(input.w)
            this.y -= 1 * speed;
        if(input.a)
            this.x -= 1 * speed;
        if(input.s)
            this.y += 1 * speed;
        if(input.d)
            this.x += 1 * speed;

        if(this.y < 1)
            this.y = 1;
        if(this.y > this.canvas.height - this.h)
            this.y = this.canvas.height - this.h;
        if(this.x < 1)
            this.x = 1;
        if(this.x > this.canvas.width - this.w)
            this.x = this.canvas.width - this.w;
    }

    /** Executed on each tick, before draw(), to get this instance to a draw-able state */
    public tick(num: number) { void num; }

    public drawInt()
    {
        if(this.drawBoundingBox || settings.debug.drawBoundingBoxes)
        {
            this.ctx.strokeStyle = "#f00";
            this.ctx.strokeRect(this.x, this.y, this.w, this.h);
        }

        this.draw();
    }

    /** Executed to draw this instance to the canvas */
    protected draw()
    {
        if(this.spriteImg)
            this.ctx.drawImage(this.spriteImg, this.x, this.y, this.w, this.h);
        else
        {
            this.ctx.strokeStyle = "#f0f";
            this.ctx.strokeRect(this.x, this.y, this.w, this.h);

            this.ctx.font = "10px Arial";
            this.ctx.fillStyle = "#fff";
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.fillText("<no sprite>", this.x + this.w / 2, this.y + this.h / 2, this.w);
        }
    }
}
