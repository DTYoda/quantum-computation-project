'use client';

import { createContext, useContext, useEffect, useId, useRef, useState, type ReactNode } from 'react';

const OpenProof = createContext<(id: string) => void>(() => {});

export function ProofButton({id, children, className}: {id:string; children:ReactNode; className?:string}) {
  const open = useContext(OpenProof);
  return <button type="button" className={className ?? 'proof-link'} aria-haspopup="dialog" onClick={() => open(id)}>{children}</button>;
}

export function ProofNode({id, label, children}: {id:string; label:string; children:ReactNode}) {
  const open = useContext(OpenProof);
  return <g role="button" tabIndex={0} aria-haspopup="dialog" aria-label={label} onClick={() => open(id)}
    onKeyDown={event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(id); }
    }}>{children}</g>;
}

export function ProofReader({children, articles}: {children:ReactNode; articles:Record<string,{title:string; kind:string; body:ReactNode}>}) {
  const [history, setHistory] = useState<string[]>([]);
  const dialog = useRef<HTMLDialogElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const active = history[history.length - 1];
  const article = articles[active];

  function open(id:string) {
    if (!articles[id]) return;
    setHistory(previous => previous.at(-1) === id ? previous : [...previous, id]);
  }
  useEffect(() => {
    if (!active || !dialog.current) return;
    if (!dialog.current.open) dialog.current.showModal();
    body.current?.scrollTo(0,0);
    closeButton.current?.focus({preventScroll:true});
  }, [active]);

  return <OpenProof.Provider value={open}>{children}
    <dialog className="proof-dialog" ref={dialog} aria-labelledby={titleId}
      onClose={() => setHistory([])} onClick={e => {if (e.target === dialog.current) dialog.current?.close();}}>
      <div className="proof-panel">
        <header className="proof-tools"><span className="eyebrow">{article?.kind.toUpperCase()}</span>
          {history.length > 1 && <button onClick={() => setHistory(previous => previous.slice(0,-1))}>Back</button>}
          <button ref={closeButton} onClick={() => dialog.current?.close()}>Close</button></header>
        <div className="reading proof-body" ref={body} onClick={e => {
          if (e.target instanceof Element && e.target.closest('a[href]')) dialog.current?.close();
        }}>
          <h2 id={titleId}>{article?.title}</h2>{article?.body}
        </div>
      </div>
    </dialog>
  </OpenProof.Provider>;
}
