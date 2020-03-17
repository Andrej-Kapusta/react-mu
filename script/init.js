import "babel-polyfill"

window.blox = loadJson("configuration")
window.blox.initialTailorTree = loadJson("initialTailorTree")

__webpack_public_path__ = window.blox.publicAssetsPrefix + "/dist/"

window.__forceSmoothScrollPolyfill__ = true

window.onerror = RSoD
window.RSoD = RSoD

try{
  import("./core/proto").then(module => {
    module.start()
  }).catch(RSoD)
} catch (e) {
  RSoD(e)
}

function loadJson(elementId) {
  const el = document.getElementById(elementId)
  const content = el.innerText
  try {
    return JSON.parse(content)
  } catch (e) {
    console.error(e)
  }
}

function RSoD(e) {
  console.error(e)
  var mainScreen = document.querySelector("#FlatCircle")
  var deathScreen = document.querySelector("#deathScreen")
  var deathScreenMessageElement = document.querySelector("#deathScreen > .message")
  
  deathScreen.onclick = function() {
    deathScreen.classList.add("faded")
    mainScreen.classList.remove("blurred")
  }
  
  deathScreenMessageElement.innerText = e
  deathScreen.classList.remove("faded")
  mainScreen.classList.add("blurred")
}

// NodeList.forEach polyfill for Edge
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
          callback.call(thisArg, this[i], i, this);
      }
  };
}