import{a as L,i as p,S as v}from"./assets/vendor-B6jJ9_I0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const q="48300700-8b1bb79d7569725b8d43b2192",y=(o,e)=>{const s={params:{key:q,q:o,page:e,per_page:16,image_type:"photo",orientation:"horizontal",safesearch:!0}};return L.get("https://pixabay.com/api/",s)},f=o=>o.map(({webformatURL:e,largeImageURL:s,tags:c,likes:t,views:r,comments:a,downloads:b})=>`<a href="${s}" class="gallery-item">
          <div class="photo-card">
          <img src="${e}" alt="${c}" loading="lazy" width="360" />
          <div class="photo-info">
          <p class="photo-info-item">Likes<span>${t}</span></p>
	        <p class="photo-info-item">Views<span>${r}</span></p>
	        <p class="photo-info-item">Comments<span>${a}</span></p>
	        <p class="photo-info-item">Downloads<span>${b}</span></p>
  </div>
  </div>
  </a>`).join(""),h=document.querySelector(".form-search"),u=document.querySelector(".js-gallery"),l=document.querySelector(".loader"),n=document.querySelector(".load-more-btn");let i=1,d="",m;l.style.display="none";const w=async o=>{try{if(o.preventDefault(),u.innerHTML="",l.style.display="block",d=o.currentTarget.elements.user_query.value.trim(),d===""){p.warning({title:"Warning",message:"Please enter a search query!"});return}i=1,n.classList.add("is-hidden");const{data:e}=await y(d,i);if(!e.hits.length){p.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});return}const s=f(e.hits);u.insertAdjacentHTML("beforeend",s),m=new v(".gallery-item",{captions:!0,captionsData:"alt",captionDelay:250}),m.refresh(),h.reset(),e.totalHits>1&&(n.classList.remove("is-hidden"),n.addEventListener("click",g))}catch(e){console.log(e)}finally{l.style.display="none"}};h.addEventListener("submit",w);const g=async o=>{l.style.display="block",i++;try{const{data:e}=await y(d,i);l.style.display="none";const s=f(e.hits);u.insertAdjacentHTML("beforeend",s),m.refresh(),i*16>=e.totalHits&&(p.info({title:"Info",message:"We're sorry, but you've reached the end of search results."}),n.classList.add("is-hidden"),n.removeEventListener("click",g)),S()}catch{p.error({title:"Error",message:"Failed to load images. Please try again later."})}},S=()=>{const{height:o}=u.getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"})};
//# sourceMappingURL=index.js.map
