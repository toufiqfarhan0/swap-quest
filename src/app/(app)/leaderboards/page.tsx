import { PageHeader } from '@/components/page-header';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { leaderboardData } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Crown } from 'lucide-react';

export default function LeaderboardsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Leaderboards"
        description="See who's at the top of the SwapQuest rankings this season."
      />
      <Card>
        <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2"><Crown className="text-amber-400"/> Season 1 Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Rank</TableHead>
                <TableHead>Player</TableHead>
                <TableHead className="text-right">Points</TableHead>
                <TableHead className="text-center">Reward</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.map((entry) => (
                <TableRow key={entry.rank} className={cn(entry.player.name === 'You' && 'bg-primary/10')}>
                  <TableCell className="font-bold text-lg">{entry.rank}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={entry.player.avatar} alt={entry.player.name} />
                        <AvatarFallback>{entry.player.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{entry.player.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono">{entry.points.toLocaleString()}</TableCell>
                  <TableCell className="text-center">
                    {entry.reward !== '-' ? (
                       <Badge variant={
                        entry.rank === 1 ? 'default' :
                        entry.rank === 2 ? 'secondary' :
                        entry.rank === 3 ? 'outline' : 'default'
                      } className={cn(
                        entry.rank === 1 && 'bg-amber-400 text-black',
                        entry.rank === 2 && 'bg-slate-400 text-black',
                        entry.rank === 3 && 'bg-amber-700 text-white'
                      )}>
                        {entry.reward}
                      </Badge>
                    ) : (
                      <span>-</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
