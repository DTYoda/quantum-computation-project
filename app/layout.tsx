import type {Metadata} from 'next';
import Link from 'next/link';
import 'katex/dist/katex.min.css';
import './globals.css';
export const metadata: Metadata={title:{default:'Quantum Atlas · Quantum complexity theory',template:'%s · Quantum Atlas'}};
export default function RootLayout({children}:{children:React.ReactNode}){
return <html lang="en"><body><a className="skip" href="#main">Skip to content</a><header className="top"><div className="bar"><Link className="brand" href="/"><span className="mark" aria-hidden="true">ψ</span> Quantum Atlas</Link><nav aria-label="Main navigation"><Link href="/#chapters">Chapters</Link><Link href="/references">References</Link></nav></div></header><main id="main">{children}</main><footer><Link href="/">Quantum Atlas</Link><span>CMU · 15-455</span></footer></body></html>
}
