"use client";

import { type CSSProperties, type FormEvent, useMemo, useState } from "react";

const logoOptions = [
  { id: "stern", label: "Stern", mark: "✦" },
  { id: "herz", label: "Herz", mark: "♡" },
  { id: "tanne", label: "Tanne", mark: "△" },
  { id: "kranz", label: "Kranz", mark: "○" },
  { id: "monogramm", label: "Monogramm", mark: "AZ" },
];

const colorOptions = [
  { id: "gold-matt", label: "Gold matt", hex: "#d6b26f", edge: "#8a642d" },
  { id: "rot-glanz", label: "Rot glänzend", hex: "#9f2f3d", edge: "#5e1720" },
  { id: "silber", label: "Silber klar", hex: "#d9dde0", edge: "#8f969b" },
  { id: "tanne", label: "Tannengrün", hex: "#244f3d", edge: "#173429" },
  { id: "champagner", label: "Champagner", hex: "#f0dfc1", edge: "#b08b54" },
  { id: "rauchglas", label: "Rauchglas", hex: "#76736c", edge: "#3c3b37" },
];

const relatedProducts = [
  {
    name: "Holz-Erinnerungsbox",
    price: "ab 34,90 €",
    details: "Name, Datum und Symbolgravur",
    visual: "box",
  },
  {
    name: "Namensschild fürs Kinderzimmer",
    price: "ab 19,90 €",
    details: "Schriftzug mit auswählbarem Logo",
    visual: "sign",
  },
  {
    name: "Geschenkanhänger aus Acryl",
    price: "ab 9,90 €",
    details: "Kurzname, Icon und Bandfarbe",
    visual: "tag",
  },
];

type CartItem = {
  id: number;
  name: string;
  color: string;
  logo: string;
  quantity: number;
  price: number;
};

const basePrice = 24.9;

