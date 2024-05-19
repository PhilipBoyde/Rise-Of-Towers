/*
List of images to preload, this is a list of all the images/assets that are used in the game.
It is important to preload the images before the game starts to avoid any lag or delay when the images are needed.
 */
const imageUrls = [
    //Life
    "../js/model/assets/Life/75.png",
    "../js/model/assets/Life/50.png",
    "../js/model/assets/Life/25.png",
    "../js/model/assets/Life/0.png",

    //Coin
    "../js/model/assets/Coins/MonedaD.png",

    // Towers
    "../js/model/assets/Tower/InfernoT.png",
    "../js/model/assets/Tower/Tower1/RedMoonTower_free_idle_animation4.png",
    "../js/model/assets/Tower/Tower1/walla.png",
    "../js/model/assets/Tower/StoneT.png",

    //WizardTower projectiles
    "../js/model/assets/Tower/Projectile/Mage/Mage.png",
    "../js/model/assets/Tower/Projectile/Mage/Mage3.png",
    "../js/model/assets/Tower/Projectile/Mage/Mage4.png",
    "../js/model/assets/Tower/Projectile/Mage/Mage5.png",
    "../js/model/assets/Tower/Projectile/Mage/Mage6.png",
    "../js/model/assets/Tower/Projectile/Mage/Mage7.png",

    //InfernoTower projectiles
    "../js/model/assets/Tower/Projectile/Inferno/FB500-1.png",
    "../js/model/assets/Tower/Projectile/Inferno/FB500-2.png",
    "../js/model/assets/Tower/Projectile/Inferno/FB500-3.png",
    "../js/model/assets/Tower/Projectile/Inferno/FB500-4.png",
    "../js/model/assets/Tower/Projectile/Inferno/FB500-5.png",
    "../js/model/assets/Tower/Projectile/Inferno/B500-2.png",
    "../js/model/assets/Tower/Projectile/Inferno/B500-3.png",
    "../js/model/assets/Tower/Projectile/Inferno/B500-4.png",

    //StoneTower projectiles
    "../js/model/assets/Tower/Projectile/Stone/Stone3.png",
    "../js/model/assets/Tower/Projectile/Stone/Stone4.png",
    "../js/model/assets/Tower/Projectile/Stone/Stone5.png",
    "../js/model/assets/Tower/Projectile/Stone/Stone6.png",
    "../js/model/assets/Tower/Projectile/Stone/Stone7.png",

    //IceTower projectiles
    "../js/model/assets/Tower/Projectile/Ice/Ice3.png",
    "../js/model/assets/Tower/Projectile/Ice/Ice4.png",
    "../js/model/assets/Tower/Projectile/Ice/Ice5.png",
    "../js/model/assets/Tower/Projectile/Ice/Ice6.png",
    "../js/model/assets/Tower/Projectile/Ice/Ice7.png",

    //Slime
    '../js/model/assets/EnemySprites/Slime/U_Walk.png',
    '../js/model/assets/EnemySprites/Slime/D_Walk.png',
    '../js/model/assets/EnemySprites/Slime/S_Walk.png',
    '../js/model/assets/EnemySprites/Slime/S_Walk.png',

    //Wolf
    '../js/model/assets/EnemySprites/Wolf/U_Walk.png',
    '../js/model/assets/EnemySprites/Wolf/D_Walk.png',
    '../js/model/assets/EnemySprites/Wolf/R_Walk.png',
    '../js/model/assets/EnemySprites/Wolf/L_Walk.png',

    //Bee
    '../js/model/assets/EnemySprites/Bee/U_Walk.png',
    '../js/model/assets/EnemySprites/Bee/D_Walk.png',
    '../js/model/assets/EnemySprites/Bee/R_Walk.png',
    '../js/model/assets/EnemySprites/Bee/L_Walk.png',

    //Goblin
    '../js/model/assets/EnemySprites/Goblin/U_Walk.png',
    '../js/model/assets/EnemySprites/Goblin/D_Walk.png',
    '../js/model/assets/EnemySprites/Goblin/R_Walk.png',
    '../js/model/assets/EnemySprites/Goblin/L_Walk.png',

    //Cyclops
    '../js/model/assets/EnemySprites/Boss/Cyclops/walk4.png',
    '../js/model/assets/EnemySprites/Boss/Cyclops/walk4.png',
    '../js/model/assets/EnemySprites/Boss/Cyclops/walk4.png',
    '../js/model/assets/EnemySprites/Boss/Cyclops/walk4.png',

    //Mech
    '../js/model/assets/EnemySprites/Boss/Mech/walk2.png',
    '../js/model/assets/EnemySprites/Boss/Mech/walk2.png',
    '../js/model/assets/EnemySprites/Boss/Mech/walk2.png',
    '../js/model/assets/EnemySprites/Boss/Mech/walk2.png',

    //DragonWiz
    '../js/model/assets/EnemySprites/dragonWiz/walk.png',
    '../js/model/assets/EnemySprites/dragonWiz/walk.png',
    '../js/model/assets/EnemySprites/dragonWiz/walk.png',
    '../js/model/assets/EnemySprites/dragonWiz/walk.png',

    //Akaname
    '../js/model/assets/EnemySprites/Akaname/walk.png',
    '../js/model/assets/EnemySprites/Akaname/walk.png',
    '../js/model/assets/EnemySprites/Akaname/walk.png',
    '../js/model/assets/EnemySprites/Akaname/walk.png',
];

// Boolean to track if all images are loaded
let allImagesLoaded = false;

// Counter to track how many images have loaded
let imagesLoadedCount = 0;

// Preload and "warm up" images
imageUrls.forEach(url => {
    const img = new Image();
    img.onload = () => {
        imagesLoadedCount++;
        if (imagesLoadedCount === imageUrls.length) {
            allImagesLoaded = true;
            window.allImagesLoaded = allImagesLoaded;
        }
    };
    img.src = url;

    // Create a hidden div element
    const div = document.createElement('div');
    div.style.display = 'none';

    // Append the image to the div to "decode the image"
    div.appendChild(img);

    // Append the div to the body
    document.body.appendChild(div);
});