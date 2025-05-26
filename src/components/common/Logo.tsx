import Link from 'next/link';
import PlaceOnIcon from '@/components/icons/PlaceOnIcon';

interface LogoProps {
  collapsed?: boolean;
  className?: string;
}

export function Logo({ collapsed = false, className }: LogoProps) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 ${className}`}>
      <PlaceOnIcon className="h-7 w-7 text-primary" />
      {!collapsed && (
        <span className="text-xl font-semibold text-foreground">
          SmartRecruiter
        </span>
      )}
    </Link>
  );
}
