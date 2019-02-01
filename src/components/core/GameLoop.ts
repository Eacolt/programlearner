
export default class GameLoop{
    private loopsId:number = 0;
    private fnStacks:any[] = [];
    private tickers:any;
    private tickerLoop:any;
    private speed:number = 1000/60;
    public start(){
        let self = this;
        if(this.tickerLoop)return;
          this.tickerLoop = function(){
            self.tickers = setTimeout(()=>{

                for(let i =0;i<self.fnStacks.length;i++){
                    self.fnStacks[i]();

                }
                this.tickerLoop();
 
            },self.speed)
        
          };
          this.tickerLoop()

        

    }
    public stop(){
        if(this.tickers){
            clearTimeout(this.tickers);
        }
        if(this.tickerLoop){
            this.tickerLoop = null;
        }

    }
    public pushLoop(arg:Function){
      
       if(arg.name === ''){
           throw new SyntaxError('不能是空命函数');

        };

        let uniq = this.fnStacks.some((item:any)=>{
            return item.name === arg.name;
        })
        if(uniq){
            throw new SyntaxError('不能出现多个重复函数');
        }

        console.log('成功添加',arg.name);
        this.fnStacks.push(arg);

    }
    deleteLoop(argFn:Function){
        let index = this.fnStacks.indexOf(argFn.name);
        this.fnStacks.splice(index,1);

    }
    destroyed(){
        this.stop();
        this.fnStacks = [];
    }
}