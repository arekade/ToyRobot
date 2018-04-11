export class Robot {
    Faces = {
        North: 0,
        East: 90,
        South: 180,
        West: 270
    };
    isPlaced: boolean;
    postion: Position;

    constructor(rob: any) {
        this.isPlaced = rob.isPlaced || false;
        this.postion = rob.position || {};
    }

    public Place(x: number, y: number, f: string) {
        if ((x < 0 || x > 5) && (y < 0 || y > 5)) {
            console.log('Out of bounds');
        } else {
            this.isPlaced = true;
            this.postion = new Position([]);
            this.postion.x = x;
            this.postion.y = y;
            this.postion.f = this.Faces[f];
            console.log(this.postion);
        }
    }

    public Move() {
        if (!this.isPlaced) {
            console.log('Robot not placed on the table');
        } else {
            switch (this.postion.f) {
                case 0:
                case 360:
                    if (this.postion.y < 5) {
                        this.postion.y++;
                    }
                    return;
                case 90:
                    if (this.postion.x < 5) {
                        this.postion.x++;
                    }
                    return;
                case 180:
                    if (this.postion.y > 0) {
                        this.postion.y--;
                    }
                    return;
                default:
                    if (this.postion.x > 0) {
                        this.postion.x--;
                    }
                    return;
            }
        }
    }

    public Turn(direction: string) {
        if (!this.isPlaced) {
            console.log('Robot not placed on the table');
        } else {
            switch (direction.toLowerCase()) {
                case 'left':
                    this.postion.f = this.postion.f === 0 || this.postion.f === 360 ? 270 : this.postion.f - 90;
                    return;
                default:
                    this.postion.f = this.postion.f === 0 || this.postion.f === 360 ? 90 : this.postion.f + 90;
                    return;
            }
        }
    }

    public Report(): string {
        if (!this.isPlaced) {
            return 'Robot not placed on the table';
        } else {
            return this.postion.x + ', ' + this.postion.y + ', ' + this.getFace();
        }
    }

    private getFace() {
        switch (this.postion.f) {
            case 0:
            case 360:
                return 'North';
            case 90:
                return 'East';
            case 180:
                return 'South';
            default:
                return 'West';
        }
    }

}
export class Position {
    x: number;
    y: number;
    f: number;

    constructor(position?: any) {
        this.x = position.x || null;
        this.y = position.y || null;
        this.f = position.f || null;
    }
}


