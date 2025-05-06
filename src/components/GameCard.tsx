import { Game } from '../hooks/useGames.ts';
import { Card, CardBody, Heading, HStack, Image } from '@chakra-ui/react';
import { CriticScore, Emoji, PlatformIconList } from './index.ts';
import getCropImageUrl from '../services/image-url.ts';

interface IGameCard {
  game: Game;
}

const GameCard = ({ game }: IGameCard) => {
  return (
    <Card>
      <Image src={getCropImageUrl(game.background_image)} />
      <CardBody>
        <HStack justifyContent='space-between' marginBottom={3}>
          <PlatformIconList platforms={game.parent_platforms.map(platform => platform.platform)} />
          <CriticScore score={game.metacritic} />
        </HStack>
        <Heading fontSize='2xl'>
          {game.name}
          <Emoji rating={game.rating_top} />
        </Heading>
      </CardBody>
    </Card>
  );
};

export default GameCard;