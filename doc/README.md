# Otázky

## Čo?

View vrstva pre Bloxy postavená na moderných technológiách.

## Ako?

[Návod](Návod.md) ako rozbehať projekt na serverovej strane.

## Prečo?

1. Lepší zážitok z vývoja frontendu vďaka novým/lepším technológiám
    - generovanie HTML cez JSX (React)
    - vždy čerstvý JS vďaka Babelu
    - štýlovanie cez SASS
    - modulárny vývoj (kolokácia templatov, kódu a štýlov)
    - použitie existujúcich balíčkov z NPM 
    - prispôsobiteľný build managment cez Webpack
    - použitie akéhokoľvek editora alebo IDE
2. Lepší zážitok z používania aplikácie
    - Rýchlosť
        - minifikácia a kompresia všetkých assetov (JS, CSS, fonty, obrázky, ...)
        - posielanie len tých assetov, ktoré sú aktuálne potrebné
        - minimalizácia prenosu stavu (cez JSON Patch)
        - zmena len tých častí stránky, ktoré treba zmeniť (React)
    - UX
        - zachovanie DOM-u a life-cycle metódy React komponentov
            - zmena stavu komponentu (po requeste) môže byť animovaná 
            - tu zatiaľ len kĺžeme po povrchu...
        - navigácia v histórií (back/forward)
