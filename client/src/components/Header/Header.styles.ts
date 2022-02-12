import styled from "styled-components";
import {Link} from 'react-router-dom'

export const HeaderBlock = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  margin-bottom: 35px;
  padding: 27px 0;
  background-color: ${prop => prop.theme.white};
  box-shadow: ${({theme}) => theme.shadow};
  z-index: 100;
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 680px;
`;

export const Logo = styled.span`
  font-size: 20px;
  font-weight: ${prop => prop.theme.bold};
  line-height: 100%;
  color: ${({theme}) => theme.black};
  text-transform: uppercase;
`;

export const SubLogo = styled.span`
  color: ${props => props.theme.secondary};
`;

interface NavProp {
  isActive: true | false
}

export const Nav = styled.nav<NavProp>`
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: space-around;

  @media screen and (max-width: 600px) {
    position: absolute;
    top: 100%;
    left: 0;
    display: ${props => props.isActive ? 'flex': 'none'};
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 30px;
    background-color: ${props => props.theme.white};
    border-radius: 0px 0px 10px 10px;
    max-width: 100%;
    height: 150px;
  }
`;

interface INavItem {
  $current?: boolean
}

export const NavItem = styled(Link)<INavItem>`
  font-size: ${props => props.theme.defaultFontSize};
  font-weight: ${props => props.theme.bold};
  line-height: 17px;
  color: ${props => props.$current ? props.theme.secondary : props.theme.defaultColor};
  padding: 0 12px 0;
`;

export const MobileMenu = styled.div`

`;

export const Hamburger = styled.div`
  width: 20px;
  height: 14px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

interface Ibar {
  menu?: boolean
  rotate?: string
  hidden?: boolean
}

export const Bar = styled.span<Ibar>`
  padding: 0;
  width: 20px;
  height: 2px;
  background-color: #49627E;
  display: block;
  border-radius: 10px;
  transition: all 0.4s ease-in-out;
  transform: ${props => props.menu ? `rotate(${props.rotate})`: ''};
  position: ${props => props.menu && 'absolute'};
  opacity: ${props => props.hidden ? '0': '1'};
`;

