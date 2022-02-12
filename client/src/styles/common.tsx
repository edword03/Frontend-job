import styled from 'styled-components';

interface InputContainerProps {
  border?: 'left' | 'right';
}

export const PageBlock = styled.div`
  background-color: ${({ theme }) => theme.white};
  padding: 24px;
  border-radius: 10px;
  margin-top: 90px;
  margin-bottom: 30px;
`;

export const InputContainer = styled.div<InputContainerProps>`
  position: relative;
  display: flex;
  align-items: center;
  padding: 22px 16px 22px 20px;
  max-width: 250px;
  width: 100%;
  cursor: pointer;
  justify-content: center;

  & img {
    padding-right: 20px;
  }

  &::after {
    content: '';
    display: ${props => (props.border ? 'block' : 'none')};
    width: 2px;
    height: 100%;
    background-color: #f9f9f9;
    position: absolute;
    ${props => (props.border ? { [props.border]: 0 } : '')};
  }

  &:hover {
    background-color: #eff6ff;

    transition: 0.5s;
  }
`;

export const Input = styled.input`
  border: none;
  color: #49627e;
  border-radius: 10px 0 0 10px;
  height: 100%;
  position: relative;
  font-family: Montserrat;
  font-weight: ${props => props.theme.bold};
  font-size: 12px;
  color: #49627e;
  max-width: 95px;
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

export const DetailsDescription = styled.div<{ isBranded?: boolean }>`
  p {
    margin-bottom: 15px;
    line-height: 1.57;
  }

  ul > li:before {
    display: block;
    right: 100%;
    padding-right: 6px;
    content: '—';
    position: absolute;
  }

  ul li p {
    margin: 0;
  }

  ${props =>
    !props.isBranded &&
    `

    ul {
      margin-left: 20px;
    }
    ul li {
      position: relative;
      line-height: 1.57;
      margin-bottom: 5px;
    }
  `}
`;

export const HeadLogo = styled.img`
  border-radius: 20px;
  max-width: 130px;
  height: auto;
  margin-right: 20px;

  @media screen and (max-width: 600px) {
    margin-bottom: 15px;
  }
`;

interface ButtonProps {
  outlined?: boolean
}

export const Button = styled.button<ButtonProps>`
  background: ${props => props.outlined ? props.theme.white : props.theme.secondary};
  border-radius: 10px;
  ${props => props.outlined ? `border: 1px solid ${props.theme.defaultColor};` : ''}
  padding: 12px 27px;
  color: ${props => props.outlined ? props.theme.defaultColor : props.theme.white};
  font-weight: 600;
`;

export const EmptyLogo = styled.div`
  background: #f7f8f9;
  border-radius: 10px;
  width: 68px;
  height: 49px;
  margin-right: 20px;
`;
