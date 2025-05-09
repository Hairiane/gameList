import { Platform } from '../hooks/useGames.ts';
import { HStack, Icon } from '@chakra-ui/react';
import { FaAndroid, FaApple, FaLinux, FaPlaystation, FaWindows, FaXbox } from 'react-icons/fa';
import { SiNintendo } from 'react-icons/si';
import { MdPhoneIphone } from 'react-icons/md';
import { BsGlobe } from 'react-icons/bs';
import { IconType } from 'react-icons';

interface IPlatformIconList {
  platforms: Platform[];
}

const PlatformIconList = ({ platforms }: IPlatformIconList) => {
  const iconMap: { [key: string]: IconType } = {
    pc: FaWindows,
    playstation: FaPlaystation,
    xbox: FaXbox,
    nintendo: SiNintendo,
    mac: FaApple,
    linux: FaLinux,
    android: FaAndroid,
    ios: MdPhoneIphone,
    web: BsGlobe,
  };
  return (
    <HStack marginY={1}>
      {platforms.map(platform => <Icon key={platform.id} as={iconMap[platform.slug]} color='gray.500' />)}
    </HStack>
  );
};

export default PlatformIconList;