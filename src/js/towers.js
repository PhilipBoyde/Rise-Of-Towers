function inRange(enemyPos,towerPos) {
    var radius = 25;
     towerPos;
     enemyPos;


     let inArea = false;
    
    if (enemyPos < circleArea(radius)){
        inArea = true;
        return inArea;
    }
    function shoot(){
        var shoot = "Pew pew"
        if(inRange(1.1,22.1) === true){
            return shoot;
        }
    }
    function getPosition() {
    }
    function circleArea(radius){
        return 2 * Math.PI * radius;
    }
}
