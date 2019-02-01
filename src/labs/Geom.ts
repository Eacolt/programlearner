namespace geom {
    export function getDistance(p1:any = {x:0,y:0},p2:any = {x:1,y:1}){
        let distX = p2.x - p1.x;
        let distY = p2.y - p1.y;
        return  Math.sqrt(Math.pow(distX,2)+Math.pow(distY,2));
    }
    export function rotationToRadian(_rotation:number){
        return _rotation*Math.PI/180;
    }
    export function radianToRotation(_radian:number){
        return _radian*180/Math.PI;
    }
    export function getAtan2(p1:any = {x:0,y:0},p2:any = {x:1,y:1}){
        let distY = p2.y - p1.y;
        let distX = p2.x - p1.x;
        return  Math.atan2(distY,distX);
    }
    
    export class Line {
        public x1!: number;
        public y1!: number;
        public x2!: number;
        public y2!: number;
        constructor(x1: number, y1: number, x2: number, y2: number) {
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
        }
    }
    export function islineSeparate(l1: geom.Line, l2: geom.Line) {
        //快速排斥实验
        if ((l1.x1 > l1.x2 ? l1.x1 : l1.x2) < (l2.x1 < l2.x2 ? l2.x1 : l2.x2) ||
            (l1.y1 > l1.y2 ? l1.y1 : l1.y2) < (l2.y1 < l2.y2 ? l2.y1 : l2.y2) ||
            (l2.x1 > l2.x2 ? l2.x1 : l2.x2) < (l1.x1 < l1.x2 ? l1.x1 : l1.x2) ||
            (l2.y1 > l2.y2 ? l2.y1 : l2.y2) < (l1.y1 < l1.y2 ? l1.y1 : l1.y2)) {
            return false;
        }

    }
    //线段相交
    export function islineSegmentInter(l1: geom.Line, l2: geom.Line) {
        if (geom.islineSeparate(l1, l2)) return;
  
        //跨立实验
        if ((((l1.x1 - l2.x1) * (l2.y2 - l2.y1) - (l1.y1 - l2.y1) * (l2.x2 - l2.x1)) *
            ((l1.x2 - l2.x1) * (l2.y2 - l2.y1) - (l1.y2 - l2.y1) * (l2.x2 - l2.x1))) > 0 ||
            (((l2.x1 - l1.x1) * (l1.y2 - l1.y1) - (l2.y1 - l1.y1) * (l1.x2 - l1.x1)) *
                ((l2.x2 - l1.x1) * (l1.y2 - l1.y1) - (l2.y2 - l1.y1) * (l1.x2 - l1.x1))) > 0) {
            return false;
        }
      
        return true;


    }
    //通过两条线段求交点
    export function getLineIntersection(l1:geom.Line,l2:geom.Line):any{
        if(!geom.islineSegmentInter)return;
        return (geom.getLineIntersectionByPoint({
            x:l1.x1,
            y:l1.y1
        },{
            x:l1.x2,
            y:l1.y2
        },{
            x:l2.x1,
            y:l2.y1
        },{
            x:l2.x2,
            y:l2.y2
        }));

      
    }
    export function  getLineIntersectionByPoint(a:any, b:any, c:any, d:any){  
  
        /** 1 解线性方程组, 求线段交点. **/  
        // 如果分母为0 则平行或共线, 不相交  
            var denominator = (b.y - a.y)*(d.x - c.x) - (a.x - b.x)*(c.y - d.y);  
            if (denominator==0) {  
                return false;  
            }  
           
        // 线段所在直线的交点坐标 (x , y)      
            var x = ( (b.x - a.x) * (d.x - c.x) * (c.y - a.y)   
                        + (b.y - a.y) * (d.x - c.x) * a.x   
                        - (d.y - c.y) * (b.x - a.x) * c.x ) / denominator ;  
            var y = -( (b.y - a.y) * (d.y - c.y) * (c.x - a.x)   
                        + (b.x - a.x) * (d.y - c.y) * a.y   
                        - (d.x - c.x) * (b.y - a.y) * c.y ) / denominator;  
          
        /** 2 判断交点是否在两条线段上 **/  
            if (  
                // 交点在线段1上  
                (x - a.x) * (x - b.x) <= 0 && (y - a.y) * (y - b.y) <= 0  
                // 且交点也在线段2上  
                 && (x - c.x) * (x - d.x) <= 0 && (y - c.y) * (y - d.y) <= 0  
                ){  
          
                // 返回交点p  
                return {  
                        x :  x,  
                        y :  y  
                    }  
            }  
            //否则不相交  
            return false  
          
        }  
}
namespace geomRender {
    export class Line extends PIXI.Graphics {
        private _moveX: number = 0;
        private _moveY: number = 0;
        private _lineData: any = null;
        private _originData: any = null;

        constructor(_line: geom.Line) {
            super();
            this._originData = {
                x1: _line.x1,
                y1: _line.y1,
                x2: _line.x2,
                y2: _line.y2
            }
            this._lineData = _line;
            this.draw(_line);

        }
        public set moveX(n: number) {
            this._moveX = n;
            this.update();
        }
        public get moveX() {
            return this._moveX;
        }
        public set moveY(n: number) {
            this._moveY = n;
            this.update();
        }
        public get moveY() {
            return this._moveY;
        }
        public set lineData(_lineData: any) {
            this._originData = {
                x1: _lineData.x1,
                y1: _lineData.y1,
                x2: _lineData.x2,
                y2: _lineData.y2
            }
            this._lineData = _lineData;

        }
        public get lineData() {
            return this._lineData;
        }
        public draw(_line: geom.Line) {
            this.lineStyle(1, 0xff0000).moveTo(_line.x1, _line.y1).lineTo(_line.x2, _line.y2);
        }
        public update() {
            this.clear();
            this._lineData.x1 = this.moveX + this._originData.x1;
            this._lineData.y1 = this.moveY + this._originData.y1;
            this._lineData.x2 = this.moveX + this._originData.x2;
            this._lineData.y2 = this.moveY + this._originData.y2;
            this.lineStyle(1, 0xff0000).moveTo(this._lineData.x1, this._lineData.y1).lineTo(this._lineData.x2, this._lineData.y2);
        }

    }
}
export { geom, geomRender };