import { SimpleGrid, Text } from '@chakra-ui/react';
import { GameCard, GameCardContainer, GameCardSkeleton } from './index.ts';
import { GameQuery } from '../App.tsx';
import { useGames } from '../hooks/useGames.ts';

interface IGameGrid {
  gameQuery: GameQuery;
}

const GameGrid = ({ gameQuery }: IGameGrid) => {
  const { data, error, isLoading } = useGames(gameQuery);
  const skeletons = [1, 2, 3, 4, 5, 6];
  if (error) {
    return <Text>{error}</Text>;
  }
  return (
    <SimpleGrid columns={{
      sm: 1,
      md: 2,
      lg: 3,
      xl: 4,
    }} spacing={6} padding='10px'>
      {isLoading && skeletons.map(skeleton => (
        <GameCardContainer key={skeleton}>
          <GameCardSkeleton />
        </GameCardContainer>
      ))}
      {data.map(game => {
        if (game.tags.find((tag) => tag.name === 'Нагота')?.name) return
        return (
          <GameCardContainer key={game.id}>
            <GameCard game={game} />
          </GameCardContainer>
        )
      })}
    </SimpleGrid>
  );
};

export default GameGrid;