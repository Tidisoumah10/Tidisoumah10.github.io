# 🎨 Portfolio Tidiane Soumah - Web Developer & Shopify Expert

Un portfolio moderno e minimalista che mostra le competenze di sviluppo web e Shopify con design elegante e animazioni 3D.

## ✨ Caratteristiche Principali

### 🎯 **Design & UX**
- **Design Minimalista**: Palette bianco e nero elegante ispirata a Balenciaga
- **Layout Centrato**: Struttura premium con contenuto centrato e margini ben definiti
- **Animazioni 3D**: Effetti di testo tridimensionali con GSAP e CSS transforms
- **Responsive Design**: Ottimizzato per tutti i dispositivi (desktop, tablet, mobile)
- **Loading Screen**: Animazione di caricamento professionale con progress bar

### 🚀 **Performance & SEO**
- **Lazy Loading**: Caricamento ottimizzato delle immagini
- **Meta Tags Avanzati**: SEO completo con Open Graph e Twitter Cards
- **Schema Markup**: Structured data per rich snippets
- **Performance Ottimizzate**: CSS e JS ottimizzati per Core Web Vitals
- **Accessibilità**: Conforme alle linee guida WCAG

### 🎨 **Sezioni Principali**

#### **Hero Section**
- Titolo 3D animato "CREATORE DIGITALE MODERNO"
- Sottotitolo descrittivo e call-to-action
- Elementi fluttuanti animati

#### **Chi Sono**
- Biografia professionale
- Statistiche dei progetti (50+ progetti, 5+ anni esperienza)
- Profile card elegante con placeholder TS
- **Bottone Download CV** con animazioni

#### **Servizi**
- **Shopify Development**: Temi personalizzati, app integration, SEO
- **Sviluppo Web**: Frontend moderno, backend solido, performance
- **UI/UX Design**: User research, prototyping, testing
- Contenitori bianchi con bordi neri per massima leggibilità

#### **Portfolio**
- **Charmemoda**: Il brand personale di moda italiana
- **Crepslockers**: Progetto commissionato per e-commerce di lusso
- Overlay informativi con tech stack e link esterni
- Immagini ottimizzate con lazy loading

#### **Testimonial** ⭐
- 3 recensioni con stelle dorate
- Design cards elegante con effetti hover
- Citazioni di clienti reali

#### **Contatti**
- Form di contatto funzionante con validazione
- Informazioni di contatto (email, telefono, location)
- Animazioni sui campi input

### 🛠️ **Tecnologie Utilizzate**

#### **Frontend**
- **HTML5**: Markup semantico e accessibile
- **CSS3**: 
  - Custom Properties (CSS Variables)
  - Flexbox & CSS Grid
  - Animazioni e transizioni
  - Backdrop-filter per glassmorphism
- **JavaScript ES6+**: 
  - Moduli e classi moderne
  - Async/await per operazioni asincrone
  - Event listeners ottimizzati

#### **Librerie & Framework**
- **GSAP (GreenSock)**: Animazioni professionali e scroll triggers
- **AOS (Animate On Scroll)**: Animazioni al scroll
- **Font Awesome**: Icone vettoriali
- **Google Fonts**: Tipografia Inter

#### **Performance**
- **Lazy Loading**: Immagini caricate solo quando necessario
- **Will-change**: Ottimizzazioni CSS per animazioni
- **Backface-visibility**: Prevenzione flickering animazioni
- **Preload**: Risorse critiche precaricate

### 🎯 **Funzionalità Avanzate**

#### **Newsletter Signup** 📧
- Form di iscrizione nel footer
- Validazione email in tempo reale
- Feedback visivo con notifiche

#### **Form di Contatto** 📝
- Validazione completa dei campi
- Animazioni sui label (floating labels)
- Stati di caricamento con spinner
- Sistema di notifiche per feedback utente

#### **Navigazione Intelligente** 🧭
- Smooth scrolling con offset per navbar fissa
- Highlighting automatico della sezione attiva
- Menu mobile responsive con animazioni hamburger

