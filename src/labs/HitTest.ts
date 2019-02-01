export function hitTestRect(pointer:any,rect:PIXI.Rectangle){
    if(pointer.x > rect.x && pointer.x <= rect.width+rect.x
        && pointer.y>rect.y && pointer.y<rect.y+rect.height){
            return true;
        }
        return false;
}