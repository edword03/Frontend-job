import React, { useState, useRef } from 'react';
import { Container } from '@components/UI/Container';
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
import { useMedia, useOutsideClick } from '@hooks/index';

interface HeaderProps {
  currentPage: string;
  setSearchPage: () => void;
  setFeaturedPage: () => void;
}

type linkActiveType = 'searchPage' | 'featuredPage' | undefined;

export const Header: React.FC<HeaderProps> = ({ currentPage, setSearchPage, setFeaturedPage }) => {
  const [linkActive, setLinkActive] = useState<linkActiveType>('searchPage');

  const { isMobile } = useMedia();
  const mobileRef = useRef<HTMLDivElement | null>(null);

  const { isVisible, setIsVisible } = useOutsideClick(mobileRef);

  const toggleMenu = () => {
    setIsVisible(prev => !prev);
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

          <Nav isActive={isVisible}>
            <NavItem currentPage={linkActive === 'searchPage'} onClick={toggleLinkOnSearchPage}>
              Поиск вакансий
            </NavItem>
            <NavItem currentPage={linkActive === 'featuredPage'} onClick={toggleLinkOnFeaturedPage}>
              Избранные вакансии
            </NavItem>
          </Nav>

          {isMobile && (
            <MobileMenu ref={mobileRef}>
              <Hamburger onClick={toggleMenu}>
                <Bar menu={isVisible} rotate="45deg" />
                <Bar hidden={isVisible} rotate="-45deg" />
                <Bar menu={isVisible} rotate="-45deg" />
              </Hamburger>
            </MobileMenu>
          )}
        </Menu>
      </Container>
    </HeaderBlock>
  );
};
