import{_ as u}from"./BUGh1S7A.js";import{_}from"./B0PB3Q-L.js";import{B as m,o as n,i as x,q as h,z as g,m as f,j as e,l as v,k as b,C as k,v as s,F as y}from"./B_drZGqy.js";const w={class:"relative mb-16"},B={class:"relative"},D={class:"pr-[26px] aspect-[430/275]"},$={class:"absolute w-full h-full left-0 z-0 top-0 translate-y-[30px] pl-[33px]"},N={class:"flex items-center mb-[11px] gap-2"},z={class:"font-chivo inline-block bg-bg-6 text-green-900 py-[10px] px-[18px] rounded-[50px] text-[14px] leading-[14px]"},A={class:"inline-block text-[14px] leading-[14px]"},C={class:"text-heading-4 font-chivo font-bold inline-block mb-[26px]"},q={__name:"BlogItem",props:{blogPostData:{type:Array,required:!0}},setup(l){const i=m().$strapiBaseUrl,r=a=>{const o={month:"long",day:"numeric",year:"numeric"};return new Date(a).toLocaleDateString("en-GB",o)};return(a,o)=>{const c=u,p=_;return n(!0),x(y,null,h(l.blogPostData,(t,d)=>(n(),g(p,{key:t.id,class:"block group",to:`blog-details/${t.slug}`},{default:f(()=>[e("div",w,[e("div",B,[e("div",D,[v(c,{src:`${b(i)}${t.image.url}`,alt:t.image.alternativeText,width:t.image.width||50,height:t.image.height||50,format:"webp",class:"h-full w-full object-cover rounded-2xl z-10 relative"},null,8,["src","alt","width","height"])]),e("div",$,[e("div",{class:k(`w-full h-full rounded-2xl bg-opacity-50 transition-all duration-200 bg-bg-${d%10+1} group-hover:-translate-x-[10px] group-hover:-translate-y-[10px]`)},null,2)])])]),e("div",N,[e("span",z,s(t.tag),1),e("span",A," 🕛 "+s(r(t.publishedAt)),1)]),e("p",C,s(t.title),1)]),_:2},1032,["to"]))),128)}}};export{q as _};
