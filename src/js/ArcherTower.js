import {Projectile} from './Projectile.js';
class ArcherTower extends Tower {
     constructor(x, y) {
         super(x, y, range, damage, cost, upgradeCost, maxLevel,);
         this.shootingSpeed = 2;
         this.projectileType = 'arrow';
         this.level = 1;
         this.effect = 'none';
         this.projectiles = []; // amo to RELOAD in an array of objects :)

         shoot(target)
         {
             const projectile = new Projectile(this.x, this.y, this.shootingSpeed, this.damage, target);
             this.projectiles.push(projectile);
         }

         update()
         {
             for (const projectile of this.projectiles) {
                 projectile.move();
             }
         }

         draw(context)
         {
             super.draw(context);
             for (const projectile of this.projectiles) {
                 projectile.draw(context);
             }

         }
     }
 }


