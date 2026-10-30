'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { site } from '@/content/site';

export function Navigation() {
  const pathname = usePathname();
  const links = [
    { href: '/', label: site.outline.navigationLabel },
    ...site.sections.map(section => ({
      href: `/${section.slug}`,
      label: section.navigationLabel,
    })),
  ];

  return (
    <nav aria-label={site.interface.navigationLabel}>
      {links.map(link => (
        <Link
          key={link.href}
          href={link.href}
          className={pathname === link.href ? 'nav-link active' : 'nav-link'}
          aria-current={pathname === link.href ? 'page' : undefined}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
