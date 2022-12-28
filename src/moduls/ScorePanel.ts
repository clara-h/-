// 定义表示计分牌的类
class ScorePanel{
    // score和level用来记录分数和等级
    private _score = 0
    private _level = 1

    // 分数和等级所在的元素，在构造函数中进行初始化
    scoreEle: HTMLElement
    levelEle: HTMLElement

    // 设置一个变量限制等级
    maxLevel: number

    // 设置一个变量表示多少分升级
    upScore: number

    constructor(maxlevel: number = 10, upScore: number = 10) {
        this.maxLevel = maxlevel
        this.upScore = upScore
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;
    }

    get score() {
        return this._score
    }

    get level() {
        return this._level
    }

    // 设置一个加分的方法
    addScore() {
        // 使分数自增
        this.scoreEle.innerHTML = ++this._score + '';
        // 判断分数是多少
        if (this._score % this.upScore === 0) {
            this.levelUp()
        }
    }

    // 提升等级的方法
    levelUp() {
        if (this._level >= this.maxLevel) return
        this.levelEle.innerHTML = ++this._level + ''
    }
}

// 测试代码
// const scorePanel = new ScorePanel()
// for (let i =0; i<200; i++) {
//     scorePanel.addScore()
// }

export default ScorePanel
