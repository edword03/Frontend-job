import styled from 'styled-components';

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 22px 16px 22px 20px;
  max-width: 250px;
  width: 100%;
  cursor: pointer;

  & img {
    padding-right: 20px;
  }

  &::after {
    content: "";
    display: block;
    width: 2px;
    height: 100%;
    background-color: #F9F9F9;
    position: absolute;
    right: 0;
  }

  &:hover {
    background-color: #eff6ff;
    
    transition: .5s;
  }
`;

export const DropDown = styled.ul`
  background: #ffffff;
  border-radius: 0px 0px 10px 10px;
  position: absolute;
  top: 97%;
  width: 100%;
  z-index: 199;
  left: 0;
  padding: 19px 12px 19px 24px;
  cursor: pointer;

  input[type='radio'] {
    position: absolute;
    opacity: 0;
    + label {
      &:before {
        content: '';
        background: ${props => props.theme.white};
        border-radius: 50%;
        border: 1px solid rgba(0, 16, 61, 0.12);
        display: inline-block;
        width: 16px;
        height: 16px;
        position: relative;
        margin-right: 1em;
        cursor: pointer;
        text-align: center;
        transition: all 250ms ease;
      }
    }
    &:checked {
      + label {
        &:before {
          background-color: ${props => props.theme.white};
          box-shadow: inset 0 0 0 4px ${props => props.theme.secondary};
        }
      }
    }
    &:focus {
      + label {
        &:before {
          outline: none;
          border-color: #3197ee;
        }
      }
    }
  }
`;
