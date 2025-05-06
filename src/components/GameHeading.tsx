import { Heading } from '@chakra-ui/react';
import { GameQuery } from '../App.tsx';

interface IGameHeading {
  gameQuery: GameQuery;
}

const GameHeading = ({ gameQuery }: IGameHeading) => {
  const heading = `${gameQuery.platform?.name || ''} ${gameQuery.genre?.name || ''} Games`;
  return (
    <Heading as='h1' marginY={5} fontSize='5xl'>
      {heading}
    </Heading>
  );
};

export default GameHeading;