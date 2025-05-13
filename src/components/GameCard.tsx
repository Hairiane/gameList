import { Game } from '../hooks/useGames.ts';
import { Card, CardBody, Heading, HStack, Image, useDisclosure, } from '@chakra-ui/react';
import { CriticScore, Emoji, PlatformIconList } from './index.ts';
import getCropImageUrl from '../services/image-url.ts';
import styles from './styles.module.css'
import ModalInfoCard from './ModalInfoCard.tsx';
interface IGameCard {
  game: Game;
}

const GameCard = ({ game }: IGameCard) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Card>
        <Image className={styles.imageLink} onClick={onOpen} src={getCropImageUrl(game?.background_image)} />
        <CardBody>
          <HStack justifyContent='space-between' marginBottom={3}>
            <PlatformIconList platforms={game?.parent_platforms?.map(platform => platform.platform)} />
            <CriticScore score={game?.metacritic} />
          </HStack>
          <Heading fontSize='2xl'>
            {game?.name}
            <Emoji rating={game?.rating_top} />
          </Heading>
        </CardBody>
      </Card>
      {isOpen && <ModalInfoCard isOpen={isOpen} onClose={onClose} game={game} />}
    </>
  );
};

export default GameCard;