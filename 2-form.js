import"./assets/styles-BFJuW-_G.js";import{e as n,i}from"./assets/vendor-C7Q3-Pvy.js";n.init("hQcP3rVr7NWYFyrR0");const l=document.querySelector(".feedback-form"),a=document.querySelector("input"),o=document.querySelector("textarea");let t={email:"",message:""},m={},c=e=>{t[e.target.name]=e.target.value.trim(),localStorage.setItem("feedback-form-state",JSON.stringify(t)),e.target.name==="email"&&(i(e.target.value)?e.target.style.backgroundColor="rgb(225, 225, 225)":e.target.style.backgroundColor="rgb(206, 206, 209)"),e.target.name==="message"&&(e.target.value.trim()!==""?e.target.style.backgroundColor="rgb(225, 225, 225)":e.target.style.backgroundColor="rgb(206, 206, 209)")};a.addEventListener("input",c);o.addEventListener("input",c);if(localStorage.getItem("feedback-form-state")!==null){try{m=JSON.parse(localStorage.getItem("feedback-form-state"))}catch(e){console.error("Error name:",e.name),console.error("Error message:",e.message)}t={...t,...m},a.value=t[a.name]||"",o.value=t[o.name]||""}function s(e){const r=document.querySelector(".toast");r.classList.add("show"),r.textContent=e,setTimeout(()=>r.classList.remove("show"),3e3)}function f(){const e=document.querySelector(".letter-img");l.addEventListener("submit",r=>{r.preventDefault();let{email:g,message:u}=t;if(!i(g)){s("It's not email");return}if(u.trim()===""){s("Wright something");return}n.sendForm("service_scmlcpr","template_7iwitgm",l).then(()=>{s("Message sent successfully!"),e.src="/goit-js-hw-09/img/closed-lttr.png",e.classList.add("letter-animation"),setTimeout(()=>{e.src="/goit-js-hw-09/img/mail_10345769.png",e.classList.remove("letter-animation")},1e3),console.log(t),localStorage.removeItem("feedback-form-state"),Object.keys(t).forEach(d=>t[d]=""),a.value=t[a.name],o.value=t[o.name]}).catch(()=>{console.error("Email sending failed:",error),s("Error sending message.")})})}f();
//# sourceMappingURL=2-form.js.map
