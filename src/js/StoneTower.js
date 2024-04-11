import {Projectile} from './Projectile.js';
import Tower from './Tower.js';

class StoneTower extends Tower {
    constructor(x, y) {
        const range = 120;
        const damage = 75; // Higher damage
        const cost = 100;
        const upgradeCost = 120;
        const maxLevel = 5;
        super(x, y, range, damage, cost, upgradeCost, maxLevel);
        this.shootingSpeed = 1;
        this.projectileSpeed = 3;
        this.projectileType = 'stone';
        this.projectiles = [];
        this.timeSinceLastShot = 0;
        this.level = 1;
    }
    shoot(enemies, deltaTime) {
        this.timeSinceLastShot += deltaTime; // should make it shoot slower
        if (this.timeSinceLastShot >= 1 / this.shootingSpeed) {  // shoot after time passed
            this.timeSinceLastShot = 0; // Reset the time since the last shot

            const target = this.findTargets(enemies)[0];
            if (target) {
                const projectile = new Projectile(
                    this.x,
                    this.y,
                    this.projectileSpeed,
                    this.damage,
                    target,
                    this.handleProjectileRemoval.bind(this)
                );
                this.projectiles.push(projectile);
            }
        }
    }

    update(enemies, deltaTime) {
        this.projectiles.forEach(projectile => projectile.move());
        this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion);
        this.shoot(enemies, deltaTime);
    }

    draw(context) {
        context.fillStyle = '#9aa9b3'; // grey
        context.beginPath();
        context.arc(this.x, this.y, 20, 0, Math.PI * 2);
        context.fill();

        this.projectiles.forEach(projectile => projectile.draw(context)); // drawing projectiles
    }

    handleProjectileRemoval(projectile) {
        // Remove the projectile from the projectiles array
        const index = this.projectiles.indexOf(projectile);
        if (index > -1) {
            this.projectiles.splice(index, 1);
        }
    }
}

export default StoneTower;