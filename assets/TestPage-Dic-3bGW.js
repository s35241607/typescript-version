import{D as Je,E as Qe,ah as tt,ai as lt,L as Ye,b as s,Q as at,aj as nt,T as ot,d as Re,ak as st,f as ae,o as b,w as i,A as R,al as Ze,a6 as ce,r as k,a as z,N as ye,am as Fe,c as V,ab as W,n as ke,F as N,aa as we,V as te,t as ee,an as rt,ao as ut,_ as Me,ap as $e,aq as Ne,af as de,a9 as Be,h as ue,y as X,i as et,u as Ae,e as it,I as dt,x as ze,ar as Oe,J as ct,as as vt,at as je,au as ft,O as mt,av as gt,aw as pt,ax as Ke,ay as yt,az as ht,aA as bt,a4 as kt,m as wt}from"./index-C3b1PPjE.js";import{V as ie,c as he,b as Ve,a as be,d as Ct}from"./VCard-BXrZBBkV.js";import{V as xt}from"./VDivider-DwOsk6GP.js";import{a as Xe,V as He}from"./VRow-DWrOM-BU.js";import{V as Dt,u as Vt}from"./VDialog-Bxa502g4.js";import{V as Te,u as It,m as _t,a as zt}from"./VTextField-cuOQz-eh.js";import{a as Et,u as St,c as $t,m as Tt,d as Rt,e as Pt,V as Ue}from"./VDataTable-DBLQejl9.js";import{V as Lt}from"./VTable-CUNoYxjK.js";import{e as At}from"./mockService-CzhiGH8I.js";import{u as Bt,t as Ee,V as Mt,a as Ft,b as Se,c as Ge}from"./VMenu-wIsSqpNu.js";import{V as Nt}from"./VAvatar-Cp8FVZUZ.js";/* empty css              */import"./VImg-BSdJ5c1t.js";import"./index-Py49H-UN.js";import"./VSlideGroup-DfpVnok1.js";import"./ssrBoot-D8UTiMQy.js";const Ut=Qe({fluid:{type:Boolean,default:!1},...ot(),...nt(),...at()},"VContainer"),Wt=Je()({name:"VContainer",props:Ut(),setup(l,C){let{slots:d}=C;const{rtlClasses:u}=tt(),{dimensionStyles:c}=lt(l);return Ye(()=>s(l.tag,{class:["v-container",{"v-container--fluid":l.fluid},u.value,l.class],style:[c.value,l.style]},d)),{}}}),qt=Re({__name:"TestToast",setup(l){const C=st(),d=(u,c)=>{C.show(u,c)};return(u,c)=>(b(),ae(ie,{class:"mx-auto my-4"},{default:i(()=>[s(Ve,null,{default:i(()=>[s(he,{class:"text-h4 font-weight-bold"},{default:i(()=>c[2]||(c[2]=[R(" Test Page ")])),_:1})]),_:1}),s(xt),s(be,null,{default:i(()=>[s(Xe,null,{default:i(()=>[s(He,{cols:"12"},{default:i(()=>[s(Ze,{color:"info",variant:"tonal",border:"start"},{default:i(()=>c[3]||(c[3]=[R(" Toast Test ")])),_:1})]),_:1})]),_:1}),s(Xe,null,{default:i(()=>[s(He,{cols:"12",class:"d-flex gap-4"},{default:i(()=>[s(ce,{color:"success",variant:"elevated",onClick:c[0]||(c[0]=x=>d("success","success"))},{default:i(()=>c[4]||(c[4]=[R(" Success ")])),_:1}),s(ce,{color:"error",variant:"elevated",onClick:c[1]||(c[1]=x=>d("error","error"))},{default:i(()=>c[5]||(c[5]=[R(" Error ")])),_:1})]),_:1})]),_:1})]),_:1})]),_:1}))}}),Ot={__name:"TestDeleteConfirm",emits:["confirmDelete"],setup(l,{emit:C}){const d=C,u=k(!1),c=()=>{d("confirmDelete"),console.log("Deleted Succeefully"),u.value=!1};return(x,w)=>(b(),ae(Dt,{modelValue:u.value,"onUpdate:modelValue":w[1]||(w[1]=I=>u.value=I),"max-width":"450"},{activator:i(({props:I})=>[s(ce,ye({color:"error"},I),{default:i(()=>w[2]||(w[2]=[R(" Delete ")])),_:2},1040)]),default:i(()=>[s(ie,null,{default:i(()=>[s(he,{class:"headline"},{default:i(()=>w[3]||(w[3]=[R(" Confirm Deletion ")])),_:1}),s(be,null,{default:i(()=>[s(Ze,{type:"warning",variant:"tonal"},{default:i(()=>w[4]||(w[4]=[R(" Are you sure you want to delete this item? "),z("br",null,null,-1),R(" This action cannot be undone. ")])),_:1})]),_:1}),s(Ct,{class:"justify-end"},{default:i(()=>[s(ce,{color:"secondary",variant:"outlined",onClick:w[0]||(w[0]=I=>u.value=!1)},{default:i(()=>w[5]||(w[5]=[R(" Cancel ")])),_:1}),s(ce,{color:"error",variant:"elevated",onClick:c},{default:i(()=>w[6]||(w[6]=[R(" Confirm Delete ")])),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]))}},jt={class:"file-upload-container"},Kt={class:"upload-area"},Xt={key:0,class:"file-list"},Ht=["onClick"],Gt={class:"file-details"},Jt={class:"file-name"},Qt={class:"file-size"},Yt={class:"file-actions"},Zt={class:"progress-container"},el=Re({__name:"TestFileUplaod",setup(l){const C=k([]),d=k(null),u=k(!1),c=k({}),x=Fe({}),w=()=>Date.now().toString(36)+Math.random().toString(36).substring(2),I=v=>v.startsWith("image/")?"ri-image-line":v.startsWith("video/")?"ri-video-line":v.startsWith("audio/")?"ri-music-line":v.includes("pdf")?"ri-file-pdf-line":v.includes("word")||v.includes("document")?"ri-file-word-line":v.includes("excel")||v.includes("sheet")?"ri-file-excel-line":v.includes("powerpoint")||v.includes("presentation")?"ri-file-ppt-line":v.includes("zip")||v.includes("compressed")?"ri-file-zip-line":"ri-file-line",M=v=>{if(v===0)return"0 Bytes";const p=1024,T=["Bytes","KB","MB","GB"],h=Math.floor(Math.log(v)/Math.log(p));return`${Number.parseFloat((v/p**h).toFixed(2))} ${T[h]}`},P=v=>{c.value[v.id]=0;const p=setInterval(()=>{c.value[v.id]<100?(c.value[v.id]+=Math.floor(Math.random()*10)+1,c.value[v.id]>100&&(c.value[v.id]=100)):(clearInterval(p),x[v.id]=!0,setTimeout(()=>{x[v.id]=!1},1500))},200)},$=()=>{d.value&&d.value.click()},y=v=>{v&&Array.from(v).forEach(p=>{if(!C.value.some(h=>h.name===p.name&&h.size===p.size)){const h={name:p.name,size:p.size,type:p.type,url:URL.createObjectURL(p),file:p,id:w()};C.value.push(h),P(h)}})},f=v=>{const p=v.target;y(p.files),p&&(p.value="")},g=v=>{v.preventDefault(),u.value=!0},E=v=>{v.preventDefault(),u.value=!0},A=()=>{u.value=!1},q=v=>{var p;v.preventDefault(),u.value=!1,y(((p=v.dataTransfer)==null?void 0:p.files)||null)},oe=v=>{const p=document.createElement("a");p.href=v.url,p.download=v.name,document.body.appendChild(p),p.click(),document.body.removeChild(p)},ve=v=>{const p=C.value.findIndex(h=>h.id===v);if(p===-1)return;const T=C.value[p];URL.revokeObjectURL(T.url),C.value.splice(p,1),delete c.value[v],delete x[v]};return(v,p)=>(b(),V("div",jt,[z("div",Kt,[s(ce,{variant:"tonal",color:"primary",size:"small","prepend-icon":"ri-upload-line",onClick:$},{default:i(()=>p[0]||(p[0]=[R(" 選擇文件 ")])),_:1}),z("div",{class:ke(["dropzone",{"is-dragging":u.value}]),onDragenter:g,onDragover:E,onDragleave:A,onDrop:q},p[1]||(p[1]=[z("span",{class:"text-caption text-medium-emphasis"},"拖放文件至此",-1)]),34)]),z("input",{ref_key:"fileInput",ref:d,type:"file",hidden:"",multiple:"",onChange:f},null,544),C.value.length>0?(b(),V("div",Xt,[(b(!0),V(N,null,we(C.value,T=>(b(),V("div",{key:T.id,class:"file-item"},[z("div",{class:"file-info",onClick:h=>oe(T)},[s(te,{icon:I(T.type),size:"small",color:"primary"},null,8,["icon"]),z("div",Gt,[z("div",Jt,ee(T.name),1),z("div",Qt,ee(M(T.size)),1)])],8,Ht),z("div",Yt,[z("div",Zt,[c.value[T.id]<100?(b(),ae(rt,{key:0,"model-value":c.value[T.id],size:16,width:2,color:"primary"},null,8,["model-value"])):W("",!0),s(ut,{name:"checkmark-fly"},{default:i(()=>[x[T.id]?(b(),ae(te,{key:0,icon:"ri-check-line",color:"success",size:"small",class:"checkmark-icon"})):W("",!0)]),_:2},1024)]),s(ce,{icon:"",variant:"text",color:"error",size:"small",onClick:h=>ve(T.id)},{default:i(()=>[s(te,{size:"small",icon:"ri-close-line"})]),_:2},1032,["onClick"])])]))),128))])):W("",!0)]))}}),tl=Me(el,[["__scopeId","data-v-2e90444d"]]),ll={class:"enhanced-data-table"},al=["data-key","data-column-index"],nl={class:"d-flex align-center justify-space-between"},ol={class:"d-flex align-center"},sl=["onDragstart","onDragover","onDrop"],rl=["onMousedown"],ul=["onDragstart","onDragover","onDrop"],il=["onClick"],dl={key:0},cl={key:1},vl={__name:"EnhancedDataTable",props:{headers:{type:Array,required:!0},items:{type:Array,required:!0},loading:{type:Boolean,default:!1}},emits:["update:headers","update:items"],setup(l,{emit:C}){const d=l,u=C,c=k(null),x=k(10),w=Fe({}),I=k(!1),M=k(null),P=k(0),$=k(0),y=k(null),f=k(0),g=Fe({itemId:null,key:null,value:null}),E=k([]),A=(e,t)=>g.itemId===e.id&&g.key===t,q=e=>{if(!I.value)return;const t=$.value+(e.clientX-P.value);if(t>=50&&(f.value=t,y.value)){const a=document.querySelector(`th[data-key="${M.value}"]`),o=document.querySelector(".enhanced-data-table table").getBoundingClientRect().left,n=a.getBoundingClientRect().left-o+t;y.value.style.left=`${n}px`,a.style.width=`${t}px`,a.style.minWidth=`${t}px`}},oe=()=>{I.value&&(w[M.value]=`${f.value}px`,y.value&&y.value.parentNode&&(y.value.parentNode.removeChild(y.value),y.value=null),I.value=!1,document.removeEventListener("mousemove",q),document.removeEventListener("mouseup",oe))},ve=(e,t)=>{I.value=!0,M.value=t,P.value=e.clientX;const a=document.querySelector(`th[data-key="${t}"]`);$.value=a?a.offsetWidth:100,f.value=$.value,y.value=document.createElement("div"),y.value.className="resize-preview",y.value.style.height=`${document.querySelector(".enhanced-data-table table").offsetHeight}px`,y.value.style.top=`${a.offsetTop}px`,y.value.style.left=`${a.offsetLeft+a.offsetWidth}px`,document.querySelector(".enhanced-data-table").appendChild(y.value),document.addEventListener("mousemove",q),document.addEventListener("mouseup",oe),e.preventDefault()},v=k(null),p=k(null),T=k(null),h=k(null),F=k(null),O=k(null),j=()=>{p.value=null,h.value=null,v.value=null,T.value=null,F.value=null,document.querySelectorAll("th").forEach(e=>{e.classList.remove("column-dragging","column-dragover","column-dragover-before","column-dragover-after")}),document.querySelectorAll("tr").forEach(e=>{e.classList.remove("row-dragging","row-dragover","row-dragover-before","row-dragover-after")})},G=(e,t)=>{v.value=t,e.dataTransfer.setData("rowIndex",t);const a=e.currentTarget,o=a.getBoundingClientRect(),n=a.cloneNode(!0);n.style.position="absolute",n.style.top="-1000px",n.style.opacity="0.8",n.style.width=`${o.width}px`,document.body.appendChild(n),e.dataTransfer.setDragImage(n,20,20),setTimeout(()=>{document.body.removeChild(n)},0),e.dataTransfer.effectAllowed="move"},L=(e,t)=>{if(e.preventDefault(),v.value===t)return;T.value=t;const a=e.currentTarget.getBoundingClientRect(),o=e.clientY-a.top;F.value=o<a.height/2?"before":"after"},fe=()=>{},le=(e,t)=>{const a=Number.parseInt(e.dataTransfer.getData("rowIndex"));if(a===t)return;const o=[...d.items],n=o.splice(a,1)[0];o.splice(t,0,n),u("update:items",o),v.value=null,T.value=null,Be(()=>{})},me=(e,t)=>{if(!e.target.closest(".drag-handle"))return e.preventDefault(),!1;p.value=t,e.dataTransfer.setData("columnIndex",t.toString());const o=e.currentTarget.closest("th");O.value=o;const n=o.cloneNode(!0);n.style.width=`${o.offsetWidth}px`,n.style.height=`${o.offsetHeight}px`,n.style.background="#f5f5f5",n.style.border="1px solid #ddd",n.style.borderRadius="4px",n.style.opacity="0.8",n.style.position="absolute",n.style.top="-1000px",n.style.left="-1000px",document.body.appendChild(n),e.dataTransfer.setDragImage(n,20,20),setTimeout(()=>{document.body.removeChild(n)},0),o.classList.add("column-dragging"),e.dataTransfer.effectAllowed="move"},J=(e,t)=>{if(e.preventDefault(),p.value===t||p.value===null)return;h.value=t;const a=e.currentTarget.closest("th"),o=a.getBoundingClientRect(),n=e.clientX-o.left;F.value=n<o.width/2?"before":"after",document.querySelectorAll("th").forEach(m=>{m.classList.remove("column-dragover-before","column-dragover-after")}),a.classList.add(`column-dragover-${F.value}`)},Ie=e=>{e.currentTarget.closest("th").classList.remove("column-dragover-before","column-dragover-after")},se=(e,t)=>{e.preventDefault();const a=Number.parseInt(e.dataTransfer.getData("columnIndex"));if(a===t||Number.isNaN(a))return;let o=t;F.value==="after"&&a<t?o+=1:F.value==="before"&&a>t?o-=0:F.value==="after"&&a>t?o+=0:F.value==="before"&&a<t&&(o-=1);const n=[...d.headers],m=n.splice(a,1)[0];o=Math.max(0,Math.min(o,n.length)),n.splice(o,0,m),u("update:headers",n),j()},ne=()=>{j()},ge=(e,t)=>{event.target.closest(".drag-handle")||event.target.closest(".column-resizer")||["index"].includes(t)||(g.itemId=e.id,g.key=t,g.value=e[t],Be(()=>{const o=document.querySelector(".enhanced-data-table input");o&&o.focus()}))},Ce=()=>{if(g.itemId!==null){const e=d.items.map(t=>t.id===g.itemId?{...t,[g.key]:g.value}:t);u("update:items",e),g.itemId=null,g.key=null,g.value=null}},xe=()=>{g.itemId=null,g.key=null,g.value=null},_e=e=>{E.value=e};return(e,t)=>(b(),V("div",ll,[s(Et,{ref_key:"dataTable",ref:c,"items-per-page":x.value,"onUpdate:itemsPerPage":t[2]||(t[2]=a=>x.value=a),"sort-by":E.value,"onUpdate:sortBy":[t[3]||(t[3]=a=>E.value=a),_e],headers:l.headers,items:l.items,loading:l.loading,class:"elevation-1"},{headers:i(({columns:a})=>[z("tr",null,[(b(!0),V(N,null,we(a,(o,n)=>(b(),V("th",{key:o.key,"data-key":o.key,"data-column-index":n,style:Ne({width:w[o.key]||"auto"})},[z("div",nl,[z("span",null,ee(o.title),1),z("div",ol,[z("div",{class:"drag-handle",draggable:"true",onDragstart:m=>me(m,n),onDragover:m=>J(m,n),onDragleave:t[0]||(t[0]=m=>Ie(m)),onDragend:ne,onDrop:m=>se(m,n)},[s(te,{size:"small",class:"ms-1"},{default:i(()=>t[4]||(t[4]=[R(" ri-draggable ")])),_:1})],40,sl),z("div",{class:"column-resizer",onMousedown:de(m=>ve(m,o.key),["stop"])},null,40,rl)])])],12,al))),128))])]),item:i(({item:a,index:o,columns:n})=>[(b(),V("tr",{key:a.id,class:ke({"row-dragging":v.value===o,"row-dragover":T.value===o,"row-dragover-before":T.value===o&&F.value==="before","row-dragover-after":T.value===o&&F.value==="after"}),draggable:"true",onDragstart:m=>G(m,o),onDragover:m=>L(m,o),onDragleave:fe,onDragend:ne,onDrop:m=>le(m,o)},[(b(!0),V(N,null,we(n,m=>(b(),V("td",{key:m.key,class:ke({"cell-editable":!["index"].includes(m.key)}),onClick:K=>ge(a,m.key)},[A(a,m.key)?(b(),V("div",dl,[s(Te,{modelValue:g.value,"onUpdate:modelValue":t[1]||(t[1]=K=>g.value=K),density:"compact",variant:"outlined","hide-details":"",autofocus:"",onBlur:Ce,onKeyup:[$e(Ce,["enter"]),$e(xe,["esc"])]},null,8,["modelValue"])])):(b(),V("div",cl,[m.key==="index"?(b(),V(N,{key:0},[R(ee(o+1),1)],64)):(b(),V(N,{key:1},[R(ee(a[m.key]),1)],64))]))],10,il))),128))],42,ul))]),_:1},8,["items-per-page","sort-by","headers","items","loading"])]))}},fl=Me(vl,[["__scopeId","data-v-b3788049"]]),ml={class:"advanced-data-table"},gl={key:0,class:"drag-handle-header",width:"40"},pl={key:1,class:"row-number-header",width:"50"},yl={key:2,class:"expand-header",width:"40"},hl=["width","onDrop","onClick"],bl={class:"column-header-content"},kl=["onDragstart"],wl={class:"column-title"},Cl=["onMousedown"],xl=["onDrop"],Dl={key:0,class:"drag-handle-cell"},Vl=["onDragstart"],Il={key:1,class:"row-number"},_l=["onClick"],zl=["onClick"],El={key:0,class:"expanded-row"},Sl=["colspan"],$l={class:"default-expanded-content"},Tl=Re({__name:"AdvanceDataTable",props:{columns:{type:Array,required:!0},items:{type:Array,required:!0},rowNumberVisible:{type:Boolean,default:!0},rowDraggable:{type:Boolean,default:!0},columnDraggable:{type:Boolean,default:!0},columnResizable:{type:Boolean,default:!0},sortable:{type:Boolean,default:!0},expandable:{type:Boolean,default:!1},editableOnClick:{type:Boolean,default:!0},dense:{type:Boolean,default:!1},headerSticky:{type:Boolean,default:!1},multiColumnResize:{type:Boolean,default:!0}},emits:["update:items","row-click","row-edit","row-drag","column-drag","column-resize","sort"],setup(l,{emit:C}){const d=l,u=C,c=k([...d.columns]),x=k([...d.items]),w=k(""),I=k(!1),M=k(new Set),P=k(null),$=k(null),y=k(null),f=k(0),g=k(0),E=k(!1);ue(()=>d.items,e=>{x.value=[...e]},{deep:!0}),ue(()=>d.columns,e=>{c.value=[...e]},{deep:!0});const A=X(()=>c.value.filter(e=>!e.hidden)),q=X(()=>{let e=[...x.value];return w.value&&(e=e.sort((t,a)=>{const o=t[w.value],n=a[w.value];return typeof o=="string"&&typeof n=="string"?I.value?n.localeCompare(o):o.localeCompare(n):o<n?I.value?1:-1:o>n?I.value?-1:1:0})),e}),oe=e=>{d.sortable&&(w.value===e?I.value=!I.value:(w.value=e,I.value=!1),u("sort",{key:e,direction:I.value?"desc":"asc"}))},ve=e=>{d.expandable&&(M.value.has(e)?M.value.delete(e):M.value.add(e))},v=e=>M.value.has(e);let p=null;const T=(e,t)=>{d.rowDraggable&&(p=t,e.dataTransfer&&(e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/plain",String(t))))},h=e=>{d.rowDraggable&&(e.preventDefault(),e.dataTransfer&&(e.dataTransfer.dropEffect="move"))},F=(e,t)=>{if(!d.rowDraggable||!p||p===t)return;e.preventDefault();const a=x.value.findIndex(n=>n.id===p),o=x.value.findIndex(n=>n.id===t);if(a>-1&&o>-1){const[n]=x.value.splice(a,1);x.value.splice(o,0,n),u("update:items",x.value),u("row-drag",{draggedId:p,targetId:t,newItems:x.value})}p=null};let O=null;const j=(e,t)=>{d.columnDraggable&&(O=t,e.dataTransfer&&(e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/plain",t)),e.stopPropagation())},G=e=>{if(!d.columnDraggable||!O)return;e.preventDefault();const t=e.currentTarget;t&&t.classList&&t.classList.add("column-drag-over"),e.dataTransfer&&(e.dataTransfer.dropEffect="move")},L=(e,t)=>{if(!d.columnDraggable||!O||O===t)return;e.preventDefault(),document.querySelectorAll(".column-drag-over").forEach(n=>{n.classList.remove("column-drag-over")});const a=c.value.findIndex(n=>n.key===O),o=c.value.findIndex(n=>n.key===t);if(a>-1&&o>-1){const[n]=c.value.splice(a,1);c.value.splice(o,0,n),u("column-drag",{draggedKey:O,targetKey:t,newColumns:c.value})}O=null},fe=e=>{var n;if(!y.value)return;e.stopPropagation(),e.preventDefault(),E.value=e.shiftKey;const t=e.clientX-f.value,a=Math.max(50,g.value+t),o=c.value.findIndex(m=>m.key===y.value);if(o>-1){c.value[o].width=a,E.value&&d.multiColumnResize&&A.value.slice(A.value.findIndex(Q=>Q.key===y.value)+1).forEach(Q=>{const Y=c.value.findIndex(re=>re.key===Q.key);if(Y>-1&&c.value[Y].resizable!==!1){const re=c.value[Y].width||100;c.value[Y].width=Math.max(50,re+t)}});const m=document.getElementById("column-resize-guide");if(m){const K=(n=document.querySelector(".table-wrapper"))==null?void 0:n.getBoundingClientRect();if(K){const Q=e.clientX-K.left;m.style.left=`${Q}px`,m.style.display="block",m.classList.toggle("multi-column-resize",E.value&&d.multiColumnResize)}}}},le=()=>{var e;if(y.value){const t=(e=c.value.find(o=>o.key===y.value))==null?void 0:e.width;u("column-resize",{key:y.value,width:t,isMultiResize:E.value&&d.multiColumnResize});const a=document.getElementById("column-resize-guide");a&&(a.style.display="none",a.classList.remove("multi-column-resize")),y.value=null,E.value=!1}document.body.classList.remove("resizing-active"),document.removeEventListener("mousemove",fe),document.removeEventListener("mouseup",le)},me=(e,t)=>t.formatter?t.formatter(e):e!=null?String(e):"",J=e=>{const t=document.createElement("div");t.style.position="absolute",t.style.visibility="hidden",t.style.whiteSpace="nowrap",t.style.fontFamily=getComputedStyle(document.body).fontFamily,t.style.fontSize=getComputedStyle(document.body).fontSize,t.style.padding="0 8px",document.body.appendChild(t);let a=0;return e.forEach(o=>{t.textContent=o;const n=t.offsetWidth;a=Math.max(a,n)}),document.body.removeChild(t),a+20},Ie=e=>{const t=c.value.find(Y=>Y.key===e);if(!t)return;const a=[];a.push(t.title),x.value.forEach(Y=>{const re=Y[e],r=me(re,t);a.push(r)});const o=J(a),n=t.minWidth||50,m=t.maxWidth||500,K=Math.max(n,Math.min(m,o)),Q=c.value.findIndex(Y=>Y.key===e);Q>-1&&(c.value[Q].width=K,u("column-resize",{key:e,width:K}))},se=e=>{if(e.key==="Shift"){E.value=!0;const t=document.getElementById("column-resize-guide");t&&d.multiColumnResize&&t.classList.add("multi-column-resize")}},ne=e=>{if(e.key==="Shift"){E.value=!1;const t=document.getElementById("column-resize-guide");t&&t.classList.remove("multi-column-resize")}},ge=(e,t,a)=>{var m,K;if(!d.columnResizable)return;if(e.stopPropagation(),e.preventDefault(),E.value=e.shiftKey,e.detail===2){Ie(t);return}document.body.classList.add("resizing-active"),y.value=t,f.value=e.clientX,g.value=a;let o=document.getElementById("column-resize-guide");o||(o=document.createElement("div"),o.id="column-resize-guide",o.className="column-resize-guide",(m=document.querySelector(".table-wrapper"))==null||m.appendChild(o));const n=(K=document.querySelector(".table-wrapper"))==null?void 0:K.getBoundingClientRect();if(n){const Q=e.clientX-n.left;o.style.left=`${Q}px`,o.style.display="block",o.style.height=`${n.height}px`,o.classList.toggle("multi-column-resize",E.value&&d.multiColumnResize)}document.addEventListener("mousemove",fe),document.addEventListener("mouseup",le),document.addEventListener("keydown",se),document.addEventListener("keyup",ne)},Ce=(e,t,a)=>{var o;d.editableOnClick&&((o=c.value.find(n=>n.key===t))!=null&&o.editable)&&(P.value={rowId:e,key:t},$.value=a),u("row-click",{rowId:e,key:t,value:a})},xe=(e,t,a)=>{const o=x.value.findIndex(n=>n.id===e);o>-1&&(x.value[o][t]=a,u("update:items",x.value),u("row-edit",{rowId:e,key:t,value:a,row:x.value[o]})),P.value=null},_e=()=>{P.value=null};return et(()=>{document.removeEventListener("mousemove",fe),document.removeEventListener("mouseup",le),document.removeEventListener("keydown",se),document.removeEventListener("keyup",ne)}),(e,t)=>(b(),V("div",ml,[s(ie,null,{default:i(()=>[z("div",{class:ke(["table-wrapper",{"sticky-header":l.headerSticky}])},[s(Lt,{density:l.dense?"compact":"default","fixed-header":"",class:"fixed-width-table"},{default:i(()=>[z("thead",null,[z("tr",null,[l.rowDraggable?(b(),V("th",gl,[s(te,{icon:"ri-drag-move-line",size:"small"})])):W("",!0),l.rowNumberVisible?(b(),V("th",pl," # ")):W("",!0),l.expandable?(b(),V("th",yl)):W("",!0),(b(!0),V(N,null,we(A.value,a=>(b(),V("th",{key:a.key,width:a.width?`${a.width}px`:"auto",style:Ne({width:a.width?`${a.width}px`:"auto",minWidth:a.width?`${a.width}px`:"100px"}),class:ke(["column-header",{sortable:a.sortable&&l.sortable,sorted:w.value===a.key,desc:w.value===a.key&&I.value,resizable:l.columnResizable}]),onDragover:t[1]||(t[1]=de(o=>l.columnDraggable&&G(o),["prevent"])),onDrop:de(o=>l.columnDraggable&&L(o,a.key),["prevent"]),onClick:o=>a.sortable&&l.sortable?oe(a.key):null},[z("div",bl,[a.draggable&&l.columnDraggable?(b(),V("div",{key:0,class:"column-drag-handle",draggable:"true",onDragstart:o=>j(o,a.key),onClick:t[0]||(t[0]=de(()=>{},["stop"]))},[s(te,{icon:"ri-drag-move-2-line",size:"small"})],40,kl)):W("",!0),z("div",wl,ee(a.title),1),a.sortable&&l.sortable&&w.value===a.key?(b(),ae(te,{key:1,icon:I.value?"ri-arrow-down-line":"ri-arrow-up-line",size:"small",class:"sort-icon"},null,8,["icon"])):W("",!0)]),l.columnResizable?(b(),V("div",{key:0,class:"resize-handle",onMousedown:de(o=>ge(o,a.key,a.width||100),["stop"])},t[3]||(t[3]=[z("div",{class:"resize-handle-indicator"},null,-1)]),40,Cl)):W("",!0)],46,hl))),128))])]),z("tbody",null,[(b(!0),V(N,null,we(q.value,(a,o)=>(b(),V(N,{key:a.id},[z("tr",{class:ke(["data-row",{expanded:v(a.id),"row-dragging":Ae(p)===a.id}]),onDragover:h,onDrop:n=>F(n,a.id)},[l.rowDraggable?(b(),V("td",Dl,[z("div",{class:"drag-handle",draggable:"true",onDragstart:n=>T(n,a.id)},[s(te,{icon:"ri-drag-move-line",size:"small"})],40,Vl)])):W("",!0),l.rowNumberVisible?(b(),V("td",Il,ee(o+1),1)):W("",!0),l.expandable?(b(),V("td",{key:2,class:"expand-cell",onClick:n=>ve(a.id)},[s(te,{icon:v(a.id)?"ri-arrow-up-s-line":"ri-arrow-down-s-line",size:"small"},null,8,["icon"])],8,_l)):W("",!0),(b(!0),V(N,null,we(A.value,n=>(b(),V("td",{key:`${a.id}-${n.key}`,class:ke(["data-cell",{editable:n.editable&&l.editableOnClick}]),style:Ne({width:n.width?`${n.width}px`:"auto",minWidth:n.width?`${n.width}px`:"100px"}),onClick:m=>Ce(a.id,n.key,a[n.key])},[P.value&&P.value.rowId===a.id&&P.value.key===n.key?(b(),ae(Te,{key:0,modelValue:$.value,"onUpdate:modelValue":t[2]||(t[2]=m=>$.value=m),variant:"outlined",density:"compact","hide-details":"",autofocus:"",onKeyup:[$e(m=>xe(a.id,n.key,$.value),["enter"]),$e(_e,["esc"])],onBlur:m=>xe(a.id,n.key,$.value)},null,8,["modelValue","onKeyup","onBlur"])):(b(),V(N,{key:1},[R(ee(me(a[n.key],n)),1)],64))],14,zl))),128))],42,xl),l.expandable&&v(a.id)?(b(),V("tr",El,[z("td",{colspan:A.value.length+(l.rowNumberVisible?1:0)+(l.expandable?1:0)+(l.rowDraggable?1:0),class:"expanded-content"},[it(e.$slots,"expanded-item",{item:a},()=>[z("div",$l,[(b(!0),V(N,null,we(A.value,n=>(b(),V("div",{key:`expanded-${a.id}-${n.key}`,class:"expanded-field"},[z("strong",null,ee(n.title)+":",1),R(" "+ee(me(a[n.key],n)),1)]))),128))])],!0)],8,Sl)])):W("",!0)],64))),128))])]),_:3},8,["density"])],2)]),_:3})]))}}),Rl=Me(Tl,[["__scopeId","data-v-4a2da72d"]]),Pl={class:"pa-4"},Ll=Re({__name:"TableDemo",setup(l){const C=k([{title:"ID",key:"id",sortable:!0},{title:"Project Name",key:"name",sortable:!0},{title:"Description",key:"description",sortable:!1},{title:"Status",key:"status",sortable:!0},{title:"Created Date",key:"createdAt",sortable:!0},{title:"Priority",key:"priority",sortable:!0},{title:"Budget (USD)",key:"budget",sortable:!0},{title:"Progress (%)",key:"progress",sortable:!0},{title:"Active",key:"active",sortable:!0}]),d=k([{id:1,name:"Project Alpha",description:"Description of Project Alpha",status:"In Progress",createdAt:"2024-02-01",priority:"High",budget:5e4,progress:60,active:!0},{id:2,name:"Project Beta",description:"Description of Project Beta",status:"Completed",createdAt:"2024-01-15",priority:"Medium",budget:75e3,progress:100,active:!1},{id:3,name:"Project Gamma",description:"Description of Project Gamma",status:"Pending",createdAt:"2024-03-01",priority:"Low",budget:3e4,progress:20,active:!0},{id:4,name:"Project Delta",description:"Description of Project Delta",status:"In Progress",createdAt:"2024-02-20",priority:"High",budget:9e4,progress:45,active:!0},{id:5,name:"Project Epsilon",description:"Description of Project Epsilon",status:"Completed",createdAt:"2024-01-05",priority:"Medium",budget:6e4,progress:100,active:!1}]),u=k([{title:"ID",key:"id",sortable:!1,width:80},{title:"项目名称",key:"name",sortable:!1,editable:!0},{title:"描述",key:"description",sortable:!1,editable:!0},{title:"状态",key:"status",sortable:!1,editable:!0},{title:"创建日期",key:"createdAt",sortable:!1},{title:"优先级",key:"priority",sortable:!1,editable:!0},{title:"预算 (USD)",key:"budget",sortable:!1,editable:!0},{title:"进度 (%)",key:"progress",sortable:!1,editable:!0},{title:"活跃状态",key:"active",sortable:!1,editable:!0}]),c=k([...d.value]),x=k(!1),w=P=>{console.log("排序信息:",P)},I=P=>{console.log("行点击:",P)},M=P=>{console.log("单元格编辑:",P)};return(P,$)=>(b(),V("div",Pl,[$[2]||($[2]=z("h2",{class:"mb-4"}," EnhancedDataTable 示例 ",-1)),s(fl,{headers:C.value,"onUpdate:headers":$[0]||($[0]=y=>C.value=y),items:d.value,"onUpdate:items":$[1]||($[1]=y=>d.value=y),loading:x.value},null,8,["headers","items","loading"]),$[3]||($[3]=z("h2",{class:"mb-4 mt-8"}," AdvanceDataTable 示例 ",-1)),s(Rl,{columns:u.value,items:c.value,"row-number-visible":"","row-draggable":"","column-draggable":"","column-resizable":"",sortable:"",expandable:"","editable-on-click":"","header-sticky":"",onSort:w,onRowClick:I,onRowEdit:M},null,8,["columns","items"])]))}}),Al=Me(Ll,[["__scopeId","data-v-754605fc"]]);function Bl(l,C,d){if(C==null)return l;if(Array.isArray(C))throw new Error("Multiple matches is not implemented");return typeof C=="number"&&~C?s(N,null,[s("span",{class:"v-combobox__unmask"},[l.substr(0,C)]),s("span",{class:"v-combobox__mask"},[l.substr(C,d)]),s("span",{class:"v-combobox__unmask"},[l.substr(C+d)])]):l}const Ml=Qe({autoSelectFirst:{type:[Boolean,String]},clearOnSelect:{type:Boolean,default:!0},delimiters:Array,...Rt({filterKeys:["title"]}),...Tt({hideNoData:!0,returnObject:!0}),...gt(_t({modelValue:null,role:"combobox"}),["validationValue","dirty","appendInnerIcon"]),...mt({transition:!1})},"VCombobox"),Fl=Je()({name:"VCombobox",props:Ml(),emits:{"update:focused":l=>!0,"update:modelValue":l=>!0,"update:search":l=>!0,"update:menu":l=>!0},setup(l,C){var re;let{emit:d,slots:u}=C;const{t:c}=dt(),x=k(),w=ze(!1),I=ze(!0),M=ze(!1),P=k(),$=k(),y=Oe(l,"menu"),f=X({get:()=>y.value,set:r=>{var D;y.value&&!r&&((D=P.value)!=null&&D.ΨopenChildren.size)||(y.value=r)}}),g=ze(-1);let E=!1;const A=X(()=>{var r;return(r=x.value)==null?void 0:r.color}),q=X(()=>f.value?l.closeText:l.openText),{items:oe,transformIn:ve,transformOut:v}=Bt(l),{textColorClasses:p,textColorStyles:T}=ct(A),h=Oe(l,"modelValue",[],r=>ve(vt(r)),r=>{const D=v(r);return l.multiple?D:D[0]??null}),F=It(l),O=X(()=>!!(l.chips||u.chip)),j=X(()=>O.value||!!u.selection),G=ze(!l.multiple&&!j.value?((re=h.value[0])==null?void 0:re.title)??"":""),L=X({get:()=>G.value,set:r=>{var D;if(G.value=r??"",!l.multiple&&!j.value&&(h.value=[Ee(l,r)]),r&&l.multiple&&((D=l.delimiters)!=null&&D.length)){const B=r.split(new RegExp(`(?:${l.delimiters.join("|")})+`));B.length>1&&(B.forEach(_=>{_=_.trim(),_&&m(Ee(l,_))}),G.value="")}r||(g.value=-1),I.value=!r}}),fe=X(()=>typeof l.counterValue=="function"?l.counterValue(h.value):typeof l.counterValue=="number"?l.counterValue:l.multiple?h.value.length:L.value.length);ue(G,r=>{E?Be(()=>E=!1):w.value&&!f.value&&(f.value=!0),d("update:search",r)}),ue(h,r=>{var D;!l.multiple&&!j.value&&(G.value=((D=r[0])==null?void 0:D.title)??"")});const{filteredItems:le,getMatches:me}=St(l,oe,()=>I.value?"":L.value),J=X(()=>l.hideSelected?le.value.filter(r=>!h.value.some(D=>D.value===r.value)):le.value),Ie=X(()=>h.value.map(r=>r.value)),se=X(()=>{var D;return(l.autoSelectFirst===!0||l.autoSelectFirst==="exact"&&L.value===((D=J.value[0])==null?void 0:D.title))&&J.value.length>0&&!I.value&&!M.value}),ne=X(()=>l.hideNoData&&!J.value.length||F.isReadonly.value||F.isDisabled.value),ge=k(),Ce=$t(ge,x);function xe(r){E=!0,l.openOnClear&&(f.value=!0)}function _e(){ne.value||(f.value=!0)}function e(r){ne.value||(w.value&&(r.preventDefault(),r.stopPropagation()),f.value=!f.value)}function t(r){var D;r.key!==" "&&Ke(r)&&((D=x.value)==null||D.focus())}function a(r){var _;if(pt(r)||F.isReadonly.value)return;const D=x.value.selectionStart,B=h.value.length;if(["Enter","ArrowDown","ArrowUp"].includes(r.key)&&r.preventDefault(),["Enter","ArrowDown"].includes(r.key)&&(f.value=!0),["Escape"].includes(r.key)&&(f.value=!1),["Enter","Escape","Tab"].includes(r.key)&&(se.value&&["Enter","Tab"].includes(r.key)&&!h.value.some(S=>{let{value:Z}=S;return Z===J.value[0].value})&&m(le.value[0]),I.value=!0),r.key==="ArrowDown"&&se.value&&((_=ge.value)==null||_.focus("next")),r.key==="Enter"&&L.value&&(m(Ee(l,L.value)),j.value&&(G.value="")),["Backspace","Delete"].includes(r.key)){if(!l.multiple&&j.value&&h.value.length>0&&!L.value)return m(h.value[0],!1);if(~g.value){r.preventDefault();const S=g.value;m(h.value[g.value],!1),g.value=S>=B-1?B-2:S}else r.key==="Backspace"&&!L.value&&(g.value=B-1);return}if(l.multiple)if(r.key==="ArrowLeft"){if(g.value<0&&D>0)return;const S=g.value>-1?g.value-1:B-1;h.value[S]?g.value=S:(g.value=-1,x.value.setSelectionRange(L.value.length,L.value.length))}else if(r.key==="ArrowRight"){if(g.value<0)return;const S=g.value+1;h.value[S]?g.value=S:(g.value=-1,x.value.setSelectionRange(0,0))}else~g.value&&Ke(r)&&(g.value=-1)}function o(){var r;l.eager&&((r=$.value)==null||r.calculateVisibleItems())}function n(){var r;w.value&&(I.value=!0,(r=x.value)==null||r.focus())}function m(r){let D=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;if(!(!r||r.props.disabled))if(l.multiple){const B=h.value.findIndex(S=>(l.valueComparator||je)(S.value,r.value)),_=D??!~B;if(~B){const S=_?[...h.value,r]:[...h.value];S.splice(B,1),h.value=S}else _&&(h.value=[...h.value,r]);l.clearOnSelect&&(L.value="")}else{const B=D!==!1;h.value=B?[r]:[],G.value=B&&!j.value?r.title:"",Be(()=>{f.value=!1,I.value=!0})}}function K(r){w.value=!0,setTimeout(()=>{M.value=!0})}function Q(r){M.value=!1}function Y(r){(r==null||r===""&&!l.multiple&&!j.value)&&(h.value=[])}return ue(w,(r,D)=>{if(!(r||r===D)&&(g.value=-1,f.value=!1,L.value)){if(l.multiple){m(Ee(l,L.value));return}if(!j.value)return;h.value.some(B=>{let{title:_}=B;return _===L.value})?G.value="":m(Ee(l,L.value))}}),ue(f,()=>{if(!l.hideSelected&&f.value&&h.value.length){const r=J.value.findIndex(D=>h.value.some(B=>(l.valueComparator||je)(B.value,D.value)));yt&&window.requestAnimationFrame(()=>{var D;r>=0&&((D=$.value)==null||D.scrollToIndex(r))})}}),ue(()=>l.items,(r,D)=>{f.value||w.value&&!D.length&&r.length&&(f.value=!0)}),Ye(()=>{const r=!!(!l.hideNoData||J.value.length||u["prepend-item"]||u["append-item"]||u["no-data"]),D=h.value.length>0,B=Te.filterProps(l);return s(Te,ye({ref:x},B,{modelValue:L.value,"onUpdate:modelValue":[_=>L.value=_,Y],focused:w.value,"onUpdate:focused":_=>w.value=_,validationValue:h.externalValue,counterValue:fe.value,dirty:D,class:["v-combobox",{"v-combobox--active-menu":f.value,"v-combobox--chips":!!l.chips,"v-combobox--selection-slot":!!j.value,"v-combobox--selecting-index":g.value>-1,[`v-combobox--${l.multiple?"multiple":"single"}`]:!0},l.class],style:l.style,readonly:F.isReadonly.value,placeholder:D?void 0:l.placeholder,"onClick:clear":xe,"onMousedown:control":_e,onKeydown:a}),{...u,default:()=>s(N,null,[s(Mt,ye({ref:P,modelValue:f.value,"onUpdate:modelValue":_=>f.value=_,activator:"parent",contentClass:"v-combobox__content",disabled:ne.value,eager:l.eager,maxHeight:310,openOnClick:!1,closeOnContentClick:!1,transition:l.transition,onAfterEnter:o,onAfterLeave:n},l.menuProps),{default:()=>[r&&s(Ft,ye({ref:ge,selected:Ie.value,selectStrategy:l.multiple?"independent":"single-independent",onMousedown:_=>_.preventDefault(),onKeydown:t,onFocusin:K,onFocusout:Q,tabindex:"-1","aria-live":"polite",color:l.itemColor??l.color},Ce,l.listProps),{default:()=>{var _,S,Z;return[(_=u["prepend-item"])==null?void 0:_.call(u),!J.value.length&&!l.hideNoData&&(((S=u["no-data"])==null?void 0:S.call(u))??s(Se,{key:"no-data",title:c(l.noDataText)},null)),s(Pt,{ref:$,renderless:!0,items:J.value},{default:pe=>{var qe;let{item:U,index:De,itemRef:H}=pe;const We=ye(U.props,{ref:H,key:U.value,active:se.value&&De===0?!0:void 0,onClick:()=>m(U,null)});return((qe=u.item)==null?void 0:qe.call(u,{item:U,index:De,props:We}))??s(Se,ye(We,{role:"option"}),{prepend:Pe=>{let{isSelected:Le}=Pe;return s(N,null,[l.multiple&&!l.hideSelected?s(zt,{key:U.value,modelValue:Le,ripple:!1,tabindex:"-1"},null):void 0,U.props.prependAvatar&&s(Nt,{image:U.props.prependAvatar},null),U.props.prependIcon&&s(te,{icon:U.props.prependIcon},null)])},title:()=>{var Pe,Le;return I.value?U.title:Bl(U.title,(Pe=me(U))==null?void 0:Pe.title,((Le=L.value)==null?void 0:Le.length)??0)}})}}),(Z=u["append-item"])==null?void 0:Z.call(u)]}})]}),h.value.map((_,S)=>{function Z(H){H.stopPropagation(),H.preventDefault(),m(_,!1)}const pe={"onClick:close":Z,onKeydown(H){H.key!=="Enter"&&H.key!==" "||(H.preventDefault(),H.stopPropagation(),Z(H))},onMousedown(H){H.preventDefault(),H.stopPropagation()},modelValue:!0,"onUpdate:modelValue":void 0},U=O.value?!!u.chip:!!u.selection,De=U?bt(O.value?u.chip({item:_,index:S,props:pe}):u.selection({item:_,index:S})):void 0;if(!(U&&!De))return s("div",{key:_.value,class:["v-combobox__selection",S===g.value&&["v-combobox__selection--selected",p.value]],style:S===g.value?T.value:{}},[O.value?u.chip?s(kt,{key:"chip-defaults",defaults:{VChip:{closable:l.closableChips,size:"small",text:_.title}}},{default:()=>[De]}):s(Ue,ye({key:"chip",closable:l.closableChips,size:"small",text:_.title,disabled:_.props.disabled},pe),null):De??s("span",{class:"v-combobox__selection-text"},[_.title,l.multiple&&S<h.value.length-1&&s("span",{class:"v-combobox__selection-comma"},[R(",")])])])})]),"append-inner":function(){var pe;for(var _=arguments.length,S=new Array(_),Z=0;Z<_;Z++)S[Z]=arguments[Z];return s(N,null,[(pe=u["append-inner"])==null?void 0:pe.call(u,...S),(!l.hideNoData||l.items.length)&&l.menuIcon?s(te,{class:"v-combobox__menu-icon",icon:l.menuIcon,onMousedown:e,onClick:ht,"aria-label":c(q.value),title:c(q.value),tabindex:"-1"},null):void 0])}})}),ft({isFocused:w,isPristine:I,menu:f,search:L,selectionIndex:g,filteredItems:le,select:m},x)}}),Nl={key:1},Ul={__name:"TestComboBox",setup(l){const C=k(null),d=k([]),u=k(null),{data:c,loading:x,fetch:w}=Vt(),I=async y=>{try{const f={name:y};f.id=999,c.value.push(f)}catch(f){console.error("Error adding item:",f)}};ue(d,async(y,f)=>{if(y.length!==f.length)for(let g=0;g<y.length;g++)typeof y[g]=="string"&&await I(y[g])}),et(async()=>{await w(At.generateMockEqpCategories())});const M=y=>{C.value=C.value?null:y,console.log("edit",y)},P=y=>{d.value.splice(y,1)},$=X(()=>c.value.some(y=>y.name===u.value));return(y,f)=>{const g=wt("VListItemContent");return b(),ae(Wt,{fluid:""},{default:i(()=>[s(Fl,{modelValue:d.value,"onUpdate:modelValue":f[4]||(f[4]=E=>d.value=E),search:u.value,"onUpdate:search":f[5]||(f[5]=E=>u.value=E),items:Ae(c),"item-value":"id","item-title":"name",loading:Ae(x),label:"Category","hide-no-data":!1},{"prepend-item":i(()=>[s(Se,{disabled:""},{default:i(()=>[s(Ge,null,{default:i(()=>f[6]||(f[6]=[R("Choose or create an option")])),_:1})]),_:1})]),"append-item":i(()=>[!Ae($)&&u.value?(b(),ae(Se,{key:0,onClick:f[0]||(f[0]=E=>I(u.value))},{default:i(()=>[s(g,null,{default:i(()=>[s(Ge,null,{default:i(()=>[f[7]||(f[7]=R(" Create ")),s(Ue,{color:"success",size:"small",class:"ml-2"},{default:i(()=>[R(ee(u.value),1)]),_:1})]),_:1})]),_:1})]),_:1})):W("",!0)]),"no-data":i(()=>f[8]||(f[8]=[])),selection:i(({item:E,index:A})=>[E===Object(E)?(b(),ae(Ue,{key:0,text:E.title,size:"small",closable:"","onClick:close":q=>P(A)},null,8,["text","onClick:close"])):W("",!0)]),item:i(({props:E,item:A})=>[s(Se,{onClick:E.onClick},{append:i(()=>[s(ce,{color:C.value!==A.raw?"primary":"success",icon:C.value!==A.raw?"ri-pencil-line":"ri-check-fill",size:"small",variant:"text",onClick:de(q=>M(A.raw),["stop","prevent"])},null,8,["color","icon","onClick"])]),default:i(()=>[C.value===A.raw?(b(),ae(Te,{key:0,modelValue:C.value.title,"onUpdate:modelValue":f[1]||(f[1]=q=>C.value.title=q),"bg-color":"transparent",class:"mr-3",density:"compact",variant:"plain",autofocus:"","hide-details":"",onClick:f[2]||(f[2]=de(()=>{},["stop"])),onKeydown:f[3]||(f[3]=de(()=>{},["stop"])),onKeyup:$e(q=>M(A.raw),["enter"])},null,8,["modelValue","onKeyup"])):(b(),V("span",Nl,ee(A.raw.name),1))]),_:2},1032,["onClick"])]),_:1},8,["modelValue","search","items","loading"])]),_:1})}}},na=Re({__name:"TestPage",setup(l){return(C,d)=>(b(),V(N,null,[s(qt),s(ie,{class:"mt-4"},{default:i(()=>[s(Ve,null,{default:i(()=>[s(he,null,{default:i(()=>d[1]||(d[1]=[R(" Test Delete Confirm ")])),_:1})]),_:1}),s(be,null,{default:i(()=>[s(Ot,{onConfirmDelete:d[0]||(d[0]=()=>console.log("123"))})]),_:1})]),_:1}),s(ie,{class:"mt-4"},{default:i(()=>[s(Ve,null,{default:i(()=>[s(he,null,{default:i(()=>d[2]||(d[2]=[R(" Test ComboBox ")])),_:1})]),_:1}),s(be,null,{default:i(()=>[s(Ul)]),_:1})]),_:1}),s(ie,{class:"mt-4"},{default:i(()=>[s(Ve,null,{default:i(()=>[s(he,null,{default:i(()=>d[3]||(d[3]=[R(" Test DateInput ")])),_:1})]),_:1}),s(be)]),_:1}),s(ie,{class:"mt-4"},{default:i(()=>[s(Ve,null,{default:i(()=>[s(he,null,{default:i(()=>d[4]||(d[4]=[R(" Test File Upload ")])),_:1})]),_:1}),s(be,null,{default:i(()=>[s(tl)]),_:1})]),_:1}),s(ie,{class:"mt-4"},{default:i(()=>[s(Ve,null,{default:i(()=>[s(he,null,{default:i(()=>d[5]||(d[5]=[R(" Test Data Table ")])),_:1})]),_:1}),s(be,null,{default:i(()=>[s(Al)]),_:1})]),_:1})],64))}});export{na as default};
