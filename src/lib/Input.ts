
export type InputKey = "w" | "a" | "s" | "d" | "+" | "-";

export class InputMgr
{
    private keys: Record<InputKey, boolean> = {
        w: false,
        a: false,
        s: false,
        d: false,
        "+": false,
        "-": false,
    };

    constructor()
    {
        const keyMap: Record<string, InputKey> = {
            "w": "w",
            "ArrowUp": "w",
            "s": "s",
            "ArrowDown": "s",
            "a": "a",
            "ArrowLeft": "a",
            "d": "d",
            "ArrowRight": "d",
            "+": "+",
            "-": "-",
        };

        document.addEventListener("keydown", (e) => {
            const inputKey = keyMap[e.key];
            if(inputKey)
                this.keys[inputKey] = true;
        });

        document.addEventListener("keyup", (e) => {
            const inputKey = keyMap[e.key];
            if(inputKey)
                this.keys[inputKey] = false;
        });
    }

    public getCurrent()
    {
        return this.keys;
    }
}

export const Input = new InputMgr();
