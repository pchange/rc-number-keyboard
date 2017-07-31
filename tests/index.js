import '../assets/index.less';
import expect from 'expect.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { Simulate } from 'react-dom/test-utils';
import $ from 'jquery';
import NumberKeyboard from '../index';
import async from 'async';
window.$ = $;
window.jQuery = $;

const timeout = (ms) => {
  return (done) => {
    setTimeout(done, ms);
  };
};

const expectPopupToHaveContent = (component, content) => {
  const prefixCls = component.props.prefixCls
  const componentDomNode = ReactDOM.findDOMNode(component);
  expect($(componentDomNode).find(`.${prefixCls}-result`).html().trim()).to.be(content);
};

const verifyContent = (component, content, done) => {
  async.series([timeout(20), (next) => {
    expectPopupToHaveContent(component, content);
    next();
  }, timeout(20), (next) => {
    next();
  }], done);
};

describe('rc-number-keyboard', () => {
  let div;
  before(() => {
    timeout(40000);
    div = document.createElement('div');
    div.style.margin = '100px';
    document.body.insertBefore(div, document.body.firstChild);
  });

  // afterEach(() => {
  //   ReactDOM.unmountComponentAtNode(div);
  // });

  describe('check value and on change props', () => {
    it('init', (done) => {
      const numberKeyboard = ReactDOM.render(<NumberKeyboard className="test-number-keyboard" />, div);
      verifyContent(numberKeyboard, `${0}`, done);
    });

    it('props value', (done) => {
      const value = parseInt(Math.random() * 10, 10);
      const numberKeyboard = ReactDOM.render(<NumberKeyboard value={value} />, div);
      verifyContent(numberKeyboard, `${value}`, done);
    });

    it('props onChange', (done) => {
      const testClick = () => {
        let pastValue = parseInt(Math.random() * 10, 10);
        let countValue = pastValue;
        const pastOnChange = (value) => {
          pastValue = value;
        }
        const numberKeyboard = ReactDOM.render(<NumberKeyboard onChange={pastOnChange} value={pastValue} />, div);
        const componentDomNode = ReactDOM.findDOMNode(numberKeyboard);
        for (let clickTime = 8; clickTime--;) {
          const row = parseInt(Math.random() * 4, 10);
          const col = parseInt(Math.random() * 3, 10);
          const tdElem = $(componentDomNode).find('tr').eq(row).find('td').eq(col);
          if (4 === row || 3 === col) {
            // 超出了键盘，不管
          }
          else if (3 === row && 2 === col) {
            expect(tdElem.length).to.be(0);
          }
          else {
            Simulate.click(ReactDOM.findDOMNode(tdElem[0]));
            if (3 === row && 1 === col) {
              countValue = parseInt(countValue / 10, 10);
            }
            else {
              countValue = parseInt(`${countValue}${(row * 3 + col + 1) % 10}`, 10);
            }
            expect(countValue * 1).to.be(pastValue * 1);
          }
        }
      }
      for(let i = 30; i--;) {
        testClick();
      }
      done();

    });
  });
});
