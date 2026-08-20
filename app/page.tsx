"use client";

import { type CSSProperties, type FormEvent, useMemo, useState } from "react";

const TEXT_LIMIT = 12;

const logoOptions = [
  { id: "herz", label: "Herz", mark: "♡" },
  { id: "sterne", label: "Sterne", mark: "✦" },
  { id: "pfote", label: "Pfote", mark: "●" },
  { id: "buch", label: "Buch", mark: "▱" },
  { id: "initiale", label: "Initiale", mark: "A" },
  { id: "lineart", label: "Line-Art", mark: "◎" },
];

const products = [
  {
    id: "weihnachtskugeln",
    category: "Weihnachten",
    badge: "Saisonfavorit",
    name: "Gravierte Weihnachtskugeln",
    shortName: "Weihnachtskugeln",
    price: 7.9,
    delivery: "4-7 Werktage",
    material: "Glas oder Holz",
    size: "ca. 8 cm",
    previewClass: "circle",
    lead:
      "Personalisierte Weihnachtskugeln mit Name, Kurztext und gewähltem Motiv. Ideal als kleines Geschenk oder für den eigenen Baum.",
    personalization: "Name, Jahr, Herz, Sterne oder Wunschmotiv",
    finishLabel: "Farbe / Form",
    finishes: [
      { id: "rot", label: "Rot glänzend", hex: "#a8323b", edge: "#681722" },
      { id: "gold", label: "Gold matt", hex: "#d6b26f", edge: "#8a642d" },
      { id: "blau", label: "Nachtblau", hex: "#243f6e", edge: "#142642" },
      { id: "holz", label: "Holz natur", hex: "#d9b982", edge: "#8a6435" },
    ],
    photos: [
      {
        id: "wrapped",
        src: "/products/christmas-baubles-wrapped.jpeg",
        alt: "Rote personalisierte Weihnachtskugeln mit Schleife",
      },
      {
        id: "set",
        src: "/products/christmas-baubles-color-set.jpeg",
        alt: "Set gravierter Weihnachtskugeln in mehreren Farben",
      },
    ],
  },
  {
    id: "lesezeichen",
    category: "Lesen",
    badge: "Mit Quaste",
    name: "Holz-Lesezeichen",
    shortName: "Lesezeichen",
    price: 9.9,
    delivery: "3-6 Werktage",
    material: "Birkensperrholz",
    size: "ca. 15 x 4 cm",
    previewClass: "bookmark",
    lead:
      "Leichtes Holz-Lesezeichen mit Gravur und farbiger Quaste. Name und Motiv werden passend zur Form gesetzt.",
    personalization: "Name, kurzer Spruch oder Lesemotiv",
    finishLabel: "Quaste",
    finishes: [
      { id: "orange", label: "Orange", hex: "#e59a2f", edge: "#a96513" },
      { id: "violett", label: "Violett", hex: "#5c3c98", edge: "#362260" },
      { id: "natur", label: "Naturband", hex: "#c7a577", edge: "#80623f" },
    ],
    photos: [
      {
        id: "name",
        src: "/products/wood-bookmark-name.jpeg",
        alt: "Holz-Lesezeichen mit Namensgravur und gelber Quaste",
      },
      {
        id: "page",
        src: "/products/wood-bookmark-page.jpeg",
        alt: "Holz-Lesezeichen mit graviertem Lesespruch",
      },
    ],
  },
  {
    id: "anhaenger",
    category: "Schlüssel",
    badge: "Motivserie",
    name: "Holz-Anhänger",
    shortName: "Anhänger",
    price: 8.9,
    delivery: "3-6 Werktage",
    material: "Rundes Holzplättchen",
    size: "ca. 5 cm",
    previewClass: "pendant",
    lead:
      "Runder Holz-Anhänger mit feiner Motivgravur. Auf Wunsch mit kurzem Namen auf der Rückseite oder als schlichte Motivserie.",
    personalization: "Name, Initiale oder Symbol",
    finishLabel: "Motivwelt",
    finishes: [
      { id: "zodiac", label: "Sternzeichen", hex: "#d8bd8b", edge: "#8d6a37" },
      { id: "classic", label: "Klassisch", hex: "#cfa66d", edge: "#805a2f" },
      { id: "minimal", label: "Minimal", hex: "#eee1c6", edge: "#9a7a50" },
    ],
    photos: [
      {
        id: "zodiac",
        src: "/products/wood-pendants-zodiac.jpeg",
        alt: "Mehrere runde Holz-Anhänger mit gravierten Motiven",
      },
      {
        id: "detail",
        src: "/products/wood-pendant-detail.jpeg",
        alt: "Detailaufnahme eines runden Holz-Anhängers mit Gravur",
      },
    ],
  },
  {
    id: "flaschenoeffner",
    category: "Geschenke",
    badge: "Holzgriff",
    name: "Holz-Flaschenöffner",
    shortName: "Flaschenöffner",
    price: 14.9,
    delivery: "4-7 Werktage",
    material: "Holzgriff & Metallkopf",
    size: "ca. 14 cm",
    previewClass: "opener",
    lead:
      "Stabiler Flaschenöffner mit Holzgriff und persönlicher Gravur. Ein praktisches Geschenk für Feiern, Küche und Grillabende.",
    personalization: "Name oder kurzer Titel",
    finishLabel: "Gravurstil",
    finishes: [
      { id: "script", label: "Schreibschrift", hex: "#bf8f56", edge: "#76512c" },
      { id: "bold", label: "Kräftig", hex: "#c8a06f", edge: "#7d5632" },
      { id: "classic", label: "Klassisch", hex: "#d4b785", edge: "#8a673b" },
    ],
    photos: [
      {
        id: "single",
        src: "/products/wood-opener.jpeg",
        alt: "Holz-Flaschenöffner mit graviertem Namen",
      },
      {
        id: "set",
        src: "/products/wood-opener-pen-set.jpeg",
        alt: "Holz-Flaschenöffner und Holz-Kugelschreiber mit Gravur",
      },
    ],
  },
  {
    id: "kugelschreiber",
    category: "Schreiben",
    badge: "Bambusoptik",
    name: "Holz-Kugelschreiber",
    shortName: "Kugelschreiber",
    price: 11.9,
    delivery: "3-6 Werktage",
    material: "Holz & Metall",
    size: "ca. 14 cm",
    previewClass: "pen",
    lead:
      "Eleganter Kugelschreiber aus Holz mit Namensgravur. Passt als kleines Dankeschön, Firmenpräsent oder persönliches Set.",
    personalization: "Name oder kurzer Gruß",
    finishLabel: "Clipfarbe",
    finishes: [
      { id: "silber", label: "Silber", hex: "#d4d8da", edge: "#858c90" },
      { id: "chrom", label: "Chrom", hex: "#b9c0c2", edge: "#6b7275" },
      { id: "natur", label: "Natur", hex: "#d7b679", edge: "#8b6332" },
    ],
    photos: [
      {
        id: "single",
        src: "/products/wood-pen.jpeg",
        alt: "Holz-Kugelschreiber mit graviertem Namen",
      },
      {
        id: "set",
        src: "/products/wood-opener-pen-set.jpeg",
        alt: "Set aus Holz-Kugelschreiber und Flaschenöffner",
      },
    ],
  },
];

