var y=Object.defineProperty;var m=(r,e,o)=>e in r?y(r,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):r[e]=o;var u=(r,e,o)=>m(r,typeof e!="symbol"?e+"":e,o);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function o(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(t){if(t.ep)return;t.ep=!0;const n=o(t);fetch(t.href,n)}})();const p=["daily","weekly","monthly"],h=new Map([["daily","Yesterday"],["weekly","Last Week"],["monthly","Last Month"]]);class g{constructor(e){u(this,"find",function(e){return this.categories.find(o=>o.title===e)});this.categories=e}}function w(r){return r.toLowerCase().replace(" ","-")}function f(r){document.getElementById(r).classList.add("active"),document.querySelectorAll(`p[data-breakdown-type=${r}]`).forEach(o=>{o.style.display="block"}),p.filter(o=>o!==r).forEach(o=>{document.querySelectorAll(`p[data-breakdown-type=${o}]`).forEach(a=>{a.style.display="none"}),document.getElementById(o).classList.remove("active")})}const v=document.querySelectorAll("nav > ul > li > a");v.forEach(r=>{r.onclick=()=>(f(`${r.innerText.toLowerCase()}`),!1)});function b(){const r=new Headers;r.append("Content-Type","application/json"),fetch("data.json",{headers:r}).then(e=>{if(!e.ok){console.log("Failed to load /data.json");return}return e.json()}).then(e=>(console.log(`Did we get anything? ${e||"no"}`),new g(e))).then(e=>{const o=["Work","Play","Study","Exercise","Social","Self Care"];new Map(o.map(t=>[w(t),e.find(t)])).forEach((t,n,i)=>{const d=document.querySelector(`[data-category="${n}"]`).querySelector(".category-wrapper");d.querySelector("h2"),p.forEach(c=>{const s=document.createElement("p"),l=document.createElement("p");s.setAttribute("data-breakdown-type",c),l.setAttribute("data-breakdown-type",c),s.setAttribute("data-period","current"),l.setAttribute("data-period","previous"),s.innerText=`${t.timeframes[c].current}hrs`,l.innerText=`${h.get(c)} - ${t.timeframes[c].previous}hrs`,d.appendChild(s),d.appendChild(l)})}),f("weekly")})}b();
