import{a as v,S,i as y}from"./assets/vendor-b0d10f48.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&t(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const M="44780398-b9dbe1b89370a8f5261d05d93",q="https://pixabay.com/api/";let u=1,p="";async function h(n){try{n!==p&&(u=1,p=n);const o=await v.get(q,{params:{key:M,q:n,page:u,per_page:15}});return u+=1,o.data}catch(o){throw console.error("Error fetching images:",o),o}}const x=document.querySelector(".card-container"),b=document.querySelector(".load-more-button");function m(n){const o=n.map(t=>`
      <div class="card">
        <div class="card-img-top">
          <a href="${t.largeImageURL}">
            <img src="${t.webformatURL}" alt="${t.tags}">
          </a>
        </div>
        <div class="card-body">
          <h2 class="card-title visually-hidden">${t.tags}</h2>
          <p class="card-text">Likes: ${t.likes}</p>
          <p class="card-text">Views: ${t.views}</p>
          <p class="card-text">Comments: ${t.comments}</p>
          <p class="card-text">Downloads: ${t.downloads}</p>
        </div>
      </div>
    `).join("");x.innerHTML+=o,new S(".card-img-top a",{captions:!0,captionsData:"alt"}).refresh(),w()}function E(){y.info({backgroundColor:"red",position:"topRight",title:"Info",message:"Sorry, there are no images matching your search query. Please try again!"}),i()}function g(){console.error("Error fetching images"),y.error({title:"Error",message:"Sorry, there was an error fetching images. Please try again later."}),i()}function i(){b.style.display="none"}function w(){b.style.display="block"}function C(){y.info({backgroundColor:"green",position:"topRight",title:"Info",message:"We're sorry, but you've reached the end of search results."}),i()}document.addEventListener("DOMContentLoaded",()=>{const n=document.querySelector(".search-form"),o=document.querySelector(".load-more-button"),s=document.querySelector(".loader"),t=document.querySelector(".card-container");s.style.display="none",o.style.display="none";let e=1,r="",a;n.addEventListener("submit",L);async function L(c){c.preventDefault(),a=c.currentTarget;const l=a.elements.query.value.trim().toLowerCase();if(l){s.style.display="inline-block",t.innerHTML="";try{const d=await h(l);s.style.display="none",d.hits.length===0?(E(),i()):(m(d.hits),w(),e=1,r=l,f())}catch{s.style.display="none",g()}finally{a.reset()}}}o.addEventListener("click",async()=>{s.style.display="inline-block";try{const c=await h(r);s.style.display="none",c.hits.length===0?(C(),i()):(m(c.hits),e+=1,f())}catch{s.style.display="none",g()}finally{a.reset()}});function f(){const c=t.querySelector(".card").getBoundingClientRect().height;window.scrollBy({top:c*2,behavior:"smooth"})}});
//# sourceMappingURL=commonHelpers.js.map
