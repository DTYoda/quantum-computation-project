import Link from 'next/link';
import { CircuitCreator } from '@/components/circuit-creator';

export const metadata = { title: 'Circuit creator' };

export default function CircuitCreatorPage() {
  return <article className="wrap circuit-workspace">
    <Link className="eyebrow" href="/definitions#s45">Quantum circuits</Link>
    <h1>Circuit creator</h1>
    <CircuitCreator/>
  </article>;
}
