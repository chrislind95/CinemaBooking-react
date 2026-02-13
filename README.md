# Cinema Booking (React)

Detta är ett litet projekt i React där man kan boka biobiljetter, välja platser och administrera filmer via en admin-sida.
Jag använde React tillsammans med Vite för att det kändes enklast att komma igång med och för att sidan ska ladda snabbt. För att kunna byta mellan Home och Admin använde jag React Router. Jag har delat upp koden i components, pages och services för att försöka hålla allt organiserat.

## Loggbok

Dag 1
- Startade projektet med Vite och React.
- Skapade grundstruktur med App.jsx och mapparna components, pages och services.
- Flyttade över all kod från exemplet vi fick.
- Skapade ett REST-API som hanterar filmer och bokningar.

Dag 2
- Lade till state med useState och hämtade filmer från API med useEffect.
- Testade att räkna ut totalpris.

Dag 3
- Lade till bokningsformulär med namn och telefon.
- Implementerade POST-request till bookings.
- Fixade alert och reset av valda platser efter bokning.

Dag 4
- Skapade Admin-sida med AdminForm och AdminList.
- La till funktioner för att lägga till, ändra och ta bort filmer.

Dag 5
- Lade till navigering mellan Home och Admin med React Router.
- Installerade och testade ESLint för kodtips.

Reflektion
- Valde React och Vite för att snabbt komma igång då det var det ramverk vi har gått igenom mest.
- Delade upp i komponenter för bättre struktur.
- State och side-effects hanteras med useState och useEffect.
- Projektet har varit lärorikt, särskilt API, state, routing