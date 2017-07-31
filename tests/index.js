import '../assets/index.less';
import expect from 'expect.js';
import React from 'react';
import ReactDOM from 'react-dom';
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

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(div);
  });

  describe('check value and on change props', () => {
    it('props value', (done) => {
      const value = parseInt(Math.random() * 10, 10);
      const numberKeyboard = ReactDOM.render(<NumberKeyboard value={value} />, div);
      verifyContent(numberKeyboard, `${value}`, done);
    });
  });
});
