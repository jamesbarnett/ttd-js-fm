var m=Object.defineProperty;var h=(e,r,t)=>r in e?m(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t;var u=(e,r,t)=>h(e,typeof r!="symbol"?r+"":r,t);(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function t(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(o){if(o.ep)return;o.ep=!0;const a=t(o);fetch(o.href,a)}})();const p=["daily","weekly","monthly"],g=new Map([["daily","Yesterday"],["weekly","Last Week"],["monthly","Last Month"]]);class w{constructor(r){u(this,"find",function(r){return this.categories.find(t=>t.title===r)});this.categories=r}}function v(e){return e.toLowerCase().replace(" ","-")}function f(e){document.getElementById(e).classList.add("active"),document.querySelectorAll(`p[data-breakdown-type=${e}]`).forEach(t=>{t.style.display="block"}),p.filter(t=>t!==e).forEach(t=>{document.querySelectorAll(`p[data-breakdown-type=${t}]`).forEach(n=>{n.style.display="none"}),document.getElementById(t).classList.remove("active")})}const b=document.querySelectorAll("nav > ul > li > a");b.forEach(e=>{e.onclick=()=>(f(`${e.innerText.toLowerCase()}`),!1)});function E(){const e=new Headers;e.append("Content-Type","application/json");const r=new RegExp("localhost");let t="/ttd-js-fm/data.json";r.test(window.location)&&(t="public/data.json"),fetch(t,{headers:e}).then(n=>{if(!n.ok){console.log(`Failed to load ${t}`);return}return n.json()}).then(n=>(console.log(`Did we get anything? ${n||"no"}`),new w(n))).then(n=>{const o=["Work","Play","Study","Exercise","Social","Self Care"];new Map(o.map(c=>[v(c),n.find(c)])).forEach((c,y,L)=>{const d=document.querySelector(`[data-category="${y}"]`).querySelector(".category-wrapper");d.querySelector("h2"),p.forEach(s=>{const i=document.createElement("p"),l=document.createElement("p");i.setAttribute("data-breakdown-type",s),l.setAttribute("data-breakdown-type",s),i.setAttribute("data-period","current"),l.setAttribute("data-period","previous"),i.innerText=`${c.timeframes[s].current}hrs`,l.innerText=`${g.get(s)} - ${c.timeframes[s].previous}hrs`,d.appendChild(i),d.appendChild(l)})}),f("weekly")})}E();
