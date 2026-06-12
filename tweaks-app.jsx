/* Ken's Olfactory Odyssey — Tweaks panel
   Drives document-level data attributes so the whole site re-themes live. */
const { useEffect } = React;

const KOO_DEFAULTS = /*EDITMODE-BEGIN*/{
  "direction": "Lab",
  "accent": "Gold",
  "display": "Playfair",
  "grain": true
}/*EDITMODE-END*/;

const DIR_MAP = { "Lab": "lab", "Oud Noir": "oud", "Atelier": "atelier", "Vitrine": "vitrine" };
const ACC_MAP = { "Gold": "gold", "Plum": "plum", "Emerald": "emerald" };
const DISP_MAP = { "Playfair": "playfair", "Spectral": "spectral", "Newsreader": "newsreader", "Cormorant": "cormorant", "Bodoni": "bodoni" };

function KooTweaks() {
  const [t, setTweak] = useTweaks(KOO_DEFAULTS);

  useEffect(() => {
    const r = document.documentElement;
    r.dataset.theme = DIR_MAP[t.direction] || "lab";
    r.dataset.accent = ACC_MAP[t.accent] || "gold";
    r.dataset.display = DISP_MAP[t.display] || "playfair";
    r.style.setProperty("--grain-opacity", t.grain ? "" : "0");
    // Re-resolve inherited color after a live theme change (Chromium custom-prop quirk)
    document.body.style.color = "var(--fg)";
  }, [t.direction, t.accent, t.display, t.grain]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Direction" />
      <TweakSelect
        label="Mood"
        value={t.direction}
        options={["Lab", "Oud Noir", "Atelier", "Vitrine"]}
        onChange={(v) => setTweak("direction", v)}
      />
      <TweakRadio
        label="Lead accent"
        value={t.accent}
        options={["Gold", "Plum", "Emerald"]}
        onChange={(v) => setTweak("accent", v)}
      />
      <TweakSection label="Type" />
      <TweakSelect
        label="Display face"
        value={t.display}
        options={["Playfair", "Spectral", "Newsreader", "Cormorant", "Bodoni"]}
        onChange={(v) => setTweak("display", v)}
      />
      <TweakSection label="Texture" />
      <TweakToggle
        label="Film grain"
        value={t.grain}
        onChange={(v) => setTweak("grain", v)}
      />
    </TweaksPanel>
  );
}

(function mount() {
  const el = document.createElement("div");
  el.id = "koo-tweaks-root";
  document.body.appendChild(el);
  ReactDOM.createRoot(el).render(<KooTweaks />);
})();
