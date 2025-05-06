import { Badge } from '@chakra-ui/react';

interface ICriticScore {
  score: number;
}

const CriticScore = ({ score }: ICriticScore) => {
  const color: string = score > 75 ? 'green' : score > 65 ? 'yellow' : '';
  return (
    <Badge colorScheme={color} fontSize='14px' paddingX={2} borderRadius='4px'>
      {score}
    </Badge>
  );
};

export default CriticScore;