import React, { Component } from 'react'
import raf from 'raf'

import isEqual from 'util/isEqual'

import './less/styles.less'

class Page extends Component {

  constructor(props, context) {
    super(props, context)

    // 当前数据，用于和新请求的数据进行比较
    this.data = []
    // 所有待动画数据
    this.pool = []
    // 当前动画的数据
    this.animateQueue = []

    this.listRef = React.createRef()
    this.fetchTimer = null
    this.animateTimer = null
  }

  componentDidMount() {
    this.fetchList()
    this.initAnimate()

    this.fetchTimer = setInterval(() => {
      this.fetchList()
    }, 10 * 1000)
  }

  componentWillUnmount() {
    clearInterval(this.fetchTimer)
    raf.cancel(this.animateTimer)
  }

  initAnimate() {
    const $list = this.listRef.current

    let counter = -1
    const tick = () => {
      const { pool, animateQueue } = this

      // 控制动画速度
      counter = (counter + 1) % 100

      if (counter === 0 && pool.length) {
        const item = pool.shift()

        const elem = document.createElement('div')
        const onEnd = () => {
          elem.removeEventListener('animationend', onEnd, false)
          elem.parentNode.removeChild(elem)

          let index = animateQueue.indexOf(elem)
          if (index > -1) {
            animateQueue.splice(index, 1)
          }
        }
        elem.addEventListener('animationend', onEnd, false)

        elem.classList.add('realtime-risk-item')
        elem.innerHTML = `
          <h3>${item.tradeName}</h3>
          <p>¥${item.tradeAmount}</p>
        `

        $list.appendChild(elem)
        animateQueue.push(elem)
      }

      this.animateTimer = raf(tick)
    }
    this.animateTimer = raf(tick)
  }

  fetchList() {
    // if (!isEqual(this.data, data)) {

    // }

    this.pool = this.pool.concat([
      {
        tradeName: '手机转账',
        tradeAmount: 80302
      },
      {
        tradeName: '手机转账',
        tradeAmount: 8473
      },

      {
        tradeName: 'POS消费',
        tradeAmount: 14416
      },

      {
        tradeName: '手机转账',
        tradeAmount: 44928
      },
      {
        tradeName: '网银支付',
        tradeAmount: 71988
      },
      {
        tradeName: '支付宝扣款',
        tradeAmount: 92118
      },
      {
        tradeName: '网银支付',
        tradeAmount: 60462
      },
      {
        tradeName: '支付宝扣款',
        tradeAmount: 53477
      }
    ])
  }

  /**
   * 不使用react进行渲染，手动控制动画流程
   */
  shouldComponentUpdate(nextProps, nextState) {
    return false
  }

  render() {
    return (
      <div className="realtime-risk-list" ref={this.listRef}></div>
    )
  }
}

export default Page
