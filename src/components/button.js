
import "./button.css";
import PropTypes from 'prop-types';
import React  from 'react';
import styled from "styled-components";

const propTypes = {
  on: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  enabled: PropTypes.bool,
  className: PropTypes.string
};

const defaultProps = {
  enabled: true,
  className: '',
  onDisabledClick: () => {}
};

function Switch({on, onClick, onDisabledClick, enabled, className, children}) {
  const classes = ['switch', className, (on ? 'on ' : ''), (enabled ? '' : 'disabled ')].join(' ');
  return (
    <div className={classes} onClick={(e) => enabled ? onClick(e) : onDisabledClick(e)}>
      <div className="switch-toggle" children={children}></div>
    </div>
  );
}

export function Button(props) {
  return (
    <div className="button-box">
      <div className="button-wraper">
        <StyledButton {...props}>{props.children}</StyledButton>
      </div>
    </div>
  );
}


const StyledButton = styled.button`
  background-color: ${props => props.primary ? "rgb(10, 11, 13)" : "rgb(235, 238, 241)"};
  color: ${props => props.primary ? "white" : "rgb(10, 11, 13)"};
  width: 100%;
  padding: 0px;
  margin: 0px;
  border: none;
  font-family: inherit;
  text-align: center;
  cursor: pointer;
  display: block;
  border-radius: 24px;
  height: 40px;
  font-weight: 600;
  font-size: 16px;
  width: 100%;
  appearance: none;
  box-sizing: border-box;
  vertical-align: middle;
  transition: all 75ms ease-out 0s;
  &:hover {
    background-color: ${props => props.primary ? "rgb(61, 68, 75)" : "rgb(190, 193, 195)"};
  };
`;

Switch.propTypes = propTypes;
Switch.defaultProps = defaultProps;

export default Switch;