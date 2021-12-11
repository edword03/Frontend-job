import styled from 'styled-components';


export const SearchBarWrap = styled.form`
  margin: 135px 0 42px;
  background: ${({ theme }) => theme.white};
  box-shadow: ${props => props.theme.shadow};
  border-radius: 10px;
  height: 60px;
  position: relative;

  display: flex;
  align-items: center;

  & {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    color: #49627E;
  }

`;


export const SearchBlock = styled.div`

`;

export const Input = styled.input`
  border: none;
  padding: 22px 5px 22px 20px;
  color: #49627E;
  border-radius: 10px 0 0 10px;
  height: 100%;
  position: relative;
  border-right: 2px solid #F9F9F9;
  font-family: Montserrat;
  font-weight: ${props => props.theme.bold};
  font-size: 12px;
  color: #49627E;
  max-width: 150px;
`; 

interface IPropsContainer {
  img?: string
}

export const InputContainer = styled.div<IPropsContainer>`
  position: relative;
  display: flex;
  align-items: center;

  & img {
    margin-left: 25px;
  }
`;

export const DropDown = styled.div`
  background: #FFFFFF;
  border-radius: 0px 0px 10px 10px;
  position: absolute;
  top: 100%;
  width: 100%;
  height: 100px;

  input[type="radio"] {
    position: absolute;
    opacity: 0;
    + label {
      &:before {
        content: '';
        background: #f4f4f4;
        border-radius: 100%;
        border: 1px solid darken(#f4f4f4, 25%);
        display: inline-block;
        width: 1.4em;
        height: 1.4em;
        position: relative;
        top: -0.2em;
        margin-right: 1em; 
        vertical-align: top;
        cursor: pointer;
        text-align: center;
        transition: all 250ms ease;
      }
    }
    &:checked {
      + label {
        &:before {
          background-color: #3197EE;
          box-shadow: inset 0 0 0 4px #f4f4f4;
        }
      }
    }
    &:focus {
      + label {
        &:before {
          outline: none;
          border-color: #3197EE;
        }
      }
    }
  }
`;