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