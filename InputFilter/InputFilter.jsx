import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

import { isString } from '../utils.js';
import './InputFilter.less';
const { TextArea } = Input;
class InputFilter extends React.PureComponent {
    static propTypes = {
        value: PropTypes.string,
        placeHolder: PropTypes.string,
        label: PropTypes.string,
        stateName: PropTypes.string,
        wrapClassName: PropTypes.string,
        contentClassName: PropTypes.string,
        labelClassName: PropTypes.string,
        contentStyle: PropTypes.object,
        wrapStyle: PropTypes.object, 
        labelStyle: PropTypes.object, 
        textareaRow: PropTypes.number,
        onPressEnter: PropTypes.func,
        onInputChange: PropTypes.func,
        trimable: PropTypes.bool
    };

    static defaultProps = {
        placeHolder: '',
        label: '',
        stateName: '',
        wrapClassName: 'inputFilter__wrap',
        contentClassName: 'inputFilter__content',
        labelClassName: 'inputFilter__label',
        textareaRow: 0,
        trimable: false,
        onPressEnter: e => e,
        onInputChange: e => e
    };

    constructor(props) {
        super(props);
    }

    handleInputChange = e => {
        let value = e.target.value;
        const { stateName, onInputChange, trimable } = this.props;
        if (trimable && isString(value)) {
            value = value.trim();
        }
        onInputChange(value, stateName);
    };

    render() {
        const {
            value,
            placeHolder,
            label,
            wrapClassName,
            contentStyle,
            contentClassName,
            labelClassName,
            wrapStyle,
            labelStyle,
            textareaRow,
            onPressEnter,
        } = this.props;
        return (
            <div
                className={wrapClassName}
                style={wrapStyle}
            >
                {label && (
                    <label htmlFor={stateName} className={labelClassName} style={labelStyle}>
                        {label}
                    </label>
                )}
                {textareaRow === 0 && (
                    <Input
                        value={value}
                        style={contentStyle}
                        className={contentClassName}
                        onChange={this.handleInputChange}
                        placeholder={placeHolder}
                        id={stateName}
                        onPressEnter={onPressEnter}
                    />
                )}
                {textareaRow > 0 && (
                    <TextArea
                        value={value}
                        style={contentStyle}
                        className={contentClassName}
                        onChange={this.handleInputChange}
                        placeholder={placeHolder}
                        id={stateName}
                        rows={textareaRow}
                    />
                )}
            </div>
        );
    }
}

export default InputFilter;
