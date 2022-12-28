class Snake{
    // 表示蛇头的元素
    head: HTMLElement;
    // 蛇的身体（包括蛇头）
    bodies: HTMLCollectionOf <HTMLElement>;
    // 获取蛇的容器
    element: HTMLElement;

    constructor() {
        this.element = document.getElementById('snake')!
        this.head = document.querySelector("#snake > div")!;
        this.bodies = this.element.getElementsByTagName('div')!;
    }

    // 获取蛇的坐标（蛇头坐标）
    get X() {
        return this.head.offsetLeft
    }

    // 获取蛇的Y轴坐标
    get Y() {
        return this.head.offsetTop
    }
    // 设置蛇头的坐标
    set X(value){

        if (!this.setCommon(value, this.X, 'X')) return

        this.head.style.left = value + 'px'

        this.checkHeadBody()
    }

    set Y(value){

        if (!this.setCommon(value, this.Y, 'Y')) return

        this.head.style.top = value + 'px'

        this.checkHeadBody()
    }

    // 设置坐标值的公共部分
    setCommon(value:number, oldValue:number, type: string) {
        // 如果新值和旧值相同就不修改
        if (value === oldValue) return false

        // Y值的合法范围 0-290 之间
        if (value < 0 || value > 290) {
            // 进入判断说明蛇撞墙, 抛出一个异常
            throw new Error('蛇撞墙了')
        }
        // 移动身体
        this.moveBody()
        return true
    }

    // 蛇增加身体的方法
    addBody() {
        // 向element中添加一个div
        this.element.insertAdjacentHTML("beforeend",  "<div></div>");
    }

    // 添加一个蛇身体移动的方法
    moveBody() {
        /*
        * 将后边的身体设置为前边身体的位置（从后往前改）
        *   举例子：
        *       第4节 = 第3节的位置
        *       第3节 = 第2节的位置
        *       第2节 = 蛇头的位置
        * */
        // 遍历获取所有的身体
        for (let i = this.bodies.length - 1; i > 0; i--) {
           let x = (this.bodies[i-1] as HTMLElement).offsetLeft;
           let y = (this.bodies[i-1] as HTMLElement).offsetTop;

           // 将这个值设置到当前身体上
           (this.bodies[i] as HTMLElement).style.left = x + 'px';
           (this.bodies[i] as HTMLElement).style.top = y + 'px'
        }
    }

    // 检查是否撞到身体
    checkHeadBody() {
        // 获取所有的身体，检查其是否和蛇头的坐标发生重叠
        for (let i = 1; i<this.bodies.length; i++) {
            if (this.X === this.bodies[i].offsetLeft && this.Y === this.bodies[i].offsetTop) {
                // 说明撞到身体，游戏结束
                throw new Error('撞到自己了')
            }
        }
    }

}

export default Snake
