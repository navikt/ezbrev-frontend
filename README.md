# ezbrev-frontend

EzBrev er en tjeneste som lar deg inspisere brevmaler. Dette er frontenden
til denne tjenesten. Backend finner du på
[ezbrev-backend](https://github.com/navikt/ezbrev-backend)

Frontenden består av en react-basert SPA som hostes av en nginx-server i
en docker-container. Den er hostet i dev-fss-clusteret. Dette prosjektet er
foreløpig ikke driftsatt i noe produksjonsmiljø, og er kun ment for
internt bruk.

Den eneste instansen som kjører nå finner du på [https://ezbrev-frontend.dev.intern.nav.no/#/](https://ezbrev-frontend.dev.intern.nav.no/#/)

# Lokal utvikling

Du må ha `node` installert for å kjøre dette prosjektet lokalt.

## Oppsett

Installer avhengigheter ved å kjøre `npm ci -q`.

Start utviklingsserveren ved å kjøre `npm start`. Dette kjører frontenden lokalt
på maskinen din, mens backenden er ezbrev-backend i q4. Dette vil også
starte `test:watch` og `lint:watch`, som kjører alle tester og linter
koden din ved hver rekompilering. Når serveren er klar åpnes `http://localhost:3000`
i nettleseren din. Webpack/react-refresh gjør at tilstand beholdes
når kildefiler lastes på nytt. Dev-serveren vil vanligvis automatisk
gjenopprette seg selv ved eventuelle kompileringsfeil.

## Mer informasjon om linting

For å kun kjøre lint, bruk `npm run lint`. Du kan manuelt formatere filer med
prettier ved å kjøre `npm run lint -- --fix`, eller du kan installere et prettier-plugin i
din favoritteditor.

## Tester

ezbrev-frontend har foreløpig ingen tester

## Henvendelser

Lag en issue i repository.

## Hva er grunnen til at dette repoet ikke er Public?

1. Appen er brukt til intern testing i Nav og er sannsynligvis lite interessant for publikum
2. Appen er under aktiv avvikling og skal skrus av/slettes i 2026

### For Nav-ansatte

Spørsmål om appen kan stilles på [#team_dokumentløsninger](https://nav-it.slack.com/archives/C6W9E5GPJ)
