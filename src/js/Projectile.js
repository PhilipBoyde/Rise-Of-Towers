export class Projectile {
    constructor(x, y, speed, damage, target) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.damage = damage;
        this.target = target;
    }

    move() {
        let dx = this.target.x - this.x;
        let dy = this.target.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        dx /= distance;
        dy /= distance;
        if (Math.abs(dx) < 5 && Math.abs(dy) < 5) {
            this.target.hit(this.damage);
            this.remove();
        }
    }

    draw(context) {
        context.fillStyle = '#654321'; // brown color
        context.beginPath();
        context.arc(this.x, this.y, 3, 0, Math.PI * 2);
        context.fill();
    }

    remove() {
        this.projectiles.splice(this.projectiles.indexOf(this), 1);
    }
}
