
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
                SceneManager.stage.removeChildren();
                SceneManager.stageArr[0] = null;
                SceneManager.stageArr.shift();
            }
            SceneManager.stage.addChild(sceneObj);
        }
    }