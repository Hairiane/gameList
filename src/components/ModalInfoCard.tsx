/* eslint-disable react-hooks/rules-of-hooks */
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter,
  Button, Image, Flex, Text, Grid, GridItem, Badge, Progress, Link, Stat, StatLabel,
  StatNumber, List, ListItem, Box, SimpleGrid, Tag, TagLabel, Stack, useColorModeValue,
  Tabs, TabList, Tab, TabPanel, TabPanels
} from '@chakra-ui/react';
import { ExternalLinkIcon, StarIcon } from '@chakra-ui/icons';
import React from 'react';
import { Game, useInfoGame } from '../hooks/useGames';
import { ChevronRightIcon } from '@chakra-ui/icons';

interface IModalInfoCard {
  isOpen: boolean;
  onClose: () => void;
  game: Game;
}

const ModalInfoCard: React.FC<IModalInfoCard> = ({ isOpen, onClose, game }) => {
  const { data, isLoading } = useInfoGame(game.slug);
  const accentColor = useColorModeValue('blue.600', 'blue.200');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const cardBg = useColorModeValue('white', 'gray.700');

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'green';
    if (score >= 50) return 'yellow';
    return 'red';
  };

  const formatNumber = (num?: number) => {
    if (!num) return '0';
    return new Intl.NumberFormat().format(num);
  };

  if (isLoading || !data) return null;

  return (
    <Modal size="6xl" isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay bg="blackAlpha.600" />
      <ModalContent mx={2} overflow="hidden">
        <ModalHeader bg={accentColor} color="white">
          <Flex align="center" wrap="wrap">
            <Text fontSize={{ base: 'xl', md: '3xl' }} fontWeight="extrabold" mr={4}>
              {data.name}
            </Text>
            <Stack direction="row" spacing={3}>
              <Badge fontSize="md" px={2} py={1} borderRadius="md" variant="solid">
                ★ {data.rating?.toFixed(1)}
              </Badge>
              {data.metacritic && (
                <Badge
                  colorScheme={getScoreColor(data.metacritic)}
                  fontSize="md"
                  px={2}
                  py={1}
                  borderRadius="md"
                  variant="solid"
                >
                  Metacritic: {data.metacritic}
                </Badge>
              )}
              {data.esrb_rating && (
                <Badge
                  colorScheme="purple"
                  fontSize="md"
                  px={2}
                  py={1}
                  borderRadius="md"
                  variant="solid"
                >
                  {data.esrb_rating.name}
                </Badge>
              )}
            </Stack>
          </Flex>
        </ModalHeader>
        <ModalCloseButton color="white" _hover={{ bg: 'blackAlpha.300' }} />

        <ModalBody p={{ base: 2, md: 6 }} bg={useColorModeValue('gray.50', 'gray.800')}>
          <Grid templateColumns={{ base: '1fr', md: '300px 1fr' }} gap={6}>
            <GridItem>
              <Box
                borderRadius="xl"
                overflow="hidden"
                boxShadow="xl"
                bg={cardBg}
                mb={4}
                position="relative"
              >
                <Image
                  src={data.background_image}
                  alt={data.name}
                  objectFit="cover"
                  loading="lazy"
                />
              </Box>
              {data.background_image_additional && (
                <Box
                  borderRadius="xl"
                  overflow="hidden"
                  boxShadow="xl"
                  position="relative"
                >
                  <Image
                    src={data.background_image_additional}
                    alt={data.name}
                    objectFit="cover"
                    loading="lazy"
                  />
                </Box>
              )}
            </GridItem>

            <GridItem>
              <Tabs variant="soft-rounded" colorScheme="blue">
                <TabList mb={6} flexWrap="wrap">
                  <Tab mx={2} mb={2}>Основная информация</Tab>
                  <Tab mx={2} mb={2}>Требования</Tab>
                  <Tab mx={2} mb={2}>Сообщество</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel p={0}>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={6}>
                      <Stat p={3} bg={cardBg} borderRadius="lg" boxShadow="sm">
                        <StatLabel color="gray.500">Дата выхода</StatLabel>
                        <StatNumber fontSize="xl">
                          {new Date(data.released ?? '').toLocaleDateString()}
                        </StatNumber>
                      </Stat>

                      <Stat p={3} bg={cardBg} borderRadius="lg" boxShadow="sm">
                        <StatLabel color="gray.500">Время игры</StatLabel>
                        <StatNumber fontSize="xl">{data.playtime} часов</StatNumber>
                      </Stat>
                    </SimpleGrid>

                    <Box mb={6}>
                      <Text fontSize="lg" fontWeight="bold" mb={4} color={accentColor}>
                        Описание
                      </Text>
                      <Box
                        dangerouslySetInnerHTML={{ __html: data.description ?? '' }}
                        lineHeight="tall"
                        className="prose"
                        maxH="300px"
                        overflowY="auto"
                        p={3}
                        bg={cardBg}
                        borderRadius="lg"
                        boxShadow="sm"
                      />
                    </Box>

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                      <Box>
                        <Text fontSize="lg" fontWeight="bold" mb={4} color={accentColor}>
                          Жанры
                        </Text>
                        <Stack spacing={2}>
                          {data?.genres?.map((genre) => (
                            <Flex
                              key={genre.id}
                              align="center"
                              p={2}
                              bg={cardBg}
                              borderRadius="md"
                              boxShadow="sm"
                            >
                              <ChevronRightIcon color={accentColor} />
                              <Text ml={2}>{genre.name}</Text>
                            </Flex>
                          ))}
                        </Stack>
                      </Box>

                      <Box>
                        <Text fontSize="lg" fontWeight="bold" mb={4} color={accentColor}>
                          Платформы
                        </Text>
                        <SimpleGrid columns={2} spacing={2}>
                          {data?.platforms?.map(({ platform }) => (
                            <Flex
                              key={platform?.slug}
                              align="center"
                              p={2}
                              bg={cardBg}
                              borderRadius="md"
                              boxShadow="sm"
                            >
                              <Text>{platform.name}</Text>
                            </Flex>
                          ))}
                        </SimpleGrid>
                      </Box>
                    </SimpleGrid>
                  </TabPanel>

                  <TabPanel p={0}>
                    <Box mb={6}>
                      <Text fontSize="xl" fontWeight="bold" mb={4} color={accentColor}>
                        Системные требования для PC
                      </Text>
                      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
                        <Box
                          p={4}
                          bg={cardBg}
                          borderRadius="lg"
                          boxShadow="md"
                        >
                          <Text fontWeight="bold" mb={3} color="blue.600">
                            Минимальные
                          </Text>
                          <Text
                            whiteSpace="pre-wrap"
                            fontFamily="monospace"
                            fontSize="sm"
                            color="gray.600"
                          >
                            {data?.platforms?.find(p => p.platform.slug === 'pc')?.requirements?.minimum ||
                              'Информация отсутствует'}
                          </Text>
                        </Box>
                        <Box
                          p={4}
                          bg={cardBg}
                          borderRadius="lg"
                          boxShadow="md"
                        >
                          <Text fontWeight="bold" mb={3} color="blue.600">
                            Рекомендуемые
                          </Text>
                          <Text
                            whiteSpace="pre-wrap"
                            fontFamily="monospace"
                            fontSize="sm"
                            color="gray.600"
                          >
                            {data?.platforms?.find(p => p.platform.slug === 'pc')?.requirements?.recommended ||
                              'Информация отсутствует'}
                          </Text>
                        </Box>
                      </Grid>
                    </Box>
                  </TabPanel>

                  <TabPanel p={0}>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
                      <Box
                        p={4}
                        bg={cardBg}
                        borderRadius="lg"
                        boxShadow="md"
                      >
                        <Text fontSize="lg" fontWeight="bold" mb={4} color={accentColor}>
                          Активность сообщества
                        </Text>
                        <List spacing={3}>
                          <ListItem>
                            <Flex align="center">
                              <StarIcon color="yellow.500" mr={2} />
                              <Text>В коллекциях: {formatNumber(data.added)}</Text>
                            </Flex>
                          </ListItem>
                          {data.reddit_url && (
                            <ListItem>
                              <Flex align="center">
                                <ExternalLinkIcon mr={2} />
                                <Link
                                  href={data.reddit_url}
                                  isExternal
                                  color={accentColor}
                                  _hover={{ textDecoration: 'underline' }}
                                >
                                  Reddit ({formatNumber(data.reddit_count)} участников)
                                </Link>
                              </Flex>
                            </ListItem>
                          )}
                          <ListItem>
                            <Text>Просмотры на Twitch: {formatNumber(data.twitch_count)}</Text>
                          </ListItem>
                          <ListItem>
                            <Text>Видео на YouTube: {formatNumber(data.youtube_count)}</Text>
                          </ListItem>
                        </List>
                      </Box>

                      <Box
                        p={4}
                        bg={cardBg}
                        borderRadius="lg"
                        boxShadow="md"
                      >
                        <Text fontSize="lg" fontWeight="bold" mb={4} color={accentColor}>
                          Статусы игроков
                        </Text>
                        {Object.entries(data?.added_by_status ?? {}).map(([status, count]) => (
                          <Flex key={status} mb={3} align="center">
                            <Text width="120px" textTransform="capitalize">
                              {status}:
                            </Text>
                            <Progress
                              value={count}
                              max={data.added}
                              width="full"
                              ml={2}
                              colorScheme="green"
                              borderRadius="full"
                              size="sm"
                            />
                            <Text ml={2} width="60px" textAlign="right">
                              {formatNumber(count)}
                            </Text>
                          </Flex>
                        ))}
                      </Box>
                    </SimpleGrid>

                    <Box
                      p={4}
                      bg={cardBg}
                      borderRadius="lg"
                      boxShadow="md"
                    >
                      <Text fontSize="lg" fontWeight="bold" mb={4} color={accentColor}>
                        Особенности игры
                      </Text>
                      <Flex wrap="wrap" gap={2}>
                        {data?.tags?.map(tag => (
                          <Tag
                            key={tag.id}
                            colorScheme="blue"
                            borderRadius="full"
                            variant="subtle"
                            px={3}
                            py={1}
                          >
                            <TagLabel>{tag.name}</TagLabel>
                          </Tag>
                        ))}
                      </Flex>
                    </Box>
                  </TabPanel>
                </TabPanels>
              </Tabs>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={6}>
                {data?.stores && data?.stores?.length > 0 && (
                  <Box
                    p={4}
                    bg={cardBg}
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <Text fontSize="lg" fontWeight="bold" mb={3} color={accentColor}>
                      Доступно в магазинах
                    </Text>
                    <Stack spacing={2}>
                      {data?.stores?.map(store => (
                        <Link
                          key={store.id}
                          href={store.url}
                          isExternal
                          p={2}
                          borderRadius="md"
                          _hover={{ bg: hoverBg }}
                        >
                          <Flex align="center">
                            <ExternalLinkIcon mr={2} />
                            <Text>{store.store.name}</Text>
                          </Flex>
                        </Link>
                      ))}
                    </Stack>
                  </Box>
                )}

                {data?.developers && data?.developers?.length > 0 && (
                  <Box
                    p={4}
                    bg={cardBg}
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <Text fontSize="lg" fontWeight="bold" mb={3} color={accentColor}>
                      Разработчики
                    </Text>
                    <Stack spacing={2}>
                      {data.developers.map(dev => (
                        <Flex
                          key={dev.id}
                          p={2}
                          align="center"
                          borderRadius="md"
                          bg={hoverBg}
                        >
                          <Text>{dev.name}</Text>
                        </Flex>
                      ))}
                    </Stack>
                  </Box>
                )}
              </SimpleGrid>
            </GridItem>
          </Grid>
        </ModalBody>

        <ModalFooter bg={useColorModeValue('gray.100', 'gray.700')}>
          <Button colorScheme="blue" onClick={onClose}>
            Закрыть
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalInfoCard;