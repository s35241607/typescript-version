import{D as Fe,E as Oe,ad as qe,q as N,y as Z,x as ue,a2 as Me,L as $e,b as a,N as Y,aG as ee,d as he,r as k,al as Ee,i as ye,c as _,o as w,a as n,ab as q,a8 as B,w as s,A as b,n as Ae,F as W,a6 as Le,V as K,t as v,f as j,aa as Ge,am as He,_ as xe,Z as We,l as je,ah as Ke,u as Xe,X as te,aH as ae}from"./index-DeF3NdgD.js";import{p as Ze,m as Je,e as Qe}from"./mockService-BsrnTrgt.js";import{a as me}from"./index-t--hEgTQ.js";import{V as le,b as G,a as se,c as ne}from"./VCard-Br5OfnGO.js";import{c as Ye,d as et,e as tt,a as ce}from"./VSelect-CJ58387q.js";import{V as pe}from"./VSpacer-B1FWSyae.js";import{V as X,a as h}from"./VRow-BiwOCW4R.js";import{V as H}from"./VTextField-UnOTQSJX.js";import{c as at,a as lt,b as st,d as nt,u as ot,p as it,e as rt,f as dt,g as ut,h as mt,i as ct,j as pt,k as ve,l as fe,m as vt,n as ft,o as gt,q as ht}from"./VDataTable-Cy7Q4oyV.js";import{V as ge}from"./VTable-BB0eFgnD.js";import"./VAvatar-DqAnTvCk.js";import"./VImg--7l6Zs3p.js";import"./VMenu-DqAKl7zp.js";import"./index-UxHnQSaQ.js";import"./ssrBoot-BeoO1NeA.js";import"./VDivider-DGl663qV.js";import"./VSlideGroup-BLU5FaFD.js";/* empty css              */const yt=Oe({...gt(),...ft(),...et(),...vt()},"VDataTableVirtual"),xt=Fe()({name:"VDataTableVirtual",props:yt(),emits:{"update:modelValue":r=>!0,"update:sortBy":r=>!0,"update:options":r=>!0,"update:groupBy":r=>!0,"update:expanded":r=>!0},setup(r,u){let{attrs:p,slots:d}=u;const{groupBy:f}=at(r),{sortBy:V,multiSort:P,mustSort:D}=lt(r),{disableSort:T}=qe(r),{columns:y,headers:R,filterFunctions:M,sortFunctions:$,sortRawFunctions:I}=st(r,{groupBy:f,showSelect:N(r,"showSelect"),showExpand:N(r,"showExpand")}),{items:E}=nt(r,y),z=N(r,"search"),{filteredItems:A}=ot(r,E,z,{transform:S=>S.columns,customKeyFilter:M}),{toggleSort:g}=it({sortBy:V,multiSort:P,mustSort:D}),{sortByWithGroups:e,opened:t,extractRows:i,isGroupOpen:x,toggleGroup:F}=rt({groupBy:f,sortBy:V,disableSort:T}),{sortedItems:l}=dt(r,A,e,{transform:S=>({...S.raw,...S.columns}),sortFunctions:$,sortRawFunctions:I}),{flatItems:o}=ut(l,f,t),m=Z(()=>i(o.value)),{isSelected:c,select:U,selectAll:J,toggleSelect:be,someSelected:we,allSelected:ke}=mt(r,{allItems:m,currentPage:m}),{isExpanded:Ve,toggleExpand:_e}=ct(r),{containerRef:De,markerRef:Se,paddingTop:Pe,paddingBottom:Ie,computedItems:Te,handleItemResize:Ue,handleScroll:Ce,handleScrollend:Be}=Ye(r,o),ze=Z(()=>Te.value.map(S=>S.raw));pt({sortBy:V,page:ue(1),itemsPerPage:ue(-1),groupBy:f,search:z}),Me({VDataTableRows:{hideNoData:N(r,"hideNoData"),noDataText:N(r,"noDataText"),loading:N(r,"loading"),loadingText:N(r,"loadingText")}});const L=Z(()=>({sortBy:V.value,toggleSort:g,someSelected:we.value,allSelected:ke.value,isSelected:c,select:U,selectAll:J,toggleSelect:be,isExpanded:Ve,toggleExpand:_e,isGroupOpen:x,toggleGroup:F,items:m.value.map(S=>S.raw),internalItems:m.value,groupedItems:o.value,columns:y.value,headers:R.value}));$e(()=>{const S=ve.filterProps(r),Ne=fe.filterProps(r),Re=ge.filterProps(r);return a(ge,Y({class:["v-data-table",{"v-data-table--loading":r.loading},r.class],style:r.style},Re,{fixedHeader:r.fixedHeader||r.sticky}),{top:()=>{var C;return(C=d.top)==null?void 0:C.call(d,L.value)},wrapper:()=>{var C,oe,ie;return a("div",{ref:De,onScrollPassive:Ce,onScrollend:Be,class:"v-table__wrapper",style:{height:ee(r.height)}},[a("table",null,[(C=d.colgroup)==null?void 0:C.call(d,L.value),!r.hideDefaultHeader&&a("thead",{key:"thead"},[a(ve,S,d)]),!r.hideDefaultBody&&a("tbody",null,[a("tr",{ref:Se,style:{height:ee(Pe.value),border:0}},[a("td",{colspan:y.value.length,style:{height:0,border:0}},null)]),(oe=d["body.prepend"])==null?void 0:oe.call(d,L.value),a(fe,Y(p,Ne,{items:ze.value}),{...d,item:O=>a(tt,{key:O.internalItem.index,renderless:!0,"onUpdate:height":Q=>Ue(O.internalItem.index,Q)},{default:Q=>{var de;let{itemRef:re}=Q;return((de=d.item)==null?void 0:de.call(d,{...O,itemRef:re}))??a(ht,Y(O.props,{ref:re,key:O.internalItem.index,index:O.internalItem.index}),d)}})}),(ie=d["body.append"])==null?void 0:ie.call(d,L.value),a("tr",{style:{height:ee(Ie.value),border:0}},[a("td",{colspan:y.value.length,style:{height:0,border:0}},null)])])])])},bottom:()=>{var C;return(C=d.bottom)==null?void 0:C.call(d,L.value)}})})}}),bt={class:"file-upload-container"},wt={class:"upload-area"},kt={key:0,class:"file-list"},Vt=["onClick"],_t={class:"file-details"},Dt={class:"file-name"},St={class:"file-size"},Pt={class:"file-actions"},It={class:"progress-container"},Tt=he({__name:"FileUploader",props:{initialAttachments:{type:Array,default:()=>[]},uploadUrl:{type:String,default:"/api/attachments/upload"},deleteUrl:{type:String,default:"/api/attachments/delete"},relatedId:{type:[String,Number],default:null},relatedType:{type:String,default:null}},emits:["update:attachments","upload-success","upload-error","delete-success","delete-error"],setup(r,{emit:u}){const p=r,d=u,f=k([]),V=k(null),P=k(!1),D=k({}),T=Ee({}),y=k({});ye(()=>{p.initialAttachments&&p.initialAttachments.length>0&&(f.value=[...p.initialAttachments])});const R=()=>Date.now().toString(36)+Math.random().toString(36).substring(2),M=l=>l.startsWith("image/")?"ri-image-line":l.startsWith("video/")?"ri-video-line":l.startsWith("audio/")?"ri-music-line":l.includes("pdf")?"ri-file-pdf-line":l.includes("word")||l.includes("document")?"ri-file-word-line":l.includes("excel")||l.includes("sheet")?"ri-file-excel-line":l.includes("powerpoint")||l.includes("presentation")?"ri-file-ppt-line":l.includes("zip")||l.includes("compressed")?"ri-file-zip-line":"ri-file-line",$=l=>{if(l===0)return"0 Bytes";const o=1024,m=["Bytes","KB","MB","GB"],c=Math.floor(Math.log(l)/Math.log(o));return`${Number.parseFloat((l/o**c).toFixed(2))} ${m[c]}`},I=async l=>{D.value[l.id]=0,y.value[l.id]="";try{const o=new FormData;l.file&&o.append("file",l.file),p.relatedId&&o.append("relatedId",p.relatedId.toString()),p.relatedType&&o.append("relatedType",p.relatedType);const m=await me.post(p.uploadUrl,o,{headers:{"Content-Type":"multipart/form-data"},onUploadProgress:c=>{if(c.total){const U=Math.round(c.loaded*100/c.total);D.value[l.id]=U}}});if(m.data&&m.data.id){const c=f.value.findIndex(U=>U.id===l.id);c!==-1&&(f.value[c]={...f.value[c],id:m.data.id,url:m.data.url||f.value[c].url})}return T[l.id]=!0,setTimeout(()=>{T[l.id]=!1},1500),d("upload-success",m.data),d("update:attachments",f.value),m.data}catch(o){throw console.error("上傳失敗",o),y.value[l.id]="上傳失敗",D.value[l.id]=0,d("upload-error",{fileId:l.id,error:o}),o}},E=()=>{V.value&&V.value.click()},z=l=>{l&&Array.from(l).forEach(o=>{if(!f.value.some(c=>c.name===o.name&&c.size===o.size)){const c={name:o.name,size:o.size,type:o.type,url:URL.createObjectURL(o),file:o,id:R()};f.value.push(c),I(c).catch(()=>{const U=f.value.findIndex(J=>J.id===c.id);U!==-1&&f.value.splice(U,1)})}})},A=l=>{const o=l.target;z(o.files),o&&(o.value="")},g=l=>{l.preventDefault(),P.value=!0},e=l=>{l.preventDefault(),P.value=!0},t=()=>{P.value=!1},i=l=>{var o;l.preventDefault(),P.value=!1,z(((o=l.dataTransfer)==null?void 0:o.files)||null)},x=l=>{if(l.file){const o=document.createElement("a");o.href=l.url,o.download=l.name,document.body.appendChild(o),o.click(),document.body.removeChild(o)}else window.open(l.url,"_blank")},F=async l=>{const o=f.value.findIndex(c=>c.id===l);if(o===-1)return;const m=f.value[o];try{m.file?m.url.startsWith("blob:")&&URL.revokeObjectURL(m.url):await me.delete(`${p.deleteUrl}/${l}`),f.value.splice(o,1),delete D.value[l],delete T[l],delete y.value[l],d("delete-success",l),d("update:attachments",f.value)}catch(c){console.error("刪除失敗",c),d("delete-error",{fileId:l,error:c})}};return(l,o)=>(w(),_("div",bt,[n("div",wt,[a(B,{variant:"tonal",color:"primary",size:"small","prepend-icon":"ri-upload-line",onClick:E},{default:s(()=>o[0]||(o[0]=[b(" 選擇文件 ")])),_:1}),n("div",{class:Ae(["dropzone",{"is-dragging":P.value}]),onDragenter:g,onDragover:e,onDragleave:t,onDrop:i},o[1]||(o[1]=[n("span",{class:"text-caption text-medium-emphasis"},"拖放文件至此",-1)]),34)]),n("input",{ref_key:"fileInput",ref:V,type:"file",hidden:"",multiple:"",onChange:A},null,544),f.value.length>0?(w(),_("div",kt,[(w(!0),_(W,null,Le(f.value,m=>(w(),_("div",{key:m.id,class:"file-item"},[n("div",{class:"file-info",onClick:c=>x(m)},[a(K,{icon:M(m.type),size:"small",color:"primary"},null,8,["icon"]),n("div",_t,[n("div",Dt,v(m.name),1),n("div",St,v($(m.size)),1)])],8,Vt),n("div",Pt,[n("div",It,[D.value[m.id]<100?(w(),j(Ge,{key:0,"model-value":D.value[m.id],size:16,width:2,color:"primary"},null,8,["model-value"])):q("",!0),a(He,{name:"checkmark-fly"},{default:s(()=>[T[m.id]?(w(),j(K,{key:0,icon:"ri-check-line",color:"success",size:"small",class:"checkmark-icon"})):q("",!0)]),_:2},1024),y.value[m.id]?(w(),j(K,{key:1,icon:"ri-error-warning-line",color:"error",size:"small",title:y.value[m.id]},null,8,["title"])):q("",!0)]),a(B,{icon:"",variant:"text",color:"error",size:"small",onClick:c=>F(m.id)},{default:s(()=>[a(K,{size:"small",icon:"ri-close-line"})]),_:2},1032,["onClick"])])]))),128))])):q("",!0)]))}}),Ut=xe(Tt,[["__scopeId","data-v-a02b9ea0"]]),Ct={class:"d-flex gap-2 align-center mb-2 flex-wrap"},Bt={class:"text-h5"},zt={class:"d-flex gap-2"},Nt={class:"text-high-emphasis font-weight-medium"},Rt={class:"text-high-emphasis font-weight-medium"},Ft={class:"text-high-emphasis font-weight-medium"},Ot={class:"text-high-emphasis font-weight-medium"},qt={class:"text-high-emphasis font-weight-medium"},Mt={class:"text-high-emphasis font-weight-medium"},$t={class:"text-high-emphasis font-weight-medium"},Et={class:"text-high-emphasis font-weight-medium"},At={class:"text-high-emphasis font-weight-medium"},Lt={class:"text-high-emphasis font-weight-medium"},Gt={class:"text-high-emphasis font-weight-medium"},Ht={class:"text-high-emphasis font-weight-medium"},Wt={class:"text-high-emphasis font-weight-medium"},jt={class:"text-high-emphasis font-weight-medium"},Kt={class:"attachment-field"},Xt={colspan:"8"},Zt=["onUpdate:modelValue"],Jt=["onUpdate:modelValue"],Qt=["onUpdate:modelValue"],Yt=he({__name:"TestPriceTableDetailPage",setup(r){const u=k({}),p=k({}),d=k(),f=k(),V=k([]),P=g=>{V.value=g},D=g=>{console.log("文件上傳成功:",g)},T=g=>{console.error("文件上傳失敗:",g)},y=k(!1),R=[g=>!!g||"Date is required",g=>{const e=new Date(g);return!Number.isNaN(e.getTime())||"Invalid date format"}],M=k([{title:"",key:"data-table-group"},{title:"#",key:"sequence"},{title:"Type",key:"type"},{title:"P/N",key:"eqpOption.partNumber"},{title:"Supplier P/N",key:"eqpOption.supplierPartNumber"},{title:"Description",key:"eqpOption.description"},{title:"Saving Base",key:"savingBase"},{title:"List Price",key:"listPrice"},{title:"Reference Price",key:"referencePrice"}]),$=k([]),I=k([]),E=(g,e)=>{const t=I.value.indexOf(e.item.id);console.log("expand",t),t===-1?I.value.push(e.item.id):I.value.splice(t,1)},z=g=>{u.value.items=u.value.items.filter(e=>e.id!==g.id)},A=Z(()=>{var g;return(((g=u.value)==null?void 0:g.items)||[]).map(e=>{var i;const t=e.eqpOptionId?((i=f.value)==null?void 0:i[e.eqpOptionId])??{}:{};return{...e,eqpOption:t}})});return We(async()=>{var i;const e=je().params.id,t=await Ze.getPriceTableById(Number(e));if(t&&(u.value=t),console.log(u.value),p.value=await Je.getMachineById(Number((i=u.value)==null?void 0:i.machineId)),console.log(p.value),d.value=await Qe.getEqpOptions(),f.value=d.value.reduce((x,F)=>(x[F.id]=F,x),{}),u.value.id)try{const x=[];V.value=x}catch(x){console.error("獲取附件失敗",x)}}),ye(()=>{Object.values($.value).forEach(g=>{g.toggleGroup(g.item)})}),(g,e)=>(w(),_(W,null,[a(le,{class:"d-flex justify-space-between align-center flex-wrap gap-y-4 mb-6"},{default:s(()=>[a(G,null,{default:s(()=>{var t;return[n("div",Ct,[n("h5",Bt,v((t=u.value)==null?void 0:t.orderNumber),1),n("div",zt,[a(ce,{color:"warning",variant:"tonal",size:"small"},{default:s(()=>{var i;return[b(v((i=u.value)==null?void 0:i.status),1)]}),_:1}),a(ce,{color:"info",variant:"tonal",size:"small"},{default:s(()=>{var i;return[b(v((i=u.value)==null?void 0:i.currency),1)]}),_:1})]),a(pe),a(B,{size:"small"},{default:s(()=>e[7]||(e[7]=[b(" Submit ")])),_:1}),a(B,{color:"error",variant:"outlined",size:"small"},{default:s(()=>e[8]||(e[8]=[b(" Delete ")])),_:1})]),a(X,null,{default:s(()=>[a(h,{cols:"12",sm:"3"},{default:s(()=>{var i;return[e[9]||(e[9]=n("div",null," Created By ",-1)),n("span",Nt,v((i=u.value)==null?void 0:i.createdBy),1)]}),_:1}),a(h,{cols:"12",sm:"3"},{default:s(()=>{var i,x;return[e[10]||(e[10]=n("div",null," Created At ",-1)),n("span",Rt,v((x=(i=u.value)==null?void 0:i.createdAt)==null?void 0:x.toLocaleDateString("en-US",{weekday:"short",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:!1})),1)]}),_:1}),a(h,{cols:"12",sm:"3"},{default:s(()=>{var i;return[e[11]||(e[11]=n("div",null," Last Updated By ",-1)),n("span",Ft,v((i=u.value)==null?void 0:i.updatedBy),1)]}),_:1}),a(h,{cols:"12",sm:"3"},{default:s(()=>{var i,x;return[e[12]||(e[12]=n("div",null," Last Updated At ",-1)),n("span",Ot,v((x=(i=u.value)==null?void 0:i.updatedAt)==null?void 0:x.toLocaleDateString("en-US",{weekday:"short",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:!1})),1)]}),_:1})]),_:1})]}),_:1})]),_:1}),p.value?(w(),j(le,{key:0,class:"mb-6"},{default:s(()=>[a(ne,null,{default:s(()=>[a(se,null,{default:s(()=>e[13]||(e[13]=[b(" Machine Information ")])),_:1})]),_:1}),a(G,null,{default:s(()=>[a(X,null,{default:s(()=>[a(h,{cols:"12",lg:"3",md:"3",sm:"4"},{default:s(()=>{var t;return[e[14]||(e[14]=n("div",null,"Maker",-1)),n("span",qt,v((t=p.value)==null?void 0:t.maker),1)]}),_:1}),a(h,{cols:"12",lg:"3",md:"3",sm:"4"},{default:s(()=>{var t;return[e[15]||(e[15]=n("div",null,"Model Name",-1)),n("span",Mt,v((t=p.value)==null?void 0:t.modelName),1)]}),_:1}),a(h,{cols:"12",lg:"3",md:"3",sm:"4"},{default:s(()=>{var t;return[e[16]||(e[16]=n("div",null,"Process",-1)),n("span",$t,v((t=p.value)==null?void 0:t.process),1)]}),_:1}),a(h,{cols:"12",lg:"3",md:"3",sm:"4"},{default:s(()=>{var t;return[e[17]||(e[17]=n("div",null,"Location",-1)),n("span",Et,v((t=p.value)==null?void 0:t.location),1)]}),_:1}),a(h,{cols:"12",lg:"3",md:"3",sm:"4"},{default:s(()=>{var t;return[e[18]||(e[18]=n("div",null,"Status",-1)),n("span",At,v((t=p.value)==null?void 0:t.status),1)]}),_:1}),a(h,{cols:"12",lg:"3",md:"3",sm:"4"},{default:s(()=>{var t;return[e[19]||(e[19]=n("div",null,"Serial Number",-1)),n("span",Lt,v((t=p.value)==null?void 0:t.serialNumber),1)]}),_:1}),a(h,{cols:"12",lg:"3",md:"3",sm:"4"},{default:s(()=>{var t;return[e[20]||(e[20]=n("div",null,"Installation Date",-1)),n("span",Gt,v((t=p.value)==null?void 0:t.installationDate),1)]}),_:1}),a(h,{cols:"12",lg:"3",md:"3",sm:"4"},{default:s(()=>{var t;return[e[21]||(e[21]=n("div",null,"Last Maintenance",-1)),n("span",Ht,v((t=p.value)==null?void 0:t.lastMaintenance),1)]}),_:1}),a(h,{cols:"12",lg:"3",md:"3",sm:"4"},{default:s(()=>{var t;return[e[22]||(e[22]=n("div",null,"Warranty Period",-1)),n("span",Wt,v((t=p.value)==null?void 0:t.warrantyPeriod),1)]}),_:1}),a(h,{cols:"12",lg:"3",md:"3",sm:"4"},{default:s(()=>{var t;return[e[23]||(e[23]=n("div",null,"Production Capacity",-1)),n("span",jt,v((t=p.value)==null?void 0:t.productionCapacity),1)]}),_:1})]),_:1})]),_:1})]),_:1})):q("",!0),u.value?(w(),j(le,{key:1,class:"mb-6"},{default:s(()=>[a(ne,null,{default:s(()=>[a(se,{class:"d-flex"},{default:s(()=>[e[25]||(e[25]=n("span",null,"Price Table Information",-1)),a(pe),a(B,{size:"small"},{default:s(()=>e[24]||(e[24]=[b(" Save ")])),_:1})]),_:1})]),_:1}),a(G,null,{default:s(()=>[a(X,null,{default:s(()=>[a(h,{cols:"12",md:"3",sm:"6"},{default:s(()=>[e[26]||(e[26]=n("label",null,"Currency",-1)),a(H,{modelValue:u.value.currency,"onUpdate:modelValue":e[0]||(e[0]=t=>u.value.currency=t)},null,8,["modelValue"])]),_:1}),a(h,{cols:"12",md:"3",sm:"6"},{default:s(()=>[e[27]||(e[27]=n("label",null,"Owner",-1)),a(H,{modelValue:u.value.ownerId,"onUpdate:modelValue":e[1]||(e[1]=t=>u.value.ownerId=t)},null,8,["modelValue"])]),_:1}),a(h,{cols:`
            12`,md:"3",sm:"6"},{default:s(()=>[e[28]||(e[28]=n("label",null,"Contract Start Date",-1)),a(H,{modelValue:u.value.contractStartDate,"onUpdate:modelValue":e[2]||(e[2]=t=>u.value.contractStartDate=t),rules:R},null,8,["modelValue"])]),_:1}),a(h,{cols:"12",md:"3",sm:"6"},{default:s(()=>[e[29]||(e[29]=n("label",null,"Contract End Date",-1)),a(H,{modelValue:u.value.contractEndDate,"onUpdate:modelValue":e[3]||(e[3]=t=>u.value.contractEndDate=t),rules:R},null,8,["modelValue"])]),_:1})]),_:1}),a(X,null,{default:s(()=>[a(h,{cols:"12",md:"6"},{default:s(()=>[e[30]||(e[30]=n("label",null,"Remark",-1)),a(H,{modelValue:u.value.remark,"onUpdate:modelValue":e[4]||(e[4]=t=>u.value.remark=t)},null,8,["modelValue"])]),_:1}),a(h,{cols:"12",md:"6"},{default:s(()=>[e[31]||(e[31]=n("label",null,"Attachment",-1)),n("div",Kt,[a(Ut,{"initial-attachments":V.value,"related-id":u.value.id,"related-type":"price-table","upload-url":"/api/attachments/upload","delete-url":"/api/attachments/delete","onUpdate:attachments":P,onUploadSuccess:D,onUploadError:T},null,8,["initial-attachments","related-id"])])]),_:1})]),_:1})]),_:1}),a(ne,null,{default:s(()=>[a(se,null,{default:s(()=>e[32]||(e[32]=[b("Price Table Items")])),_:1})]),_:1}),a(G,{class:"d-flex gap-2"},{default:s(()=>[a(B,null,{default:s(()=>e[33]||(e[33]=[b("Choose P/N")])),_:1}),a(B,{onClick:e[5]||(e[5]=t=>y.value=!y.value)},{default:s(()=>e[34]||(e[34]=[b(" Edit ")])),_:1})]),_:1}),a(G,null,{default:s(()=>[a(xt,{expanded:I.value,"onUpdate:expanded":e[6]||(e[6]=t=>I.value=t),headers:M.value,items:Xe(A),"show-expand":"","group-by":[{key:"eqpOption.category",order:"asc"}],"item-grouping":"",height:"60vh","fixed-header":"","onClick:row":Ke(E,["stop"])},{"item.data-table-group":s(({item:t})=>[a(B,{size:"small",variant:"text",color:"error",icon:"ri-delete-bin-line",onClick:i=>z(t)},null,8,["onClick"])]),"item.sequence":s(t=>[b(v(t.index),1)]),"item.eqpOption.description":s(({item:t})=>[b(v(t.eqpOption.description),1)]),"expanded-row":s(({item:t})=>{var i;return[n("tr",null,[n("td",Xt,[e[35]||(e[35]=n("strong",null,"Supplement:",-1)),b(" "+v(((i=t.eqpOption)==null?void 0:i.supplement)||"N/A"),1)])])]}),"item.savingBase":s(({item:t})=>[y.value?te((w(),_("input",{key:0,"onUpdate:modelValue":i=>t.savingBase=i,type:"text",class:"editable-input",placeholder:"請輸入保存基準",style:{padding:"5px",border:"1px solid #007bff","border-radius":"4px","inline-size":"100%","text-align":"end"}},null,8,Zt)),[[ae,t.savingBase]]):(w(),_(W,{key:1},[b(v(t.savingBase),1)],64))]),"item.listPrice":s(({item:t})=>[y.value?te((w(),_("input",{key:0,"onUpdate:modelValue":i=>t.listPrice=i,type:"text"},null,8,Jt)),[[ae,t.listPrice]]):(w(),_(W,{key:1},[b(v(t.listPrice),1)],64))]),"item.referencePrice":s(({item:t})=>[y.value?te((w(),_("input",{key:0,"onUpdate:modelValue":i=>t.referencePrice=i,type:"text"},null,8,Qt)),[[ae,t.referencePrice]]):(w(),_(W,{key:1},[b(v(t.referencePrice),1)],64))]),_:1},8,["expanded","headers","items"])]),_:1})]),_:1})):q("",!0)],64))}}),ya=xe(Yt,[["__scopeId","data-v-fec5908d"]]);export{ya as default};
