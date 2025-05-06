import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface IGameCardContainer {
  children: ReactNode;
}

const GameCardContainer = ({ children }: IGameCardContainer) => {
  return (
    <Box borderRadius={10} overflow='hidden'>
      {children}
    </Box>
  );
};

export default GameCardContainer;