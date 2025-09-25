import{V as x,_ as D}from"./VSwitch-BmYf_2zH.js";import{V as n,a as o}from"./VRow-BsjLpfsC.js";import{V as p,b as f}from"./VCard-xmUU3wq8.js";import{V as R}from"./VTextField-BgqqeF56.js";import{V as B}from"./VDivider-Dp3T9eB2.js";import{d as L,r as u,c as S,o as U,b as t,w as e,a as i,t as z,aa as b,y as a,V as c,_}from"./index-C9PB2hbs.js";import{V as s}from"./VChip-C2NefrEl.js";import"./VMenu-7ly74kTd.js";import"./index-DmDYS7t_.js";/* empty css              */import"./VAvatar-CpO2X6B0.js";import"./VImg-BY0_GS-P.js";import"./VSlideGroup-SziXHrOo.js";const N={class:"code-preview"},q="Tiptap Rich Text Editor Demo",I=L({__name:"TiptapDemo",setup(M){const d=u(`
<h1>歡迎使用 Tiptap 富文本編輯器</h1>
<p>這是一個功能豐富的 <strong>富文本編輯器</strong> 示例，基於 <em>Tiptap</em> 構建。</p>

<h2>主要功能</h2>
<ul>
  <li><strong>基本格式化</strong>：粗體、斜體、底線、刪除線</li>
  <li><span style="color: #e53e3e">文字顏色</span> 和 <mark style="background-color: #ffeb3b">高亮顯示</mark></li>
  <li>多級標題支持（H1-H3）</li>
  <li>清單項目（有序和無序）</li>
  <li>文字對齊（左、中、右）</li>
</ul>

<h3>程式碼支持</h3>
<p>支持行內 <code>程式碼</code> 和區塊程式碼：</p>
<pre><code>function hello() {
  console.log('Hello Tiptap!');
}</code></pre>

<blockquote>
  <p>這是一個引用區塊，可用於突出顯示重要內容。</p>
</blockquote>

<p style="text-align: center">你可以將文字置中對齊</p>
<p style="text-align: right">或者右對齊</p>

<p>試試看編輯這些內容，體驗 Tiptap 編輯器的強大功能！</p>
`),g=u(!1),v=u(!0),y=u("400px"),V=u(),T=r=>{console.log("Tiptap editor is ready:",r)},w=()=>{d.value=""},C=()=>{d.value=`
<h2>範例內容</h2>
<p>這是一段 <strong>範例文字</strong>，包含了各種格式。</p>
<ul>
  <li>項目一</li>
  <li>項目二</li>
</ul>
  `},k=()=>{var l;const r=(l=V.value)==null?void 0:l.getEditor();if(r){const m=r.getText(),E=r.getHTML();console.log("編輯器統計資訊:",{textLength:m.length,htmlLength:E.length})}},H=()=>{var r;(r=V.value)==null||r.focus()};return(r,l)=>(U(),S("div",null,[t(n,null,{default:e(()=>[t(o,{cols:"12"},{default:e(()=>[i("div",{class:"d-flex align-center justify-space-between mb-6"},[i("div",null,[i("h1",{class:"text-h3 font-weight-medium mb-2"},z(q)),l[4]||(l[4]=i("p",{class:"text-body-1 text-medium-emphasis mb-0"}," 功能豐富的富文本編輯器，基於 Tiptap 構建 ",-1))])])]),_:1})]),_:1}),t(n,null,{default:e(()=>[t(o,{cols:"12",lg:"4"},{default:e(()=>[t(p,{title:"編輯器設定","data-activity":"editor-config-panel"},{default:e(()=>[t(f,null,{default:e(()=>[t(n,null,{default:e(()=>[t(o,{cols:"12"},{default:e(()=>[t(x,{modelValue:g.value,"onUpdate:modelValue":l[0]||(l[0]=m=>g.value=m),label:"禁用編輯器",color:"primary","data-activity":"toggle-disabled"},null,8,["modelValue"])]),_:1}),t(o,{cols:"12"},{default:e(()=>[t(x,{modelValue:v.value,"onUpdate:modelValue":l[1]||(l[1]=m=>v.value=m),label:"顯示工具欄",color:"primary","data-activity":"toggle-toolbar"},null,8,["modelValue"])]),_:1}),t(o,{cols:"12"},{default:e(()=>[t(R,{modelValue:y.value,"onUpdate:modelValue":l[2]||(l[2]=m=>y.value=m),label:"編輯器高度",placeholder:"400px",density:"compact","data-activity":"editor-height-input"},null,8,["modelValue"])]),_:1})]),_:1}),t(B,{class:"my-4"}),t(n,null,{default:e(()=>[t(o,{cols:"12"},{default:e(()=>[l[9]||(l[9]=i("h6",{class:"text-h6 mb-3"}," 操作選項 ",-1)),t(b,{color:"primary",variant:"outlined",size:"small",class:"me-2 mb-2","data-activity":"focus-editor",onClick:H},{default:e(()=>[t(c,{icon:"ri-focus-line",class:"me-1"}),l[5]||(l[5]=a(" 聚焦編輯器 ",-1))]),_:1}),t(b,{color:"success",variant:"outlined",size:"small",class:"me-2 mb-2","data-activity":"insert-sample",onClick:C},{default:e(()=>[t(c,{icon:"ri-file-text-line",class:"me-1"}),l[6]||(l[6]=a(" 插入範例 ",-1))]),_:1}),t(b,{color:"info",variant:"outlined",size:"small",class:"me-2 mb-2","data-activity":"get-stats",onClick:k},{default:e(()=>[t(c,{icon:"ri-bar-chart-line",class:"me-1"}),l[7]||(l[7]=a(" 統計資訊 ",-1))]),_:1}),t(b,{color:"error",variant:"outlined",size:"small",class:"me-2 mb-2","data-activity":"clear-content",onClick:w},{default:e(()=>[t(c,{icon:"ri-delete-bin-line",class:"me-1"}),l[8]||(l[8]=a(" 清空內容 ",-1))]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),t(p,{title:"HTML 內容預覽",class:"mt-6","data-activity":"html-preview-panel"},{default:e(()=>[t(f,null,{default:e(()=>[i("pre",N,z(d.value),1)]),_:1})]),_:1})]),_:1}),t(o,{cols:"12",lg:"8"},{default:e(()=>[t(p,{title:"Tiptap 編輯器","data-activity":"tiptap-editor-panel"},{default:e(()=>[t(f,null,{default:e(()=>[t(D,{ref_key:"tiptapEditorRef",ref:V,modelValue:d.value,"onUpdate:modelValue":l[3]||(l[3]=m=>d.value=m),disabled:g.value,"show-toolbar":v.value,height:y.value,placeholder:"在此輸入您的內容...","data-activity":"tiptap-editor-instance",onReady:T},null,8,["modelValue","disabled","show-toolbar","height"])]),_:1})]),_:1}),t(p,{title:"功能說明",class:"mt-6","data-activity":"feature-info-panel"},{default:e(()=>[t(f,null,{default:e(()=>[t(n,null,{default:e(()=>[t(o,{cols:"12",sm:"6"},{default:e(()=>[l[14]||(l[14]=i("h6",{class:"text-h6 mb-2"}," 文字格式 ",-1)),t(s,{size:"small",class:"me-1 mb-1",color:"primary"},{default:e(()=>[...l[10]||(l[10]=[a(" 粗體 ",-1)])]),_:1}),t(s,{size:"small",class:"me-1 mb-1",color:"primary"},{default:e(()=>[...l[11]||(l[11]=[a(" 斜體 ",-1)])]),_:1}),t(s,{size:"small",class:"me-1 mb-1",color:"primary"},{default:e(()=>[...l[12]||(l[12]=[a(" 底線 ",-1)])]),_:1}),t(s,{size:"small",class:"me-1 mb-1",color:"primary"},{default:e(()=>[...l[13]||(l[13]=[a(" 刪除線 ",-1)])]),_:1})]),_:1}),t(o,{cols:"12",sm:"6"},{default:e(()=>[l[18]||(l[18]=i("h6",{class:"text-h6 mb-2"}," 標題等級 ",-1)),t(s,{size:"small",class:"me-1 mb-1",color:"secondary"},{default:e(()=>[...l[15]||(l[15]=[a(" H1 ",-1)])]),_:1}),t(s,{size:"small",class:"me-1 mb-1",color:"secondary"},{default:e(()=>[...l[16]||(l[16]=[a(" H2 ",-1)])]),_:1}),t(s,{size:"small",class:"me-1 mb-1",color:"secondary"},{default:e(()=>[...l[17]||(l[17]=[a(" H3 ",-1)])]),_:1})]),_:1}),t(o,{cols:"12",sm:"6"},{default:e(()=>[l[22]||(l[22]=i("h6",{class:"text-h6 mb-2"}," 列表和引用 ",-1)),t(s,{size:"small",class:"me-1 mb-1",color:"success"},{default:e(()=>[...l[19]||(l[19]=[a(" 無序列表 ",-1)])]),_:1}),t(s,{size:"small",class:"me-1 mb-1",color:"success"},{default:e(()=>[...l[20]||(l[20]=[a(" 有序列表 ",-1)])]),_:1}),t(s,{size:"small",class:"me-1 mb-1",color:"success"},{default:e(()=>[...l[21]||(l[21]=[a(" 引用塊 ",-1)])]),_:1})]),_:1}),t(o,{cols:"12",sm:"6"},{default:e(()=>[l[28]||(l[28]=i("h6",{class:"text-h6 mb-2"}," 其他功能 ",-1)),t(s,{size:"small",class:"me-1 mb-1",color:"warning"},{default:e(()=>[...l[23]||(l[23]=[a(" 文字顏色 ",-1)])]),_:1}),t(s,{size:"small",class:"me-1 mb-1",color:"warning"},{default:e(()=>[...l[24]||(l[24]=[a(" 高亮 ",-1)])]),_:1}),t(s,{size:"small",class:"me-1 mb-1",color:"warning"},{default:e(()=>[...l[25]||(l[25]=[a(" 連結 ",-1)])]),_:1}),t(s,{size:"small",class:"me-1 mb-1",color:"warning"},{default:e(()=>[...l[26]||(l[26]=[a(" 圖片 ",-1)])]),_:1}),t(s,{size:"small",class:"me-1 mb-1",color:"warning"},{default:e(()=>[...l[27]||(l[27]=[a(" 程式碼 ",-1)])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]))}}),Z=_(I,[["__scopeId","data-v-04eade27"]]);export{Z as default};
