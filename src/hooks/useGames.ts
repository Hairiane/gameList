import { GameQuery } from '../App.tsx';
import { useData, useDataInfo } from './useData.ts';

export interface Platform {
    id: number;
    name: string;
    slug: string;
}

interface ITags {
    id: number;
    name: string;
}

export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: { platform: Platform }[];
    metacritic: number;
    rating_top: number;
    slug: string
    tags: ITags[]
}

export interface GameInfo {
    id: number;
    slug: string;
    name: string;
    name_original: string;
    description: string;
    metacritic: number;
    metacritic_platforms: MetacriticPlatform[];
    released: string;
    tba: boolean;
    updated: string;
    background_image: string;
    background_image_additional: string;
    website: string;
    rating: number;
    rating_top: number;
    ratings: Rating[];
    reactions: { [key: string]: number };
    added: number;
    added_by_status: AddedByStatus;
    playtime: number;
    screenshots_count: number;
    movies_count: number;
    creators_count: number;
    achievements_count: number;
    parent_achievements_count: number;
    reddit_url: string;
    reddit_name: string;
    reddit_description: string;
    reddit_logo: string;
    reddit_count: number;
    twitch_count: number;
    youtube_count: number;
    reviews_text_count: number;
    ratings_count: number;
    suggestions_count: number;
    alternative_names: string[];
    metacritic_url: string;
    parents_count: number;
    additions_count: number;
    game_series_count: number;
    user_game: null;
    reviews_count: number;
    saturated_color: string;
    dominant_color: string;
    parent_platforms: Platform2[];
    platforms: PlatformInfo[];
    stores: Store[];
    developers: Developer[];
    genres: Genre[];
    tags: Tag[];
    publishers: Publisher[];
    esrb_rating: EsrbRating;
    clip: string;
    description_raw: string;
}

interface MetacriticPlatform {
    metascore: number;
    url: string;
    platform: PlatformDetail;
}

interface PlatformDetail {
    platform: number;
    name: string;
    slug: string;
}

interface Rating {
    id: number;
    title: string;
    count: number;
    percent: number;
}

interface AddedByStatus {
    yet: number;
    owned: number;
    beaten: number;
    toplay: number;
    dropped: number;
    playing: number;
}

interface Platform2 {
    platform: PlatformDetail;
}

interface PlatformInfo {
    platform: PlatformDetail;
    released_at: string;
    requirements: Requirements;
}

interface Requirements {
    minimum?: string;
    recommended?: string;
}

interface Store {
    id: number;
    url: string;
    store: StoreDetail;
}

interface StoreDetail {
    id: number;
    name: string;
    slug: string;
    domain: string;
    games_count: number;
    image_background: string;
}

interface Developer {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
}

interface Genre {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
}

interface Tag {
    id: number;
    name: string;
    slug: string;
    language: string;
    games_count: number;
    image_background: string;
}

interface Publisher {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
}

interface EsrbRating {
    id: number;
    name: string;
    slug: string;
}

export const useGames = (gameQuery: GameQuery) => useData<Game>('/games', {
    params: {
        genres: gameQuery.genre?.id,
        platforms: gameQuery.platform?.id,
        ordering: gameQuery.sortOrder,
        search: gameQuery.searchText,
    },
}, [gameQuery]);

export const useInfoGame = (gameName: string) => useDataInfo(`/games/${gameName}`);
