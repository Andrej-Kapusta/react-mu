Ako spravne zapojit projekt flatCircle na svoje prostredie
==========================================================

  1. vytvorit na svojom prostredi projekt s nazvom "flatCircle"
  
  2. vytvorit synchronizacny konektor na sync-server:
      - Server Url: http://sync.devel.lan:8080/blox/setup/syncServer3
      - User Key: kluc_daneho_prostredia
      - Current Branch Name: MAIN
  
  3. zinicializovat sa z posledneho commitu
  
  4. je za potreby preniest niektory java extensiony:
      - sk.jumpsoft.incubator.view.TailorTreeDiff
      - sk.jumpsoft.utils.TailorTreeToJson
      - sk.jumpsoft.blox.extension.core.view.tailor.SetHttpHeaderParam
  
  5. je nutne aby generix servlet bol typu cloud:
      - <servlet-class>sk.dandiway.blox_3_2_0.cloud.web.BloxCloudGenerixLocalizeServlet</servlet-class>
      
  6. modlit sa ze vsetko bude fungovat            