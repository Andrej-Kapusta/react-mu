# React dizajn na projekte Sťažovateľ

## Ako vyvíjať

### Naklonovanie repozitára a spustenie
1. `git clone https://github.com/mlajtos/react-mu.git`
2. `cd react-mu`
3. `git checkout stazovatel`
4. `yarn`
5. `yarn start` – spustenie vývojových nástrojov (SASS kompilátor, JS transpilátor, HTTP server, atď.)

### Nastavenie prehliadaču
1. Nainštalovať si [Resource Override](https://chrome.google.com/webstore/detail/resource-override/pkoacgokdfckfpndoffpifphamojphii?hl=en) extension do Chrome
2. Nastaviť si presmerovanie z `http://stazovatel.devel.lan:18080/stazovatel/public/*` na `http://127.0.0.1:8080/*`
3. [Priama editáciu súborov v Chrome](https://developers.google.com/web/tools/setup/setup-workflow)
4. [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)

### Samotný vývoj
Vykonané zmeny treba "commitnúť":
Príkaz `git -am "Všetky zmeny"` zaznamená všetky zmenené súbory a commitne ich so správou "Všetky zmeny".

Lepšie je nasekať zmeny na malé commity, ktorých správa dáva zmysel – teda nie `"Cummulative"`, ale `"Oprava chyby na tlačidle"`, `"Zmena správania pri odoslaní formuláru"`, atď. (Lepšie sa potom hľadajú chyby cez `git blame`.)

Pred odoslaním zmien cez príkaz `git push` je dobrým zvykom prijať zmeny od ostatných cez príkaz `git pull`. Ak sa stalo, že sme upravili obaja ten istý súbor, treba vyriešiť konflikty.

**TIP:** Po príkaze `git pull` treba pustiť `yarn`. (Toto je nutnosť iba ak niekto pridal nový balík do `package.json` cez `yarn add [package]`. V `package.json` sa tá zmena prejaví, avšak iný používateľ ten balíček nemá nainštalovaný, teda si ho musí doinštalovať cez `yarn`.

### Beží to u mňa!!!
1. Vypnúť vývojové nástroje (Webpack)
    - stlačiť ```Ctrl-C```
2. Export do Bloxov
    - ```yarn run publish```
3. Commit zmien v zdrojovom kóde
    - cez `GitHub Desktop`
        1. označenie zmenených súborov v zozname
        2. napísať správu pre commit
        3. stlačiť tlačidlo "Commit to [branch]"
        4. stlačiť tlačidlo "Sync"
    - cez `git`
        1. `git add [súbory]`
        2. `git commit -m "[správa pre commit]"`
        3. (`git pull`)
        4. `git push`