type CartItem = {
  id: number;
  productName: string;
  customText: string;
  finish: string;
  logo: string;
  quantity: number;
  price: number;
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

function getProduct(productId: string) {
  return products.find((product) => product.id === productId) ?? products[0];
}

export default function Home() {
  const [selectedProductId, setSelectedProductId] = useState(products[0].id);
  const [selectedPhotoId, setSelectedPhotoId] = useState(products[0].photos[0].id);
  const [selectedFinishId, setSelectedFinishId] = useState(products[0].finishes[0].id);
  const [customText, setCustomText] = useState("Mila");
  const [selectedLogoId, setSelectedLogoId] = useState(logoOptions[0].id);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const selectedProduct = getProduct(selectedProductId);
  const selectedPhoto =
    selectedProduct.photos.find((photo) => photo.id === selectedPhotoId) ??
    selectedProduct.photos[0];
  const selectedFinish =
    selectedProduct.finishes.find((finish) => finish.id === selectedFinishId) ??
    selectedProduct.finishes[0];
  const selectedLogo =
    logoOptions.find((logo) => logo.id === selectedLogoId) ?? logoOptions[0];
  const previewText = customText.trim() || "Name";
  const previewNameSize =
    previewText.length > 10 ? "0.9rem" : previewText.length > 7 ? "1.04rem" : "1.18rem";

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  );

  function selectProduct(productId: string) {
    const nextProduct = getProduct(productId);
    setSelectedProductId(nextProduct.id);
    setSelectedPhotoId(nextProduct.photos[0].id);
    setSelectedFinishId(nextProduct.finishes[0].id);
  }

  function addToCart(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCartItems((items) => [
      ...items,
      {
        id: Date.now(),
        productName: selectedProduct.shortName,
        customText: previewText,
        finish: selectedFinish.label,
        logo: selectedLogo.label,
        quantity,
        price: selectedProduct.price,
      },
    ]);
  }

  return (
    <div className="shop-shell">
      <div className="top-notice">
        Personalisierte Gravurgeschenke - deutsche Shopoberfläche, Produkttexte und
        Zahlarten werden im nächsten Schritt finalisiert.
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
          <a href="#produkt">Konfigurator</a>
          <a href="#sortiment">Sortiment</a>
          <a href="#details">Details</a>
          <a href="#agb">AGB</a>
        </nav>
        <a className="header-cart" href="#warenkorb">
          Warenkorb {cartItems.length > 0 ? `(${cartItems.length})` : ""}
        </a>
      </header>

      <main>
        <section className="product-section" id="produkt" aria-labelledby="product-title">
          <div className="gallery-column">
            <div className="product-photo-frame">
              <img src={selectedPhoto.src} alt={selectedPhoto.alt} />
            </div>
            <div className="thumb-row" aria-label="Produktansichten">
              {selectedProduct.photos.map((photo) => (
                <button
                  className={`thumb-button ${selectedPhoto.id === photo.id ? "active" : ""}`}
                  key={photo.id}
                  type="button"
                  aria-pressed={selectedPhoto.id === photo.id}
                  onClick={() => setSelectedPhotoId(photo.id)}
                >
                  <img src={photo.src} alt="" aria-hidden="true" />
                  <span>{photo.id === selectedProduct.photos[0].id ? "Hauptfoto" : "Detail"}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="purchase-panel">
            <p className="breadcrumbs">Startseite / Personalisierte Gravurgeschenke</p>
            <div className="product-switcher" aria-label="Produkt auswählen">
              {products.map((product) => (
                <button
                  className={selectedProduct.id === product.id ? "selected" : ""}
                  key={product.id}
                  type="button"
                  aria-pressed={selectedProduct.id === product.id}
                  onClick={() => selectProduct(product.id)}
                >
                  {product.shortName}
                </button>
              ))}
            </div>

            <p className="product-badge">{selectedProduct.badge}</p>
            <h1 id="product-title">{selectedProduct.name}</h1>
            <p className="product-lead">{selectedProduct.lead}</p>

            <div className="purchase-meta">
              <span>{selectedProduct.delivery}</span>
              <span>{selectedProduct.material}</span>
              <span>{selectedProduct.size}</span>
              <span>Text bis {TEXT_LIMIT} Zeichen</span>
            </div>

            <div className="price-row">
              <span className="price">{formatPrice(selectedProduct.price)}</span>
              <span className="tax-note">inkl. MwSt., zzgl. Versand</span>
            </div>

            <form className="configurator" onSubmit={addToCart}>
              <label className="field-group" htmlFor="custom-text">
                <span>Name oder kurzer Text</span>
                <input
                  id="custom-text"
                  maxLength={TEXT_LIMIT}
                  value={customText}
                  onChange={(event) => setCustomText(event.target.value.slice(0, TEXT_LIMIT))}
                  placeholder="z. B. Emilia"
                />
              </label>

              <div className="field-group">
                <span>{selectedProduct.finishLabel}</span>
                <div className="color-grid" role="radiogroup" aria-label={selectedProduct.finishLabel}>
                  {selectedProduct.finishes.map((finish) => (
                    <button
                      className={`color-option ${
                        selectedFinish.id === finish.id ? "selected" : ""
                      }`}
                      key={finish.id}
                      type="button"
                      aria-pressed={selectedFinish.id === finish.id}
                      onClick={() => setSelectedFinishId(finish.id)}
                    >
                      <span
                        className="swatch"
                        style={
                          {
                            "--swatch": finish.hex,
                            "--swatch-edge": finish.edge,
                          } as CSSProperties
                        }
                      />
                      <span>{finish.label}</span>
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

              <div className="preview-row" aria-label="Gravurvorschau">
                <div className={`engraving-card ${selectedProduct.previewClass}`}>
                  <span className="preview-logo">{selectedLogo.mark}</span>
                  <span className="preview-name" style={{ fontSize: previewNameSize }}>
                    {previewText}
                  </span>
                </div>
                <div>
                  <strong>{selectedProduct.personalization}</strong>
                  <span>{selectedFinish.label} / {selectedLogo.label}</span>
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
                      <strong>{item.productName}</strong>
                      <span>
                        {item.customText} / {item.logo}
                      </span>
                      <span>{item.finish}</span>
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
            <strong>Kurze Personalisierung</strong>
            <span>Bis 12 Zeichen für saubere Gravurflächen.</span>
          </div>
          <div>
            <strong>Ausgewählte Motive</strong>
            <span>Logo-Auswahl pro Geschenk kombinierbar.</span>
          </div>
          <div>
            <strong>Mehrere Produktlinien</strong>
            <span>Weihnachten, Lesen, Schlüssel und Holzschreibwaren.</span>
          </div>
        </section>

        <section className="products-section" id="sortiment" aria-labelledby="sortiment-title">
          <div className="section-heading">
            <p className="section-kicker">Sortiment</p>
            <h2 id="sortiment-title">Personalisierbare Produkte</h2>
          </div>
          <div className="product-card-grid">
            {products.map((product) => (
              <article
                className={`product-card ${selectedProduct.id === product.id ? "selected" : ""}`}
                key={product.id}
              >
                <img src={product.photos[0].src} alt={product.photos[0].alt} />
                <div>
                  <p className="section-kicker">{product.category}</p>
                  <h3>{product.name}</h3>
                  <p>{product.personalization}</p>
                </div>
                <div className="card-bottom">
                  <strong>{formatPrice(product.price)}</strong>
                  <button type="button" onClick={() => selectProduct(product.id)}>
                    Auswählen
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="details-section" id="details" aria-labelledby="details-title">
          <div className="section-heading">
            <p className="section-kicker">Produktdetails</p>
            <h2 id="details-title">Vorbereitet für den Verkauf</h2>
          </div>
          <div className="detail-columns">
            <article>
              <h3>Personalisierung</h3>
              <p>
                Jedes Produkt nutzt denselben Bestellfluss: Text eingeben, Motiv wählen,
                Ausführung auswählen und in den Warenkorb legen.
              </p>
            </article>
            <article>
              <h3>Produktdaten</h3>
              <p>
                Preise, Maße und Materialien sind als Produktdaten angelegt und können
                später direkt pro Artikel finalisiert werden.
              </p>
            </article>
            <article>
              <h3>Bestellung</h3>
              <p>
                Der Checkout bleibt vorbereitet, bis Zahlungsarten, Versandkosten und
                rechtliche Pflichtangaben final feststehen.
              </p>
            </article>
          </div>
        </section>

        <section className="terms-section" id="agb" aria-labelledby="agb-title">
          <div className="section-heading">
            <p className="section-kicker">AGB</p>
            <h2 id="agb-title">Allgemeine Geschäftsbedingungen</h2>
          </div>
          <div className="terms-grid">
            <article>
              <h3>1. Geltungsbereich</h3>
              <p>
                Diese Bedingungen gelten für Bestellungen im Online-Shop Feine Gravur.
                Abweichende Regelungen gelten nur, wenn sie schriftlich bestätigt wurden.
              </p>
            </article>
            <article>
              <h3>2. Bestellung</h3>
              <p>
                Kundinnen und Kunden wählen Produkt, Menge und Personalisierung aus.
                Vor dem Absenden können Eingaben geprüft und korrigiert werden.
              </p>
            </article>
            <article>
              <h3>3. Personalisierte Waren</h3>
              <p>
                Gravierte Artikel werden nach Kundenvorgabe gefertigt. Schreibfehler in
                übermittelten Texten werden nur korrigiert, wenn sie vor Produktionsbeginn
                gemeldet werden.
              </p>
            </article>
            <article>
              <h3>4. Preise und Zahlung</h3>
              <p>
                Alle Preise verstehen sich inklusive gesetzlicher Umsatzsteuer zuzüglich
                Versandkosten. Die verfügbaren Zahlungsarten werden im Checkout angezeigt.
              </p>
            </article>
            <article>
              <h3>5. Lieferung</h3>
              <p>
                Die Lieferzeit richtet sich nach Produkt und Auftragslage. Verzögerungen
                durch unklare Personalisierungsangaben können die Fertigung verlängern.
              </p>
            </article>
            <article>
              <h3>6. Gewährleistung</h3>
              <p>
                Es gelten die gesetzlichen Gewährleistungsrechte. Bei Transportschäden
                oder Produktionsfehlern bitten wir um eine zeitnahe Nachricht mit Foto.
              </p>
            </article>
          </div>
          <p className="terms-note">
            Mustertext für den Prototyp. Firmenangaben, Widerrufsbelehrung,
            Datenschutz, Versand und Zahlungsarten sollten vor Veröffentlichung rechtlich
            geprüft und ergänzt werden.
          </p>
        </section>
      </main>

      <footer className="shop-footer" id="kontakt">
        <div>
          <strong>Feine Gravur</strong>
          <span>Demo-Shop für personalisierte Gravurgeschenke</span>
        </div>
        <div className="footer-links">
          <a href="#produkt">Konfigurator</a>
          <a href="#sortiment">Sortiment</a>
          <a href="#agb">AGB</a>
          <a href="mailto:hallo@example.de">hallo@example.de</a>
        </div>
      </footer>
    </div>
  );
}
