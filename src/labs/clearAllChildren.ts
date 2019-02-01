export function clearAllChildren(containers:any){
    if(!containers.children || containers.children.length===0){
        containers.removeAllListeners();
        containers.parent.removeChild(containers);
        return;
    }
    for(let i in containers.children){
        containers.removeAllListeners();
        containers.removeChildren();

        if(containers.children.length>0){
            clearAllChildren(containers.getChildAt(i));
        }
    }
}