var e=Object.defineProperty,t=Object.defineProperties,n=Object.getOwnPropertyDescriptors,r=Object.getOwnPropertySymbols,s=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,a=(t,n,r)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[n]=r,i=(e,t)=>{for(var n in t||(t={}))s.call(t,n)&&a(e,n,t[n]);if(r)for(var n of r(t))o.call(t,n)&&a(e,n,t[n]);return e};function l(e){const t=`on${e.charAt(0).toUpperCase()}${e.slice(1)}Changed`;return function(...e){this[t]&&this[t](...e)}}function c(e,t,n){Object.defineProperty(e,t,{get(){return this.__props[t]},set(e){const r=this[t];this.__props[t]=e,this.rendered&&r!==e&&(n.onChange&&n.onChange.call(this,e,r),this.update())}})}function d(e=""){return document.createTextNode(e)}function h(e,t){return!(!e||!e.nodeType||t&&e.nodeType!==t)}function u(e,t){const[n,r]=[].concat(t);n.parentNode&&(r&&n.nextSibling!==r&&p(n.nextSibling,r),n.parentNode.replaceChild(e,n))}function p(e,t=null,n=e.parentNode){if(n)for(;e!==t;){const t=e.nextSibling;n.removeChild(e),e=t}}function f(e,t,n=t.parentNode){const[r,s]=e.range,o=t.nextSibling;let a=r;do{const e=a.nextSibling;n.insertBefore(a,o),a=e}while(a!==s);n.insertBefore(s,o)}function g(e){let t=0;for(;e=e.previousSibling;)t++;return t}function b(e){const t=[];for(;e.parentNode;)t.unshift(g(e)),e=e.parentNode;return t}const m=Symbol();function y(e,t){return v(e)&&v(t)&&e.strings===t.strings}function v(e){return e&&e[m]}const x=`__${Math.random().toString().slice(2)}_`,C=new RegExp(`\x3c!--${x}(\\d+)--\x3e|${x}(\\d+)`),N=/^(?:style|textarea)$/i;function S(e){const t=C.exec(e);return C.lastIndex=0,t?Number(t[1]||t[2]):-1}const k=[],$=[],w=[],O=window.requestAnimationFrame;let _=!1,E=0;function j(e,t){let n=0;const r=e.length;for(;Date.now()<t&&n<r;){const t=e[n++];t.task(...t.args),t.args=void 0,t.scheduled=!1}e.splice(0,n)}function A(){E++;const e=Date.now()+10*Math.ceil(.01*E);j(k,e),j($,e),k.length>0&&($.push(...k),k.length=0),$.length>0?O(A):(j(w,Number.MAX_SAFE_INTEGER),_=!1,E=0)}function T(e,t=1){const n={task:e,args:[],scheduled:!1,firstRun:!0};return(...r)=>{var s,o;n.firstRun?(n.firstRun=!1,e(...r)):(n.args=r,n.scheduled||(o=t,(s=n).scheduled=!0,1===o?k.push(s):0===o?$.push(s):3===o&&w.push(s),_||(_=!0,O(A))))}}class R{constructor(e,t,n){this.element=e,this.name=t,this.namespaceURI=n,this.requestUpdate=T((e=>{const{name:t,element:n,namespaceURI:r}=this;"ownerSVGElement"in n?n.setAttributeNS(r,t,e):t in n?n[t]=e:void 0!==e?n.setAttribute(t,e):n.hasAttribute(t)&&n.removeAttribute(t),this.value=e}))}update(e){e!==this.value&&this.requestUpdate(e)}}class P{constructor(e){this.requestUpdate=T((e=>{var t;(t=e)!==Object(t)?this.updateText(e):Array.isArray(e)?e=this.updateArray(e):y(e,this.element)?this.updateTemplate(e.values):this.replaceWith(e),this.value=e})),this.element=this.placeholder=e}updateArray(e){this.replaceWith(this.placeholder);const t=this.value instanceof Map?this.value:new Map;let n=this.element;const r=new Set;for(let s=0,o=e.length;s<o;s++){const o=e[s],a=String(o.key||s);let i=t.get(a);if(i)y(i,o)?i.update(o.values):(u(o.create(),i.range),t.set(a,i=o));else{const e=o.create();n.parentNode.insertBefore(e,n.nextSibling),t.set(a,i=o)}n.nextSibling!==i.range[0]&&f(i,n),n=i.range[1],r.add(a)}return t.forEach(((e,t,n)=>{r.has(t)||(e.delete(),n.delete(t))})),t}replaceWith(e){const{element:t,value:n,placeholder:r}=this;null==e&&(e=r),t!==e&&(n instanceof Map&&(n.forEach((e=>e.delete())),n.clear()),this.element=e,u(v(e)?e.create():e,v(t)?t.range:t))}updateText(e){h(this.element,Node.TEXT_NODE)||this.replaceWith(d()),this.element.textContent=e}updateTemplate(e){this.element.update(e)}update(e){e!==this.value&&this.requestUpdate(e)}}function U(){return NodeFilter.FILTER_ACCEPT}function M(e,t){const n=e.attributes;let r=n.length;for(;r--;){const{name:s,value:o,namespaceURI:a}=n.item(r),i=S(o);~i&&(e.removeAttribute(s),t[i]={type:R,name:s,namespaceURI:a,nodePath:b(e)})}}function I(e,t){const n=S(e.data);~n&&(t[n]={type:P,nodePath:b(e)},e.nodeValue="")}function L(e,t){let n;for(;null!==(n=C.exec(e.data));){const r=d();(e=e.splitText(n.index)).deleteData(0,n[0].length),e.parentNode.insertBefore(r,e),t[Number(n[1]||n[2])]={type:P,nodePath:b(r)}}}function W(e){const t=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_COMMENT,U,!1),n=[];for(;t.nextNode();){const e=t.currentNode;if(h(e,Node.ELEMENT_NODE)){if(M(e,n),N.test(e.tagName))for(const t of e.childNodes)L(t,n)}else I(e,n)}return n}U.acceptNode=U;const B=new WeakMap;var D;class F{constructor(e,t,n){this[D]=!0,this.values=t,this.strings=e,this.context=n}withKey(e){return this.key=e,this}update(e){for(let t=0;t<e.length;t++)this.expressions[t]&&this.expressions[t].update(e[t])}delete(){p(this.range[0],this.range[1].nextSibling),this.range=void 0,this.expressions=void 0}create(){const{fragment:e,expressions:t}=function(e,t){let n=B.get(e);n||B.set(e,n=function(e,t){const n=document.createElement("template");n.innerHTML=t?`<${t}>${e}</${t}>`:e;let r=n.content;if(t){const e=document.createRange();e.selectNodeContents(r.firstChild),r=e.extractContents()}return{content:r,expressions:W(r)}}(function(e){const t=new RegExp("^[^]*<([0-9a-z-]+)(?:\\s*[^<\\s\\0\"'>\\/=]+(?:\\s*=\\s*(?:\"[^\"]*\"?|'[^']*'?|[^\\s'\">]*))?)*\\s*(>?)|[^]*(>)[^]*|[^]*$","i");let n=!1,r=e[0];for(let s=0,o=e.length;s<o-1;s++){const o=`${x}${s}`,a=e[s].match(t);a[1]?n=!a[2]:a[3]&&(n=!1),r+=(n?o:`\x3c!--${o}--\x3e`)+e[s+1]}return r}(e),t));const r=document.importNode(n.content,!0);return{fragment:r,expressions:(s=r,o=n.expressions,o.map((e=>new e.type(function(e,t){for(let n=0,r=t.length;n<r;n++)e=e.childNodes[t[n]];return e}(s,e.nodePath),e.name,e.namespaceURI))))};var s,o}(this.strings,this.context);return this.expressions=t,this.range=[e.insertBefore(d(),e.firstChild),e.appendChild(d())],this.update(this.values),e}}function q(e,t){return q.instances.has(t)||(q.instances.set(t,e),p(t.firstChild,null,t),t.appendChild(e.create())),q.instances.get(t).update(e.values)}function V(e,...t){return new F(e,t)}D=m,q.instances=new WeakMap;const z=(K=HTMLElement,H=class extends K{constructor(){super(...arguments),this.state={},this.rendered=!1,this.renderCallbacks=[],this.renderRoot=this,this._onUpdated=T((()=>{for(;this.renderCallbacks.length;)this.renderCallbacks.shift()();this.rendered?this.updated():this.firstUpdated(),this.rendered=!0}),3)}attachShadow(e){return this.renderRoot=super.attachShadow.call(this,e)}connectedCallback(){this.update()}setState(e,t){const n=this.state;this.state=Object.assign(Object.assign({},n),"function"==typeof e?e(n,this):e),t&&this.renderCallbacks.push(t),this.update()}render(){return null}firstUpdated(){}beforeUpdate(){}updated(){}update(){this.beforeUpdate();const e=this.render();e&&q(e,this.renderRoot),this._onUpdated()}},class extends H{constructor(){super(...arguments),this.__props=Object.create(null)}static get observedAttributes(){return function(e){if(!e.__attrs){const r=e.properties||{},s=Object.create(null),o=Object.create(null),a=e.prototype;for(const e in r){const i=(t=e,{type:(n=r[e]).call?n:n.type,onChange:!0===n.onChange?l(t):n.onChange});s[e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()]=e,o[e]=i,c(a,e,i)}e.__attrs=s,e.__props=o}var t,n;return Object.keys(e.__attrs)}(this)}attributeChangedCallback(e,t,n){const{__attrs:r,__props:s}=this.constructor;if(s&&r&&e in s){const t=r[e];this[t]=s[t].type(n)}}});var H,K;function J(e){return null===e?"null":Array.isArray(e)?"array":typeof e}function G(e){return e!==Object(e)}function X(e){return!!e&&!!e.nodeType}function Z(e){return G(e)||X(e)}function Q(e){try{if("string"==typeof e)return JSON.parse(e)}catch(t){console.error(t)}return e}function*Y(e){const t=[["",e,[]]];for(;t.length;){const[e,n,r]=t.shift();if(e&&(yield[n,e,r]),!G(n))for(const[s,o]of Object.entries(n))t.push([`${e}${e?".":""}${s}`,o,[...r,e]])}}const ee=(e,t)=>t instanceof RegExp?!!e.match(t):function(e,t){e=e.split("."),t=t.split(".");let n=0,r=0;for(;n<e.length;){const s=t[r];if(s===e[n]||"*"===s)r++,n++;else{if("**"!==s)return!1;r++,n=e.length-(t.length-r)}}return r===t.length}(e,t),te=(e,t)=>(n,r)=>{const s={};if(e)for(const[o,a,i]of Y(r.data))ee(a,e)&&(s[a]=t,i.forEach((e=>s[e]=t)));return{expanded:s}},ne=e=>()=>({highlight:e});var re=':host{--background-color:#2a2f3a;--color:#f8f8f2;--string-color:#a3eea0;--number-color:#d19a66;--boolean-color:#4ba7ef;--null-color:#df9cf3;--property-color:#6fb3d2;--font-family:monaco,Consolas,"Lucida Console",monospace;--preview-color:rgba(222,175,143,0.9);--highlight-color:#7b0000;display:block;background-color:var(--background-color);color:var(--color);padding:.5rem;font-family:var(--font-family);font-size:1rem}.preview{color:var(--preview-color)}.null{color:var(--null-color,#df9cf3)}.key{color:var(--property-color,#f9857b);display:inline-block}.collapsable:before{display:inline-block;color:var(--color);padding-right:5px;padding-left:5px;font-size:.7rem;content:"▶";transition:transform 195ms ease-in;transform:rotate(90deg);color:var(--property-color)}.collapsable.collapsableCollapsed:before{transform:rotate(0)}.collapsable{cursor:pointer;user-select:none}.string{color:var(--string-color)}.number{color:var(--number-color)}.boolean{color:var(--boolean-color)}ul{padding:0;clear:both}li,ul{list-style:none}li,li ul>li,ul{position:relative}li ul>li{padding-top:.25rem;margin-left:1.5rem;padding-left:0}ul ul:before{content:"";border-left:1px solid #333;position:absolute;left:.5rem;top:.5rem;bottom:.5rem}ul ul:hover:before{border-left:1px solid #666}mark{background-color:var(--highlight-color)}';!function(e,t){void 0===t&&(t={});var n=t.insertAt;if("undefined"!=typeof document){var r=document.head||document.getElementsByTagName("head")[0],s=document.createElement("style");s.type="text/css","top"===n&&r.firstChild?r.insertBefore(s,r.firstChild):r.appendChild(s),s.styleSheet?s.styleSheet.cssText=e:s.appendChild(document.createTextNode(e))}}(re);let se,oe,ae,ie,le,ce,de,he=e=>e;class ue extends z{constructor(...e){super(...e),this.data=null,this.state={expanded:{},filtered:{},highlight:null},this.handlePropertyClick=e=>r=>{var s;r.preventDefault(),this.setState((s=e,e=>{return{expanded:(r=i({},e.expanded),o={[s]:!e.expanded[s]},t(r,n(o)))};var r,o}))}}static get is(){return"json-viewer"}static get properties(){return{data:{type:Q,onChange:!0}}}connectedCallback(){let e;this.hasAttribute("data")||(e=this.innerText.trim()),this.attachShadow({mode:"open"}),super.connectedCallback(),e&&(this.data=JSON.parse(e))}expand(e,t){this.setState(te(e,!0),t)}expandAll(){this.setState(te("**",!0))}collapseAll(){this.setState(te("**",!1))}collapse(e){this.setState(te(e,!1))}*search(e){for(const[t,n,r]of Y(this.data))Z(t)&&String(t).includes(e)&&(this.expand(n,(()=>{const e=this.renderRoot.querySelector(`[data-path="${n}"]`);e.scrollIntoView({behavior:"smooth",inline:"center",block:"center"}),e.focus()})),this.setState(ne(n)),yield{value:t,path:n});this.setState(ne(null))}filter(e){var t;this.setState((t=e,(e,n)=>{const r={};if(t)for(const[s,o,a]of Y(n.data))ee(o,t)?(r[o]=!1,a.forEach((e=>r[e]=!1))):r[o]=!0;return{filtered:r}}))}resetFilter(){this.setState({filtered:{}})}renderObject(e,t){return V(se||(se=he`<ul>${0}</ul>`),Object.keys(e).map((n=>{const r=e[n],s=t?`${t}.${n}`:n,o=Z(r),a=this.state.expanded[s]||o;return V(oe||(oe=he`<li data-path="${0}" hidden="${0}">${0} ${0}</li>`),s,this.state.filtered[s],this.renderPropertyKey({isCollapsable:!o,collapsed:!this.state.expanded[s],key:n,onClick:this.handlePropertyClick(s)}),a?this.renderNode(r,s):this.renderNodePreview(r)).withKey(n)})))}renderNode(e,t=""){return Z(e)?this.renderValue(e,t):this.renderObject(e,t)}renderNodePreview(e){return V(ae||(ae=he`<span class="preview">${0}</span>`),function(e,t){const{nodeCount:n,maxLength:r}=i({nodeCount:3,maxLength:15},void 0),s=Array.isArray(e),o=Object.keys(e),a=o.slice(0,n),l=[s?"[ ":"{ "],c=[];for(const i of a){const t=[],n=e[i],o=J(n);s||t.push(i+": "),"object"===o?t.push("{ ... }"):"array"===o?t.push("[ ... ]"):"string"===o?t.push(`"${n.substring(0,r)}${n.length>r?"...":""}"`):t.push(String(n)),c.push(t.join(""))}return o.length>n&&c.push("..."),l.push(c.join(", ")),l.push(s?" ]":" }"),l.join("")}(e))}renderPropertyKey({isCollapsable:e,collapsed:t,onClick:n,key:r}){return V(ie||(ie=he`<span class="${0}" onClick="${0}">${0}:</span>`),function(...e){return e.filter(Boolean).join(" ")}(r&&"key",e&&"collapsable",t&&"collapsableCollapsed"),e?n:null,r)}renderValue(e,t){const n=this.state.highlight,r=X(e)?e:V(le||(le=he`<span tabindex="0" class="${0}">${0}</span>`),J(e),JSON.stringify(e));return null!==n&&t===n?V(ce||(ce=he`<mark>${0}</mark>`),r):r}render(){return V(de||(de=he`<style>${0}</style>${0}`),re,this.renderNode(this.data))}}customElements.define(ue.is,ue);
