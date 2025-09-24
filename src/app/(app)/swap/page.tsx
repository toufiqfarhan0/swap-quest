'use client';

import { PageHeader } from '@/components/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowDownUp, Coins, Wallet } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

const tokens = [
  { id: 'eth', name: 'Ethereum', symbol: 'ETH' },
  { id: 'usdc', name: 'USD Coin', symbol: 'USDC' },
  { id: 'dai', name: 'Dai', symbol: 'DAI' },
  { id: 'wbtc', name: 'Wrapped BTC', symbol: 'WBTC' },
];

export default function SwapPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
      <PageHeader
        title="Token Swap"
        description="Exchange tokens and use your credits to save on fees."
      />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Swap</CardTitle>
          <CardDescription>Select tokens to exchange.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2 p-4 border rounded-lg bg-background/50">
            <Label htmlFor="from-amount">You Send</Label>
            <div className="flex gap-2">
              <Input
                id="from-amount"
                type="number"
                placeholder="0.0"
                className="text-lg"
                defaultValue="1.5"
              />
              <Select defaultValue="eth">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select token" />
                </SelectTrigger>
                <SelectContent>
                  {tokens.map((token) => (
                    <SelectItem key={token.id} value={token.id}>
                      {token.symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-center -my-2">
            <Button variant="ghost" size="icon" className="bg-card">
              <ArrowDownUp className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
          <div className="grid gap-2 p-4 border rounded-lg bg-background/50">
            <Label htmlFor="to-amount">You Receive</Label>
            <div className="flex gap-2">
              <Input
                id="to-amount"
                type="number"
                placeholder="0.0"
                className="text-lg"
                defaultValue="3104.25"
                readOnly
              />
              <Select defaultValue="usdc">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select token" />
                </SelectTrigger>
                <SelectContent>
                  {tokens.map((token) => (
                    <SelectItem key={token.id} value={token.id}>
                      {token.symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Separator className="my-4"/>

          <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                  <Coins className="h-6 w-6 text-accent"/>
                  <div>
                      <Label htmlFor="use-credits">Use Credits for Fee</Label>
                      <p className="text-xs text-muted-foreground">You have 1,250 credits available.</p>
                  </div>
              </div>
            <Switch id="use-credits" defaultChecked />
          </div>

          <div className="text-sm text-muted-foreground space-y-1">
            <div className="flex justify-between">
              <span>Swap Fee:</span>
              <span className="line-through">$1.50</span>
            </div>
            <div className="flex justify-between">
              <span>Credit Discount:</span>
              <span className="text-accent">-$1.50</span>
            </div>
             <div className="flex justify-between font-semibold text-foreground">
              <span>Final Fee:</span>
              <span>$0.00</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button size="lg" className="w-full font-bold text-base">
            Swap
          </Button>
           <Button size="lg" variant="secondary" className="w-full">
            <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
