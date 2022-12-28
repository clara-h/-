// 定义食物类food
class Food{
    // 定义一个属性表示食物所对应的元素
    element: HTMLElement

    constructor() {
        // 获取页面中的food元素病将其赋值给element （！表示改元素没有问题，一定会存在）
        this.element = document.getElementById('food')!;
    }

    // 定义一个获取食物x轴坐标的方法
    get X() {
        return this.element.offsetLeft
    }

    // 定义一个获取食物Y轴坐标的方法
    get Y() {
        return this.element.offsetTop
    }

    // 修改食物的位置
    change() {
        // 生产一个随机的位置
        // 食物的位置最小是0，最大是290
        // 蛇移动一次就是一格，一格的大小就是10，所以就要求食物的位置是10的倍数

        let top = Math.round(Math.random() * 29) * 10
        let left = Math.round(Math.random() * 29) * 10
        this.element.style.left = left + 'px'
        this.element.style.top = top + 'px'
    }
}

// 测试代码
// const food = new Food()
// food.change()
// console.log(food.Y, food.X);

export default Food
