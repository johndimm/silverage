import Head from 'next/head';

const GARDEN_URL = 'https://johndimm.vercel.app';
const GITHUB_URL = 'https://github.com/johndimm/silverage';

const wrap = { minHeight: '100vh', background: '#000', color: '#e5e5e5', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' };
const bar = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderBottom: '1px solid #202024' };
const iconBtn = { display: 'inline-flex', alignItems: 'center', gap: 6, border: '1px solid #2a2a2e', background: '#151517', color: '#a1a1aa', borderRadius: 10, padding: '8px 12px', fontSize: 13, textDecoration: 'none' };
const main = { maxWidth: 680, margin: '0 auto', padding: '56px 24px' };
const tag = { border: '1px solid #26262a', background: '#141416', color: '#c4c4c8', borderRadius: 8, padding: '6px 12px', fontSize: 13 };

export default function About() {
  return (
    <div style={wrap}>
      <Head><title>About · Silver Age</title></Head>
      <div style={bar}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <a href={GARDEN_URL} title="All apps — John Dimm" style={iconBtn} aria-label="All apps">🏠</a>
          <span style={{ fontSize: 17, fontWeight: 600, color: '#fff' }}>Silver Age</span>
        </div>
        <a href="/" style={iconBtn}>Open app ↗</a>
      </div>
      <main style={main}>
        <h1 style={{ fontSize: 34, fontWeight: 700, color: '#fff', margin: 0 }}>Silver Age</h1>
        <p style={{ fontSize: 18, color: '#a1a1aa', marginTop: 10 }}>A collection of Silver Age Marvel comics from the &apos;60s</p>
        <div style={{ marginTop: 28, fontSize: 15.5, lineHeight: 1.6, color: '#d4d4d8', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p>A collection of Silver Age Marvel comics from the 1960s — the ones I started collecting as a kid, hitting the used bookstores in Pasadena before there were comic book shops. This app uses the feature-filter React module for the left panel, so you can carve out a set of comics by any combination of field values, updating without a page reload.</p>
          <p>The stock cover photos and plot summaries come from the Marvel API. Detail pages show the stock cover and, in a growing number of cases, photographs of the actual comics from several angles — submitted to the CGC Forum and graded there.</p>
        </div>
        <div style={{ marginTop: 30 }}>
          <h2 style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#71717a' }}>Built with</h2>
          <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['React / Next.js', 'Marvel API'].map((t) => (<span key={t} style={tag}>{t}</span>))}
          </div>
        </div>
        <div style={{ marginTop: 36, paddingTop: 22, borderTop: '1px solid #202024', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 20, fontSize: 14 }}>
          <a href="/" style={{ background: '#f4f4f5', color: '#18181b', fontWeight: 600, borderRadius: 10, padding: '10px 18px', textDecoration: 'none' }}>Open the app ↗</a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#a1a1aa', textDecoration: 'none' }}>GitHub</a>
          <a href={GARDEN_URL} style={{ marginLeft: 'auto', color: '#71717a', textDecoration: 'none' }}>← All apps</a>
        </div>
      </main>
    </div>
  );
}
