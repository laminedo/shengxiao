# Shengxiao — Chinese Zodiac Readings

A web app that gives a written daily, weekly and monthly reading for your Chinese zodiac sign and birth chart, with read-aloud. It also has a general reading for each of the twelve signs. Built with React, Vite and TypeScript. Everything runs in the browser; birth details are stored on the device only.

Shengxiao (生肖) is the Chinese word for the zodiac.

## Run it on this Mac

```bash
npm install
npm run dev
```

Open http://localhost:5174.

## Open it on an iPhone or iPad

Put the device on the same Wi-Fi as the Mac, then run:

```bash
npm run dev:lan
```

Vite prints a `Network:` address such as `http://192.168.1.20:5174`. Open that address in Safari on the device. To get an app icon, tap Share, then **Add to Home Screen**.

This only works while the Mac is on and the command is running. For a permanent address that works anywhere, build the app and upload the `dist` folder to any static host:

```bash
npm run build
```

Hosting over HTTPS also turns on offline use (`public/sw.js`). The build uses relative paths, so it works at a domain root or in a sub-folder.

## Publish to GitHub Pages

```bash
npm run deploy
```

This builds the app and pushes the result to the `gh-pages` branch of this repository's `origin`, which GitHub Pages serves. The site updates a minute or two later. Source changes still need their own commit and push to `main`.

## How a reading is made

Nothing is generated at run time. The readings are a written library of about 800 passages (25,000 words) in `src/content/`, and the app chooses among them by the Chinese calendar:

- The day's (or month's) element against your own sets the theme: one of ten day-types such as Harvest or Pressure.
- The day's animal against your sign and your day sign adds the notes under "In the balance".
- The two together give the energy score and the four ratings, and decide whether each paragraph takes its hopeful or its careful form.
- A year of readings is composed in order, and each kind of paragraph keeps a running count, so a passage is not reused until its alternatives have had a turn.

The same date always gives the same reading. Weeks are rated against the reader's own usual week, because seven days always contain most of the ten day-types and so differ from each other far less than single days do.

## Checking the readings

```bash
npm run check
```

This writes two years of daily, weekly and monthly readings for all twelve signs and seven birth charts, and fails if any reading is missing a part, has an unfilled marker or a wrong "a/an", or repeats a paragraph within itself. It also reports how soon paragraphs come round again.

```bash
npm run sample
```

prints today's day, week and month readings to the terminal for proofreading.

## Layout by device

| Width | Devices | Layout |
|---|---|---|
| under 900px | iPhone, iPad in portrait | one column, floating tab bar |
| 900px and up | iPad Pro 13" portrait | sidebar, one column |
| about 1100px and up | iPad Pro landscape, MacBook | sidebar, two columns |

## Where things live

- `src/content/` — the written library: `dayLeads`, `dayLoveWork`, `dayMoneyWell` and `dayNotes` for the daily reading, `week`, `month`, `monthAreas` and `year` for the others, `signs` for the twelve portraits
- `src/lib/calendar.ts` — the Chinese calendar for a date, on top of `lunar-typescript`
- `src/lib/subject.ts` — who a reading is for: a birth chart, or a sign in general
- `src/lib/standing.ts` — the score and ratings for any day or month
- `src/lib/pick.ts` — how a passage is chosen without repeating
- `src/lib/day.ts`, `week.ts`, `month.ts` — the three readings
- `src/screens/` — the reading board, the Signs and Me tabs, and the welcome screen
- `src/styles.css` — design tokens and all styling

The app name appears in `index.html`, `public/manifest.webmanifest`, `src/App.tsx` and this file. The icon is drawn by `npm run icons`.
