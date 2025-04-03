import{C as M,r as d,ai as R,y as j,d as g,i as T,f as U,o as x,u as o,w as a,a as y,b as e,m as H,A as c,t as C,N as J,p as E,a8 as v,af as K,ag as O}from"./index-39WpNFgF.js";import{u as S}from"./userService-Bf1ftV1n.js";import{a as P}from"./avatar-1-X5zaJOKz.js";import{V as Q}from"./VDataTable-DbP4KIuv.js";import{V as B}from"./VAvatar-D4S7umkl.js";import{V as w}from"./VImg-BrcSaYEp.js";import{u as W}from"./useApi-EKiwvOI-.js";import{V as X}from"./VAutocomplete-CruJDCnB.js";import{b as Y}from"./VMenu-6WF26oOh.js";import{V as Z}from"./VDialog-CdldFo2z.js";import{V as F,c as I,a as N,b as k,d as q}from"./VCard-UQ3FD-b2.js";import{V as ee}from"./VForm-CKPwSob3.js";import{V as L,a as _}from"./VRow-mN3hUC-y.js";import{V as b}from"./VTextField-C8RWyIK0.js";import{V as z}from"./VDivider-DJNTwj0J.js";import{V as ae}from"./VSpacer-CVaqY1bm.js";import"./index-t--hEgTQ.js";import"./VSelect-CtEyNVRc.js";import"./index-wN2HsBnT.js";import"./VSlideGroup-D9xWW1f6.js";import"./VTable-nVln_P2V.js";import"./ssrBoot-BJL-_e8g.js";/* empty css              */const G=M("user",()=>{const p=d(),l=d(!1),m=d(),u=R();async function f(){var i,r;try{l.value=!0,p.value=await S.getUsers()}catch(s){console.error(s),u.show(((r=(i=s==null?void 0:s.response)==null?void 0:i.data)==null?void 0:r.message)||"fetch user error.")}finally{l.value=!1}}const n=j(()=>p.value?p.value.reduce((i,r)=>(i[r.id]=r,i),{}):{});return{users:p,loading:l,message:m,fetch:f,usersMap:n}}),se={class:"d-flex align-center"},te={class:"d-flex flex-column"},re={class:"text-sm text-medium-emphasis"},le=g({__name:"UserDataTable",props:{users:Array},setup(p){const l=d([{title:"ID",key:"id"},{title:"User",key:"username"},{title:"Email",key:"email"},{title:"Login Failed Attempts",key:"loginFailedAttempts"},{title:"Last Login Date",key:"LastLoginDate"},{title:"Role",key:"roles"}]),m=G(),u=void 0;return T(async()=>{await m.fetch()}),(f,n)=>{const i=H("RouterLink");return x(),U(Q,{headers:o(l),items:o(m).users},{"item.id":a(({item:r})=>[e(i,{to:`/users/${r.username}`,class:"text-blue text-decoration-none"},{default:a(()=>[c(" #"+C(r.id),1)]),_:2},1032,["to"])]),"item.username":a(({item:r})=>[y("div",se,[e(B,{size:"34",class:"me-3"},{default:a(()=>[e(w,{src:`${o(u)}/api/v1/users/${r.id}/image`},{error:a(()=>[e(w,{src:o(P)},null,8,["src"])]),_:2},1032,["src"])]),_:2},1024),y("div",te,[e(i,{to:`/users/${r.username}`,class:"text-h6 font-weight-medium user-list-name"},{default:a(()=>[c(C(r.username),1)]),_:2},1032,["to"]),y("span",re,C(r.email),1)])])]),_:1},8,["headers","items"])}}}),oe=g({__name:"UserDropdown",setup(p){const l=d(""),{data:m,loading:u,fetch:f}=W(),n=void 0,i=(r,s,t)=>{var $,h,A,D;if(!s)return!0;const V=s.toLowerCase();return((h=($=t.raw)==null?void 0:$.username)==null?void 0:h.toLowerCase().includes(V))||((D=(A=t.raw)==null?void 0:A.email)==null?void 0:D.toLowerCase().includes(V))};return T(async()=>{await f(S.getUsers())}),(r,s)=>(x(),U(X,{modelValue:l.value,"onUpdate:modelValue":s[0]||(s[0]=t=>l.value=t),items:o(m),loading:o(u),"item-value":"id","item-title":"username",label:"Search","custom-filter":i},{item:a(({props:t,item:V})=>[e(Y,J(t,{title:V.raw.username,subtitle:V.raw.email}),{prepend:a(()=>[e(B,null,{default:a(()=>[e(w,{src:`${o(n)}/api/v1/users/${V.value}/image`},{error:a(()=>[e(w,{src:o(P)},null,8,["src"])]),_:2},1032,["src"])]),_:2},1024)]),_:2},1040,["title","subtitle"])]),_:1},8,["modelValue","items","loading"]))}}),ue=g({__name:"AddUser",setup(p){const l=d(!1),m=d(!1),u=R(),f=G(),n=d({username:"",email:"",password:""}),i=async()=>{var r,s;try{m.value=!0,await S.createUser(n.value),u.show("User created successfully!","success"),await f.fetch(),l.value=!1}catch(t){console.error(t),u.show(((s=(r=t==null?void 0:t.response)==null?void 0:r.data)==null?void 0:s.message)||t.message)}finally{m.value=!1}};return(r,s)=>(x(),U(Z,{modelValue:o(l),"onUpdate:modelValue":s[4]||(s[4]=t=>E(l)?l.value=t:null),"max-width":"600px",persistent:""},{activator:a(({props:t})=>[e(v,K(O(t)),{default:a(()=>s[5]||(s[5]=[c(" Create User ")])),_:2},1040)]),default:a(()=>[e(F,null,{default:a(()=>[e(I,null,{default:a(()=>[e(N,null,{default:a(()=>s[6]||(s[6]=[c("Create User")])),_:1})]),_:1}),e(k,null,{default:a(()=>[e(ee,null,{default:a(()=>[e(L,null,{default:a(()=>[e(_,{cols:"12"},{default:a(()=>[e(b,{modelValue:o(n).username,"onUpdate:modelValue":s[0]||(s[0]=t=>o(n).username=t),label:"Username",placeholder:"Enter username"},null,8,["modelValue"])]),_:1}),e(_,{cols:"12"},{default:a(()=>[e(b,{modelValue:o(n).email,"onUpdate:modelValue":s[1]||(s[1]=t=>o(n).email=t),label:"Email",placeholder:"Enter email"},null,8,["modelValue"])]),_:1}),e(_,{cols:"12"},{default:a(()=>[e(b,{modelValue:o(n).password,"onUpdate:modelValue":s[2]||(s[2]=t=>o(n).password=t),label:"Password",placeholder:"Enter password",type:"password"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1}),e(z),e(q,{class:"pa-2"},{default:a(()=>[e(v,{color:"error",onClick:s[3]||(s[3]=t=>l.value=!1)},{default:a(()=>s[7]||(s[7]=[c(" Cancel ")])),_:1}),e(v,{color:"primary",variant:"elevated",onClick:i},{default:a(()=>s[8]||(s[8]=[c(" Create ")])),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]))}}),De=g({__name:"UserListPage",setup(p){const l=d();return(m,u)=>(x(),U(L,null,{default:a(()=>[e(_,{cols:"12"},{default:a(()=>[e(F,null,{default:a(()=>[e(I,null,{default:a(()=>[e(N,null,{default:a(()=>u[1]||(u[1]=[c("User List")])),_:1})]),_:1}),e(k,null,{default:a(()=>[e(L,null,{default:a(()=>[e(_,{cols:"12"},{default:a(()=>[e(oe,{modelValue:o(l),"onUpdate:modelValue":u[0]||(u[0]=f=>E(l)?l.value=f:null)},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(z),e(k,{class:"d-flex flex-wrap gap-4"},{default:a(()=>[e(ae),e(v,null,{default:a(()=>u[2]||(u[2]=[c("Search")])),_:1}),e(ue)]),_:1}),e(le)]),_:1})]),_:1})]),_:1}))}});export{De as default};
