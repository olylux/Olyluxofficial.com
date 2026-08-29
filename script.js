const products=[
{id:1,name:"Signature Oversized Tee",category:"tops",price:55,image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",meta:"Heavyweight cotton · Black",badge:"NEW"},
{id:2,name:"OLYLUX Essential Hoodie",category:"tops",price:95,image:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80",meta:"Premium fleece · Charcoal",badge:"BEST SELLER"},
{id:3,name:"Signature Overshirt",category:"outerwear",price:135,image:"https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=80",meta:"Structured cotton · Stone",badge:"NEW"},
{id:4,name:"Tailored Wide Trousers",category:"bottoms",price:120,image:"https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80",meta:"Relaxed fit · Black"},
{id:5,name:"LUX Track Jacket",category:"outerwear",price:145,image:"https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80",meta:"Technical fabric · Black"},
{id:6,name:"Essential Rib Tank",category:"tops",price:45,image:"https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=80",meta:"Soft rib · White"},
{id:7,name:"Relaxed Cargo Pant",category:"bottoms",price:110,image:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",meta:"Utility fit · Olive"},
{id:8,name:"Signature Wool Coat",category:"outerwear",price:240,image:"https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=900&q=80",meta:"Wool blend · Camel",badge:"LIMITED"}];
let cart=JSON.parse(localStorage.getItem("olyluxCart")||"[]");

function card(p){return `<article class="product-card"><div class="product-image">${p.badge?`<span class="badge">${p.badge}</span>`:""}<img src="${p.image}" alt="${p.name}" loading="lazy"><button class="quick" onclick="addToCart(${p.id})">ADD TO BAG</button></div><div class="product-info"><div><div class="product-name">${p.name}</div><div class="product-meta">${p.meta}</div></div><div class="price">£${p.price.toFixed(2)}</div></div></article>`}
function render(list=products){document.getElementById("allProducts").innerHTML=list.map(card).join("");document.getElementById("newProducts").innerHTML=products.slice(0,4).map(card).join("")}
function filterProducts(cat,btn){document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));btn.classList.add("active");render(cat==="all"?products:products.filter(p=>p.category===cat));document.getElementById("shop").scrollIntoView({behavior:"smooth"})}
function addToCart(id){const p=products.find(x=>x.id===id);const item=cart.find(x=>x.id===id);item?item.qty++:cart.push({...p,qty:1});saveCart();showToast(`${p.name} added to bag`);openCart()}
function saveCart(){localStorage.setItem("olyluxCart",JSON.stringify(cart));document.getElementById("cartCount").textContent=cart.reduce((a,x)=>a+x.qty,0);renderCart()}
function renderCart(){const box=document.getElementById("cartItems");if(!cart.length){box.innerHTML="<p style='padding:30px 0;color:#777'>Your bag is empty.</p>"}else box.innerHTML=cart.map(x=>`<div class="cart-item"><img src="${x.image}" alt=""><div><h4>${x.name}</h4><p>£${x.price.toFixed(2)} · Qty ${x.qty}</p></div><button class="remove" onclick="removeItem(${x.id})">Remove</button></div>`).join("");document.getElementById("cartTotal").textContent="£"+cart.reduce((a,x)=>a+x.price*x.qty,0).toFixed(2)}
function removeItem(id){cart=cart.filter(x=>x.id!==id);saveCart()}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("overlay").classList.add("open")}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("overlay").classList.remove("open")}
function toggleSearch(){document.getElementById("searchPanel").classList.toggle("open");if(document.getElementById("searchPanel").classList.contains("open"))document.getElementById("searchInput").focus()}
function searchProducts(){const q=document.getElementById("searchInput").value.toLowerCase();const r=products.filter(p=>(p.name+" "+p.meta).toLowerCase().includes(q));document.getElementById("searchResults").innerHTML=q?r.map(p=>`<div class="search-result"><a href="#shop" onclick="addToCart(${p.id})">${p.name} — £${p.price}</a></div>`).join(""):""}
function toggleMenu(){document.getElementById("mobileMenu").classList.toggle("open")}
function showToast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove("show"),2200)}
function subscribe(e){e.preventDefault();showToast("You're on the OLYLUX list.");e.target.reset()}
function checkout(){if(!cart.length)return showToast("Your bag is empty");showToast("Checkout is ready for payment integration.");}
render();saveCart();
