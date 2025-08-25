# REST API 
Detta repository innehåller kod för ett enklare REST API byggt med Express. APIet är byggt för att hantera användare som registrerar sig och loggar in på en sida. Man skapar skyddade routes med hjälp av JWT tokens. Sedan finns det även en tabell med flaggor och dess färger.
Grundläggande funktionalitet för CRUD (Create, Read, Update, Delete) är implementerad. Detta API innehåller routes för GET och POST. Denna READme-fil är anpassad från exemplet: https://github.com/MallarMiun/Exempel_README_till_API/. 


## Installation, databas
APIet använder en MySQL-databas.
Klona ner källkodsfilerna, kör kommando npm install för att installera nödvändiga npm-paket. Kör installations-skriptet install.js. 
Installations-skriptet kan skapa databastabell enligt nedanstående, denna kod är bortkommenterad men man kan göra den aktiv om man vill.
|Tabell-namn|Fält  |
|--|--|
|Tabell1  | **id** (int, **fält1** (varchar(35), **fält2** (varchar(35),  **fält3** (varchar(35) |

## Användning
Nedan finns beskrivet hur man når APIet på olika vis:

|Metod  |Ändpunkt     |Beskrivning                                                                           |
|-------|-------------|--------------------------------------------------------------------------------------|

|POST   |/users    |Lagrar en ny arbetslivserfarenhet.      
|GET    |/falgs    |Hämtar alla tillgängliga flaggor.                                      
|POST   |/users    |Lagrar en ny flagga.                                             
                                    

Ett objekt returneras/skickas som JSON med följande struktur:
```
{
    "id": 0,
    "username": "username",
    "password": "password",
    "locaemail": "test.test@test.com"
}
```

