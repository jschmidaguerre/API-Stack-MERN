import React from 'react';
import Logo from './Logo';
import Nav from './Nav';
import SearchBar from './SearchBar';

const Header = ({ onLoginClick, onCreateUserClick }) => {
  return (
    <header className='bg-white top-0 z-[20] flex flex-col md:flex-row w-full border-b-4 justify-between items-center md:gap-4 '>
      <Logo />
      <SearchBar />
      <Nav/> 
    </header>
  );
};

export default Header;