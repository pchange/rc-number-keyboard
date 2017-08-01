import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NumberKeyboard from 'rc-number-keyboard';
import 'rc-number-keyboard/assets/index.less';

class Test extends Component {
  state = {};

  render() {
    return (<div>
      <div style={{ width: 200, margin: '100px auto' }}>
        <NumberKeyboard />
      </div>
    </div>);
  }
}

ReactDOM.render(<Test />, document.getElementById('__react-content'));
