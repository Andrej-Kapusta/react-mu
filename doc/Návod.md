# Použitie designu na projekte

## JAVA prostredie
Potrebné Java triedy (mali by ísť do nejakého JARka asi?):
- ```sk.jumpsoft.utils.TailorTreeToJson```
  - transformuje bloxový tailorTree na JSON s ohľadom na minimalizáciu veľkosti
- ```sk.jumpsoft.incubator.view.TailorTreeDiff```
  - z dvoch tailorTree vyprodukuje sadu rozdielov v JSON Patch formáte
- ```sk.jumpsoft.blox.extension.core.view.tailor.SetHttpHeaderParam```
  - umožuje nastaviť akúkoľvek HTTP hlavičku pre serverovú odpoveď
  
## Blox prostredie
Potrebné Bloxové moduly (mali by ísť do samostatnej libky):
- ```react4```
  - samotný dizajn
- ```zipFolder```
  - pre daný ZIP súbor vygeneruje hierarchiu inštancií z dostupných dizajnových modulov
- ```cmsRoot```
  - klasický ```cmsRoot``` s malou zmenou pri spracovaní ```in/ajax``` v ```getContent```

Do Environment vrstvy treba pridať nasledovné cesty:
- ```env/scope/session/viewState```
  - drží predchádzajúci tailorTree pod daným sessionId (nutnosť pre výpočet sady rozdielov)
- ```env/scope/request/sessionId```
  - identifikátor pre tailorTree – používateľ môže mať otvorených viac okien, t.j. pre každé jedno okno je jeden sessionId (session v zmysle window.sessionStorage, nie v zmysle HTTP session)

V dátovej časti dizajnu sa nachádza ```archive```, ktorý drží vyexportovaný archív (viď. [Export](Export.md)).