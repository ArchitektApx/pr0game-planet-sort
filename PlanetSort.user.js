// ==UserScript==
// @name        PlanetSort
// @description userscript to sort planets on pr0game.com
// @version     1.0.0
// @author      Architekt Apx aka. Dr. Architekt1510, Altschauerberg 8, 91448 Emskirchen
// @homepage    https://github.com/ArchitektApx/pr0game-planet-sort
// @match       https://pr0game.com/*/game.php?*
// @downloadURL https://raw.githubusercontent.com/ArchitektApx/pr0game-planet-sort/master/PlanetSort.user.js
// @updateURL   https://raw.githubusercontent.com/ArchitektApx/pr0game-planet-sort/master/PlanetSort.user.js
// ==/UserScript==

(()=>{"use strict";class t{#t=[];constructor(t){this.sortStrategy=t}addPlanet(t,e){this.#t.push({ElementRef:t,SortValue:e})}getList(){return this.#t.map((t=>t.ElementRef))}resetList(){this.#t=[]}sortList(){const t=this.#t.map((t=>t.SortValue)).sort(((t,e)=>this.sortStrategy(t,e)));this.#t.sort(((e,s)=>t.indexOf(e.SortValue)-t.indexOf(s.SortValue)))}}class e{static execute(s){const i=s.sortFunction.bind(s),n=s.valueFunction.bind(s),r=window.location.href.includes("page=overview")?"all":"navbar",o=new t(i);if("navbar"!==r){const{parent:t,planets:s}=e.#e(n);e.#s(t,s,o)}if("overview"!==r){const{parent:t,planets:s}=e.#i(n);e.#s(t,s,o)}}static#s(t,s,i){s.forEach((t=>{i.addPlanet(t.ElementRef,t.SortValue)})),i.sortList(),e.#n(t,i.getList()),i.resetList()}static#i(t){const e=document.querySelector("#planetSelector");return{parent:e,planets:[...e.options].map((e=>({ElementRef:e,SortValue:t(e,"navbar")})))}}static#e(t){const e=document.querySelector("div.infos:nth-child(5)"),s=[...e.querySelectorAll(".planetl")].map((e=>({ElementRef:e,SortValue:t(e,"overview")})));return{parent:e,planets:s}}static#n(t,e){e.forEach((e=>{e.remove(),t.append(e)}))}}const s=globalThis,i=s.ShadowRoot&&(void 0===s.ShadyCSS||s.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),r=new WeakMap;class o{constructor(t,e,s){if(this._$cssResult$=!0,s!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&r.set(e,t))}return t}toString(){return this.cssText}}const a=(t,...e)=>{const s=1===t.length?t[0]:e.reduce(((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1]),t[0]);return new o(s,t,n)},l=(t,e)=>{if(i)t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const i of e){const e=document.createElement("style"),n=s.litNonce;void 0!==n&&e.setAttribute("nonce",n),e.textContent=i.cssText,t.appendChild(e)}},c=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,n))(e)})(t):t,{is:h,defineProperty:d,getOwnPropertyDescriptor:u,getOwnPropertyNames:p,getOwnPropertySymbols:g,getPrototypeOf:m}=Object,$=globalThis,f=$.trustedTypes,y=f?f.emptyScript:"",S=$.reactiveElementPolyfillSupport,v=(t,e)=>t,_={toAttribute(t,e){switch(e){case Boolean:t=t?y:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},b=(t,e)=>!h(t,e),A={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),$.litPropertyMetadata??=new WeakMap;class C extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=A){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&d(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=u(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get(){return i?.call(this)},set(e){const r=i?.call(this);n.call(this,e),this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??A}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=m(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...p(t),...g(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(c(t))}else void 0!==t&&e.push(c(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$Eg=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$ES(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$E_??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$E_?.delete(t)}_$ES(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return l(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$E_?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$E_?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const n=(void 0!==s.converter?.toAttribute?s.converter:_).toAttribute(e,s.type);this._$Em=t,null==n?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:_;this._$Em=i,this[i]=n.fromAttribute(e,t.type),this._$Em=null}}requestUpdate(t,e,s,i=!1,n){if(void 0!==t){if(s??=this.constructor.getPropertyOptions(t),!(s.hasChanged??b)(i?n:this[t],e))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$Eg=this._$EP())}C(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),!0===s.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$EP(){this.isUpdatePending=!0;try{await this._$Eg}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t)!0!==s.wrapped||this._$AL.has(e)||void 0===this[e]||this.C(e,this[e],s)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$E_?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$ET()}catch(e){throw t=!1,this._$ET(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$E_?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$ET(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Eg}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EO(t,this[t]))),this._$ET()}updated(t){}firstUpdated(t){}}C.elementStyles=[],C.shadowRootOptions={mode:"open"},C[v("elementProperties")]=new Map,C[v("finalized")]=new Map,S?.({ReactiveElement:C}),($.reactiveElementVersions??=[]).push("2.0.2");const E=globalThis,w=E.trustedTypes,x=w?w.createPolicy("lit-html",{createHTML:t=>t}):void 0,P="$lit$",O=`lit$${(Math.random()+"").slice(9)}$`,N="?"+O,R=`<${N}>`,k=document,T=()=>k.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,D=Array.isArray,H=t=>D(t)||"function"==typeof t?.[Symbol.iterator],I="[ \t\n\f\r]",L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,V=/>/g,B=RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,F=/"/g,z=/^(?:script|style|textarea|title)$/i,J=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),K=J(1),W=(J(2),Symbol.for("lit-noChange")),q=Symbol.for("lit-nothing"),Y=new WeakMap,Z=k.createTreeWalker(k,129);function G(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==x?x.createHTML(e):e}const Q=(t,e)=>{const s=t.length-1,i=[];let n,r=2===e?"<svg>":"",o=L;for(let e=0;e<s;e++){const s=t[e];let a,l,c=-1,h=0;for(;h<s.length&&(o.lastIndex=h,l=o.exec(s),null!==l);)h=o.lastIndex,o===L?"!--"===l[1]?o=M:void 0!==l[1]?o=V:void 0!==l[2]?(z.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=B):void 0!==l[3]&&(o=B):o===B?">"===l[0]?(o=n??L,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?B:'"'===l[3]?F:j):o===F||o===j?o=B:o===M||o===V?o=L:(o=B,n=void 0);const d=o===B&&t[e+1].startsWith("/>")?" ":"";r+=o===L?s+R:c>=0?(i.push(a),s.slice(0,c)+P+s.slice(c)+O+d):s+O+(-2===c?e:d)}return[G(t,r+(t[s]||"<?>")+(2===e?"</svg>":"")),i]};class X{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,r=0;const o=t.length-1,a=this.parts,[l,c]=Q(t,e);if(this.el=X.createElement(l,s),Z.currentNode=this.el.content,2===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=Z.nextNode())&&a.length<o;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(P)){const e=c[r++],s=i.getAttribute(t).split(O),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:o[2],strings:s,ctor:"."===o[1]?nt:"?"===o[1]?rt:"@"===o[1]?ot:it}),i.removeAttribute(t)}else t.startsWith(O)&&(a.push({type:6,index:n}),i.removeAttribute(t));if(z.test(i.tagName)){const t=i.textContent.split(O),e=t.length-1;if(e>0){i.textContent=w?w.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],T()),Z.nextNode(),a.push({type:2,index:++n});i.append(t[e],T())}}}else if(8===i.nodeType)if(i.data===N)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=i.data.indexOf(O,t+1));)a.push({type:7,index:n}),t+=O.length-1}n++}}static createElement(t,e){const s=k.createElement("template");return s.innerHTML=t,s}}function tt(t,e,s=t,i){if(e===W)return e;let n=void 0!==i?s._$Co?.[i]:s._$Cl;const r=U(e)?void 0:e._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),void 0===r?n=void 0:(n=new r(t),n._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=n:s._$Cl=n),void 0!==n&&(e=tt(t,n._$AS(t,e.values),n,i)),e}class et{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??k).importNode(e,!0);Z.currentNode=i;let n=Z.nextNode(),r=0,o=0,a=s[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new st(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new at(n,this,t)),this._$AV.push(e),a=s[++o]}r!==a?.index&&(n=Z.nextNode(),r++)}return Z.currentNode=k,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class st{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=tt(this,t,e),U(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):H(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==q&&U(this._$AH)?this._$AA.nextSibling.data=t:this.$(k.createTextNode(t)),this._$AH=t}g(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=X.createElement(G(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new et(i,this),s=t.u(this.options);t.p(e),this.$(s),this._$AH=t}}_$AC(t){let e=Y.get(t.strings);return void 0===e&&Y.set(t.strings,e=new X(t)),e}T(t){D(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new st(this.k(T()),this.k(T()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=q}_$AI(t,e=this,s,i){const n=this.strings;let r=!1;if(void 0===n)t=tt(this,t,e,0),r=!U(t)||t!==this._$AH&&t!==W,r&&(this._$AH=t);else{const i=t;let o,a;for(t=n[0],o=0;o<n.length-1;o++)a=tt(this,i[s+o],e,o),a===W&&(a=this._$AH[o]),r||=!U(a)||a!==this._$AH[o],a===q?t=q:t!==q&&(t+=(a??"")+n[o+1]),this._$AH[o]=a}r&&!i&&this.O(t)}O(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class nt extends it{constructor(){super(...arguments),this.type=3}O(t){this.element[this.name]=t===q?void 0:t}}class rt extends it{constructor(){super(...arguments),this.type=4}O(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class ot extends it{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=tt(this,t,e,0)??q)===W)return;const s=this._$AH,i=t===q&&s!==q||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==q&&(s===q||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class at{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){tt(this,t)}}const lt=E.litHtmlPolyfillSupport;lt?.(X,st),(E.litHtmlVersions??=[]).push("3.1.0");class ct extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let n=i._$litPart$;if(void 0===n){const t=s?.renderBefore??null;i._$litPart$=n=new st(e.insertBefore(T(),t),t,void 0,s??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}ct._$litElement$=!0,ct.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:ct});const ht=globalThis.litElementPolyfillSupport;ht?.({LitElement:ct});(globalThis.litElementVersions??=[]).push("4.0.2");const dt=(t,e,s)=>{for(const s of e)if(s[0]===t)return(0,s[1])();return s?.()};function ut(t,e,s){return t?e(t):s?.(t)}class pt extends ct{static properties={config:{attribute:!1,type:Object},forceSingleCategory:{attribute:!1,type:Boolean},runningConfig:{attribute:!1,type:Object},updateCallback:{attribute:!1,type:Function}};static styles=a`
    .si-settings-category {
      text-align: left;
    }

    /* force each radioelement+label into individual row*/
    .si-input-radio-label::after {
      content: '';
      display: block; 
      white-space: pre;
    }

  `;static typesMultiValue=["radio","select"];static typesSingleValue=["checkbox","text","number","color"];#r={};constructor(){super(),this.forceSingleCategory=!1,this.config={},this.runningConfig={},this.#r={}}addConfig(t,e=(()=>{}),s=!1){this.config=t,this.runningConfig=JSON.parse(JSON.stringify(t)),this.#r=JSON.parse(JSON.stringify(this.runningConfig)),this.updateCallback=e,this.forceSingleCategory=s}render(){return 0===Object.keys(this.runningConfig).length?q:K`
      <div>
        ${Object.values(this.runningConfig).map((t=>this.#o(t)))}
      </div>
    `}#a(t,e){const{name:s,options:i,value:n}=e;return dt(e.type,[["radio",()=>this.#l(s,t,i,n)],["select",()=>this.#c(s,t,i,n)]],(()=>q))}#o(t){const{name:e,enabled:s,type:i,displayName:n,description:r}=t,o=this.#h(e,this.#d(e,"enabled","checkbox"),s),a=dt(i,[["dynamic",()=>this.#u(t)],["static",()=>this.#p(t)]],(()=>q));return K`
      <details class="si-settings-category">
        <summary 
          class="si-settings-category-header" 
          title="${r}"
          @change=${this.#g}
        >
          ${n}
          ${o}
        </summary>
        ${a}
      </details>
    `}#m(t,e){const s=this.#d(t,e.name,e.type),i=e.description||"",n=ut(pt.typesMultiValue.includes(e.type),(()=>this.#a(s,e)),(()=>this.#$(s,e)));return K`
      <tr 
        title="${i}"
        class="si-settingslist-row si-settingslist-static-row"
      >
        <td>${this.#f(e.name,s)}</td>
        <td>${n}</td>
      </tr>
    `}#u(t){const{name:e,settings:s,keyType:i,valueType:n,keyTitle:r,valueTitle:o,keyDesc:a,valueDesc:l}=t,c=this.#y("Add",this.#d(e,"dynamiclist","addRow"),this.#S),h=ut(r&&o,(()=>this.#v(r,o,a,l)),(()=>q)),d=s.map(((t,s)=>this.#_(e,t,i,n,s)));return K`
      <table 
        class="si-settingslist-elements si-settingslist-dynamic" 
        @change=${this.#b}
      >
        ${h}
        ${d}
      </table>
      ${c}
    `}#_(t,e,s,i,n){const[r,o]=Object.entries(e)[0],a=this.#d(t,"dynamiclist",`row-${n}`),l=this.#$(`${a}-left`,{name:"key",type:s,value:r}),c=this.#$(`${a}-right`,{name:"value",type:i,value:o}),h=this.#y("Remove",this.#d(t,"dynamiclist","removeRow"),(t=>this.#A(t,n)));return K`
      <tr id=${a} class="si-settingslist-row si-settingslist-dynamic-row">
        <td>${l}</td>
        <td>${c}</td>
        <td>${h}</td>
      </tr>
    `}#p(t){const{name:e,settings:s}=t;return K`
      <table 
        class="si-settingslist-elements si-settingslist-static" 
        @change=${this.#C}
      >
        ${Object.values(s).map((t=>this.#m(e,t)))}
      </table>
    `}#$(t,e){return pt.typesSingleValue.includes(e.type)?ut("checkbox"===e.type,(()=>this.#h(e.name,t,e.value)),(()=>this.#E(e.type,e.name,t,e.value))):q}#S({target:t}){const{category:e}=this.#w(t.id);this.runningConfig[e].settings.push({Default:"0"}),this.#x(!0)}#b({target:t}){const e=t.closest("tr"),s=e.id.split("-").pop(),{category:i}=this.#w(t.id),[n,r]=[...e.querySelectorAll("input")].map((t=>t.value));this.runningConfig[i].settings[s]={[n]:r},this.#x(!0)}#A({target:t},e){const{category:s}=this.#w(t.id);this.runningConfig[s].settings.splice(e,1),this.#x(!0)}#x(t=!1){const e=JSON.stringify(this.#r),s=JSON.stringify(this.runningConfig);e!==s&&(this.updateCallback(this.runningConfig),this.#r=JSON.parse(s)),t&&this.requestUpdate()}#C({target:t}){const{category:e,property:s,setting:i}=this.#w(t.id);this.runningConfig[e].settings[i].value=t[s],this.#x(!1)}#g({target:t}){const{category:e}=this.#w(t.id);this.runningConfig[e].enabled=t.checked,this.forceSingleCategory&&t.checked&&Object.keys(this.runningConfig).filter((t=>t!==e)).forEach((t=>{this.runningConfig[t].enabled=!1})),this.#x(this.forceSingleCategory&&t.checked)}#w(t=""){const[,e,s,i]=t.split("-");return{category:e,property:"checkbox"===i?"checked":"value",setting:s,type:i}}#d(t="category",e="setting",s="type"){return`si-${t}-${e}-${s}`}#y(t,e,s){const{element:i}=this.#w(e),n=["si-button-element"];return"addRow"!==i&&"removeRow"!==i||n.push(`si-button-${i}`),K`
      <button 
        name="${t}" 
        id="${e}" 
        class=${n.join(" ")}
        @click=${s}
      >
        ${t}
      </button>
    `}#h(t="",e="",s=!1){return this.#E("checkbox",t,e,"",s)}#E(t="text",e="",s="",i="",n=!1){return K`
      <input 
        type="${t}" 
        name="${e}" 
        id="${s}" 
        value="${i}" 
        class="${`si-input-${t} si-allinput-elements`}"
        .checked=${n} 
      />
    `}#f(t="",e="",s=""){let i="si-label-element";return s&&(i=`${i} ${s}`),K`
      <label 
        for="${e}"
        class="${i}"
      >
        ${t}
      </label>
    `}#P(t="",e=!1){return K`
      <option 
        value="${t}" 
        class="si-option-element"
        ?selected=${e}
      >
        ${t}
      </option>
    `}#l(t="",e="",s=[],i=""){const n=s.map(((s,n)=>{const r=`${e}-${n}`;return K`
        ${this.#E("radio",t,r,s,s===i)}
        ${this.#f(s,r,"si-input-radio-label")}
      `}));return K`${n||q}`}#c(t="",e="",s=[],i=""){const n=s.map((t=>this.#P(t,t===i)));return K`
      <select
        name="${t}"
        id="${e}"
        class="si-select-element si-allinput-elements"
      >
        ${n||q}
      </select>
    `}#v(t="Key",e="Value",s="",i=""){return K`
      <tr class="si-dynamiclist-header">
        <th title="${s}">${t}</th>
        <th title="${i}">${e}</th>
        <th></th>
      </tr>
    `}}class gt{static#O="Close";static#N="settings-interface-component";static#R="Override Sort";static clickHandler(t,e,s){const i=t.target;i.textContent===gt.#R?(i.textContent=gt.#O,gt.#k(e,s)):(i.textContent=gt.#R,gt.#T())}static invoke(t,e){window.location.href.includes("page=settings")&&(customElements.define(gt.#N,pt),gt.#U(t,e))}static#U(t,e){gt.#D().append(gt.#H(t,e))}static#H(t,e){const s=document.createElement("button");return s.textContent=gt.#R,s.addEventListener("click",(s=>gt.clickHandler(s,t,e))),s}static#T(){gt.#I().remove()}static#I(){return document.querySelector(gt.#N)}static#D(){return document.querySelector("select[name=planetSort]").parentElement.previousElementSibling}static#k(t,e){const s=document.createElement(gt.#N);s.addConfig(t,e,!0),gt.#D().append(s)}}class mt{static SettingsDefinition={description:"Alphabetical sort with customizing options for numbers and locale differences.",displayName:"Alphabetical/Natural Sort",enabled:!1,name:"AlphaNatStrat",settings:{caseFirst:{description:"Whether upper case or lower case should sort first.",name:"caseFirst",options:["false","upper","lower"],type:"select",value:"false"},ignorePunctuation:{description:"Whether punctuation should be ignored.",name:"ignorePunctuation",type:"checkbox",value:!1},numeric:{description:"Use numeric (1>2>10) or not (1>10>2).",name:"numeric",type:"checkbox",value:!1},sensitivity:{description:"Which differences in the strings should matter.",name:"sensitivity",options:["base","accent","case","variant"],type:"select",value:"case"},sortReverse:{description:"Reverse the sort order.",name:"sortReverse",type:"checkbox",value:!1}},type:"static"};#L={};constructor(t=mt.SettingsDefinition.settings){Object.keys(t).forEach((e=>{this.#L[e]=t[e].value}))}sortFunction(t,e){const{sortReverse:s,...i}=this.#L;return t.localeCompare(e,void 0,i)*(s?-1:1)}valueFunction(t,e){return"navbar"!==e?t.firstElementChild.title:"overview"!==e?t.text.replace(/\s\[[\d:]+]$/,""):void 0}}class $t{static SettingsDefinition={description:"Sort by custom list of planet names matched to their sort order (number).",displayName:"Custom Sort",enabled:!1,keyDesc:"Enter your exact planet names here",keyTitle:"Your Planet Names",keyType:"text",name:"CustomSortStrat",settings:[{"Your Planet Name":1}],type:"dynamic",valueDesc:"Enter the number to use for sorting this planet name (any positive number is allowed and sorting is asc).",valueTitle:"Sort Order",valueType:"number"};#L={};constructor(t=$t.SettingsDefinition.settings){t.forEach((t=>{const[e,s]=Object.entries(t)[0];this.#L[e]=s}))}sortFunction(t,e){return this.#L[t]||this.#L[e]?Number.parseInt(this.#L[t],10)-Number.parseInt(this.#L[e],10):0}valueFunction(t,e){return"navbar"!==e?t.firstElementChild.title:"overview"!==e?t.text.replace(/\s\[[\d:]+]$/,""):void 0}}const ft={AlphaNatStrat:{ClassRef:mt,Settings:mt.SettingsDefinition},CustomSortStrat:{ClassRef:$t,Settings:$t.SettingsDefinition}};const yt=new class{settingsKey="";#M={};#V="PlanetReorderSettings";#B=ft;constructor(){this.#j(),this.#F()}getActiveStratInstance(){const t=Object.entries(this.#M).find((([,t])=>t.enabled));if(!t)return;const[e,s]=t;return new this.#B[e].ClassRef(s.settings)}getAllStratSettings(){return this.#M}updateCallback(t){this.#M=t,this.#z()}#J(){Object.entries(this.#B).forEach((([t,e])=>{this.#M[t]=e.Settings}))}#j(){const t=window.location.pathname.split("/")[1];this.settingsKey=`${this.#V}_${t}`}#F(){this.#J();const t=localStorage.getItem(this.settingsKey);if(t){const e=JSON.parse(t);Object.entries(e).forEach((([t,e])=>{this.#M[t]=e}))}}#z(){localStorage.setItem(this.settingsKey,JSON.stringify(this.#M))}},St=yt.getAllStratSettings(),vt=yt.updateCallback.bind(yt);gt.invoke(St,vt);const _t=yt.getActiveStratInstance();_t&&e.execute(_t)})();