function formatPrice(value: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

export default function Home() {
  const [customName, setCustomName] = useState("Mila");
  const [selectedLogoId, setSelectedLogoId] = useState(logoOptions[0].id);
  const [selectedColorId, setSelectedColorId] = useState(colorOptions[0].id);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const selectedLogo =
    logoOptions.find((logo) => logo.id === selectedLogoId) ?? logoOptions[0];
  const selectedColor =
    colorOptions.find((color) => color.id === selectedColorId) ??
    colorOptions[0];
  const previewName = customName.trim() || "Name";
  const previewNameSize =
    previewName.length > 14 ? "0.86rem" : previewName.length > 9 ? "1rem" : "1.16rem";

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  );

  function addToCart(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCartItems((items) => [
      ...items,
      {
        id: Date.now(),
        name: previewName,
        color: selectedColor.label,
        logo: selectedLogo.label,
        quantity,
        price: basePrice,
      },
    ]);
  }

  return (
    <div className="shop-shell">
      <div className="top-notice">
        Personalisierte Geschenke auf Deutsch konfigurierbar - Versandangaben und
        Zahlungsarten folgen im nächsten Schritt.
      </div>

      <header className="shop-header">
        <a className="brand" href="#produkt" aria-label="Feine Gravur Startseite">
          <span className="brand-mark">FG</span>
          <span>
            <strong>Feine Gravur</strong>
            <small>Personalisierte Geschenke</small>
          </span>
        </a>
        <nav className="main-nav" aria-label="Hauptnavigation">
          <a href="#produkt">Produkt</a>
          <a href="#sortiment">Sortiment</a>
          <a href="#details">Details</a>
          <a href="#kontakt">Kontakt</a>
        </nav>
        <a className="header-cart" href="#warenkorb">
          Warenkorb {cartItems.length > 0 ? `(${cartItems.length})` : ""}
        </a>
      </header>

      <main>
        <section className="product-section" id="produkt" aria-labelledby="product-title">
          <div className="gallery-column">
            <div className="product-photo-frame">
              <img
                src="/engraved-glass-ornament.png"
                alt="Personalisierte Glas-Weihnachtskugel mit Gravur"
              />
              <div className="engraving-preview" aria-hidden="true">
                <span className="engraving-logo">{selectedLogo.mark}</span>
                <span
                  className="engraving-name"
                  style={{ fontSize: previewNameSize }}
                >
                  {previewName}
                </span>
                <span className="engraving-line" />
              </div>
            </div>
            <div className="thumb-row" aria-label="Produktansichten">
              <button className="thumb-button active" type="button" aria-label="Fotoansicht">
                Foto
              </button>
              <button className="thumb-button" type="button" aria-label="Gravuransicht">
                Gravur
              </button>
              <button className="thumb-button" type="button" aria-label="Verpackung">
                Box
              </button>
            </div>
          </div>

          <div className="purchase-panel">
            <p className="breadcrumbs">Startseite / Weihnachtsgeschenke</p>
            <p className="product-badge">Neu im Konfigurator</p>
            <h1 id="product-title">Personalisierte Glas-Weihnachtskugel mit Gravur</h1>
            <p className="product-lead">
              Eine elegante Glaskugel, die mit Namen, kurzem Wunschtext und einem
              gewählten Logo-Motiv individualisiert wird. Die finalen Produktfotos
              können später ohne Layoutwechsel ergänzt werden.
            </p>

            <div className="purchase-meta">
              <span>Lieferzeit: 4-7 Werktage</span>
              <span>Durchmesser: 8 cm</span>
              <span>Vorschau live</span>
            </div>

            <div className="price-row">
              <span className="price">{formatPrice(basePrice)}</span>
              <span className="tax-note">inkl. MwSt., zzgl. Versand</span>
            </div>

            <form className="configurator" onSubmit={addToCart}>
              <label className="field-group" htmlFor="custom-name">
                <span>Name oder kurzer Text</span>
                <input
                  id="custom-name"
                  maxLength={18}
                  value={customName}
                  onChange={(event) => setCustomName(event.target.value.slice(0, 18))}
                  placeholder="z. B. Emilia"
                />
              </label>

              <div className="field-group">
                <span>Farbe der Kugel</span>
                <div className="color-grid" role="radiogroup" aria-label="Farbe der Kugel">
                  {colorOptions.map((color) => (
                    <button
                      className={`color-option ${
                        selectedColor.id === color.id ? "selected" : ""
                      }`}
                      key={color.id}
                      type="button"
                      aria-pressed={selectedColor.id === color.id}
                      onClick={() => setSelectedColorId(color.id)}
                    >
                      <span
                        className="swatch"
                        style={
                          {
                            "--swatch": color.hex,
                            "--swatch-edge": color.edge,
                          } as CSSProperties
                        }
                      />
                      <span>{color.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="field-group">
                <span>Logo-Motiv</span>
                <div className="logo-grid" role="radiogroup" aria-label="Logo-Motiv">
                  {logoOptions.map((logo) => (
                    <button
                      className={`logo-option ${
                        selectedLogo.id === logo.id ? "selected" : ""
                      }`}
                      key={logo.id}
                      type="button"
                      aria-pressed={selectedLogo.id === logo.id}
                      onClick={() => setSelectedLogoId(logo.id)}
                    >
                      <span className="logo-symbol" aria-hidden="true">
                        {logo.mark}
                      </span>
                      <span>{logo.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="quantity-row">
                <span>Menge</span>
                <div className="stepper" aria-label="Menge">
                  <button
                    type="button"
                    aria-label="Menge verringern"
                    onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  >
                    -
                  </button>
                  <output aria-live="polite">{quantity}</output>
                  <button
                    type="button"
                    aria-label="Menge erhöhen"
                    onClick={() => setQuantity((current) => Math.min(12, current + 1))}
                  >
                    +
                  </button>
                </div>
              </div>

              <button className="primary-button" type="submit">
                In den Warenkorb
              </button>
            </form>
          </div>

          <aside className="cart-summary" id="warenkorb" aria-label="Warenkorb">
            <div>
              <p className="section-kicker">Warenkorb</p>
              <h2>Aktuelle Auswahl</h2>
            </div>
            {cartItems.length === 0 ? (
              <p className="empty-cart">Noch kein personalisiertes Produkt im Warenkorb.</p>
            ) : (
              <div className="cart-list" aria-live="polite">
                {cartItems.map((item) => (
                  <article className="cart-line" key={item.id}>
                    <div>
                      <strong>{item.name}</strong>
                      <span>
                        {item.color} / {item.logo}
                      </span>
                    </div>
                    <span>
                      {item.quantity} x {formatPrice(item.price)}
                    </span>
                  </article>
                ))}
              </div>
            )}
            <div className="cart-total">
              <span>Zwischensumme</span>
              <strong>{formatPrice(cartTotal)}</strong>
            </div>
            <button className="secondary-button" type="button" disabled>
              Checkout folgt
            </button>
          </aside>
        </section>

        <section className="service-strip" aria-label="Service">
          <div>
            <strong>Eigene Gravurvorschau</strong>
            <span>Name und Motiv werden sofort sichtbar.</span>
          </div>
          <div>
            <strong>Motivbibliothek</strong>
            <span>Logo-Angebot kann später beliebig erweitert werden.</span>
          </div>
          <div>
            <strong>Vorbereitet für echte Fotos</strong>
            <span>Produktbilder lassen sich später austauschen.</span>
          </div>
        </section>

        <section className="products-section" id="sortiment" aria-labelledby="sortiment-title">
          <div className="section-heading">
            <p className="section-kicker">Sortiment</p>
            <h2 id="sortiment-title">Weitere personalisierbare Produkte</h2>
          </div>
          <div className="product-card-grid">
            {relatedProducts.map((product) => (
              <article className="product-card" key={product.name}>
                <div className={`mini-visual ${product.visual}`} aria-hidden="true">
                  <span />
                </div>
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.details}</p>
                </div>
                <strong>{product.price}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="details-section" id="details" aria-labelledby="details-title">
          <div className="section-heading">
            <p className="section-kicker">Produktdetails</p>
            <h2 id="details-title">Bereit für die nächsten Inhalte</h2>
          </div>
          <div className="detail-columns">
            <article>
              <h3>Personalisierung</h3>
              <p>
                Jedes Produkt kann einen Namen oder kurzen Text tragen. Die
                Motivliste ist als erweiterbare Auswahl angelegt.
              </p>
            </article>
            <article>
              <h3>Produktdaten</h3>
              <p>
                Beschreibungen, Materialien, Pflegehinweise und finale Fotos können
                später direkt pro Produkt ergänzt werden.
              </p>
            </article>
            <article>
              <h3>Bestellung</h3>
              <p>
                Warenkorb und Konfiguration sind vorbereitet. Rechtstexte,
                Versandregeln und Zahlungsarten folgen danach.
              </p>
            </article>
          </div>
        </section>
      </main>

      <footer className="shop-footer" id="kontakt">
        <div>
          <strong>Feine Gravur</strong>
          <span>Demo-Shop für personalisierte Geschenkprodukte</span>
        </div>
        <div className="footer-links">
          <a href="#produkt">Produkt</a>
          <a href="#sortiment">Sortiment</a>
          <a href="mailto:hallo@example.de">hallo@example.de</a>
        </div>
      </footer>
    </div>
  );
}
