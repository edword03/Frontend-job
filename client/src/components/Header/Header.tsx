import React, { useRef } from 'react';
import { Link, useLocation, useMatch } from 'react-router-dom';
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

export const Header = () => {
  const { isMobile } = useMedia();
  const { pathname } = useLocation();
  const jobsMatch = useMatch('/jobs/*')
  const featureJobsMatch = useMatch('/featured-jobs/*')
  
  const mobileRef = useRef<HTMLDivElement | null>(null);

  const { isVisible, setIsVisible } = useOutsideClick(mobileRef);

  const toggleMenu = () => {
    setIsVisible(prev => !prev);
  };

  return (
    <HeaderBlock>
      <Container>
        <Menu>
          <Link to='/'>
            <Logo>
              Frontend <SubLogo>Job</SubLogo>
            </Logo>
          </Link>

          <Nav isActive={isVisible}>
            <NavItem to="/jobs" $current={pathname === jobsMatch?.pathname}>
              Поиск вакансий
            </NavItem>

            <NavItem to="/featured-jobs" $current={pathname === featureJobsMatch?.pathname}>
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
