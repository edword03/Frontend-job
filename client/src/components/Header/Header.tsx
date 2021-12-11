import React, { useState } from 'react';
import { Container } from '@components/UI/Container';
// import classes from './Header.module.css';
import {
  HeaderBlock,
  Menu,
  Logo,
  SubLogo,
  Nav,
  NavItem,
  MobileMenu,
  Hamburger,
  Bar,
} from './Header.styles';

interface HeaderProps {
  currentPage: string;
  setSearchPage: () => void;
  setFeaturedPage: () => void;
}

type linkActiveType = 'searchPage' | 'featuredPage' | undefined;

export const Header: React.FC<HeaderProps> = ({ currentPage, setSearchPage, setFeaturedPage }) => {
  const [menu, setMenu] = useState(false);
  const [linkActive, setLinkActive] = useState<linkActiveType>('searchPage');

  const toggleMenu = () => {
    setMenu(prev => !prev);
  };

  const toggleLinkOnSearchPage = () => {
    setSearchPage();
    setLinkActive('searchPage');
  };

  const toggleLinkOnFeaturedPage = () => {
    setFeaturedPage();
    setLinkActive('featuredPage');
  };

  return (
    <HeaderBlock>
      <Container>
        <Menu>
          <a href="/">
            <Logo>
              Frontend <SubLogo>Job</SubLogo>
            </Logo>
          </a>

          <Nav isActive={menu}>
            <NavItem currentPage={linkActive === 'searchPage'} onClick={toggleLinkOnSearchPage}>
              Поиск вакансий
            </NavItem>
            <NavItem currentPage={linkActive === 'featuredPage'} onClick={toggleLinkOnFeaturedPage}>
              Избранные вакансии
            </NavItem>
          </Nav>

          <MobileMenu>
            <Hamburger onClick={toggleMenu}>
              <Bar menu={menu} rotate='45deg' />
              <Bar hidden={menu} rotate='-45deg' />
              <Bar menu={menu} rotate='-45deg' />
            </Hamburger>
          </MobileMenu>
        </Menu>
      </Container>
    </HeaderBlock>
  );
};