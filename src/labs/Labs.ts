
import Axios from 'axios'
import * as PIXI from 'pixi.js'

interface SortObject{
    sortIndex:number
}


namespace Labs {
    export  class GameLoop{
     
        public fnStacks:any[] = [];
        private tickers:any;
        private tickerLoop:any;
        private speed:number = 10;
        public static gameLoop:GameLoop;
    
    
        public static getInstance(){
            if(GameLoop.gameLoop){
                return GameLoop.gameLoop;
            }
            GameLoop.gameLoop = new GameLoop();
            return GameLoop.gameLoop;
    
        }
    
        public start(){
            let self = this;
            if(this.tickerLoop)return;
              this.tickerLoop = function(){
                self.tickers = setTimeout(()=>{
                    for(let i =0;i<self.fnStacks.length;i++){
                        if(self.fnStacks[i]){
                            self.fnStacks[i].fn();
                        }
                      
                    }
                    this.tickerLoop();
                },self.speed)
              };
              this.tickerLoop();
        }
        public stop(){
            if(this.tickers){
                clearTimeout(this.tickers);
            }
           if(this.tickerLoop){
                 this.tickerLoop = null;
           }
        }
        public pushLoop(_fnName:string,fns:Function){
            let uniq = this.fnStacks.some((item:any)=>{
                return item.name === _fnName;
            })
            if(uniq){
                throw new SyntaxError('不能出现多个重复函数');
            }
            this.fnStacks.push({
                name:_fnName,
                fn:fns
            });
    
        }
        deleteLoop(fnName:string){
                for(let i=0;i<this.fnStacks.length;i++){
                    if(this.fnStacks[i].name === fnName){
                        this.fnStacks[i] = undefined;
                    }
                }
                var rest= this.fnStacks.filter((item:any)=>{
                    return item != undefined;
                });
                this.fnStacks = rest;
            
        }
        destroyed(){
            this.stop();
            this.fnStacks = [];
        }
    }
    /**
     *     let logwebs = Labs.WebLog.logEvent(
      {
        eventId: FeatureLabs.WebLogEventID.DO_CLOSEBTN
      },
      {
        pageid: self.moduleIndex,
        level: self.currentPage,
        problemid: self.paperTestData[self.moduleIndex].id
      }
    );
     */
    export class WebLog {
        public static logEvent(_option: any, otherparams: any = null) {
            let pageid = _option.pageId || 0;
            let el = _option.el || document.getElementById('app');
            let clickid = _option.clickId || 1;
            let _params: any = otherparams ? Object.keys(otherparams).map((item: any) => {
                return '&' + item + '=' + otherparams[item];
            }) : '';
            let params = 'eventid=' + _option.eventId + '&pageuid=' + pageid + '&clickid=' + clickid + _params.join('');

            let logData = {
                'elem': el,
                'params': params
            };

            if ((window as any).xesWeb_eventLog) {
                (window as any).xesWeb_eventLog.xesEventLog('click', logData);
            };
            return logData;
        }
    }
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

    export class Message {
        public static getMessage(_type: string) {
            return new Promise((resolve: any) => {
                window.addEventListener('message',message_handler);
                function message_handler(event:any){
                    if (event.data.type === _type) {
                        resolve(event.data.data);
                        window.removeEventListener('message',message_handler);
                    }
                }
            })
        }
        public static postMessage(_dataName: string, _data: any = null) {
            window.parent.postMessage({
                type: _dataName,
                data: _data
            }, "*");
        }
        public static postLocalMessage(_dataName: string, _data: any = null) {
            window.postMessage({
                type: _dataName,
                data: _data
            },'*');
        }
    }


    export class Sortion{
        public static InsertionSortByObject(_sortArrObjects:any[],_positive:boolean=true){
            let sortArr = _sortArrObjects.concat(),temp,j,i;
        if(_positive){
            for(i=1;i<sortArr.length;i++){
                temp = sortArr[i];
                j = i-1;
                while(j>=0 && sortArr[j].sortIndex > temp.sortIndex){
                    sortArr[j+1] = sortArr[j];
                    j--;
                }
                sortArr[j+1] = temp;

            }
            return sortArr;
        }else{
            for(i=1;i<sortArr.length;i++){
                temp = sortArr[i];
                j = i-1;
                while(j>=0 && sortArr[j].sortIndex < temp.sortIndex){
                    sortArr[j+1] = sortArr[j];
                    j--;
                }
                sortArr[j+1] = temp;

            }
            return sortArr;
        }

           

        }

        public static InsertSort(_sortArr:number[],_positive:boolean = true){
            let sortArr = _sortArr.concat(),
            temp,i,j;

            if(_positive){
                for(i=1;i<sortArr.length;i++){
                    temp = sortArr[i];
                    j = i-1;
                    while(j>= 0 && temp>sortArr[j]){
                        sortArr[j+1] = sortArr[j];
                        j--;
                    }
                    sortArr[j+1] = temp;
                }
                return sortArr;
            }else{
                for(i=1;i<sortArr.length;i++){
                    temp = sortArr[i];
                    j = i-1;
                    while(j>= 0 && temp<sortArr[j]){
                        sortArr[j+1] = sortArr[j];
                        j--;
                    }
                    sortArr[j+1] = temp;
                }
                return sortArr;
            }
   
        }


    }



    export class SceneManager {
        public static Application: PIXI.Application;
        public static currentScene: any;
        public static stage: PIXI.Container;
        public static stageArr: Array<any> = [];

        public static sceneDatas: Array<any> = [];

     

        public static run(sceneObj: PIXI.Container): void {
            SceneManager.currentScene = sceneObj;
            SceneManager.stageArr.push(sceneObj);
            if (SceneManager.stageArr.length >= 2) {
                console.warn('already scenond')
                SceneManager.stage.removeChildren();
                SceneManager.stageArr[0] = null;
                SceneManager.stageArr.shift();
            }
            SceneManager.stage.addChild(sceneObj);
        }
    }
}
export default Labs;