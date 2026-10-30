import { site } from '@/content/site';

export default function Home() {
  return (
    <article>
      <h1>{site.outline.title}</h1>
      <div className="page-text">{site.outline.body}</div>
    </article>
  );
}
