if (window.blox.releaseType !== "devel") {

    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:989442,hjsv:6};
        a=o.getElementsByTagName("head")[0];
        r=o.createElement("script");r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,"https://static.hotjar.com/c/hotjar-",".js?sv=");

    (function(window, document, url){
        window.dataLayer = window.dataLayer || []
        const script = document.createElement("script")
        script.async = 1
        script.onload = function () {
            window.gtag = function () {
                dataLayer.push(arguments)
            }
            gtag("js", new Date())
            gtag("config", "UA-112044462-1")
            gtag("config", "AW-799321021")
        };
        script.src = url
        document.head.appendChild(script);
    })(window, document, "https://www.googletagmanager.com/gtag/js?id=UA-112044462-1");
    

} else {
    window.gtag = (...args) => {
        console.log("Trackovanie je v devel móde vypnuté.", `gtag(${JSON.stringify(args)})`)
    }
}