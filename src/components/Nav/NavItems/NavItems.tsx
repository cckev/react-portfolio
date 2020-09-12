import React from 'react';

import styles from './NavItems.module.css';
import NavItem from './NavItem/NavItem';


interface Props {

}

const NavItems: React.FC<Props> = () => {
  return (
    <ul className={styles.NavItems}>
      <NavItem exact to="/">Portfolio</NavItem>
      <NavItem exact to="/about-me">About Me</NavItem>
    </ul>
  );
}

export default NavItems;
