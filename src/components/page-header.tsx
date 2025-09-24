import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type PageHeaderProps = {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

export function PageHeader({
  title,
  description,
  children,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8',
        className,
      )}
    >
      <div className="grid gap-1">
        <h1 className="text-2xl md:text-3xl font-bold font-headline tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      {children && <div className="flex shrink-0 gap-2">{children}</div>}
    </div>
  );
}
