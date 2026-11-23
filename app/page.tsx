import Link from 'next/link';
import chapters from '@/content/chapters.json';
import {StateLab} from '@/components/labs';
const marks=['?','ψ','⊗','⊆','∑','√'];
export default function Home(){return <>
<div className="hero"><div className="hero-copy"><div className="eyebrow"><span className="rule"/> CMU 15-455 / COURSE GUIDE</div>
<h1>Quantum<br/><em>complexity.</em></h1>
<p>Does allowing error in quantum computing actually grant us more computational power?</p><Link className="cta" href="/definitions">Explore the definitions</Link></div><StateLab/></div>
<section className="road" id="chapters"><div className="road-title"><h2>Chapter index</h2><span className="eyebrow">06 CHAPTERS</span></div><div className="cards">{chapters.map((c,i)=><Link className="card" href={'/'+c.slug} key={c.slug}><div className="card-top"><span className={'glyph g'+i}>{marks[i]}</span><span className="eyebrow">{String(i+1).padStart(2,'0')} / 06</span></div><h3>{c.title}</h3><span>{c.topics}</span></Link>)}</div></section></>}
