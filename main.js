class C {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    add(c) {
        this.a += c.a;
        this.b += c.b;
    }

    mlt(c) {
        const pa = this.a * c.a - this.b * c.b;
        const pb = this.a * c.b + this.b * c.a;
        this.a = pa;
        this.b = pb;
    }

    sqrt() {
        const pa = this.a ** 2 - this.b ** 2;
        const pb = 2 * this.a * this.b;
        this.a = pa;
        this.b = pb;
    }

    getAbs() {
        return Math.sqrt(this.a ** 2 + this.b ** 2);
    }
}



const canW = 500;
const canH = 500;

const can = document.getElementById("canvas");
const con = can.getContext("2d");
can.width = canW;
can.height = canH;
can.style.background = "#fff";


const ratio = 200;

const center = new C(-0.75, 0);

const numOfCalc = 50;


function check(x, y) {

    const c = new C(0, 0);
    let i = 0;
    while (i < numOfCalc) {
        c.sqrt();
        c.add(new C(x, y));
        if (c.getAbs() > 2) {
            return i;
        }
        i++;
    }

    return i;
}


function drawAll() {
    for (let y = 0; y < canH; y++) {
        for (let x = 0; x < canW; x++) {
            const a = (x - canW / 2) / ratio + center.a;
            const b = -(y - canH / 2) / ratio + center.b;
            const result = check(a, b);
            // con.fillStyle = `rgba(0, 0, 0, ${result / numOfCalc})`;
            if (result === numOfCalc) {
                con.fillStyle = "black";
            }
            // else if(result === numOfCalc - 1) {
            //     con.fillStyle = "red";
            // }
            else {
                con.fillStyle = `hsl(${(1 - result / numOfCalc) * 240}, 100%, 50%)`;
                // con.fillStyle = "white";
            }
            con.fillRect(x, y, 1, 1);

        }
    }
}

drawAll();