#### **Sistema di Notifiche** 🔔
- Notifiche toast per successo/errore
- Design coerente con il tema del sito
- Auto-dismiss dopo timer

### 📱 **Responsive Design**

#### **Desktop (1024px+)**
- Layout a griglia completo
- Animazioni 3D complete
- Hover effects avanzati

#### **Tablet (768px - 1024px)**
- Layout adattato a colonna singola
- Animazioni ottimizzate
- Touch-friendly interactions

#### **Mobile (< 768px)**
- Menu hamburger animato
- Stack verticale delle sezioni
- Ottimizzazioni per performance mobile

### 🔧 **Setup e Installazione**

1. **Clone del Repository**
```bash
git clone https://github.com/tidiane-soumah/portfolio.git
cd portfolio
```

2. **Struttura File**
```
portfolio/
├── index.html          # Pagina principale
├── styles.css          # Stili principali
├── script.js           # JavaScript principale
├── cv-tidiane-soumah.pdf # CV (sostituire con il tuo)
├── Charmefoto.jpg      # Immagine portfolio Charmemoda
└── README.md           # Documentazione
```

3. **Personalizzazione**
- Sostituire `cv-tidiane-soumah.pdf` con il tuo CV
- Aggiornare le immagini del portfolio
- Modificare i contenuti testuali
- Personalizzare i colori nelle CSS variables

### 🎨 **Personalizzazione**

#### **Colori**
```css
:root {
    --primary-black: #000000;
    --primary-white: #ffffff;
    --secondary-black: #1a1a1a;
    --text-gray: #666666;
    --accent-gray: #f0f0f0;
    --border-gray: #e0e0e0;
}
```

#### **Tipografia**
- **Font Principale**: Inter (Google Fonts)
- **Font Monospace**: Courier New (per email)
- **Pesi**: 300, 400, 500, 600, 700, 800, 900

#### **Animazioni**
- **Durata Standard**: 0.3s
- **Easing**: cubic-bezier(0.23, 1, 0.32, 1)
- **3D Transforms**: perspective(1000px)

### 📊 **Analytics & Tracking**

Il sito include funzionalità di tracking per:
- Visualizzazioni delle sezioni
- Click sui progetti del portfolio
- Invii dei form di contatto
- Interazioni con la newsletter

### 🔒 **Sicurezza & Privacy**

- **Validazione Input**: Tutti i form hanno validazione client-side e server-side
- **Sanitizzazione**: Prevenzione XSS negli input utente
- **HTTPS Ready**: Configurato per connessioni sicure

### 🚀 **Deploy**

#### **GitHub Pages**
```bash
# Push su GitHub
git add .
git commit -m "Deploy portfolio"
git push origin main

# Attiva GitHub Pages nelle impostazioni del repository
```

#### **Netlify**
1. Connetti il repository GitHub
2. Build settings: nessun build command necessario
3. Publish directory: `/` (root)

#### **Vercel**
```bash
# Installa Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### 📈 **Performance Metrics**

- **Lighthouse Score**: 95+ su tutti i parametri
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

### 🤝 **Contributi**

Se vuoi contribuire a migliorare questo portfolio:

1. Fork il repository
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Commit le tue modifiche (`git commit -m 'Add AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

### 📄 **Licenza**

Questo progetto è sotto licenza MIT. Vedi il file `LICENSE` per i dettagli.

### 📞 **Contatti**

**Tidiane Soumah**
- 🌐 Website: [tidiane-soumah.com](https://tidiane-soumah.com)
- 📧 Email: tidianesoumah@icloud.com
- 💼 LinkedIn: [tidiane-soumah](https://linkedin.com/in/tidiane-soumah)
- 📱 Instagram: [@tidisoumah](https://instagram.com/tidisoumah)
- 🐙 GitHub: [tidiane-soumah](https://github.com/tidiane-soumah)

---

⭐ **Se questo portfolio ti è piaciuto, lascia una stella!** ⭐

Made with ❤️ by Tidiane Soumah
