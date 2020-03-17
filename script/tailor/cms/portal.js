import React from "react"
import Menu from "tailor/cms/navigation/menu"
import Footer from "./footer/footer"

export default ({urlContext, params, designInfo, children}) => (
  <main className={`${designInfo} container-fluid`}>
    <Menu urlContext={urlContext}>{children}</Menu>
    {children}
    <Footer urlContext={urlContext} />
  </main>
)