import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { site } from '@/content/site';

export function generateStaticParams() {
  return site.sections.map(section => ({ section: section.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  return { title: site.sections.find(item => item.slug === section)?.title };
}

export default async function Section({ params }: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const item = site.sections.find(item => item.slug === section);
  if (!item) notFound();

  return (
    <article>
      <h1>{item.title}</h1>
      <div className="page-text">{item.body}</div>
    </article>
  );
}
