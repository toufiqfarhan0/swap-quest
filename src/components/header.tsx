import Link from 'next/link';
import { Icons } from './icons';
import { Button } from './ui/button';
import { Gamepad2 } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Icons.logo className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline sm:inline-block">
              SwapQuest
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button asChild>
              <Link href="/dashboard">
                <Gamepad2 className="mr-2" /> Go to App
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
