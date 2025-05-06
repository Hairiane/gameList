import useGenres, { Genre } from '../hooks/useGenres.ts';
import { Button, Heading, HStack, Image, List, ListItem, Spinner } from '@chakra-ui/react';
import getCropImageUrl from '../services/image-url.ts';

interface IGenreList {
  onSelectedGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
}

const GenreList = ({ onSelectedGenre, selectedGenre }: IGenreList) => {
  const { data, error, isLoading } = useGenres();
  if (error) {
    return null;
  }
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <Heading fontSize='2xl' marginBottom={3}>Genres</Heading>
      <List>
        {data.map(genre => (
          <ListItem key={genre.id} paddingY='5px'>
            <HStack>
              <Image boxSize='32px' objectFit='cover' borderRadius={8} src={getCropImageUrl(genre.image_background)} />
              <Button whiteSpace='normal' textAlign='left'
                      fontWeight={genre.id === selectedGenre?.id ? 'bold' : 'normal'}
                      onClick={() => onSelectedGenre(genre)} variant='link' fontSize='lg'>{genre.name}</Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GenreList;