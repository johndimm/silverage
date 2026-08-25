import '../styles/globals.css'

const ctrl = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: 34, borderRadius: 9, border: '1px solid rgba(0,0,0,0.15)', background: 'rgba(20,20,22,0.85)', color: '#e5e5e5', textDecoration: 'none', backdropFilter: 'blur(4px)' }

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <div style={{ position: 'fixed', bottom: 10, left: 10, zIndex: 9999, display: 'flex', gap: 6 }}>
        <a href="https://johndimm.vercel.app" title="All apps — John Dimm" aria-label="All apps" style={{ ...ctrl, width: 34, fontSize: 15 }}>🏠</a>
        <a href="/about" title="About Silver Age" style={{ ...ctrl, padding: '0 12px', fontSize: 13 }}>About</a>
      </div>
      <div style={{ position: 'fixed', bottom: 4, left: 0, right: 0, textAlign: 'center', fontSize: 11, color: '#64748b', pointerEvents: 'none', zIndex: 9999 }}>© 2026 John Dimm</div>
    </>
  )
}

export default MyApp
