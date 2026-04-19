# 🇪🇺 EU-Lainsäädäntöseuranta

Suomalainen kansalaistyökalu EU-prosessien seuraamiseen ja vaikuttamiseen.

## Ominaisuudet

- 📋 31 valmiiksi koottua EU-prosessia suomeksi
- 🤖 Tekoälyhaku Claudella — hae mitä tahansa aihepiiriä
- 🇫🇮 Suomen virallinen kanta jokaiselle prosessille
- 🗺️ Suomalainen vaikuttamispolku — kuka MEP, milloin toimia
- 🔬 Thinktankien näkemykset (Bruegel, ECFR, CEPS, UPI)
- ⭐ Seurantalista + kalenterivienti (.ics)

## Asennus ja käyttöönotto

### 1. Kloonaa repository

```bash
git clone https://github.com/SINUN-KÄYTTÄJÄNIMI/eu-seuranta.git
cd eu-seuranta
```

### 2. Luo Vercel-projekti

1. Mene osoitteeseen [vercel.com](https://vercel.com) ja kirjaudu GitHubilla
2. Paina "Add New Project"
3. Valitse tämä repository
4. Paina "Deploy"

### 3. Lisää API-avain

Vercel-projektin asetuksissa:
1. **Settings → Environment Variables**
2. Lisää uusi muuttuja:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-api03-...` (oma Anthropic API-avaimesi)
3. Paina Save ja tee uusi deployment

### 4. Valmis!

Sivusto on käytettävissä Vercelin antamassa osoitteessa, esim. `eu-seuranta.vercel.app`.

## Rakenne

```
eu-seuranta/
├── api/
│   └── claude.js          # Vercel API route — piilottaa API-avaimen
├── public/
│   └── index.html         # Frontend
├── package.json
├── vercel.json
└── README.md
```

## Teknologia

- **Frontend:** Vanilla HTML/CSS/JS (ei frameworkkeja)
- **Backend:** Vercel Serverless Functions (Node.js)
- **AI:** Claude Haiku 4.5 (Anthropic)
- **Deployment:** Vercel (ilmainen tier)

## Kustannukset

- Vercel ilmainen tier: riittää hyvin pienelle/keskisuurelle käytölle
- Anthropic API: ~$0.001 per haku (Haiku on erittäin edullinen)
- Arviolta 1000 hakua maksaa noin 1 USD

## Tietolähteet

- [EP Legislative Observatory](https://oeil.secure.europarl.europa.eu)
- [EUR-Lex](https://eur-lex.europa.eu)
- [Have Your Say (EC)](https://ec.europa.eu/info/law/better-regulation/have-your-say)
- [Valtioneuvosto EU-asiat](https://valtioneuvosto.fi/eu-asiat)
- [Eduskunnan EU-seuranta](https://www.eduskunta.fi)

## Lisenssi

MIT — vapaa käyttää, muokata ja jakaa.
