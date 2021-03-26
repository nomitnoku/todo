import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Badge } from 'react-bootstrap';
import Constant from '../utilities/Constant';
import Svg from './Svg';

function CustomDropdown(props) {
  const {
    item, onToggle, selectedVal, onChange, disabled,
    closeButton, placeholder,
  } = props;

  const selectedItem = selectedVal
    ? item.options.find((option) => (
      selectedVal === option.value)) : null;
  return (
    <Dropdown
      onToggle={onToggle}
    >
      <Dropdown.Toggle
        className={`fs-5 rounded-0 border ${
          selectedItem ? 'text-white' : 'text-medium'
        }`}
        variant={selectedItem ? 'primary' : 'light'}
        disabled={disabled}
      >
        {item.displayText}
        {selectedItem ? (
          <>
            {item.displayText && ':'}
         &nbsp;
            {selectedItem.label}
          &nbsp;
            {closeButton && (
            <Badge
              className="p-0 fs-5"
              onClick={(e) => {
                e.stopPropagation();
                onChange({
                  [item.key]: '',
                });
              }}
            >
              <Svg
                svg="circleClose"
                width="0.9rem"
                circleFill={Constant.Color.WHITE}
                pathFill={Constant.Color.PRIMARY}
              />
            </Badge>
            )}
          </>
        )
          : placeholder}
      </Dropdown.Toggle>
      <Dropdown.Menu
        rootCloseEvent="click"
        className="overflow-y maxh-200p"
      >
        {item.options.map((option, index) => (
          <Dropdown.Item
            key={option.value}
            eventKey={option.value}
            active={selectedVal === option.value}
            className={`fs-5 py-2 ${selectedVal === option.value
              ? 'text-white font-weight-bold' : 'text-medium'} 
              ${index ? 'border-top' : ''}`}
            onClick={() => {
              onChange({
                [item.key]: option.value,
              });
            }}
          >
            {option.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

CustomDropdown.propTypes = {
  item: PropTypes.shape({
    key: PropTypes.string,
    displayText: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.element,
      ]),
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    })),
  }).isRequired,
  onToggle: PropTypes.func,
  selectedVal: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  closeButton: PropTypes.bool,
  placeholder: PropTypes.string,
};

CustomDropdown.defaultProps = {
  onToggle: () => {},
  disabled: false,
  closeButton: true,
  placeholder: '',
  selectedVal: null,
};

export default CustomDropdown;
