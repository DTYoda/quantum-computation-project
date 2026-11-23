import Link from 'next/link';
export const metadata={title:'References'};
const groups=[
{label:'Course lectures',items:[
['Boolean Circuits 1','A. Ada · 2026','CMU 15-455. Scribed by R. Ye.','https://www.pandanotes.org/servers/cs455f26/chapters/Boolean_Circuits_1/'],
['Boolean Circuits 2','A. Ada · 2026','CMU 15-455. Scribed by K. Meng and E. Ning.']]},
{label:'Books and survey',items:[
['Quantum Computation and Quantum Information','M. A. Nielsen & I. L. Chuang · 2010','10th Anniversary Edition. Cambridge University Press.'],
['Quantum Computational Complexity','J. Watrous · 2009','Encyclopedia of Complexity and Systems Science.','https://jhwatrous.github.io/Watrous2009_complexity.pdf'],
['Quantum Computing Since Democritus','S. Aaronson · 2013','Cambridge University Press.']]},
{label:'Research papers',items:[
['A Simple Proof that Toffoli and Hadamard are Quantum Universal','D. Aharonov · 2003','arXiv.','https://arxiv.org/abs/quant-ph/0301040'],
['Algorithms for Quantum Computation: Discrete Logarithms and Factoring','P. Shor · 1994','Proceedings of FOCS. Extended paper linked.','https://arxiv.org/abs/quant-ph/9508027'],
['A Fast Quantum Mechanical Algorithm for Database Search','L. K. Grover · 1996','Proceedings of STOC.','https://arxiv.org/abs/quant-ph/9605043'],
['Strengths and Weaknesses of Quantum Computing','C. H. Bennett, E. Bernstein, G. Brassard & U. Vazirani · 1997','SIAM Journal on Computing, 26(5), 1510–1523.','https://arxiv.org/abs/quant-ph/9701001']]}];
export default function References(){return <article className="wrap"><Link className="eyebrow" href="/">COURSE GUIDE</Link><h1>References</h1>{groups.map(g=><section className="ref-group" id={g.label==="Research papers"?"papers":undefined} key={g.label}><h2>{g.label}</h2>{g.items.map(([title,author,source,url])=><div className="ref" key={title}><h3>{url?<a href={url}>{title}</a>:title}</h3><p>{author}<br/>{source}</p></div>)}</section>)}</article>}
