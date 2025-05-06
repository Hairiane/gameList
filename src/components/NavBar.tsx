import { HStack, Image } from '@chakra-ui/react';
import logo from '../assets/img/logo.webp';
import { ColorModeSwitch, SearchInput } from './index.ts';

interface INavBar {
  onSearch: (searchText: string) => void;
}

const NavBar = ({ onSearch }: INavBar) => {
  return (
    <HStack padding='10px'>
      <Image src={logo} boxSize='60px' />
      <SearchInput onSearch={onSearch} />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;