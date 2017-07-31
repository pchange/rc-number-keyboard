import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NumberKeyboard extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.number,
  };

  static defaultProps = {
    prefixCls: 'rc-number-keyboard',
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value * 1 || 0,
      });
    }
  }

  onDelete = () => {
    const value = this.state.value;
    const newValue = parseInt(value / 10, 10);
    this.onChange(newValue);
  }

  onInput = (inputValue) => {
    const value = this.state.value;
    const newValue = `${value}${inputValue}`;
    const numberValue = newValue.replace(/[^\d]*/g, '');
    this.onChange(numberValue);
  }

  onChange = (value) => {
    const formatValue = value * 1 || 0;
    this.setState({
      value: formatValue,
    });
    const { onChange } = this.props;
    if ('function' === typeof onChange) {
      onChange(formatValue);
    }
  }

  render() {
    const props = this.props;
    const prefixCls = props.prefixCls;
    let className = props.prefixCls;
    if (props.className) {
      className += ` ${props.className}`;
    }

    return (
      <div className={className}>
        <div className={`${prefixCls}-result`}>
          {this.state.value}
        </div>
        <div className={`${prefixCls}-keyboard`}>
          <table className={`${prefixCls}-table`}>
            <tbody>
              {
                [0, 1, 2, 3].map((row) => {
                  return (<tr className={`${prefixCls}-keyboard-row`} key={`row_${row}`}>
                    {
                      [0, 1, 2].map((col) => {
                        const value = ((row * 3) + col + 1) % 10;
                        if (3 === row && 2 === col) {
                          return null;
                        }
                        else if (3 === row && 1 === col) {
                          return (<td className={`${prefixCls}-keyboard-col ${prefixCls}-keyboard-delete-col`} onClick={this.onDelete} key={`row_${row}_col_${col}`} colSpan={2}>
                            DELETE
                          </td>);
                        }
                        else {
                          return (<td className={`${prefixCls}-keyboard-col`} key={`row_${row}_col_${col}`} onClick={this.onInput.bind(this, value)}>
                            { value }
                          </td>);
                        }
                      })
                    }
                  </tr>);
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default NumberKeyboard;
