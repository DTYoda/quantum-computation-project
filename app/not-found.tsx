import Link from 'next/link';
import { site } from '@/content/site';

export default function NotFound() {
  return (
    <>
      <h1>{site.interface.pageNotFound}</h1>
      <Link href="/">{site.outline.navigationLabel}</Link>
    </>
  );
}
