import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

import './SelectFilter.less';
const Option = Select.Option;

class SelectFilter extends React.PureComponent {
    static propTypes = {
        stateName: PropTypes.string,
        title: PropTypes.string,
        curValue: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.arrayOf(PropTypes.string),
        ]),
        list: PropTypes.arrayOf(
            PropTypes.shape({
                text: PropTypes.string,
                value: PropTypes.string,
            }),
        ),
        filterOption: PropTypes.func,
        textName: PropTypes.string,
        valueName: PropTypes.string,
        changeValue: PropTypes.func,
        wrapClassName: PropTypes.string,
        labelClassName: PropTypes.string,
        contentClassName: PropTypes.string,
        wrapStyle: PropTypes.object,
        contentStyle: PropTypes.object,
        isMulTiple: PropTypes.bool,
        showSearch: PropTypes.bool,
    };
    static defaultProps = {
        textName: 'text',
        valueName: 'value',
        title: null,
        wrapClassName: 'selectFilter__wrap',
        labelClassName: 'selectFilter__label',
        contentClassName: 'slectFilter__content',
        isMulTiple: false,
        filterOption: this.defaultFilterOption,
        showSearch: false,
    };

    constructor(props) {
        super(props);
    }

    defaultFilterOption = (input, option) => 
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    

    handleChange = value => {
        const { stateName } = this.props;
        changeValue(value, stateName);
    };

    render() {
        const {
            title,
            curValue,
            textName,
            valueName,
            wrapClassName,
            labelClassName,
            contentClassName,
            contentStyle,
            labelStyle,
            isMulTiple,
            filterOption,
            wrapStyle,
            showSearch,
            stateName,
            list
        } = this.props;
        const mode = isMulTiple?'multiple':null;
        return (
            <div className={wrapClassName} style={wrapStyle}>
                {title && (
                    <label className={labelClassName} style={labelStyle} htmlFor={stateName}>
                        {title}
                    </label>
                )}
                <Select
                    value={curValue}
                    className={contentClassName}
                    style={contentStyle}
                    onChange={this.handleChange}
                    id={stateName}
                    showSearch={showSearch}
                    filterOption={filterOption}
                    mode={mode}
                >
                    {list.map((e, index) => {
                        const text = e[textName];
                        const value = e[valueName];
                        return (
                            <Option key={index} value={value + ''}>
                                {text}
                            </Option>
                        );
                    })}
                </Select>
                
            </div>
        );
    }
}

export default SelectFilter;
