const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");e.disabled=!0;let d=null;function r(t,e){e?t.setAttribute("disabled",""):t.removeAttribute("disabled")}t.addEventListener("click",(()=>{d=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),r(t,!0),r(e,!1)})),e.addEventListener("click",(()=>{clearInterval(d),r(t,!1),r(e,!0)}));
//# sourceMappingURL=01-color-switcher.1b9fc103.js.map
