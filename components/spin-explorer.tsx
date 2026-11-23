'use client';

import { useState } from 'react';

const names = ['A', 'B', 'C'];

function outcomes(spins: number, angle: number, correlated: boolean) {
  // Rotate detector A in the x-z plane. B and C always measure along z.
  const same = Math.cos(angle * Math.PI / 360) ** 2;
  return Array.from({ length: 2 ** spins }, (_, i) => {
    const bits = i.toString(2).padStart(spins, '0');
    const probabilityFrom = (initial: string) => {
      if (bits.slice(1) !== initial.repeat(spins - 1)) return 0;
      return bits[0] === initial ? same : 1 - same;
    };
    const probability = correlated && spins > 1
      ? (probabilityFrom('0') + probabilityFrom('1')) / 2
      : probabilityFrom('0');
    return { label: bits.replaceAll('0', '↑').replaceAll('1', '↓'), probability };
  });
}

function Detector({angle}: {angle:number}) {
  return <svg className="spin-detector" viewBox="0 0 400 178" role="img"
    aria-label={`End view of detector A. Its positive axis is tilted ${angle} degrees from vertical.`}>
    <g transform="translate(200 89)">
      <circle r="66" fill="#123e31" stroke="#668a72" />
      {Array.from({length:36},(_,i)=><line key={i} transform={`rotate(${i*10})`} x1="0" y1="-65" x2="0" y2={i%3===0?-57:-62} stroke="#9fbd9e"/>)}
      <path d="M0 -70V70 M-70 0H70" stroke="#849e89" strokeDasharray="2 4"/>
      <g transform={`rotate(${angle})`}>
        <path d="M0 46V-48" stroke="#d2ee96" strokeWidth="3"/><path d="M0 -53L-5 -43H5Z" fill="#d2ee96"/>
        <path d="M-25 -43Q0 -60 25 -43 M-25 43Q0 60 25 43" fill="none" stroke="#85aa95" strokeWidth="5"/>
      </g>
      <circle r="7" fill="#e4f5ad"/><circle r="13" fill="none" stroke="#8dba88"/>
    </g>
    <g fill="#d7e9d9" fontSize="13" fontFamily="monospace"><text x="209" y="17">+z</text><text x="275" y="93">+x</text><text x="18" y="162">Detector A · end view</text></g>
  </svg>;
}

export function SpinExplorer() {
  const [spins, setSpins] = useState(1);
  const [angle, setAngle] = useState(60);
  const [correlated, setCorrelated] = useState(true);
  const [counts, setCounts] = useState<number[]>([]);
  const distribution = outcomes(spins, angle, correlated);
  const total = counts.reduce((a,b)=>a+b,0);

  function measure(trials:number) {
    const added = distribution.map(()=>0);
    for (let trial=0; trial<trials; trial++) {
      let draw=Math.random();
      for (const [i, outcome] of distribution.entries()) {
        draw -= outcome.probability;
        if (draw<0) { added[i]++; break; }
      }
    }
    setCounts(old=>added.map((value,i)=>value+(old[i]??0)));
  }

  return <section className="instrument spin-experiment" aria-label="Spin measurement experiment">
    <div className="instrument-head"><span className="led"/>Spin measurement
      <label className="q-count"><select aria-label="Number of particles" value={spins} onChange={e=>{setSpins(Number(e.target.value));setCounts([])}}>
        {[1,2,3].map(n=><option key={n} value={n}>{n} particle{n>1?'s':''}</option>)}</select></label>
    </div>
    <Detector angle={angle}/>
    <div className="dial">
      {spins===1 ? <small>Source: spin-½ particles prepared along +z.</small> :
        <label>Source <select aria-label="Spin preparation" value={correlated?'entangled':'independent'} onChange={e=>{setCorrelated(e.target.value==='entangled');setCounts([])}}>
          <option value="entangled">{spins===2?'Entangled pair (Φ+)':'Entangled trio (GHZ+)'}</option><option value="independent">Independent, all +z</option></select></label>}
      <label className="angle-label" htmlFor="detector-angle">Detector A tilt <output>{angle}°</output></label>
      <input id="detector-angle" type="range" min="0" max="180" value={angle} onChange={e=>{setAngle(Number(e.target.value));setCounts([])}}/>
      {spins>1 && <small>{spins===2?'Detector B stays':'Detectors B and C stay'} aligned with +z.</small>}
      <table className="spin-results">
        <thead><tr><th scope="col">{names.slice(0,spins).join(' · ')}</th><th scope="col">Predicted</th><th scope="col">Observed</th></tr></thead>
        <tbody>{distribution.map(({label,probability},i)=><tr key={label}><th scope="row">{label}</th><td><span className="q-bar"><i style={{width:probability*100+'%'}}/></span>{Number((100*probability).toFixed(1))}%</td><td>{counts[i]??0}</td></tr>)}</tbody>
      </table>
      <div className="spin-actions"><button onClick={()=>measure(1)}>Measure once</button><button onClick={()=>measure(100)}>Run 100 trials</button>
        <button disabled={!total} onClick={()=>setCounts([])}>Reset counts</button></div>
      <output className="spin-total" aria-live="polite">{total} trials · Fresh preparation each trial</output>
    </div>
  </section>;
}
