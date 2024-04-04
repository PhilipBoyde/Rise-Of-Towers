export class Slime extends Enemy {
  constructor() {
    super();
    this.health = 40;
    this.attack = 2;
    this.defense = 1;
    this.speed = 1;
  }
}

export class Golumn extends Enemy {
    constructor() {
        super();
        this.health = 1000;
        this.attack = 2;
        this.defense = 1;
        this.speed = 0.2;
    }
}