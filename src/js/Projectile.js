export class Projectile {
    constructor(x, y, speed, damage, target) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.damage = damage;
        this.target = target;
        this.onDelete = onDelete; // cons for when projectile needs to be removed
        this.markedForDeletion = false;
    }

    move() {
        let dx = this.target.x - this.x;
        let dy = this.target.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        dx /= distance;
        dy /= distance;
        this.x += dx * this.speed; // moving projectile
        this.y += dy * this.speed;

       if (Math.abs(this.x - this.target.position.x) < 5 && Math.abs(this.y - this.target.position.y) < 5) {
             this.target.health -= this.damage; // damaging
             this.markedForDeletion = true; // marking it to be deleted
             this.onDelete(this); // Now tower remove this projectile
           }
         }

    draw(context) {
        context.fillStyle = '#654321'; // brown color
        context.beginPath();
        context.arc(this.x, this.y, 3, 0, Math.PI * 2);
        context.fill();
    }

    remove() {
        this.onDelete(this);
    }
}
