import{b as D}from"./index-DXtOtbdz.js";import{D as te,I as L,E as le,be as ne,J as oe,aD as se,M as ae,aV as ie,k as re,aG as ue,x as b,y as g,aW as q,bF as ce,ap as B,h as fe,S as ve,b as p,V as N,as as de}from"./index-zKhGRW4j.js";function he(l){let{selectedElement:s,containerElement:o,isRtl:i,isHorizontal:v}=l;const d=m(v,o),a=U(v,i,o),h=m(v,s),c=$(v,s),S=h*.4;return a>c?c-S:a+d<c+h?c-d+h+S:a}function pe(l){let{selectedElement:s,containerElement:o,isHorizontal:i}=l;const v=m(i,o),d=$(i,s),a=m(i,s);return d-v/2+a/2}function K(l,s){const o=l?"scrollWidth":"scrollHeight";return(s==null?void 0:s[o])||0}function ge(l,s){const o=l?"clientWidth":"clientHeight";return(s==null?void 0:s[o])||0}function U(l,s,o){if(!o)return 0;const{scrollLeft:i,offsetWidth:v,scrollWidth:d}=o;return l?s?d-v+i:i:o.scrollTop}function m(l,s){const o=l?"offsetWidth":"offsetHeight";return(s==null?void 0:s[o])||0}function $(l,s){const o=l?"offsetLeft":"offsetTop";return(s==null?void 0:s[o])||0}const Se=Symbol.for("vuetify:v-slide-group"),ye=te({centerActive:Boolean,direction:{type:String,default:"horizontal"},symbol:{type:null,default:Se},nextIcon:{type:L,default:"$next"},prevIcon:{type:L,default:"$prev"},showArrows:{type:[Boolean,String],validator:l=>typeof l=="boolean"||["always","desktop","mobile"].includes(l)},...le(),...ne({mobile:null}),...oe(),...se({selectedClass:"v-slide-group-item--active"})},"VSlideGroup"),xe=ae()({name:"VSlideGroup",props:ye(),emits:{"update:modelValue":l=>!0},setup(l,s){let{slots:o}=s;const{isRtl:i}=ie(),{displayClasses:v,mobile:d}=re(l),a=ue(l,l.symbol),h=b(!1),c=b(0),S=b(0),_=b(0),r=g(()=>l.direction==="horizontal"),{resizeRef:u,contentRect:k}=q(),{resizeRef:f,contentRect:w}=q(),C=ce(),O=g(()=>({container:u.el,duration:200,easing:"easeOutQuart"})),J=g(()=>a.selected.value.length?a.items.value.findIndex(t=>t.id===a.selected.value[0]):-1),Q=g(()=>a.selected.value.length?a.items.value.findIndex(t=>t.id===a.selected.value[a.selected.value.length-1]):-1);if(B){let t=-1;fe(()=>[a.selected.value,k.value,w.value,r.value],()=>{cancelAnimationFrame(t),t=requestAnimationFrame(()=>{if(k.value&&w.value){const e=r.value?"width":"height";S.value=k.value[e],_.value=w.value[e],h.value=S.value+1<_.value}if(J.value>=0&&f.el){const e=f.el.children[Q.value];M(e,l.centerActive)}})})}const x=b(!1);function M(t,e){let n=0;e?n=pe({containerElement:u.el,isHorizontal:r.value,selectedElement:t}):n=he({containerElement:u.el,isHorizontal:r.value,isRtl:i.value,selectedElement:t}),G(n)}function G(t){if(!B||!u.el)return;const e=m(r.value,u.el),n=U(r.value,i.value,u.el);if(!(K(r.value,u.el)<=e||Math.abs(t-n)<16)){if(r.value&&i.value&&u.el){const{scrollWidth:V,offsetWidth:W}=u.el;t=V-W-t}r.value?C.horizontal(t,O.value):C(t,O.value)}}function j(t){const{scrollTop:e,scrollLeft:n}=t.target;c.value=r.value?n:e}function X(t){if(x.value=!0,!(!h.value||!f.el)){for(const e of t.composedPath())for(const n of f.el.children)if(n===e){M(n);return}}}function Y(t){x.value=!1}let E=!1;function Z(t){var e;!E&&!x.value&&!(t.relatedTarget&&((e=f.el)!=null&&e.contains(t.relatedTarget)))&&y(),E=!1}function H(){E=!0}function ee(t){if(!f.el)return;function e(n){t.preventDefault(),y(n)}r.value?t.key==="ArrowRight"?e(i.value?"prev":"next"):t.key==="ArrowLeft"&&e(i.value?"next":"prev"):t.key==="ArrowDown"?e("next"):t.key==="ArrowUp"&&e("prev"),t.key==="Home"?e("first"):t.key==="End"&&e("last")}function z(t,e){if(!t)return;let n=t;do n=n==null?void 0:n[e==="next"?"nextElementSibling":"previousElementSibling"];while(n!=null&&n.hasAttribute("disabled"));return n}function y(t){if(!f.el)return;let e;if(!t)e=de(f.el)[0];else if(t==="next"){if(e=z(f.el.querySelector(":focus"),t),!e)return y("first")}else if(t==="prev"){if(e=z(f.el.querySelector(":focus"),t),!e)return y("last")}else t==="first"?(e=f.el.firstElementChild,e!=null&&e.hasAttribute("disabled")&&(e=z(e,"next"))):t==="last"&&(e=f.el.lastElementChild,e!=null&&e.hasAttribute("disabled")&&(e=z(e,"prev")));e&&e.focus({preventScroll:!0})}function R(t){const e=r.value&&i.value?-1:1,n=(t==="prev"?-e:e)*S.value;let P=c.value+n;if(r.value&&i.value&&u.el){const{scrollWidth:V,offsetWidth:W}=u.el;P+=V-W}G(P)}const A=g(()=>({next:a.next,prev:a.prev,select:a.select,isSelected:a.isSelected})),F=g(()=>{switch(l.showArrows){case"always":return!0;case"desktop":return!d.value;case!0:return h.value||Math.abs(c.value)>0;case"mobile":return d.value||h.value||Math.abs(c.value)>0;default:return!d.value&&(h.value||Math.abs(c.value)>0)}}),T=g(()=>Math.abs(c.value)>1),I=g(()=>{if(!u.value)return!1;const t=K(r.value,u.el),e=ge(r.value,u.el);return t-e-Math.abs(c.value)>1});return ve(()=>p(l.tag,{class:["v-slide-group",{"v-slide-group--vertical":!r.value,"v-slide-group--has-affixes":F.value,"v-slide-group--is-overflowing":h.value},v.value,l.class],style:l.style,tabindex:x.value||a.selected.value.length?-1:0,onFocus:Z},{default:()=>{var t,e,n;return[F.value&&p("div",{key:"prev",class:["v-slide-group__prev",{"v-slide-group__prev--disabled":!T.value}],onMousedown:H,onClick:()=>T.value&&R("prev")},[((t=o.prev)==null?void 0:t.call(o,A.value))??p(D,null,{default:()=>[p(N,{icon:i.value?l.nextIcon:l.prevIcon},null)]})]),p("div",{key:"container",ref:u,class:"v-slide-group__container",onScroll:j},[p("div",{ref:f,class:"v-slide-group__content",onFocusin:X,onFocusout:Y,onKeydown:ee},[(e=o.default)==null?void 0:e.call(o,A.value)])]),F.value&&p("div",{key:"next",class:["v-slide-group__next",{"v-slide-group__next--disabled":!I.value}],onMousedown:H,onClick:()=>I.value&&R("next")},[((n=o.next)==null?void 0:n.call(o,A.value))??p(D,null,{default:()=>[p(N,{icon:i.value?l.prevIcon:l.nextIcon},null)]})])]}})),{selected:a.selected,scrollTo:R,scrollOffset:c,focus:y,hasPrev:T,hasNext:I}}});export{xe as V,ye as m};
