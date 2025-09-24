import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Gamepad2, TrendingUp, Zap } from 'lucide-react';
import { Icons } from '@/components/icons';

function LandingPage() {
  return (
    <div className="flex flex-col">
      <section className="w-full py-20 md:py-32 lg:py-40 xl:py-48 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline text-primary">
                  Gamify Your DeFi Experience with SwapQuest
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Play fun mini-games, earn credits, and use them to slash your
                  token swap fees. The more you play, the more you save.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/play">
                    <Gamepad2 className="mr-2 h-5 w-5" />
                    Get Started & Play
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
                <Icons.logo className="h-48 w-48 lg:h-72 lg:w-72 text-primary animate-pulse" />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Key Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                Why You'll Love SwapQuest
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We've combined the thrill of gaming with the power of
                decentralized finance to create a unique and rewarding
                experience.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <Gamepad2 className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold font-headline">Play & Earn</h3>
              <p className="text-sm text-muted-foreground">
                Engage in a variety of simple, fun games to earn credits. From
                classic puzzles to fast-paced challenges, there's something for
                everyone.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <Zap className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold font-headline">Reduce Fees</h3>
              <p className="text-sm text-muted-foreground">
                Apply your earned credits directly to your token swaps to
                reduce or even eliminate transaction fees. Saving on swaps has
                never been this fun.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <TrendingUp className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold font-headline">
                Climb the Ranks
              </h3>
              <p className="text-sm text-muted-foreground">
                Compete with other players on the leaderboards. Earn achievements
                and special rewards for your gaming prowess and DeFi activity.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function RootPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <LandingPage />
      </main>
    </div>
  );
}
