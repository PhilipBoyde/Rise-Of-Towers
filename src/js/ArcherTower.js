import {Projectile} from './Projectile.js';
class ArcherTower extends Tower {
     constructor(x, y) {
         super(x, y, range, damage, cost, upgradeCost, maxLevel,);
         this.shootingSpeed = 2;
         this.projectileSpeed = 5
         this.projectileType = 'arrow';
         this.level = 1;
         this.effect = 'none';
         this.projectiles = []; // amo to RELOAD in an array of objects :)
         this.timeSinceLastShot = 0;
     }

    findTargets(enemies) {
        //  enemies within the tower range
        return enemies.filter(enemy => {
            const dx = enemy.position.x - this.x;
            const dy = enemy.position.y - this.y;
            return Math.sqrt(dx * dx + dy * dy) <= this.range;
        });
    }

    shoot(enemies) {
        //  targeting part
        const targets = this.findTargets(enemies);
        if (targets.length > 0) {
            const target = targets[0];

          const projectile = new Projectile(  //filling AMO
                  this.x,
                  this.y,
                  this.projectileSpeed,
                  this.damage,
                  target,
                  this.handleProjectileRemoval.bind(this) // Bind the current context
                );
                this.projectiles.push(projectile);
              }
            }

            handleProjectileRemoval(projectile) {  // should hopefully remove shot arrow

              const index = this.projectiles.indexOf(projectile);
              if (index > -1) {
                this.projectiles.splice(index, 1);
              }
            }

            update(enemies) {

              for (const projectile of this.projectiles) {
                projectile.move();
                }
                this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion);

                this.shoot(enemies);
                }

         draw(context)
         {
             super.draw(context);
             for (const projectile of this.projectiles) {
                 projectile.draw(context);
             }

         }

 }
 export default ArcherTower;


