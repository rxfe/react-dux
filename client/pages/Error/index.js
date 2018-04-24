/**
 * @file error page
 */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Error extends Component {

  render() {
    return (
      <div className="error">
        <div className="content">
          <div className="tipbox">
            <h2>抱歉，服务器开小差了，请稍后...</h2>
            <div className="other">
              <p>别担心，你可以点击链接继续浏览：</p>
              <a href="/">返回首页</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Error />, document.getElementById('app'))
