import Link from "next/link";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { Gamepad2 } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between rounded-xl mx-9"> {/* Changed justify-between to justify-center */}
        <div className="flex">
          <Link href="/" className="flex items-center">
            <Icons.logo className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline sm:inline-block">
              SwapQuest
            </span>
          </Link>
        </div>
        <div className="flex items-center absolute right-8"> {/* Position the button absolutely on the right */}
          <nav className="flex items-center">
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