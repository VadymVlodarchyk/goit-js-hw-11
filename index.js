import{i,S as f}from"./assets/vendor-5ObWk2rO.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();function m(e){const o=`https://pixabay.com/api/?key=48269176-9eacf4bd75a8a580043143bd0&q=${e}&image_type=photo&orientation=horizontal&safesearch=true`;return fetch(o).then(s=>{if(!s.ok)throw new Error(`HTTP error! status: ${s.status}`);return s.json()}).catch(s=>{throw new Error(`Something went wrong: ${s.message}`)})}function d(e){return`
        <li class="gallery-item">
            <a href="${e.largeImageURL}">
                <img src="${e.webformatURL}" alt="${e.tags}" class="gallery-item-image">
                <div class="info">
                    <p class="info-title">Likes:<span class="info-value">${e.likes}</span></p>
                    <p class="info-title">Views:<span class="info-value">${e.views}</span></p>
                    <p class="info-title">Comments:<span class="info-value">${e.comments}</span></p>
                    <p class="info-title">Downloads:<span class="info-value">${e.downloads}</span></p>
                </div>
            </a>
        </li>
    `}function p(e){return e.map(d).join("")}const g=document.querySelector(".search-form"),l=document.querySelector(".gallery"),c=document.querySelector(".loader");u();function h(e){e.preventDefault();const n=e.target.elements.searchQuery.value.trim();if(!n){i.info({title:"No data",message:"Please enter a search query"});return}l.innerHTML="",y(),m(n).then(o=>{const s=p(o.hits);if(!o.hits.length){i.error({title:"No result",message:"Sorry, there are no images matching your search query. Please try again!"});return}l.insertAdjacentHTML("beforeend",s),new f(".gallery a").refresh()}).catch(o=>{i.warning({title:"Error",message:`Something went wrong. ${o.message}`})}).finally(()=>{e.target.reset(),u()})}g.addEventListener("submit",h);function y(){c.style.display="block"}function u(){c.style.display="none"}
//# sourceMappingURL=index.js.map
