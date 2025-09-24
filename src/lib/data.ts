import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { ImagePlaceholder } from '@/lib/placeholder-images';

export type UserStats = {
  totalCredits: number;
  gamesPlayed: number;
  rank: number;
};

export const userStats: UserStats = {
  totalCredits: 1250,
  gamesPlayed: 42,
  rank: 7,
};

export type Game = {
  id: string;
  title: string;
  protocol: string;
  description: string;
  image: ImagePlaceholder;
};

export const games: Game[] = [
  {
    id: '1',
    title: 'Aavegotchi\'s Puzzle Quest',
    protocol: 'Aave',
    description: 'Solve intricate puzzles to earn Aave credits and unlock rare items.',
    image: PlaceHolderImages[0],
  },
  {
    id: '2',
    title: 'Uniswap Arcade Challenge',
    protocol: 'Uniswap',
    description: 'A fast-paced arcade game. Swap tokens in a retro-style interface.',
    image: PlaceHolderImages[1],
  },
  {
    id: '3',
    title: 'DeFi Trivia',
    protocol: 'Compound',
    description: 'Test your knowledge of the DeFi world and earn COMP credits.',
    image: PlaceHolderImages[2],
  },
  {
    id: '4',
    title: 'Chainlink Clicker',
    protocol: 'Chainlink',
    description: 'Click your way to the top and secure the network for LINK credits.',
    image: PlaceHolderImages[3],
  },
  {
    id: '5',
    title: 'Synthetix Strategy Arena',
    protocol: 'Synthetix',
    description: 'A strategic game of synthetic assets. Outsmart your opponents.',
    image: PlaceHolderImages[4],
  },
  {
    id: '6',
    title: 'Yearn\'s Yield Farm',
    protocol: 'Yearn.Finance',
    description: 'Manage your virtual farm and optimize yields for YFI credits.',
    image: PlaceHolderImages[5],
  },
];

export type LeaderboardEntry = {
  rank: number;
  player: {
    name: string;
    avatar: string;
  };
  points: number;
  reward: string;
};

export const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, player: { name: 'CryptoKing', avatar: 'https://i.pravatar.cc/40?u=a042581f4e29026704d' }, points: 15000, reward: 'Gold Badge' },
  { rank: 2, player: { name: 'DeFiDiva', avatar: 'https://i.pravatar.cc/40?u=a042581f4e29026705d' }, points: 14500, reward: 'Silver Badge' },
  { rank: 3, player: { name: 'TokenTraveller', avatar: 'https://i.pravatar.cc/40?u=a042581f4e29026706d' }, points: 13800, reward: 'Bronze Badge' },
  { rank: 4, player: { name: 'SatoshiJr', avatar: 'https://i.pravatar.cc/40?u=a042581f4e29026707d' }, points: 12000, reward: '100 Credits' },
  { rank: 5, player: { name: 'EtherElf', avatar: 'https://i.pravatar.cc/40?u=a042581f4e29026708d' }, points: 11500, reward: '50 Credits' },
  { rank: 6, player: { name: 'BitBard', avatar: 'https://i.pravatar.cc/40?u=a042581f4e29026709d' }, points: 11200, reward: '25 Credits' },
  { rank: 7, player: { name: 'You', avatar: 'https://i.pravatar.cc/40?u=a042581f4e29026701d' }, points: 10800, reward: '-' },
  { rank: 8, player: { name: 'ChainChampion', avatar: 'https://i.pravatar.cc/40?u=a042581f4e29026702d' }, points: 10500, reward: '-' },
  { rank: 9, player: { name: 'NFKnight', avatar: 'https://i.pravatar.cc/40?u=a042581f4e29026703d' }, points: 10100, reward: '-' },
  { rank: 10, player: { name: 'YieldYoda', avatar: 'https://i.pravatar.cc/40?u=a042581f4e29026710d' }, points: 9800, reward: '-' },
];

export const achievements = [
  'First Swap',
  'Game Master',
  'Top 10 Player',
  'Puzzle Pro',
  'Arcade Wizard',
  'Protocol Pioneer',
];

export type ChartData = {
  month: string;
  credits: number;
};

export const creditHistory: ChartData[] = [
    { month: 'Jan', credits: Math.floor(Math.random() * 2000) + 500 },
    { month: 'Feb', credits: Math.floor(Math.random() * 2000) + 500 },
    { month: 'Mar', credits: Math.floor(Math.random() * 2000) + 500 },
    { month: 'Apr', credits: Math.floor(Math.random() * 2000) + 500 },
    { month: 'May', credits: Math.floor(Math.random() * 2000) + 500 },
    { month: 'Jun', credits: Math.floor(Math.random() * 2000) + 500 },
];
