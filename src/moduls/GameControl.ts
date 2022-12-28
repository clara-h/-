// 引入其他的类
import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

// 游戏控制器，控制其它所有类
class GameControl {
    // 定义三个属性
    // 蛇
    snake: Snake;
    // 食物
    food: Food;
    // 计分牌
    scorePanel: ScorePanel;

    // 创建一个属性来存储蛇的移动方向（也就是按键的方向）
    direction: string = ''

    // 创建一个属性来记录游戏是否结束
    isLive = true

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel()
        this.init()
    }

    // 游戏初始化方法，调用后游戏即开始
    init() {
        // 绑定键盘按键按下的事件
        /*
        * .bind()创建一个新函数
        * this.keydownHandler.bind(this) 把this绑定到了方法里面
        * */
        document.addEventListener('keydown', this.keydownHandler.bind(this))
        // 调用run方法，使蛇移动
        this.run()
    }

    /*
    * ArrowDown （ie的是 Up/Down/Left/Right）
    * ArrowUp
    * ArrowLeft
    * ArrowRight
    * */

    // 创建一个键盘按下的响应函数
    keydownHandler(event: KeyboardEvent) {
        // 需要检查event.key的值是凑合法（用户是否按了正确的按键）
        // 修改direction属性
        const keyArr = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Up', 'Down', 'Left', 'Right']
        if (keyArr.includes(event.key)) {
            if (this.direction === event.key) return
            // 禁止掉头
            if (['ArrowDown', 'ArrowUp'].includes(this.direction) && ['ArrowDown', 'ArrowUp'].includes(event.key)) return;
            if (['ArrowLeft', 'ArrowRight'].includes(this.direction) && ['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
            this.direction = event.key;
        }
    }

    // 创建一个控制蛇移动的方法
    run() {
        /*
        * 根据方向（this.direction）来使蛇的位置改变
        *   向上 top 减少
        *   向下 top 增加
        *   向左 left 减少
        *   向右 left 增加
        * */

        // 获取蛇现在的坐标
        let X = this.snake.X;
        let Y = this.snake.Y;

        // 根据方向修改X、Y值
        switch (this.direction) {
            case "ArrowDown":
            case "Down":
                // 向下移动 top 增加
                Y += 10;
                break;
            case "ArrowUp":
            case "Up":
                // 向上移动 top 减少
                Y -= 10;
                break;
            case "ArrowLeft":
            case "Left":
                // 向左移动 left 减少
                X -= 10;
                break;
            case "ArrowRight":
            case "Right":
                // 向右移动 left 增加
                X += 10;
                break
        }

        // 检查蛇是否吃到食物
       this.checkEat(X, Y)

        // 修改蛇的X和Y值
        try{
            this.snake.X = X
            this.snake.Y = Y
        } catch ({message}) {
            // 进入到catch，说明出现来异常，游戏结束，弹出一个提示信息
            alert(message + '，Game over ！')
            // 将islive设置为false
            this.isLive = false
        }

        // 开启一个定时调用
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1)*30)
    }

    // 定义一个方法，用来检查蛇是否吃到食物
    checkEat(X: number, Y:number) {
        if(X === this.food.X && Y === this.food.Y) {
            // 食物的位置进行重置
            this.food.change();
            // 分数增加
            this.scorePanel.addScore();
            // 蛇要增加一节
            this.snake.addBody();
        }
    }

}

export default GameControl
