var Dl=Object.defineProperty,kl=Object.defineProperties;var Ol=Object.getOwnPropertyDescriptors;var Ci=Object.getOwnPropertySymbols;var Ml=Object.prototype.hasOwnProperty,Ll=Object.prototype.propertyIsEnumerable;var Vi=(n,t,e)=>t in n?Dl(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,kt=(n,t)=>{for(var e in t||(t={}))Ml.call(t,e)&&Vi(n,e,t[e]);if(Ci)for(var e of Ci(t))Ll.call(t,e)&&Vi(n,e,t[e]);return n},Ni=(n,t)=>kl(n,Ol(t));var N=(n,t,e)=>new Promise((s,i)=>{var o=f=>{try{h(e.next(f))}catch(d){i(d)}},l=f=>{try{h(e.throw(f))}catch(d){i(d)}},h=f=>f.done?s(f.value):Promise.resolve(f.value).then(o,l);h((e=e.apply(n,t)).next())});import{r as It,j as I}from"./ui-vendor-nuurtrVt.js";import{$ as Fl,I as jl,r as Di,x as Ul,l as ki,B as Ht,m as Ge,H as Oi,w as Mi,a0 as Bl,g as Pr}from"./index-Dj8DxO6R.js";import{B as $l}from"./badge-BfO5wgFK.js";import{p as Li}from"./photosService-GinFDzdw.js";import{X as ql}from"./x-CFLj-Orr.js";import{U as xr}from"./upload-Bf3y5GNq.js";import{P as Gl}from"./plus-B5S098eO.js";import{E as Hl}from"./eye-D22vGfoO.js";import{S as zl}from"./share-2-CIvCA0aa.js";import{A as Wl}from"./index-DMq8D8eE.js";import"./react-vendor-DwRCIQB9.js";import"./animation-vendor-57yTd542.js";import"./supabase-vendor-FQ_Qbeq7.js";function Kl({bucket:n="images",folder:t="posts",onUploaded:e}){const s=It.useRef(null),[i,o]=It.useState(null),[l,h]=It.useState(!1),[f,d]=It.useState(null),T=It.useCallback(x=>N(null,null,function*(){if(!x||x.length===0)return;const O=x[0];d(null),o(URL.createObjectURL(O));try{h(!0);const L=yield Fl(O,{bucket:n,folder:t});e==null||e(L)}catch(L){console.error("Upload error",L),d(L.message||"Upload failed")}finally{h(!1)}}),[n,t,e]),A=It.useCallback(x=>{x.preventDefault(),T(x.dataTransfer.files)},[T]),C=It.useCallback(x=>{T(x.target.files)},[T]);return I.jsx("div",{children:I.jsxs("label",{onDrop:A,onDragOver:x=>x.preventDefault(),className:"w-full border-2 border-dashed border-white/20 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-black/40 hover:bg-black/30 transition",onClick:()=>{var x;return(x=s.current)==null?void 0:x.click()},children:[I.jsx("input",{ref:s,type:"file",accept:"image/*",className:"hidden",onChange:C}),!i&&I.jsxs("div",{className:"text-center text-slate-300",children:[I.jsx("div",{className:"mb-2",children:"Drag and drop photos here"}),I.jsx("div",{className:"text-sm",children:"or click to browse"})]}),i&&I.jsxs("div",{className:"w-full max-w-xl",children:[I.jsx("div",{className:"mb-3 text-slate-300 text-sm",children:"Preview"}),I.jsx("div",{className:"rounded-xl overflow-hidden border border-white/10",children:I.jsx(jl,{src:i,alt:"Preview",className:"w-full h-64 object-cover"})})]}),I.jsx("div",{className:"mt-4 text-sm text-slate-400",children:l?"Uploading…":f?`Error: ${f}`:"Supported: JPG, PNG, WEBP"})]})})}const Lo=null,Ql=()=>{};var Fi={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fo=function(n){const t=[];let e=0;for(let s=0;s<n.length;s++){let i=n.charCodeAt(s);i<128?t[e++]=i:i<2048?(t[e++]=i>>6|192,t[e++]=i&63|128):(i&64512)===55296&&s+1<n.length&&(n.charCodeAt(s+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++s)&1023),t[e++]=i>>18|240,t[e++]=i>>12&63|128,t[e++]=i>>6&63|128,t[e++]=i&63|128):(t[e++]=i>>12|224,t[e++]=i>>6&63|128,t[e++]=i&63|128)}return t},Xl=function(n){const t=[];let e=0,s=0;for(;e<n.length;){const i=n[e++];if(i<128)t[s++]=String.fromCharCode(i);else if(i>191&&i<224){const o=n[e++];t[s++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){const o=n[e++],l=n[e++],h=n[e++],f=((i&7)<<18|(o&63)<<12|(l&63)<<6|h&63)-65536;t[s++]=String.fromCharCode(55296+(f>>10)),t[s++]=String.fromCharCode(56320+(f&1023))}else{const o=n[e++],l=n[e++];t[s++]=String.fromCharCode((i&15)<<12|(o&63)<<6|l&63)}}return t.join("")},jo={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let i=0;i<n.length;i+=3){const o=n[i],l=i+1<n.length,h=l?n[i+1]:0,f=i+2<n.length,d=f?n[i+2]:0,T=o>>2,A=(o&3)<<4|h>>4;let C=(h&15)<<2|d>>6,x=d&63;f||(x=64,l||(C=64)),s.push(e[T],e[A],e[C],e[x])}return s.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(Fo(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):Xl(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let i=0;i<n.length;){const o=e[n.charAt(i++)],h=i<n.length?e[n.charAt(i)]:0;++i;const d=i<n.length?e[n.charAt(i)]:64;++i;const A=i<n.length?e[n.charAt(i)]:64;if(++i,o==null||h==null||d==null||A==null)throw new Jl;const C=o<<2|h>>4;if(s.push(C),d!==64){const x=h<<4&240|d>>2;if(s.push(x),A!==64){const O=d<<6&192|A;s.push(O)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Jl extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Yl=function(n){const t=Fo(n);return jo.encodeByteArray(t,!0)},Uo=function(n){return Yl(n).replace(/\./g,"")},Zl=function(n){try{return jo.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tc(){if(typeof self!="undefined")return self;if(typeof window!="undefined")return window;if(typeof global!="undefined")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ec=()=>tc().__FIREBASE_DEFAULTS__,nc=()=>{if(typeof process=="undefined"||typeof Fi=="undefined")return;const n=Fi.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},rc=()=>{if(typeof document=="undefined")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(e){return}const t=n&&Zl(n[1]);return t&&JSON.parse(t)},sc=()=>{try{return Ql()||ec()||nc()||rc()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}};/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ic(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch(t){return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oc(){return typeof navigator!="undefined"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ac(){var t;const n=(t=sc())==null?void 0:t.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch(e){return!1}}function lc(){return!ac()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function cc(){try{return typeof indexedDB=="object"}catch(n){return!1}}function uc(){return new Promise((n,t)=>{try{let e=!0;const s="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(s);i.onsuccess=()=>{i.result.close(),e||self.indexedDB.deleteDatabase(s),n(!0)},i.onupgradeneeded=()=>{e=!1},i.onerror=()=>{var o;t(((o=i.error)==null?void 0:o.message)||"")}}catch(e){t(e)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hc="FirebaseError";class be extends Error{constructor(t,e,s){super(e),this.code=t,this.customData=s,this.name=hc,Object.setPrototypeOf(this,be.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Bo.prototype.create)}}class Bo{constructor(t,e,s){this.service=t,this.serviceName=e,this.errors=s}create(t,...e){const s=e[0]||{},i=`${this.service}/${t}`,o=this.errors[t],l=o?fc(o,s):"Error",h=`${this.serviceName}: ${l} (${i}).`;return new be(i,h,s)}}function fc(n,t){return n.replace(dc,(e,s)=>{const i=t[s];return i!=null?String(i):`<${s}?>`})}const dc=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ze(n){return n&&n._delegate?n._delegate:n}class jn{constructor(t,e,s){this.name=t,this.instanceFactory=e,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var q;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(q||(q={}));const mc={debug:q.DEBUG,verbose:q.VERBOSE,info:q.INFO,warn:q.WARN,error:q.ERROR,silent:q.SILENT},pc=q.INFO,gc={[q.DEBUG]:"log",[q.VERBOSE]:"log",[q.INFO]:"info",[q.WARN]:"warn",[q.ERROR]:"error"},_c=(n,t,...e)=>{if(t<n.logLevel)return;const s=new Date().toISOString(),i=gc[t];if(i)console[i](`[${s}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class $o{constructor(t){this.name=t,this._logLevel=pc,this._logHandler=_c,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in q))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?mc[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,q.DEBUG,...t),this._logHandler(this,q.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,q.VERBOSE,...t),this._logHandler(this,q.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,q.INFO,...t),this._logHandler(this,q.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,q.WARN,...t),this._logHandler(this,q.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,q.ERROR,...t),this._logHandler(this,q.ERROR,...t)}}const yc=(n,t)=>t.some(e=>n instanceof e);let ji,Ui;function Ec(){return ji||(ji=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function vc(){return Ui||(Ui=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const qo=new WeakMap,Fr=new WeakMap,Go=new WeakMap,Cr=new WeakMap,ts=new WeakMap;function Tc(n){const t=new Promise((e,s)=>{const i=()=>{n.removeEventListener("success",o),n.removeEventListener("error",l)},o=()=>{e(zt(n.result)),i()},l=()=>{s(n.error),i()};n.addEventListener("success",o),n.addEventListener("error",l)});return t.then(e=>{e instanceof IDBCursor&&qo.set(e,n)}).catch(()=>{}),ts.set(t,n),t}function wc(n){if(Fr.has(n))return;const t=new Promise((e,s)=>{const i=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",l),n.removeEventListener("abort",l)},o=()=>{e(),i()},l=()=>{s(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",o),n.addEventListener("error",l),n.addEventListener("abort",l)});Fr.set(n,t)}let jr={get(n,t,e){if(n instanceof IDBTransaction){if(t==="done")return Fr.get(n);if(t==="objectStoreNames")return n.objectStoreNames||Go.get(n);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return zt(n[t])},set(n,t,e){return n[t]=e,!0},has(n,t){return n instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in n}};function Ac(n){jr=n(jr)}function Ic(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const s=n.call(Vr(this),t,...e);return Go.set(s,t.sort?t.sort():[t]),zt(s)}:vc().includes(n)?function(...t){return n.apply(Vr(this),t),zt(qo.get(this))}:function(...t){return zt(n.apply(Vr(this),t))}}function bc(n){return typeof n=="function"?Ic(n):(n instanceof IDBTransaction&&wc(n),yc(n,Ec())?new Proxy(n,jr):n)}function zt(n){if(n instanceof IDBRequest)return Tc(n);if(Cr.has(n))return Cr.get(n);const t=bc(n);return t!==n&&(Cr.set(n,t),ts.set(t,n)),t}const Vr=n=>ts.get(n);function Rc(n,t,{blocked:e,upgrade:s,blocking:i,terminated:o}={}){const l=indexedDB.open(n,t),h=zt(l);return s&&l.addEventListener("upgradeneeded",f=>{s(zt(l.result),f.oldVersion,f.newVersion,zt(l.transaction),f)}),e&&l.addEventListener("blocked",f=>e(f.oldVersion,f.newVersion,f)),h.then(f=>{o&&f.addEventListener("close",()=>o()),i&&f.addEventListener("versionchange",d=>i(d.oldVersion,d.newVersion,d))}).catch(()=>{}),h}const Sc=["get","getKey","getAll","getAllKeys","count"],Pc=["put","add","delete","clear"],Nr=new Map;function Bi(n,t){if(!(n instanceof IDBDatabase&&!(t in n)&&typeof t=="string"))return;if(Nr.get(t))return Nr.get(t);const e=t.replace(/FromIndex$/,""),s=t!==e,i=Pc.includes(e);if(!(e in(s?IDBIndex:IDBObjectStore).prototype)||!(i||Sc.includes(e)))return;const o=function(l,...h){return N(this,null,function*(){const f=this.transaction(l,i?"readwrite":"readonly");let d=f.store;return s&&(d=d.index(h.shift())),(yield Promise.all([d[e](...h),i&&f.done]))[0]})};return Nr.set(t,o),o}Ac(n=>Ni(kt({},n),{get:(t,e,s)=>Bi(t,e)||n.get(t,e,s),has:(t,e)=>!!Bi(t,e)||n.has(t,e)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xc{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(Cc(e)){const s=e.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(e=>e).join(" ")}}function Cc(n){const t=n.getComponent();return(t==null?void 0:t.type)==="VERSION"}const Ur="@firebase/app",$i="0.14.6";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ft=new $o("@firebase/app"),Vc="@firebase/app-compat",Nc="@firebase/analytics-compat",Dc="@firebase/analytics",kc="@firebase/app-check-compat",Oc="@firebase/app-check",Mc="@firebase/auth",Lc="@firebase/auth-compat",Fc="@firebase/database",jc="@firebase/data-connect",Uc="@firebase/database-compat",Bc="@firebase/functions",$c="@firebase/functions-compat",qc="@firebase/installations",Gc="@firebase/installations-compat",Hc="@firebase/messaging",zc="@firebase/messaging-compat",Wc="@firebase/performance",Kc="@firebase/performance-compat",Qc="@firebase/remote-config",Xc="@firebase/remote-config-compat",Jc="@firebase/storage",Yc="@firebase/storage-compat",Zc="@firebase/firestore",tu="@firebase/ai",eu="@firebase/firestore-compat",nu="firebase",ru="12.6.0",su={[Ur]:"fire-core",[Vc]:"fire-core-compat",[Dc]:"fire-analytics",[Nc]:"fire-analytics-compat",[Oc]:"fire-app-check",[kc]:"fire-app-check-compat",[Mc]:"fire-auth",[Lc]:"fire-auth-compat",[Fc]:"fire-rtdb",[jc]:"fire-data-connect",[Uc]:"fire-rtdb-compat",[Bc]:"fire-fn",[$c]:"fire-fn-compat",[qc]:"fire-iid",[Gc]:"fire-iid-compat",[Hc]:"fire-fcm",[zc]:"fire-fcm-compat",[Wc]:"fire-perf",[Kc]:"fire-perf-compat",[Qc]:"fire-rc",[Xc]:"fire-rc-compat",[Jc]:"fire-gcs",[Yc]:"fire-gcs-compat",[Zc]:"fire-fst",[eu]:"fire-fst-compat",[tu]:"fire-vertex","fire-js":"fire-js",[nu]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iu=new Map,ou=new Map,qi=new Map;function Gi(n,t){try{n.container.addComponent(t)}catch(e){Ft.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function Un(n){const t=n.name;if(qi.has(t))return Ft.debug(`There were multiple attempts to register component ${t}.`),!1;qi.set(t,n);for(const e of iu.values())Gi(e,n);for(const e of ou.values())Gi(e,n);return!0}function au(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lu={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},es=new Bo("app","Firebase",lu);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cu=ru;function We(n,t,e){var l;let s=(l=su[n])!=null?l:n;e&&(s+=`-${e}`);const i=s.match(/\s|\//),o=t.match(/\s|\//);if(i||o){const h=[`Unable to register library "${s}" with version "${t}":`];i&&h.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&h.push("and"),o&&h.push(`version name "${t}" contains illegal characters (whitespace or "/")`),Ft.warn(h.join(" "));return}Un(new jn(`${s}-version`,()=>({library:s,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uu="firebase-heartbeat-database",hu=1,tn="firebase-heartbeat-store";let Dr=null;function Ho(){return Dr||(Dr=Rc(uu,hu,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(tn)}catch(e){console.warn(e)}}}}).catch(n=>{throw es.create("idb-open",{originalErrorMessage:n.message})})),Dr}function fu(n){return N(this,null,function*(){try{const e=(yield Ho()).transaction(tn),s=yield e.objectStore(tn).get(zo(n));return yield e.done,s}catch(t){if(t instanceof be)Ft.warn(t.message);else{const e=es.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});Ft.warn(e.message)}}})}function Hi(n,t){return N(this,null,function*(){try{const s=(yield Ho()).transaction(tn,"readwrite");yield s.objectStore(tn).put(t,zo(n)),yield s.done}catch(e){if(e instanceof be)Ft.warn(e.message);else{const s=es.create("idb-set",{originalErrorMessage:e==null?void 0:e.message});Ft.warn(s.message)}}})}function zo(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const du=1024,mu=30;class pu{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new _u(e),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}triggerHeartbeat(){return N(this,null,function*(){var t,e;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=zi();if(((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null&&(this._heartbeatsCache=yield this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(l=>l.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:i}),this._heartbeatsCache.heartbeats.length>mu){const l=yu(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(l,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){Ft.warn(s)}})}getHeartbeatsHeader(){return N(this,null,function*(){var t;try{if(this._heartbeatsCache===null&&(yield this._heartbeatsCachePromise),((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=zi(),{heartbeatsToSend:s,unsentEntries:i}=gu(this._heartbeatsCache.heartbeats),o=Uo(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,yield this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(e){return Ft.warn(e),""}})}}function zi(){return new Date().toISOString().substring(0,10)}function gu(n,t=du){const e=[];let s=n.slice();for(const i of n){const o=e.find(l=>l.agent===i.agent);if(o){if(o.dates.push(i.date),Wi(e)>t){o.dates.pop();break}}else if(e.push({agent:i.agent,dates:[i.date]}),Wi(e)>t){e.pop();break}s=s.slice(1)}return{heartbeatsToSend:e,unsentEntries:s}}class _u{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}runIndexedDBEnvironmentCheck(){return N(this,null,function*(){return cc()?uc().then(()=>!0).catch(()=>!1):!1})}read(){return N(this,null,function*(){if(yield this._canUseIndexedDBPromise){const e=yield fu(this.app);return e!=null&&e.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}})}overwrite(t){return N(this,null,function*(){var s;if(yield this._canUseIndexedDBPromise){const i=yield this.read();return Hi(this.app,{lastSentHeartbeatDate:(s=t.lastSentHeartbeatDate)!=null?s:i.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return})}add(t){return N(this,null,function*(){var s;if(yield this._canUseIndexedDBPromise){const i=yield this.read();return Hi(this.app,{lastSentHeartbeatDate:(s=t.lastSentHeartbeatDate)!=null?s:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...t.heartbeats]})}else return})}}function Wi(n){return Uo(JSON.stringify({version:2,heartbeats:n})).length}function yu(n){if(n.length===0)return-1;let t=0,e=n[0].date;for(let s=1;s<n.length;s++)n[s].date<e&&(e=n[s].date,t=s);return t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Eu(n){Un(new jn("platform-logger",t=>new xc(t),"PRIVATE")),Un(new jn("heartbeat",t=>new pu(t),"PRIVATE")),We(Ur,$i,n),We(Ur,$i,"esm2020"),We("fire-js","")}Eu("");var Ki=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ns;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(y,m){function g(){}g.prototype=m.prototype,y.F=m.prototype,y.prototype=new g,y.prototype.constructor=y,y.D=function(E,_,w){for(var p=Array(arguments.length-2),Et=2;Et<arguments.length;Et++)p[Et-2]=arguments[Et];return m.prototype[_].apply(E,p)}}function e(){this.blockSize=-1}function s(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}t(s,e),s.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(y,m,g){g||(g=0);const E=Array(16);if(typeof m=="string")for(var _=0;_<16;++_)E[_]=m.charCodeAt(g++)|m.charCodeAt(g++)<<8|m.charCodeAt(g++)<<16|m.charCodeAt(g++)<<24;else for(_=0;_<16;++_)E[_]=m[g++]|m[g++]<<8|m[g++]<<16|m[g++]<<24;m=y.g[0],g=y.g[1],_=y.g[2];let w=y.g[3],p;p=m+(w^g&(_^w))+E[0]+3614090360&4294967295,m=g+(p<<7&4294967295|p>>>25),p=w+(_^m&(g^_))+E[1]+3905402710&4294967295,w=m+(p<<12&4294967295|p>>>20),p=_+(g^w&(m^g))+E[2]+606105819&4294967295,_=w+(p<<17&4294967295|p>>>15),p=g+(m^_&(w^m))+E[3]+3250441966&4294967295,g=_+(p<<22&4294967295|p>>>10),p=m+(w^g&(_^w))+E[4]+4118548399&4294967295,m=g+(p<<7&4294967295|p>>>25),p=w+(_^m&(g^_))+E[5]+1200080426&4294967295,w=m+(p<<12&4294967295|p>>>20),p=_+(g^w&(m^g))+E[6]+2821735955&4294967295,_=w+(p<<17&4294967295|p>>>15),p=g+(m^_&(w^m))+E[7]+4249261313&4294967295,g=_+(p<<22&4294967295|p>>>10),p=m+(w^g&(_^w))+E[8]+1770035416&4294967295,m=g+(p<<7&4294967295|p>>>25),p=w+(_^m&(g^_))+E[9]+2336552879&4294967295,w=m+(p<<12&4294967295|p>>>20),p=_+(g^w&(m^g))+E[10]+4294925233&4294967295,_=w+(p<<17&4294967295|p>>>15),p=g+(m^_&(w^m))+E[11]+2304563134&4294967295,g=_+(p<<22&4294967295|p>>>10),p=m+(w^g&(_^w))+E[12]+1804603682&4294967295,m=g+(p<<7&4294967295|p>>>25),p=w+(_^m&(g^_))+E[13]+4254626195&4294967295,w=m+(p<<12&4294967295|p>>>20),p=_+(g^w&(m^g))+E[14]+2792965006&4294967295,_=w+(p<<17&4294967295|p>>>15),p=g+(m^_&(w^m))+E[15]+1236535329&4294967295,g=_+(p<<22&4294967295|p>>>10),p=m+(_^w&(g^_))+E[1]+4129170786&4294967295,m=g+(p<<5&4294967295|p>>>27),p=w+(g^_&(m^g))+E[6]+3225465664&4294967295,w=m+(p<<9&4294967295|p>>>23),p=_+(m^g&(w^m))+E[11]+643717713&4294967295,_=w+(p<<14&4294967295|p>>>18),p=g+(w^m&(_^w))+E[0]+3921069994&4294967295,g=_+(p<<20&4294967295|p>>>12),p=m+(_^w&(g^_))+E[5]+3593408605&4294967295,m=g+(p<<5&4294967295|p>>>27),p=w+(g^_&(m^g))+E[10]+38016083&4294967295,w=m+(p<<9&4294967295|p>>>23),p=_+(m^g&(w^m))+E[15]+3634488961&4294967295,_=w+(p<<14&4294967295|p>>>18),p=g+(w^m&(_^w))+E[4]+3889429448&4294967295,g=_+(p<<20&4294967295|p>>>12),p=m+(_^w&(g^_))+E[9]+568446438&4294967295,m=g+(p<<5&4294967295|p>>>27),p=w+(g^_&(m^g))+E[14]+3275163606&4294967295,w=m+(p<<9&4294967295|p>>>23),p=_+(m^g&(w^m))+E[3]+4107603335&4294967295,_=w+(p<<14&4294967295|p>>>18),p=g+(w^m&(_^w))+E[8]+1163531501&4294967295,g=_+(p<<20&4294967295|p>>>12),p=m+(_^w&(g^_))+E[13]+2850285829&4294967295,m=g+(p<<5&4294967295|p>>>27),p=w+(g^_&(m^g))+E[2]+4243563512&4294967295,w=m+(p<<9&4294967295|p>>>23),p=_+(m^g&(w^m))+E[7]+1735328473&4294967295,_=w+(p<<14&4294967295|p>>>18),p=g+(w^m&(_^w))+E[12]+2368359562&4294967295,g=_+(p<<20&4294967295|p>>>12),p=m+(g^_^w)+E[5]+4294588738&4294967295,m=g+(p<<4&4294967295|p>>>28),p=w+(m^g^_)+E[8]+2272392833&4294967295,w=m+(p<<11&4294967295|p>>>21),p=_+(w^m^g)+E[11]+1839030562&4294967295,_=w+(p<<16&4294967295|p>>>16),p=g+(_^w^m)+E[14]+4259657740&4294967295,g=_+(p<<23&4294967295|p>>>9),p=m+(g^_^w)+E[1]+2763975236&4294967295,m=g+(p<<4&4294967295|p>>>28),p=w+(m^g^_)+E[4]+1272893353&4294967295,w=m+(p<<11&4294967295|p>>>21),p=_+(w^m^g)+E[7]+4139469664&4294967295,_=w+(p<<16&4294967295|p>>>16),p=g+(_^w^m)+E[10]+3200236656&4294967295,g=_+(p<<23&4294967295|p>>>9),p=m+(g^_^w)+E[13]+681279174&4294967295,m=g+(p<<4&4294967295|p>>>28),p=w+(m^g^_)+E[0]+3936430074&4294967295,w=m+(p<<11&4294967295|p>>>21),p=_+(w^m^g)+E[3]+3572445317&4294967295,_=w+(p<<16&4294967295|p>>>16),p=g+(_^w^m)+E[6]+76029189&4294967295,g=_+(p<<23&4294967295|p>>>9),p=m+(g^_^w)+E[9]+3654602809&4294967295,m=g+(p<<4&4294967295|p>>>28),p=w+(m^g^_)+E[12]+3873151461&4294967295,w=m+(p<<11&4294967295|p>>>21),p=_+(w^m^g)+E[15]+530742520&4294967295,_=w+(p<<16&4294967295|p>>>16),p=g+(_^w^m)+E[2]+3299628645&4294967295,g=_+(p<<23&4294967295|p>>>9),p=m+(_^(g|~w))+E[0]+4096336452&4294967295,m=g+(p<<6&4294967295|p>>>26),p=w+(g^(m|~_))+E[7]+1126891415&4294967295,w=m+(p<<10&4294967295|p>>>22),p=_+(m^(w|~g))+E[14]+2878612391&4294967295,_=w+(p<<15&4294967295|p>>>17),p=g+(w^(_|~m))+E[5]+4237533241&4294967295,g=_+(p<<21&4294967295|p>>>11),p=m+(_^(g|~w))+E[12]+1700485571&4294967295,m=g+(p<<6&4294967295|p>>>26),p=w+(g^(m|~_))+E[3]+2399980690&4294967295,w=m+(p<<10&4294967295|p>>>22),p=_+(m^(w|~g))+E[10]+4293915773&4294967295,_=w+(p<<15&4294967295|p>>>17),p=g+(w^(_|~m))+E[1]+2240044497&4294967295,g=_+(p<<21&4294967295|p>>>11),p=m+(_^(g|~w))+E[8]+1873313359&4294967295,m=g+(p<<6&4294967295|p>>>26),p=w+(g^(m|~_))+E[15]+4264355552&4294967295,w=m+(p<<10&4294967295|p>>>22),p=_+(m^(w|~g))+E[6]+2734768916&4294967295,_=w+(p<<15&4294967295|p>>>17),p=g+(w^(_|~m))+E[13]+1309151649&4294967295,g=_+(p<<21&4294967295|p>>>11),p=m+(_^(g|~w))+E[4]+4149444226&4294967295,m=g+(p<<6&4294967295|p>>>26),p=w+(g^(m|~_))+E[11]+3174756917&4294967295,w=m+(p<<10&4294967295|p>>>22),p=_+(m^(w|~g))+E[2]+718787259&4294967295,_=w+(p<<15&4294967295|p>>>17),p=g+(w^(_|~m))+E[9]+3951481745&4294967295,y.g[0]=y.g[0]+m&4294967295,y.g[1]=y.g[1]+(_+(p<<21&4294967295|p>>>11))&4294967295,y.g[2]=y.g[2]+_&4294967295,y.g[3]=y.g[3]+w&4294967295}s.prototype.v=function(y,m){m===void 0&&(m=y.length);const g=m-this.blockSize,E=this.C;let _=this.h,w=0;for(;w<m;){if(_==0)for(;w<=g;)i(this,y,w),w+=this.blockSize;if(typeof y=="string"){for(;w<m;)if(E[_++]=y.charCodeAt(w++),_==this.blockSize){i(this,E),_=0;break}}else for(;w<m;)if(E[_++]=y[w++],_==this.blockSize){i(this,E),_=0;break}}this.h=_,this.o+=m},s.prototype.A=function(){var y=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);y[0]=128;for(var m=1;m<y.length-8;++m)y[m]=0;m=this.o*8;for(var g=y.length-8;g<y.length;++g)y[g]=m&255,m/=256;for(this.v(y),y=Array(16),m=0,g=0;g<4;++g)for(let E=0;E<32;E+=8)y[m++]=this.g[g]>>>E&255;return y};function o(y,m){var g=h;return Object.prototype.hasOwnProperty.call(g,y)?g[y]:g[y]=m(y)}function l(y,m){this.h=m;const g=[];let E=!0;for(let _=y.length-1;_>=0;_--){const w=y[_]|0;E&&w==m||(g[_]=w,E=!1)}this.g=g}var h={};function f(y){return-128<=y&&y<128?o(y,function(m){return new l([m|0],m<0?-1:0)}):new l([y|0],y<0?-1:0)}function d(y){if(isNaN(y)||!isFinite(y))return A;if(y<0)return M(d(-y));const m=[];let g=1;for(let E=0;y>=g;E++)m[E]=y/g|0,g*=4294967296;return new l(m,0)}function T(y,m){if(y.length==0)throw Error("number format error: empty string");if(m=m||10,m<2||36<m)throw Error("radix out of range: "+m);if(y.charAt(0)=="-")return M(T(y.substring(1),m));if(y.indexOf("-")>=0)throw Error('number format error: interior "-" character');const g=d(Math.pow(m,8));let E=A;for(let w=0;w<y.length;w+=8){var _=Math.min(8,y.length-w);const p=parseInt(y.substring(w,w+_),m);_<8?(_=d(Math.pow(m,_)),E=E.j(_).add(d(p))):(E=E.j(g),E=E.add(d(p)))}return E}var A=f(0),C=f(1),x=f(16777216);n=l.prototype,n.m=function(){if(L(this))return-M(this).m();let y=0,m=1;for(let g=0;g<this.g.length;g++){const E=this.i(g);y+=(E>=0?E:4294967296+E)*m,m*=4294967296}return y},n.toString=function(y){if(y=y||10,y<2||36<y)throw Error("radix out of range: "+y);if(O(this))return"0";if(L(this))return"-"+M(this).toString(y);const m=d(Math.pow(y,6));var g=this;let E="";for(;;){const _=lt(g,m).g;g=D(g,_.j(m));let w=((g.g.length>0?g.g[0]:g.h)>>>0).toString(y);if(g=_,O(g))return w+E;for(;w.length<6;)w="0"+w;E=w+E}},n.i=function(y){return y<0?0:y<this.g.length?this.g[y]:this.h};function O(y){if(y.h!=0)return!1;for(let m=0;m<y.g.length;m++)if(y.g[m]!=0)return!1;return!0}function L(y){return y.h==-1}n.l=function(y){return y=D(this,y),L(y)?-1:O(y)?0:1};function M(y){const m=y.g.length,g=[];for(let E=0;E<m;E++)g[E]=~y.g[E];return new l(g,~y.h).add(C)}n.abs=function(){return L(this)?M(this):this},n.add=function(y){const m=Math.max(this.g.length,y.g.length),g=[];let E=0;for(let _=0;_<=m;_++){let w=E+(this.i(_)&65535)+(y.i(_)&65535),p=(w>>>16)+(this.i(_)>>>16)+(y.i(_)>>>16);E=p>>>16,w&=65535,p&=65535,g[_]=p<<16|w}return new l(g,g[g.length-1]&-2147483648?-1:0)};function D(y,m){return y.add(M(m))}n.j=function(y){if(O(this)||O(y))return A;if(L(this))return L(y)?M(this).j(M(y)):M(M(this).j(y));if(L(y))return M(this.j(M(y)));if(this.l(x)<0&&y.l(x)<0)return d(this.m()*y.m());const m=this.g.length+y.g.length,g=[];for(var E=0;E<2*m;E++)g[E]=0;for(E=0;E<this.g.length;E++)for(let _=0;_<y.g.length;_++){const w=this.i(E)>>>16,p=this.i(E)&65535,Et=y.i(_)>>>16,Yt=y.i(_)&65535;g[2*E+2*_]+=p*Yt,U(g,2*E+2*_),g[2*E+2*_+1]+=w*Yt,U(g,2*E+2*_+1),g[2*E+2*_+1]+=p*Et,U(g,2*E+2*_+1),g[2*E+2*_+2]+=w*Et,U(g,2*E+2*_+2)}for(y=0;y<m;y++)g[y]=g[2*y+1]<<16|g[2*y];for(y=m;y<2*m;y++)g[y]=0;return new l(g,0)};function U(y,m){for(;(y[m]&65535)!=y[m];)y[m+1]+=y[m]>>>16,y[m]&=65535,m++}function K(y,m){this.g=y,this.h=m}function lt(y,m){if(O(m))throw Error("division by zero");if(O(y))return new K(A,A);if(L(y))return m=lt(M(y),m),new K(M(m.g),M(m.h));if(L(m))return m=lt(y,M(m)),new K(M(m.g),m.h);if(y.g.length>30){if(L(y)||L(m))throw Error("slowDivide_ only works with positive integers.");for(var g=C,E=m;E.l(y)<=0;)g=rt(g),E=rt(E);var _=tt(g,1),w=tt(E,1);for(E=tt(E,2),g=tt(g,2);!O(E);){var p=w.add(E);p.l(y)<=0&&(_=_.add(g),w=p),E=tt(E,1),g=tt(g,1)}return m=D(y,_.j(m)),new K(_,m)}for(_=A;y.l(m)>=0;){for(g=Math.max(1,Math.floor(y.m()/m.m())),E=Math.ceil(Math.log(g)/Math.LN2),E=E<=48?1:Math.pow(2,E-48),w=d(g),p=w.j(m);L(p)||p.l(y)>0;)g-=E,w=d(g),p=w.j(m);O(w)&&(w=C),_=_.add(w),y=D(y,p)}return new K(_,y)}n.B=function(y){return lt(this,y).h},n.and=function(y){const m=Math.max(this.g.length,y.g.length),g=[];for(let E=0;E<m;E++)g[E]=this.i(E)&y.i(E);return new l(g,this.h&y.h)},n.or=function(y){const m=Math.max(this.g.length,y.g.length),g=[];for(let E=0;E<m;E++)g[E]=this.i(E)|y.i(E);return new l(g,this.h|y.h)},n.xor=function(y){const m=Math.max(this.g.length,y.g.length),g=[];for(let E=0;E<m;E++)g[E]=this.i(E)^y.i(E);return new l(g,this.h^y.h)};function rt(y){const m=y.g.length+1,g=[];for(let E=0;E<m;E++)g[E]=y.i(E)<<1|y.i(E-1)>>>31;return new l(g,y.h)}function tt(y,m){const g=m>>5;m%=32;const E=y.g.length-g,_=[];for(let w=0;w<E;w++)_[w]=m>0?y.i(w+g)>>>m|y.i(w+g+1)<<32-m:y.i(w+g);return new l(_,y.h)}s.prototype.digest=s.prototype.A,s.prototype.reset=s.prototype.u,s.prototype.update=s.prototype.v,l.prototype.add=l.prototype.add,l.prototype.multiply=l.prototype.j,l.prototype.modulo=l.prototype.B,l.prototype.compare=l.prototype.l,l.prototype.toNumber=l.prototype.m,l.prototype.toString=l.prototype.toString,l.prototype.getBits=l.prototype.i,l.fromNumber=d,l.fromString=T,ns=l}).apply(typeof Ki!="undefined"?Ki:typeof self!="undefined"?self:typeof window!="undefined"?window:{});var Pn=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Wo,ze,Ko,kn,Br,Qo,Xo,Jo;(function(){var n,t=Object.defineProperty;function e(r){r=[typeof globalThis=="object"&&globalThis,r,typeof window=="object"&&window,typeof self=="object"&&self,typeof Pn=="object"&&Pn];for(var a=0;a<r.length;++a){var c=r[a];if(c&&c.Math==Math)return c}throw Error("Cannot find global object")}var s=e(this);function i(r,a){if(a)t:{var c=s;r=r.split(".");for(var u=0;u<r.length-1;u++){var v=r[u];if(!(v in c))break t;c=c[v]}r=r[r.length-1],u=c[r],a=a(u),a!=u&&a!=null&&t(c,r,{configurable:!0,writable:!0,value:a})}}i("Symbol.dispose",function(r){return r||Symbol("Symbol.dispose")}),i("Array.prototype.values",function(r){return r||function(){return this[Symbol.iterator]()}}),i("Object.entries",function(r){return r||function(a){var c=[],u;for(u in a)Object.prototype.hasOwnProperty.call(a,u)&&c.push([u,a[u]]);return c}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},l=this||self;function h(r){var a=typeof r;return a=="object"&&r!=null||a=="function"}function f(r,a,c){return r.call.apply(r.bind,arguments)}function d(r,a,c){return d=f,d.apply(null,arguments)}function T(r,a){var c=Array.prototype.slice.call(arguments,1);return function(){var u=c.slice();return u.push.apply(u,arguments),r.apply(this,u)}}function A(r,a){function c(){}c.prototype=a.prototype,r.Z=a.prototype,r.prototype=new c,r.prototype.constructor=r,r.Ob=function(u,v,b){for(var P=Array(arguments.length-2),j=2;j<arguments.length;j++)P[j-2]=arguments[j];return a.prototype[v].apply(u,P)}}var C=typeof AsyncContext!="undefined"&&typeof AsyncContext.Snapshot=="function"?r=>r&&AsyncContext.Snapshot.wrap(r):r=>r;function x(r){const a=r.length;if(a>0){const c=Array(a);for(let u=0;u<a;u++)c[u]=r[u];return c}return[]}function O(r,a){for(let u=1;u<arguments.length;u++){const v=arguments[u];var c=typeof v;if(c=c!="object"?c:v?Array.isArray(v)?"array":c:"null",c=="array"||c=="object"&&typeof v.length=="number"){c=r.length||0;const b=v.length||0;r.length=c+b;for(let P=0;P<b;P++)r[c+P]=v[P]}else r.push(v)}}class L{constructor(a,c){this.i=a,this.j=c,this.h=0,this.g=null}get(){let a;return this.h>0?(this.h--,a=this.g,this.g=a.next,a.next=null):a=this.i(),a}}function M(r){l.setTimeout(()=>{throw r},0)}function D(){var r=y;let a=null;return r.g&&(a=r.g,r.g=r.g.next,r.g||(r.h=null),a.next=null),a}class U{constructor(){this.h=this.g=null}add(a,c){const u=K.get();u.set(a,c),this.h?this.h.next=u:this.g=u,this.h=u}}var K=new L(()=>new lt,r=>r.reset());class lt{constructor(){this.next=this.g=this.h=null}set(a,c){this.h=a,this.g=c,this.next=null}reset(){this.next=this.g=this.h=null}}let rt,tt=!1,y=new U,m=()=>{const r=Promise.resolve(void 0);rt=()=>{r.then(g)}};function g(){for(var r;r=D();){try{r.h.call(r.g)}catch(c){M(c)}var a=K;a.j(r),a.h<100&&(a.h++,r.next=a.g,a.g=r)}tt=!1}function E(){this.u=this.u,this.C=this.C}E.prototype.u=!1,E.prototype.dispose=function(){this.u||(this.u=!0,this.N())},E.prototype[Symbol.dispose]=function(){this.dispose()},E.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function _(r,a){this.type=r,this.g=this.target=a,this.defaultPrevented=!1}_.prototype.h=function(){this.defaultPrevented=!0};var w=(function(){if(!l.addEventListener||!Object.defineProperty)return!1;var r=!1,a=Object.defineProperty({},"passive",{get:function(){r=!0}});try{const c=()=>{};l.addEventListener("test",c,a),l.removeEventListener("test",c,a)}catch(c){}return r})();function p(r){return/^[\s\xa0]*$/.test(r)}function Et(r,a){_.call(this,r?r.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,r&&this.init(r,a)}A(Et,_),Et.prototype.init=function(r,a){const c=this.type=r.type,u=r.changedTouches&&r.changedTouches.length?r.changedTouches[0]:null;this.target=r.target||r.srcElement,this.g=a,a=r.relatedTarget,a||(c=="mouseover"?a=r.fromElement:c=="mouseout"&&(a=r.toElement)),this.relatedTarget=a,u?(this.clientX=u.clientX!==void 0?u.clientX:u.pageX,this.clientY=u.clientY!==void 0?u.clientY:u.pageY,this.screenX=u.screenX||0,this.screenY=u.screenY||0):(this.clientX=r.clientX!==void 0?r.clientX:r.pageX,this.clientY=r.clientY!==void 0?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0),this.button=r.button,this.key=r.key||"",this.ctrlKey=r.ctrlKey,this.altKey=r.altKey,this.shiftKey=r.shiftKey,this.metaKey=r.metaKey,this.pointerId=r.pointerId||0,this.pointerType=r.pointerType,this.state=r.state,this.i=r,r.defaultPrevented&&Et.Z.h.call(this)},Et.prototype.h=function(){Et.Z.h.call(this);const r=this.i;r.preventDefault?r.preventDefault():r.returnValue=!1};var Yt="closure_listenable_"+(Math.random()*1e6|0),el=0;function nl(r,a,c,u,v){this.listener=r,this.proxy=null,this.src=a,this.type=c,this.capture=!!u,this.ha=v,this.key=++el,this.da=this.fa=!1}function dn(r){r.da=!0,r.listener=null,r.proxy=null,r.src=null,r.ha=null}function mn(r,a,c){for(const u in r)a.call(c,r[u],u,r)}function rl(r,a){for(const c in r)a.call(void 0,r[c],c,r)}function xs(r){const a={};for(const c in r)a[c]=r[c];return a}const Cs="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Vs(r,a){let c,u;for(let v=1;v<arguments.length;v++){u=arguments[v];for(c in u)r[c]=u[c];for(let b=0;b<Cs.length;b++)c=Cs[b],Object.prototype.hasOwnProperty.call(u,c)&&(r[c]=u[c])}}function pn(r){this.src=r,this.g={},this.h=0}pn.prototype.add=function(r,a,c,u,v){const b=r.toString();r=this.g[b],r||(r=this.g[b]=[],this.h++);const P=ir(r,a,u,v);return P>-1?(a=r[P],c||(a.fa=!1)):(a=new nl(a,this.src,b,!!u,v),a.fa=c,r.push(a)),a};function sr(r,a){const c=a.type;if(c in r.g){var u=r.g[c],v=Array.prototype.indexOf.call(u,a,void 0),b;(b=v>=0)&&Array.prototype.splice.call(u,v,1),b&&(dn(a),r.g[c].length==0&&(delete r.g[c],r.h--))}}function ir(r,a,c,u){for(let v=0;v<r.length;++v){const b=r[v];if(!b.da&&b.listener==a&&b.capture==!!c&&b.ha==u)return v}return-1}var or="closure_lm_"+(Math.random()*1e6|0),ar={};function Ns(r,a,c,u,v){if(Array.isArray(a)){for(let b=0;b<a.length;b++)Ns(r,a[b],c,u,v);return null}return c=Os(c),r&&r[Yt]?r.J(a,c,h(u)?!!u.capture:!1,v):sl(r,a,c,!1,u,v)}function sl(r,a,c,u,v,b){if(!a)throw Error("Invalid event type");const P=h(v)?!!v.capture:!!v;let j=cr(r);if(j||(r[or]=j=new pn(r)),c=j.add(a,c,u,P,b),c.proxy)return c;if(u=il(),c.proxy=u,u.src=r,u.listener=c,r.addEventListener)w||(v=P),v===void 0&&(v=!1),r.addEventListener(a.toString(),u,v);else if(r.attachEvent)r.attachEvent(ks(a.toString()),u);else if(r.addListener&&r.removeListener)r.addListener(u);else throw Error("addEventListener and attachEvent are unavailable.");return c}function il(){function r(c){return a.call(r.src,r.listener,c)}const a=ol;return r}function Ds(r,a,c,u,v){if(Array.isArray(a))for(var b=0;b<a.length;b++)Ds(r,a[b],c,u,v);else u=h(u)?!!u.capture:!!u,c=Os(c),r&&r[Yt]?(r=r.i,b=String(a).toString(),b in r.g&&(a=r.g[b],c=ir(a,c,u,v),c>-1&&(dn(a[c]),Array.prototype.splice.call(a,c,1),a.length==0&&(delete r.g[b],r.h--)))):r&&(r=cr(r))&&(a=r.g[a.toString()],r=-1,a&&(r=ir(a,c,u,v)),(c=r>-1?a[r]:null)&&lr(c))}function lr(r){if(typeof r!="number"&&r&&!r.da){var a=r.src;if(a&&a[Yt])sr(a.i,r);else{var c=r.type,u=r.proxy;a.removeEventListener?a.removeEventListener(c,u,r.capture):a.detachEvent?a.detachEvent(ks(c),u):a.addListener&&a.removeListener&&a.removeListener(u),(c=cr(a))?(sr(c,r),c.h==0&&(c.src=null,a[or]=null)):dn(r)}}}function ks(r){return r in ar?ar[r]:ar[r]="on"+r}function ol(r,a){if(r.da)r=!0;else{a=new Et(a,this);const c=r.listener,u=r.ha||r.src;r.fa&&lr(r),r=c.call(u,a)}return r}function cr(r){return r=r[or],r instanceof pn?r:null}var ur="__closure_events_fn_"+(Math.random()*1e9>>>0);function Os(r){return typeof r=="function"?r:(r[ur]||(r[ur]=function(a){return r.handleEvent(a)}),r[ur])}function dt(){E.call(this),this.i=new pn(this),this.M=this,this.G=null}A(dt,E),dt.prototype[Yt]=!0,dt.prototype.removeEventListener=function(r,a,c,u){Ds(this,r,a,c,u)};function _t(r,a){var c,u=r.G;if(u)for(c=[];u;u=u.G)c.push(u);if(r=r.M,u=a.type||a,typeof a=="string")a=new _(a,r);else if(a instanceof _)a.target=a.target||r;else{var v=a;a=new _(u,r),Vs(a,v)}v=!0;let b,P;if(c)for(P=c.length-1;P>=0;P--)b=a.g=c[P],v=gn(b,u,!0,a)&&v;if(b=a.g=r,v=gn(b,u,!0,a)&&v,v=gn(b,u,!1,a)&&v,c)for(P=0;P<c.length;P++)b=a.g=c[P],v=gn(b,u,!1,a)&&v}dt.prototype.N=function(){if(dt.Z.N.call(this),this.i){var r=this.i;for(const a in r.g){const c=r.g[a];for(let u=0;u<c.length;u++)dn(c[u]);delete r.g[a],r.h--}}this.G=null},dt.prototype.J=function(r,a,c,u){return this.i.add(String(r),a,!1,c,u)},dt.prototype.K=function(r,a,c,u){return this.i.add(String(r),a,!0,c,u)};function gn(r,a,c,u){if(a=r.i.g[String(a)],!a)return!0;a=a.concat();let v=!0;for(let b=0;b<a.length;++b){const P=a[b];if(P&&!P.da&&P.capture==c){const j=P.listener,st=P.ha||P.src;P.fa&&sr(r.i,P),v=j.call(st,u)!==!1&&v}}return v&&!u.defaultPrevented}function al(r,a){if(typeof r!="function")if(r&&typeof r.handleEvent=="function")r=d(r.handleEvent,r);else throw Error("Invalid listener argument");return Number(a)>2147483647?-1:l.setTimeout(r,a||0)}function Ms(r){r.g=al(()=>{r.g=null,r.i&&(r.i=!1,Ms(r))},r.l);const a=r.h;r.h=null,r.m.apply(null,a)}class ll extends E{constructor(a,c){super(),this.m=a,this.l=c,this.h=null,this.i=!1,this.g=null}j(a){this.h=arguments,this.g?this.i=!0:Ms(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Pe(r){E.call(this),this.h=r,this.g={}}A(Pe,E);var Ls=[];function Fs(r){mn(r.g,function(a,c){this.g.hasOwnProperty(c)&&lr(a)},r),r.g={}}Pe.prototype.N=function(){Pe.Z.N.call(this),Fs(this)},Pe.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var hr=l.JSON.stringify,cl=l.JSON.parse,ul=class{stringify(r){return l.JSON.stringify(r,void 0)}parse(r){return l.JSON.parse(r,void 0)}};function js(){}function Us(){}var xe={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function fr(){_.call(this,"d")}A(fr,_);function dr(){_.call(this,"c")}A(dr,_);var Zt={},Bs=null;function _n(){return Bs=Bs||new dt}Zt.Ia="serverreachability";function $s(r){_.call(this,Zt.Ia,r)}A($s,_);function Ce(r){const a=_n();_t(a,new $s(a))}Zt.STAT_EVENT="statevent";function qs(r,a){_.call(this,Zt.STAT_EVENT,r),this.stat=a}A(qs,_);function yt(r){const a=_n();_t(a,new qs(a,r))}Zt.Ja="timingevent";function Gs(r,a){_.call(this,Zt.Ja,r),this.size=a}A(Gs,_);function Ve(r,a){if(typeof r!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){r()},a)}function Ne(){this.g=!0}Ne.prototype.ua=function(){this.g=!1};function hl(r,a,c,u,v,b){r.info(function(){if(r.g)if(b){var P="",j=b.split("&");for(let H=0;H<j.length;H++){var st=j[H].split("=");if(st.length>1){const it=st[0];st=st[1];const Ct=it.split("_");P=Ct.length>=2&&Ct[1]=="type"?P+(it+"="+st+"&"):P+(it+"=redacted&")}}}else P=null;else P=b;return"XMLHTTP REQ ("+u+") [attempt "+v+"]: "+a+`
`+c+`
`+P})}function fl(r,a,c,u,v,b,P){r.info(function(){return"XMLHTTP RESP ("+u+") [ attempt "+v+"]: "+a+`
`+c+`
`+b+" "+P})}function de(r,a,c,u){r.info(function(){return"XMLHTTP TEXT ("+a+"): "+ml(r,c)+(u?" "+u:"")})}function dl(r,a){r.info(function(){return"TIMEOUT: "+a})}Ne.prototype.info=function(){};function ml(r,a){if(!r.g)return a;if(!a)return null;try{const b=JSON.parse(a);if(b){for(r=0;r<b.length;r++)if(Array.isArray(b[r])){var c=b[r];if(!(c.length<2)){var u=c[1];if(Array.isArray(u)&&!(u.length<1)){var v=u[0];if(v!="noop"&&v!="stop"&&v!="close")for(let P=1;P<u.length;P++)u[P]=""}}}}return hr(b)}catch(b){return a}}var yn={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Hs={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},zs;function mr(){}A(mr,js),mr.prototype.g=function(){return new XMLHttpRequest},zs=new mr;function De(r){return encodeURIComponent(String(r))}function pl(r){var a=1;r=r.split(":");const c=[];for(;a>0&&r.length;)c.push(r.shift()),a--;return r.length&&c.push(r.join(":")),c}function jt(r,a,c,u){this.j=r,this.i=a,this.l=c,this.S=u||1,this.V=new Pe(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Ws}function Ws(){this.i=null,this.g="",this.h=!1}var Ks={},pr={};function gr(r,a,c){r.M=1,r.A=vn(xt(a)),r.u=c,r.R=!0,Qs(r,null)}function Qs(r,a){r.F=Date.now(),En(r),r.B=xt(r.A);var c=r.B,u=r.S;Array.isArray(u)||(u=[String(u)]),li(c.i,"t",u),r.C=0,c=r.j.L,r.h=new Ws,r.g=Ri(r.j,c?a:null,!r.u),r.P>0&&(r.O=new ll(d(r.Y,r,r.g),r.P)),a=r.V,c=r.g,u=r.ba;var v="readystatechange";Array.isArray(v)||(v&&(Ls[0]=v.toString()),v=Ls);for(let b=0;b<v.length;b++){const P=Ns(c,v[b],u||a.handleEvent,!1,a.h||a);if(!P)break;a.g[P.key]=P}a=r.J?xs(r.J):{},r.u?(r.v||(r.v="POST"),a["Content-Type"]="application/x-www-form-urlencoded",r.g.ea(r.B,r.v,r.u,a)):(r.v="GET",r.g.ea(r.B,r.v,null,a)),Ce(),hl(r.i,r.v,r.B,r.l,r.S,r.u)}jt.prototype.ba=function(r){r=r.target;const a=this.O;a&&$t(r)==3?a.j():this.Y(r)},jt.prototype.Y=function(r){try{if(r==this.g)t:{const j=$t(this.g),st=this.g.ya(),H=this.g.ca();if(!(j<3)&&(j!=3||this.g&&(this.h.h||this.g.la()||pi(this.g)))){this.K||j!=4||st==7||(st==8||H<=0?Ce(3):Ce(2)),_r(this);var a=this.g.ca();this.X=a;var c=gl(this);if(this.o=a==200,fl(this.i,this.v,this.B,this.l,this.S,j,a),this.o){if(this.U&&!this.L){e:{if(this.g){var u,v=this.g;if((u=v.g?v.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!p(u)){var b=u;break e}}b=null}if(r=b)de(this.i,this.l,r,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,yr(this,r);else{this.o=!1,this.m=3,yt(12),te(this),ke(this);break t}}if(this.R){r=!0;let it;for(;!this.K&&this.C<c.length;)if(it=_l(this,c),it==pr){j==4&&(this.m=4,yt(14),r=!1),de(this.i,this.l,null,"[Incomplete Response]");break}else if(it==Ks){this.m=4,yt(15),de(this.i,this.l,c,"[Invalid Chunk]"),r=!1;break}else de(this.i,this.l,it,null),yr(this,it);if(Xs(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),j!=4||c.length!=0||this.h.h||(this.m=1,yt(16),r=!1),this.o=this.o&&r,!r)de(this.i,this.l,c,"[Invalid Chunked Response]"),te(this),ke(this);else if(c.length>0&&!this.W){this.W=!0;var P=this.j;P.g==this&&P.aa&&!P.P&&(P.j.info("Great, no buffering proxy detected. Bytes received: "+c.length),Rr(P),P.P=!0,yt(11))}}else de(this.i,this.l,c,null),yr(this,c);j==4&&te(this),this.o&&!this.K&&(j==4?wi(this.j,this):(this.o=!1,En(this)))}else Vl(this.g),a==400&&c.indexOf("Unknown SID")>0?(this.m=3,yt(12)):(this.m=0,yt(13)),te(this),ke(this)}}}catch(j){}finally{}};function gl(r){if(!Xs(r))return r.g.la();const a=pi(r.g);if(a==="")return"";let c="";const u=a.length,v=$t(r.g)==4;if(!r.h.i){if(typeof TextDecoder=="undefined")return te(r),ke(r),"";r.h.i=new l.TextDecoder}for(let b=0;b<u;b++)r.h.h=!0,c+=r.h.i.decode(a[b],{stream:!(v&&b==u-1)});return a.length=0,r.h.g+=c,r.C=0,r.h.g}function Xs(r){return r.g?r.v=="GET"&&r.M!=2&&r.j.Aa:!1}function _l(r,a){var c=r.C,u=a.indexOf(`
`,c);return u==-1?pr:(c=Number(a.substring(c,u)),isNaN(c)?Ks:(u+=1,u+c>a.length?pr:(a=a.slice(u,u+c),r.C=u+c,a)))}jt.prototype.cancel=function(){this.K=!0,te(this)};function En(r){r.T=Date.now()+r.H,Js(r,r.H)}function Js(r,a){if(r.D!=null)throw Error("WatchDog timer not null");r.D=Ve(d(r.aa,r),a)}function _r(r){r.D&&(l.clearTimeout(r.D),r.D=null)}jt.prototype.aa=function(){this.D=null;const r=Date.now();r-this.T>=0?(dl(this.i,this.B),this.M!=2&&(Ce(),yt(17)),te(this),this.m=2,ke(this)):Js(this,this.T-r)};function ke(r){r.j.I==0||r.K||wi(r.j,r)}function te(r){_r(r);var a=r.O;a&&typeof a.dispose=="function"&&a.dispose(),r.O=null,Fs(r.V),r.g&&(a=r.g,r.g=null,a.abort(),a.dispose())}function yr(r,a){try{var c=r.j;if(c.I!=0&&(c.g==r||Er(c.h,r))){if(!r.L&&Er(c.h,r)&&c.I==3){try{var u=c.Ba.g.parse(a)}catch(H){u=null}if(Array.isArray(u)&&u.length==3){var v=u;if(v[0]==0){t:if(!c.v){if(c.g)if(c.g.F+3e3<r.F)bn(c),An(c);else break t;br(c),yt(18)}}else c.xa=v[1],0<c.xa-c.K&&v[2]<37500&&c.F&&c.A==0&&!c.C&&(c.C=Ve(d(c.Va,c),6e3));ti(c.h)<=1&&c.ta&&(c.ta=void 0)}else ne(c,11)}else if((r.L||c.g==r)&&bn(c),!p(a))for(v=c.Ba.g.parse(a),a=0;a<v.length;a++){let H=v[a];const it=H[0];if(!(it<=c.K))if(c.K=it,H=H[1],c.I==2)if(H[0]=="c"){c.M=H[1],c.ba=H[2];const Ct=H[3];Ct!=null&&(c.ka=Ct,c.j.info("VER="+c.ka));const re=H[4];re!=null&&(c.za=re,c.j.info("SVER="+c.za));const qt=H[5];qt!=null&&typeof qt=="number"&&qt>0&&(u=1.5*qt,c.O=u,c.j.info("backChannelRequestTimeoutMs_="+u)),u=c;const Gt=r.g;if(Gt){const Sn=Gt.g?Gt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Sn){var b=u.h;b.g||Sn.indexOf("spdy")==-1&&Sn.indexOf("quic")==-1&&Sn.indexOf("h2")==-1||(b.j=b.l,b.g=new Set,b.h&&(vr(b,b.h),b.h=null))}if(u.G){const Sr=Gt.g?Gt.g.getResponseHeader("X-HTTP-Session-Id"):null;Sr&&(u.wa=Sr,W(u.J,u.G,Sr))}}c.I=3,c.l&&c.l.ra(),c.aa&&(c.T=Date.now()-r.F,c.j.info("Handshake RTT: "+c.T+"ms")),u=c;var P=r;if(u.na=bi(u,u.L?u.ba:null,u.W),P.L){ei(u.h,P);var j=P,st=u.O;st&&(j.H=st),j.D&&(_r(j),En(j)),u.g=P}else vi(u);c.i.length>0&&In(c)}else H[0]!="stop"&&H[0]!="close"||ne(c,7);else c.I==3&&(H[0]=="stop"||H[0]=="close"?H[0]=="stop"?ne(c,7):Ir(c):H[0]!="noop"&&c.l&&c.l.qa(H),c.A=0)}}Ce(4)}catch(H){}}var yl=class{constructor(r,a){this.g=r,this.map=a}};function Ys(r){this.l=r||10,l.PerformanceNavigationTiming?(r=l.performance.getEntriesByType("navigation"),r=r.length>0&&(r[0].nextHopProtocol=="hq"||r[0].nextHopProtocol=="h2")):r=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=r?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Zs(r){return r.h?!0:r.g?r.g.size>=r.j:!1}function ti(r){return r.h?1:r.g?r.g.size:0}function Er(r,a){return r.h?r.h==a:r.g?r.g.has(a):!1}function vr(r,a){r.g?r.g.add(a):r.h=a}function ei(r,a){r.h&&r.h==a?r.h=null:r.g&&r.g.has(a)&&r.g.delete(a)}Ys.prototype.cancel=function(){if(this.i=ni(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const r of this.g.values())r.cancel();this.g.clear()}};function ni(r){if(r.h!=null)return r.i.concat(r.h.G);if(r.g!=null&&r.g.size!==0){let a=r.i;for(const c of r.g.values())a=a.concat(c.G);return a}return x(r.i)}var ri=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function El(r,a){if(r){r=r.split("&");for(let c=0;c<r.length;c++){const u=r[c].indexOf("=");let v,b=null;u>=0?(v=r[c].substring(0,u),b=r[c].substring(u+1)):v=r[c],a(v,b?decodeURIComponent(b.replace(/\+/g," ")):"")}}}function Ut(r){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let a;r instanceof Ut?(this.l=r.l,Oe(this,r.j),this.o=r.o,this.g=r.g,Me(this,r.u),this.h=r.h,Tr(this,ci(r.i)),this.m=r.m):r&&(a=String(r).match(ri))?(this.l=!1,Oe(this,a[1]||"",!0),this.o=Le(a[2]||""),this.g=Le(a[3]||"",!0),Me(this,a[4]),this.h=Le(a[5]||"",!0),Tr(this,a[6]||"",!0),this.m=Le(a[7]||"")):(this.l=!1,this.i=new je(null,this.l))}Ut.prototype.toString=function(){const r=[];var a=this.j;a&&r.push(Fe(a,si,!0),":");var c=this.g;return(c||a=="file")&&(r.push("//"),(a=this.o)&&r.push(Fe(a,si,!0),"@"),r.push(De(c).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.u,c!=null&&r.push(":",String(c))),(c=this.h)&&(this.g&&c.charAt(0)!="/"&&r.push("/"),r.push(Fe(c,c.charAt(0)=="/"?wl:Tl,!0))),(c=this.i.toString())&&r.push("?",c),(c=this.m)&&r.push("#",Fe(c,Il)),r.join("")},Ut.prototype.resolve=function(r){const a=xt(this);let c=!!r.j;c?Oe(a,r.j):c=!!r.o,c?a.o=r.o:c=!!r.g,c?a.g=r.g:c=r.u!=null;var u=r.h;if(c)Me(a,r.u);else if(c=!!r.h){if(u.charAt(0)!="/")if(this.g&&!this.h)u="/"+u;else{var v=a.h.lastIndexOf("/");v!=-1&&(u=a.h.slice(0,v+1)+u)}if(v=u,v==".."||v==".")u="";else if(v.indexOf("./")!=-1||v.indexOf("/.")!=-1){u=v.lastIndexOf("/",0)==0,v=v.split("/");const b=[];for(let P=0;P<v.length;){const j=v[P++];j=="."?u&&P==v.length&&b.push(""):j==".."?((b.length>1||b.length==1&&b[0]!="")&&b.pop(),u&&P==v.length&&b.push("")):(b.push(j),u=!0)}u=b.join("/")}else u=v}return c?a.h=u:c=r.i.toString()!=="",c?Tr(a,ci(r.i)):c=!!r.m,c&&(a.m=r.m),a};function xt(r){return new Ut(r)}function Oe(r,a,c){r.j=c?Le(a,!0):a,r.j&&(r.j=r.j.replace(/:$/,""))}function Me(r,a){if(a){if(a=Number(a),isNaN(a)||a<0)throw Error("Bad port number "+a);r.u=a}else r.u=null}function Tr(r,a,c){a instanceof je?(r.i=a,bl(r.i,r.l)):(c||(a=Fe(a,Al)),r.i=new je(a,r.l))}function W(r,a,c){r.i.set(a,c)}function vn(r){return W(r,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),r}function Le(r,a){return r?a?decodeURI(r.replace(/%25/g,"%2525")):decodeURIComponent(r):""}function Fe(r,a,c){return typeof r=="string"?(r=encodeURI(r).replace(a,vl),c&&(r=r.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),r):null}function vl(r){return r=r.charCodeAt(0),"%"+(r>>4&15).toString(16)+(r&15).toString(16)}var si=/[#\/\?@]/g,Tl=/[#\?:]/g,wl=/[#\?]/g,Al=/[#\?@]/g,Il=/#/g;function je(r,a){this.h=this.g=null,this.i=r||null,this.j=!!a}function ee(r){r.g||(r.g=new Map,r.h=0,r.i&&El(r.i,function(a,c){r.add(decodeURIComponent(a.replace(/\+/g," ")),c)}))}n=je.prototype,n.add=function(r,a){ee(this),this.i=null,r=me(this,r);let c=this.g.get(r);return c||this.g.set(r,c=[]),c.push(a),this.h+=1,this};function ii(r,a){ee(r),a=me(r,a),r.g.has(a)&&(r.i=null,r.h-=r.g.get(a).length,r.g.delete(a))}function oi(r,a){return ee(r),a=me(r,a),r.g.has(a)}n.forEach=function(r,a){ee(this),this.g.forEach(function(c,u){c.forEach(function(v){r.call(a,v,u,this)},this)},this)};function ai(r,a){ee(r);let c=[];if(typeof a=="string")oi(r,a)&&(c=c.concat(r.g.get(me(r,a))));else for(r=Array.from(r.g.values()),a=0;a<r.length;a++)c=c.concat(r[a]);return c}n.set=function(r,a){return ee(this),this.i=null,r=me(this,r),oi(this,r)&&(this.h-=this.g.get(r).length),this.g.set(r,[a]),this.h+=1,this},n.get=function(r,a){return r?(r=ai(this,r),r.length>0?String(r[0]):a):a};function li(r,a,c){ii(r,a),c.length>0&&(r.i=null,r.g.set(me(r,a),x(c)),r.h+=c.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const r=[],a=Array.from(this.g.keys());for(let u=0;u<a.length;u++){var c=a[u];const v=De(c);c=ai(this,c);for(let b=0;b<c.length;b++){let P=v;c[b]!==""&&(P+="="+De(c[b])),r.push(P)}}return this.i=r.join("&")};function ci(r){const a=new je;return a.i=r.i,r.g&&(a.g=new Map(r.g),a.h=r.h),a}function me(r,a){return a=String(a),r.j&&(a=a.toLowerCase()),a}function bl(r,a){a&&!r.j&&(ee(r),r.i=null,r.g.forEach(function(c,u){const v=u.toLowerCase();u!=v&&(ii(this,u),li(this,v,c))},r)),r.j=a}function Rl(r,a){const c=new Ne;if(l.Image){const u=new Image;u.onload=T(Bt,c,"TestLoadImage: loaded",!0,a,u),u.onerror=T(Bt,c,"TestLoadImage: error",!1,a,u),u.onabort=T(Bt,c,"TestLoadImage: abort",!1,a,u),u.ontimeout=T(Bt,c,"TestLoadImage: timeout",!1,a,u),l.setTimeout(function(){u.ontimeout&&u.ontimeout()},1e4),u.src=r}else a(!1)}function Sl(r,a){const c=new Ne,u=new AbortController,v=setTimeout(()=>{u.abort(),Bt(c,"TestPingServer: timeout",!1,a)},1e4);fetch(r,{signal:u.signal}).then(b=>{clearTimeout(v),b.ok?Bt(c,"TestPingServer: ok",!0,a):Bt(c,"TestPingServer: server error",!1,a)}).catch(()=>{clearTimeout(v),Bt(c,"TestPingServer: error",!1,a)})}function Bt(r,a,c,u,v){try{v&&(v.onload=null,v.onerror=null,v.onabort=null,v.ontimeout=null),u(c)}catch(b){}}function Pl(){this.g=new ul}function wr(r){this.i=r.Sb||null,this.h=r.ab||!1}A(wr,js),wr.prototype.g=function(){return new Tn(this.i,this.h)};function Tn(r,a){dt.call(this),this.H=r,this.o=a,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}A(Tn,dt),n=Tn.prototype,n.open=function(r,a){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=r,this.D=a,this.readyState=1,Be(this)},n.send=function(r){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const a={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};r&&(a.body=r),(this.H||l).fetch(new Request(this.D,a)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Ue(this)),this.readyState=0},n.Pa=function(r){if(this.g&&(this.l=r,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=r.headers,this.readyState=2,Be(this)),this.g&&(this.readyState=3,Be(this),this.g)))if(this.responseType==="arraybuffer")r.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream!="undefined"&&"body"in r){if(this.j=r.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;ui(this)}else r.text().then(this.Oa.bind(this),this.ga.bind(this))};function ui(r){r.j.read().then(r.Ma.bind(r)).catch(r.ga.bind(r))}n.Ma=function(r){if(this.g){if(this.o&&r.value)this.response.push(r.value);else if(!this.o){var a=r.value?r.value:new Uint8Array(0);(a=this.B.decode(a,{stream:!r.done}))&&(this.response=this.responseText+=a)}r.done?Ue(this):Be(this),this.readyState==3&&ui(this)}},n.Oa=function(r){this.g&&(this.response=this.responseText=r,Ue(this))},n.Na=function(r){this.g&&(this.response=r,Ue(this))},n.ga=function(){this.g&&Ue(this)};function Ue(r){r.readyState=4,r.l=null,r.j=null,r.B=null,Be(r)}n.setRequestHeader=function(r,a){this.A.append(r,a)},n.getResponseHeader=function(r){return this.h&&this.h.get(r.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const r=[],a=this.h.entries();for(var c=a.next();!c.done;)c=c.value,r.push(c[0]+": "+c[1]),c=a.next();return r.join(`\r
`)};function Be(r){r.onreadystatechange&&r.onreadystatechange.call(r)}Object.defineProperty(Tn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(r){this.m=r?"include":"same-origin"}});function hi(r){let a="";return mn(r,function(c,u){a+=u,a+=":",a+=c,a+=`\r
`}),a}function Ar(r,a,c){t:{for(u in c){var u=!1;break t}u=!0}u||(c=hi(c),typeof r=="string"?c!=null&&De(c):W(r,a,c))}function Y(r){dt.call(this),this.headers=new Map,this.L=r||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}A(Y,dt);var xl=/^https?$/i,Cl=["POST","PUT"];n=Y.prototype,n.Fa=function(r){this.H=r},n.ea=function(r,a,c,u){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+r);a=a?a.toUpperCase():"GET",this.D=r,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():zs.g(),this.g.onreadystatechange=C(d(this.Ca,this));try{this.B=!0,this.g.open(a,String(r),!0),this.B=!1}catch(b){fi(this,b);return}if(r=c||"",c=new Map(this.headers),u)if(Object.getPrototypeOf(u)===Object.prototype)for(var v in u)c.set(v,u[v]);else if(typeof u.keys=="function"&&typeof u.get=="function")for(const b of u.keys())c.set(b,u.get(b));else throw Error("Unknown input type for opt_headers: "+String(u));u=Array.from(c.keys()).find(b=>b.toLowerCase()=="content-type"),v=l.FormData&&r instanceof l.FormData,!(Array.prototype.indexOf.call(Cl,a,void 0)>=0)||u||v||c.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[b,P]of c)this.g.setRequestHeader(b,P);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(r),this.v=!1}catch(b){fi(this,b)}};function fi(r,a){r.h=!1,r.g&&(r.j=!0,r.g.abort(),r.j=!1),r.l=a,r.o=5,di(r),wn(r)}function di(r){r.A||(r.A=!0,_t(r,"complete"),_t(r,"error"))}n.abort=function(r){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=r||7,_t(this,"complete"),_t(this,"abort"),wn(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),wn(this,!0)),Y.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?mi(this):this.Xa())},n.Xa=function(){mi(this)};function mi(r){if(r.h&&typeof o!="undefined"){if(r.v&&$t(r)==4)setTimeout(r.Ca.bind(r),0);else if(_t(r,"readystatechange"),$t(r)==4){r.h=!1;try{const b=r.ca();t:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var a=!0;break t;default:a=!1}var c;if(!(c=a)){var u;if(u=b===0){let P=String(r.D).match(ri)[1]||null;!P&&l.self&&l.self.location&&(P=l.self.location.protocol.slice(0,-1)),u=!xl.test(P?P.toLowerCase():"")}c=u}if(c)_t(r,"complete"),_t(r,"success");else{r.o=6;try{var v=$t(r)>2?r.g.statusText:""}catch(P){v=""}r.l=v+" ["+r.ca()+"]",di(r)}}finally{wn(r)}}}}function wn(r,a){if(r.g){r.m&&(clearTimeout(r.m),r.m=null);const c=r.g;r.g=null,a||_t(r,"ready");try{c.onreadystatechange=null}catch(u){}}}n.isActive=function(){return!!this.g};function $t(r){return r.g?r.g.readyState:0}n.ca=function(){try{return $t(this)>2?this.g.status:-1}catch(r){return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch(r){return""}},n.La=function(r){if(this.g){var a=this.g.responseText;return r&&a.indexOf(r)==0&&(a=a.substring(r.length)),cl(a)}};function pi(r){try{if(!r.g)return null;if("response"in r.g)return r.g.response;switch(r.F){case"":case"text":return r.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in r.g)return r.g.mozResponseArrayBuffer}return null}catch(a){return null}}function Vl(r){const a={};r=(r.g&&$t(r)>=2&&r.g.getAllResponseHeaders()||"").split(`\r
`);for(let u=0;u<r.length;u++){if(p(r[u]))continue;var c=pl(r[u]);const v=c[0];if(c=c[1],typeof c!="string")continue;c=c.trim();const b=a[v]||[];a[v]=b,b.push(c)}rl(a,function(u){return u.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function $e(r,a,c){return c&&c.internalChannelParams&&c.internalChannelParams[r]||a}function gi(r){this.za=0,this.i=[],this.j=new Ne,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=$e("failFast",!1,r),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=$e("baseRetryDelayMs",5e3,r),this.Za=$e("retryDelaySeedMs",1e4,r),this.Ta=$e("forwardChannelMaxRetries",2,r),this.va=$e("forwardChannelRequestTimeoutMs",2e4,r),this.ma=r&&r.xmlHttpFactory||void 0,this.Ua=r&&r.Rb||void 0,this.Aa=r&&r.useFetchStreams||!1,this.O=void 0,this.L=r&&r.supportsCrossDomainXhr||!1,this.M="",this.h=new Ys(r&&r.concurrentRequestLimit),this.Ba=new Pl,this.S=r&&r.fastHandshake||!1,this.R=r&&r.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=r&&r.Pb||!1,r&&r.ua&&this.j.ua(),r&&r.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&r&&r.detectBufferingProxy||!1,this.ia=void 0,r&&r.longPollingTimeout&&r.longPollingTimeout>0&&(this.ia=r.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=gi.prototype,n.ka=8,n.I=1,n.connect=function(r,a,c,u){yt(0),this.W=r,this.H=a||{},c&&u!==void 0&&(this.H.OSID=c,this.H.OAID=u),this.F=this.X,this.J=bi(this,null,this.W),In(this)};function Ir(r){if(_i(r),r.I==3){var a=r.V++,c=xt(r.J);if(W(c,"SID",r.M),W(c,"RID",a),W(c,"TYPE","terminate"),qe(r,c),a=new jt(r,r.j,a),a.M=2,a.A=vn(xt(c)),c=!1,l.navigator&&l.navigator.sendBeacon)try{c=l.navigator.sendBeacon(a.A.toString(),"")}catch(u){}!c&&l.Image&&(new Image().src=a.A,c=!0),c||(a.g=Ri(a.j,null),a.g.ea(a.A)),a.F=Date.now(),En(a)}Ii(r)}function An(r){r.g&&(Rr(r),r.g.cancel(),r.g=null)}function _i(r){An(r),r.v&&(l.clearTimeout(r.v),r.v=null),bn(r),r.h.cancel(),r.m&&(typeof r.m=="number"&&l.clearTimeout(r.m),r.m=null)}function In(r){if(!Zs(r.h)&&!r.m){r.m=!0;var a=r.Ea;rt||m(),tt||(rt(),tt=!0),y.add(a,r),r.D=0}}function Nl(r,a){return ti(r.h)>=r.h.j-(r.m?1:0)?!1:r.m?(r.i=a.G.concat(r.i),!0):r.I==1||r.I==2||r.D>=(r.Sa?0:r.Ta)?!1:(r.m=Ve(d(r.Ea,r,a),Ai(r,r.D)),r.D++,!0)}n.Ea=function(r){if(this.m)if(this.m=null,this.I==1){if(!r){this.V=Math.floor(Math.random()*1e5),r=this.V++;const v=new jt(this,this.j,r);let b=this.o;if(this.U&&(b?(b=xs(b),Vs(b,this.U)):b=this.U),this.u!==null||this.R||(v.J=b,b=null),this.S)t:{for(var a=0,c=0;c<this.i.length;c++){e:{var u=this.i[c];if("__data__"in u.map&&(u=u.map.__data__,typeof u=="string")){u=u.length;break e}u=void 0}if(u===void 0)break;if(a+=u,a>4096){a=c;break t}if(a===4096||c===this.i.length-1){a=c+1;break t}}a=1e3}else a=1e3;a=Ei(this,v,a),c=xt(this.J),W(c,"RID",r),W(c,"CVER",22),this.G&&W(c,"X-HTTP-Session-Id",this.G),qe(this,c),b&&(this.R?a="headers="+De(hi(b))+"&"+a:this.u&&Ar(c,this.u,b)),vr(this.h,v),this.Ra&&W(c,"TYPE","init"),this.S?(W(c,"$req",a),W(c,"SID","null"),v.U=!0,gr(v,c,null)):gr(v,c,a),this.I=2}}else this.I==3&&(r?yi(this,r):this.i.length==0||Zs(this.h)||yi(this))};function yi(r,a){var c;a?c=a.l:c=r.V++;const u=xt(r.J);W(u,"SID",r.M),W(u,"RID",c),W(u,"AID",r.K),qe(r,u),r.u&&r.o&&Ar(u,r.u,r.o),c=new jt(r,r.j,c,r.D+1),r.u===null&&(c.J=r.o),a&&(r.i=a.G.concat(r.i)),a=Ei(r,c,1e3),c.H=Math.round(r.va*.5)+Math.round(r.va*.5*Math.random()),vr(r.h,c),gr(c,u,a)}function qe(r,a){r.H&&mn(r.H,function(c,u){W(a,u,c)}),r.l&&mn({},function(c,u){W(a,u,c)})}function Ei(r,a,c){c=Math.min(r.i.length,c);const u=r.l?d(r.l.Ka,r.l,r):null;t:{var v=r.i;let j=-1;for(;;){const st=["count="+c];j==-1?c>0?(j=v[0].g,st.push("ofs="+j)):j=0:st.push("ofs="+j);let H=!0;for(let it=0;it<c;it++){var b=v[it].g;const Ct=v[it].map;if(b-=j,b<0)j=Math.max(0,v[it].g-100),H=!1;else try{b="req"+b+"_"||"";try{var P=Ct instanceof Map?Ct:Object.entries(Ct);for(const[re,qt]of P){let Gt=qt;h(qt)&&(Gt=hr(qt)),st.push(b+re+"="+encodeURIComponent(Gt))}}catch(re){throw st.push(b+"type="+encodeURIComponent("_badmap")),re}}catch(re){u&&u(Ct)}}if(H){P=st.join("&");break t}}P=void 0}return r=r.i.splice(0,c),a.G=r,P}function vi(r){if(!r.g&&!r.v){r.Y=1;var a=r.Da;rt||m(),tt||(rt(),tt=!0),y.add(a,r),r.A=0}}function br(r){return r.g||r.v||r.A>=3?!1:(r.Y++,r.v=Ve(d(r.Da,r),Ai(r,r.A)),r.A++,!0)}n.Da=function(){if(this.v=null,Ti(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var r=4*this.T;this.j.info("BP detection timer enabled: "+r),this.B=Ve(d(this.Wa,this),r)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,yt(10),An(this),Ti(this))};function Rr(r){r.B!=null&&(l.clearTimeout(r.B),r.B=null)}function Ti(r){r.g=new jt(r,r.j,"rpc",r.Y),r.u===null&&(r.g.J=r.o),r.g.P=0;var a=xt(r.na);W(a,"RID","rpc"),W(a,"SID",r.M),W(a,"AID",r.K),W(a,"CI",r.F?"0":"1"),!r.F&&r.ia&&W(a,"TO",r.ia),W(a,"TYPE","xmlhttp"),qe(r,a),r.u&&r.o&&Ar(a,r.u,r.o),r.O&&(r.g.H=r.O);var c=r.g;r=r.ba,c.M=1,c.A=vn(xt(a)),c.u=null,c.R=!0,Qs(c,r)}n.Va=function(){this.C!=null&&(this.C=null,An(this),br(this),yt(19))};function bn(r){r.C!=null&&(l.clearTimeout(r.C),r.C=null)}function wi(r,a){var c=null;if(r.g==a){bn(r),Rr(r),r.g=null;var u=2}else if(Er(r.h,a))c=a.G,ei(r.h,a),u=1;else return;if(r.I!=0){if(a.o)if(u==1){c=a.u?a.u.length:0,a=Date.now()-a.F;var v=r.D;u=_n(),_t(u,new Gs(u,c)),In(r)}else vi(r);else if(v=a.m,v==3||v==0&&a.X>0||!(u==1&&Nl(r,a)||u==2&&br(r)))switch(c&&c.length>0&&(a=r.h,a.i=a.i.concat(c)),v){case 1:ne(r,5);break;case 4:ne(r,10);break;case 3:ne(r,6);break;default:ne(r,2)}}}function Ai(r,a){let c=r.Qa+Math.floor(Math.random()*r.Za);return r.isActive()||(c*=2),c*a}function ne(r,a){if(r.j.info("Error code "+a),a==2){var c=d(r.bb,r),u=r.Ua;const v=!u;u=new Ut(u||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||Oe(u,"https"),vn(u),v?Rl(u.toString(),c):Sl(u.toString(),c)}else yt(2);r.I=0,r.l&&r.l.pa(a),Ii(r),_i(r)}n.bb=function(r){r?(this.j.info("Successfully pinged google.com"),yt(2)):(this.j.info("Failed to ping google.com"),yt(1))};function Ii(r){if(r.I=0,r.ja=[],r.l){const a=ni(r.h);(a.length!=0||r.i.length!=0)&&(O(r.ja,a),O(r.ja,r.i),r.h.i.length=0,x(r.i),r.i.length=0),r.l.oa()}}function bi(r,a,c){var u=c instanceof Ut?xt(c):new Ut(c);if(u.g!="")a&&(u.g=a+"."+u.g),Me(u,u.u);else{var v=l.location;u=v.protocol,a=a?a+"."+v.hostname:v.hostname,v=+v.port;const b=new Ut(null);u&&Oe(b,u),a&&(b.g=a),v&&Me(b,v),c&&(b.h=c),u=b}return c=r.G,a=r.wa,c&&a&&W(u,c,a),W(u,"VER",r.ka),qe(r,u),u}function Ri(r,a,c){if(a&&!r.L)throw Error("Can't create secondary domain capable XhrIo object.");return a=r.Aa&&!r.ma?new Y(new wr({ab:c})):new Y(r.ma),a.Fa(r.L),a}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Si(){}n=Si.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Rn(){}Rn.prototype.g=function(r,a){return new At(r,a)};function At(r,a){dt.call(this),this.g=new gi(a),this.l=r,this.h=a&&a.messageUrlParams||null,r=a&&a.messageHeaders||null,a&&a.clientProtocolHeaderRequired&&(r?r["X-Client-Protocol"]="webchannel":r={"X-Client-Protocol":"webchannel"}),this.g.o=r,r=a&&a.initMessageHeaders||null,a&&a.messageContentType&&(r?r["X-WebChannel-Content-Type"]=a.messageContentType:r={"X-WebChannel-Content-Type":a.messageContentType}),a&&a.sa&&(r?r["X-WebChannel-Client-Profile"]=a.sa:r={"X-WebChannel-Client-Profile":a.sa}),this.g.U=r,(r=a&&a.Qb)&&!p(r)&&(this.g.u=r),this.A=a&&a.supportsCrossDomainXhr||!1,this.v=a&&a.sendRawJson||!1,(a=a&&a.httpSessionIdParam)&&!p(a)&&(this.g.G=a,r=this.h,r!==null&&a in r&&(r=this.h,a in r&&delete r[a])),this.j=new pe(this)}A(At,dt),At.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},At.prototype.close=function(){Ir(this.g)},At.prototype.o=function(r){var a=this.g;if(typeof r=="string"){var c={};c.__data__=r,r=c}else this.v&&(c={},c.__data__=hr(r),r=c);a.i.push(new yl(a.Ya++,r)),a.I==3&&In(a)},At.prototype.N=function(){this.g.l=null,delete this.j,Ir(this.g),delete this.g,At.Z.N.call(this)};function Pi(r){fr.call(this),r.__headers__&&(this.headers=r.__headers__,this.statusCode=r.__status__,delete r.__headers__,delete r.__status__);var a=r.__sm__;if(a){t:{for(const c in a){r=c;break t}r=void 0}(this.i=r)&&(r=this.i,a=a!==null&&r in a?a[r]:void 0),this.data=a}else this.data=r}A(Pi,fr);function xi(){dr.call(this),this.status=1}A(xi,dr);function pe(r){this.g=r}A(pe,Si),pe.prototype.ra=function(){_t(this.g,"a")},pe.prototype.qa=function(r){_t(this.g,new Pi(r))},pe.prototype.pa=function(r){_t(this.g,new xi)},pe.prototype.oa=function(){_t(this.g,"b")},Rn.prototype.createWebChannel=Rn.prototype.g,At.prototype.send=At.prototype.o,At.prototype.open=At.prototype.m,At.prototype.close=At.prototype.close,Jo=function(){return new Rn},Xo=function(){return _n()},Qo=Zt,Br={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},yn.NO_ERROR=0,yn.TIMEOUT=8,yn.HTTP_ERROR=6,kn=yn,Hs.COMPLETE="complete",Ko=Hs,Us.EventType=xe,xe.OPEN="a",xe.CLOSE="b",xe.ERROR="c",xe.MESSAGE="d",dt.prototype.listen=dt.prototype.J,ze=Us,Y.prototype.listenOnce=Y.prototype.K,Y.prototype.getLastError=Y.prototype.Ha,Y.prototype.getLastErrorCode=Y.prototype.ya,Y.prototype.getStatus=Y.prototype.ca,Y.prototype.getResponseJson=Y.prototype.La,Y.prototype.getResponseText=Y.prototype.la,Y.prototype.send=Y.prototype.ea,Y.prototype.setWithCredentials=Y.prototype.Fa,Wo=Y}).apply(typeof Pn!="undefined"?Pn:typeof self!="undefined"?self:typeof window!="undefined"?window:{});const Qi="@firebase/firestore",Xi="4.9.2";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}vt.UNAUTHENTICATED=new vt(null),vt.GOOGLE_CREDENTIALS=new vt("google-credentials-uid"),vt.FIRST_PARTY=new vt("first-party-uid"),vt.MOCK_USER=new vt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Re="12.3.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ae=new $o("@firebase/firestore");function ge(){return ae.logLevel}function V(n,...t){if(ae.logLevel<=q.DEBUG){const e=t.map(ss);ae.debug(`Firestore (${Re}): ${n}`,...e)}}function le(n,...t){if(ae.logLevel<=q.ERROR){const e=t.map(ss);ae.error(`Firestore (${Re}): ${n}`,...e)}}function rs(n,...t){if(ae.logLevel<=q.WARN){const e=t.map(ss);ae.warn(`Firestore (${Re}): ${n}`,...e)}}function ss(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return(function(e){return JSON.stringify(e)})(n)}catch(t){return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function B(n,t,e){let s="Unexpected state";typeof t=="string"?s=t:e=t,Yo(n,s,e)}function Yo(n,t,e){let s=`FIRESTORE (${Re}) INTERNAL ASSERTION FAILED: ${t} (ID: ${n.toString(16)})`;if(e!==void 0)try{s+=" CONTEXT: "+JSON.stringify(e)}catch(i){s+=" CONTEXT: "+e}throw le(s),new Error(s)}function Z(n,t,e,s){let i="Unexpected state";typeof e=="string"?i=e:s=e,n||Yo(t,i,s)}function z(n,t){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class k extends be{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ie{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vu{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class Tu{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable((()=>e(vt.UNAUTHENTICATED)))}shutdown(){}}class wu{constructor(t){this.t=t,this.currentUser=vt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){Z(this.o===void 0,42304);let s=this.i;const i=f=>this.i!==s?(s=this.i,e(f)):Promise.resolve();let o=new ie;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new ie,t.enqueueRetryable((()=>i(this.currentUser)))};const l=()=>{const f=o;t.enqueueRetryable((()=>N(this,null,function*(){yield f.promise,yield i(this.currentUser)})))},h=f=>{V("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=f,this.o&&(this.auth.addAuthTokenListener(this.o),l())};this.t.onInit((f=>h(f))),setTimeout((()=>{if(!this.auth){const f=this.t.getImmediate({optional:!0});f?h(f):(V("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new ie)}}),0),l()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then((s=>this.i!==t?(V("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):s?(Z(typeof s.accessToken=="string",31837,{l:s}),new vu(s.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return Z(t===null||typeof t=="string",2055,{h:t}),new vt(t)}}class Au{constructor(t,e,s){this.P=t,this.T=e,this.I=s,this.type="FirstParty",this.user=vt.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const t=this.R();return t&&this.A.set("Authorization",t),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Iu{constructor(t,e,s){this.P=t,this.T=e,this.I=s}getToken(){return Promise.resolve(new Au(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable((()=>e(vt.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Ji{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class bu{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,au(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){Z(this.o===void 0,3512);const s=o=>{o.error!=null&&V("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const l=o.token!==this.m;return this.m=o.token,V("FirebaseAppCheckTokenProvider",`Received ${l?"new":"existing"} token.`),l?e(o.token):Promise.resolve()};this.o=o=>{t.enqueueRetryable((()=>s(o)))};const i=o=>{V("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((o=>i(o))),setTimeout((()=>{if(!this.appCheck){const o=this.V.getImmediate({optional:!0});o?i(o):V("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new Ji(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then((e=>e?(Z(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new Ji(e.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ru(n){const t=typeof self!="undefined"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let s=0;s<n;s++)e[s]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class is{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let s="";for(;s.length<20;){const i=Ru(40);for(let o=0;o<i.length;++o)s.length<20&&i[o]<e&&(s+=t.charAt(i[o]%62))}return s}}function G(n,t){return n<t?-1:n>t?1:0}function $r(n,t){const e=Math.min(n.length,t.length);for(let s=0;s<e;s++){const i=n.charAt(s),o=t.charAt(s);if(i!==o)return kr(i)===kr(o)?G(i,o):kr(i)?1:-1}return G(n.length,t.length)}const Su=55296,Pu=57343;function kr(n){const t=n.charCodeAt(0);return t>=Su&&t<=Pu}function ve(n,t,e){return n.length===t.length&&n.every(((s,i)=>e(s,t[i])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yi="__name__";class Vt{constructor(t,e,s){e===void 0?e=0:e>t.length&&B(637,{offset:e,range:t.length}),s===void 0?s=t.length-e:s>t.length-e&&B(1746,{length:s,range:t.length-e}),this.segments=t,this.offset=e,this.len=s}get length(){return this.len}isEqual(t){return Vt.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Vt?t.forEach((s=>{e.push(s)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,s=this.limit();e<s;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const s=Math.min(t.length,e.length);for(let i=0;i<s;i++){const o=Vt.compareSegments(t.get(i),e.get(i));if(o!==0)return o}return G(t.length,e.length)}static compareSegments(t,e){const s=Vt.isNumericId(t),i=Vt.isNumericId(e);return s&&!i?-1:!s&&i?1:s&&i?Vt.extractNumericId(t).compare(Vt.extractNumericId(e)):$r(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return ns.fromString(t.substring(4,t.length-2))}}class J extends Vt{construct(t,e,s){return new J(t,e,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const s of t){if(s.indexOf("//")>=0)throw new k(S.INVALID_ARGUMENT,`Invalid segment (${s}). Paths must not contain // in them.`);e.push(...s.split("/").filter((i=>i.length>0)))}return new J(e)}static emptyPath(){return new J([])}}const xu=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ht extends Vt{construct(t,e,s){return new ht(t,e,s)}static isValidIdentifier(t){return xu.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ht.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Yi}static keyField(){return new ht([Yi])}static fromServerFormat(t){const e=[];let s="",i=0;const o=()=>{if(s.length===0)throw new k(S.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(s),s=""};let l=!1;for(;i<t.length;){const h=t[i];if(h==="\\"){if(i+1===t.length)throw new k(S.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const f=t[i+1];if(f!=="\\"&&f!=="."&&f!=="`")throw new k(S.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);s+=f,i+=2}else h==="`"?(l=!l,i++):h!=="."||l?(s+=h,i++):(o(),i++)}if(o(),l)throw new k(S.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new ht(e)}static emptyPath(){return new ht([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F{constructor(t){this.path=t}static fromPath(t){return new F(J.fromString(t))}static fromName(t){return new F(J.fromString(t).popFirst(5))}static empty(){return new F(J.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&J.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return J.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new F(new J(t.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zo(n,t,e){if(!e)throw new k(S.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function Cu(n,t,e,s){if(t===!0&&s===!0)throw new k(S.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function Zi(n){if(!F.isDocumentKey(n))throw new k(S.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function to(n){if(F.isDocumentKey(n))throw new k(S.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function ta(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function os(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=(function(s){return s.constructor?s.constructor.name:null})(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":B(12329,{type:typeof n})}function Vu(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new k(S.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=os(n);throw new k(S.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nt(n,t){const e={typeString:n};return t&&(e.value=t),e}function an(n,t){if(!ta(n))throw new k(S.INVALID_ARGUMENT,"JSON must be an object");let e;for(const s in t)if(t[s]){const i=t[s].typeString,o="value"in t[s]?{value:t[s].value}:void 0;if(!(s in n)){e=`JSON missing required field: '${s}'`;break}const l=n[s];if(i&&typeof l!==i){e=`JSON field '${s}' must be a ${i}.`;break}if(o!==void 0&&l!==o.value){e=`Expected '${s}' field to equal '${o.value}'`;break}}if(e)throw new k(S.INVALID_ARGUMENT,e);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eo=-62135596800,no=1e6;class X{static now(){return X.fromMillis(Date.now())}static fromDate(t){return X.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),s=Math.floor((t-1e3*e)*no);return new X(e,s)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new k(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new k(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<eo)throw new k(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new k(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/no}_compareTo(t){return this.seconds===t.seconds?G(this.nanoseconds,t.nanoseconds):G(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:X._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(an(t,X._jsonSchema))return new X(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-eo;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}X._jsonSchemaVersion="firestore/timestamp/1.0",X._jsonSchema={type:nt("string",X._jsonSchemaVersion),seconds:nt("number"),nanoseconds:nt("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q{static fromTimestamp(t){return new Q(t)}static min(){return new Q(new X(0,0))}static max(){return new Q(new X(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const en=-1;function Nu(n,t){const e=n.toTimestamp().seconds,s=n.toTimestamp().nanoseconds+1,i=Q.fromTimestamp(s===1e9?new X(e+1,0):new X(e,s));return new Kt(i,F.empty(),t)}function Du(n){return new Kt(n.readTime,n.key,en)}class Kt{constructor(t,e,s){this.readTime=t,this.documentKey=e,this.largestBatchId=s}static min(){return new Kt(Q.min(),F.empty(),en)}static max(){return new Kt(Q.max(),F.empty(),en)}}function ku(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=F.comparator(n.documentKey,t.documentKey),e!==0?e:G(n.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ou="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Mu{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((t=>t()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function as(n){return N(this,null,function*(){if(n.code!==S.FAILED_PRECONDITION||n.message!==Ou)throw n;V("LocalStore","Unexpectedly lost primary lease")})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t((e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)}),(e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)}))}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&B(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new R(((s,i)=>{this.nextCallback=o=>{this.wrapSuccess(t,o).next(s,i)},this.catchCallback=o=>{this.wrapFailure(e,o).next(s,i)}}))}toPromise(){return new Promise(((t,e)=>{this.next(t,e)}))}wrapUserFunction(t){try{const e=t();return e instanceof R?e:R.resolve(e)}catch(e){return R.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction((()=>t(e))):R.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction((()=>t(e))):R.reject(e)}static resolve(t){return new R(((e,s)=>{e(t)}))}static reject(t){return new R(((e,s)=>{s(t)}))}static waitFor(t){return new R(((e,s)=>{let i=0,o=0,l=!1;t.forEach((h=>{++i,h.next((()=>{++o,l&&o===i&&e()}),(f=>s(f)))})),l=!0,o===i&&e()}))}static or(t){let e=R.resolve(!1);for(const s of t)e=e.next((i=>i?R.resolve(i):s()));return e}static forEach(t,e){const s=[];return t.forEach(((i,o)=>{s.push(e.call(this,i,o))})),this.waitFor(s)}static mapArray(t,e){return new R(((s,i)=>{const o=t.length,l=new Array(o);let h=0;for(let f=0;f<o;f++){const d=f;e(t[d]).next((T=>{l[d]=T,++h,h===o&&s(l)}),(T=>i(T)))}}))}static doWhile(t,e){return new R(((s,i)=>{const o=()=>{t()===!0?e().next((()=>{o()}),i):s()};o()}))}}function Lu(n){const t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function ln(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ls{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=s=>this.ae(s),this.ue=s=>e.writeSequenceNumber(s))}ae(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ue&&this.ue(t),t}}ls.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cs=-1;function us(n){return n==null}function Bn(n){return n===0&&1/n==-1/0}function Fu(n){return typeof n=="number"&&Number.isInteger(n)&&!Bn(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ea="";function ju(n){let t="";for(let e=0;e<n.length;e++)t.length>0&&(t=ro(t)),t=Uu(n.get(e),t);return ro(t)}function Uu(n,t){let e=t;const s=n.length;for(let i=0;i<s;i++){const o=n.charAt(i);switch(o){case"\0":e+="";break;case ea:e+="";break;default:e+=o}}return e}function ro(n){return n+ea+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function so(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function Se(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function na(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(t,e){this.comparator=t,this.root=e||ct.EMPTY}insert(t,e){return new wt(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,ct.BLACK,null,null))}remove(t){return new wt(this.comparator,this.root.remove(t,this.comparator).copy(null,null,ct.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const s=this.comparator(t,e.key);if(s===0)return e.value;s<0?e=e.left:s>0&&(e=e.right)}return null}indexOf(t){let e=0,s=this.root;for(;!s.isEmpty();){const i=this.comparator(t,s.key);if(i===0)return e+s.left.size;i<0?s=s.left:(e+=s.left.size+1,s=s.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((e,s)=>(t(e,s),!1)))}toString(){const t=[];return this.inorderTraversal(((e,s)=>(t.push(`${e}:${s}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new xn(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new xn(this.root,t,this.comparator,!1)}getReverseIterator(){return new xn(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new xn(this.root,t,this.comparator,!0)}}class xn{constructor(t,e,s,i){this.isReverse=i,this.nodeStack=[];let o=1;for(;!t.isEmpty();)if(o=e?s(t.key,e):1,e&&i&&(o*=-1),o<0)t=this.isReverse?t.left:t.right;else{if(o===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class ct{constructor(t,e,s,i,o){this.key=t,this.value=e,this.color=s!=null?s:ct.RED,this.left=i!=null?i:ct.EMPTY,this.right=o!=null?o:ct.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,s,i,o){return new ct(t!=null?t:this.key,e!=null?e:this.value,s!=null?s:this.color,i!=null?i:this.left,o!=null?o:this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,s){let i=this;const o=s(t,i.key);return i=o<0?i.copy(null,null,null,i.left.insert(t,e,s),null):o===0?i.copy(null,e,null,null,null):i.copy(null,null,null,null,i.right.insert(t,e,s)),i.fixUp()}removeMin(){if(this.left.isEmpty())return ct.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let s,i=this;if(e(t,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(t,e),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),e(t,i.key)===0){if(i.right.isEmpty())return ct.EMPTY;s=i.right.min(),i=i.copy(s.key,s.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(t,e))}return i.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,ct.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,ct.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw B(43730,{key:this.key,value:this.value});if(this.right.isRed())throw B(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw B(27949);return t+(this.isRed()?0:1)}}ct.EMPTY=null,ct.RED=!0,ct.BLACK=!1;ct.EMPTY=new class{constructor(){this.size=0}get key(){throw B(57766)}get value(){throw B(16141)}get color(){throw B(16727)}get left(){throw B(29726)}get right(){throw B(36894)}copy(t,e,s,i,o){return this}insert(t,e,s){return new ct(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ft{constructor(t){this.comparator=t,this.data=new wt(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal(((e,s)=>(t(e),!1)))}forEachInRange(t,e){const s=this.data.getIteratorFrom(t[0]);for(;s.hasNext();){const i=s.getNext();if(this.comparator(i.key,t[1])>=0)return;e(i.key)}}forEachWhile(t,e){let s;for(s=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();s.hasNext();)if(!t(s.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new io(this.data.getIterator())}getIteratorFrom(t){return new io(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach((s=>{e=e.add(s)})),e}isEqual(t){if(!(t instanceof ft)||this.size!==t.size)return!1;const e=this.data.getIterator(),s=t.data.getIterator();for(;e.hasNext();){const i=e.getNext().key,o=s.getNext().key;if(this.comparator(i,o)!==0)return!1}return!0}toArray(){const t=[];return this.forEach((e=>{t.push(e)})),t}toString(){const t=[];return this.forEach((e=>t.push(e))),"SortedSet("+t.toString()+")"}copy(t){const e=new ft(this.comparator);return e.data=t,e}}class io{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt{constructor(t){this.fields=t,t.sort(ht.comparator)}static empty(){return new Pt([])}unionWith(t){let e=new ft(ht.comparator);for(const s of this.fields)e=e.add(s);for(const s of t)e=e.add(s);return new Pt(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return ve(this.fields,t.fields,((e,s)=>e.isEqual(s)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bu extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt{constructor(t){this.binaryString=t}static fromBase64String(t){const e=(function(i){try{return atob(i)}catch(o){throw typeof DOMException!="undefined"&&o instanceof DOMException?new Bu("Invalid base64 string: "+o):o}})(t);return new Nt(e)}static fromUint8Array(t){const e=(function(i){let o="";for(let l=0;l<i.length;++l)o+=String.fromCharCode(i[l]);return o})(t);return new Nt(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(e){return btoa(e)})(this.binaryString)}toUint8Array(){return(function(e){const s=new Uint8Array(e.length);for(let i=0;i<e.length;i++)s[i]=e.charCodeAt(i);return s})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return G(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}Nt.EMPTY_BYTE_STRING=new Nt("");const $u=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ce(n){if(Z(!!n,39018),typeof n=="string"){let t=0;const e=$u.exec(n);if(Z(!!e,46558,{timestamp:n}),e[1]){let i=e[1];i=(i+"000000000").substr(0,9),t=Number(i)}const s=new Date(n);return{seconds:Math.floor(s.getTime()/1e3),nanos:t}}return{seconds:ut(n.seconds),nanos:ut(n.nanos)}}function ut(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Te(n){return typeof n=="string"?Nt.fromBase64String(n):Nt.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ra="server_timestamp",sa="__type__",ia="__previous_value__",oa="__local_write_time__";function hs(n){var e,s;return((s=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[sa])==null?void 0:s.stringValue)===ra}function fs(n){const t=n.mapValue.fields[ia];return hs(t)?fs(t):t}function $n(n){const t=ce(n.mapValue.fields[oa].timestampValue);return new X(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qu{constructor(t,e,s,i,o,l,h,f,d,T){this.databaseId=t,this.appId=e,this.persistenceKey=s,this.host=i,this.ssl=o,this.forceLongPolling=l,this.autoDetectLongPolling=h,this.longPollingOptions=f,this.useFetchStreams=d,this.isUsingEmulator=T}}const qr="(default)";class qn{constructor(t,e){this.projectId=t,this.database=e||qr}static empty(){return new qn("","")}get isDefaultDatabase(){return this.database===qr}isEqual(t){return t instanceof qn&&t.projectId===this.projectId&&t.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aa="__type__",Gu="__max__",Cn={mapValue:{}},la="__vector__",Gr="value";function ue(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?hs(n)?4:zu(n)?9007199254740991:Hu(n)?10:11:B(28295,{value:n})}function Dt(n,t){if(n===t)return!0;const e=ue(n);if(e!==ue(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return $n(n).isEqual($n(t));case 3:return(function(i,o){if(typeof i.timestampValue=="string"&&typeof o.timestampValue=="string"&&i.timestampValue.length===o.timestampValue.length)return i.timestampValue===o.timestampValue;const l=ce(i.timestampValue),h=ce(o.timestampValue);return l.seconds===h.seconds&&l.nanos===h.nanos})(n,t);case 5:return n.stringValue===t.stringValue;case 6:return(function(i,o){return Te(i.bytesValue).isEqual(Te(o.bytesValue))})(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return(function(i,o){return ut(i.geoPointValue.latitude)===ut(o.geoPointValue.latitude)&&ut(i.geoPointValue.longitude)===ut(o.geoPointValue.longitude)})(n,t);case 2:return(function(i,o){if("integerValue"in i&&"integerValue"in o)return ut(i.integerValue)===ut(o.integerValue);if("doubleValue"in i&&"doubleValue"in o){const l=ut(i.doubleValue),h=ut(o.doubleValue);return l===h?Bn(l)===Bn(h):isNaN(l)&&isNaN(h)}return!1})(n,t);case 9:return ve(n.arrayValue.values||[],t.arrayValue.values||[],Dt);case 10:case 11:return(function(i,o){const l=i.mapValue.fields||{},h=o.mapValue.fields||{};if(so(l)!==so(h))return!1;for(const f in l)if(l.hasOwnProperty(f)&&(h[f]===void 0||!Dt(l[f],h[f])))return!1;return!0})(n,t);default:return B(52216,{left:n})}}function nn(n,t){return(n.values||[]).find((e=>Dt(e,t)))!==void 0}function we(n,t){if(n===t)return 0;const e=ue(n),s=ue(t);if(e!==s)return G(e,s);switch(e){case 0:case 9007199254740991:return 0;case 1:return G(n.booleanValue,t.booleanValue);case 2:return(function(o,l){const h=ut(o.integerValue||o.doubleValue),f=ut(l.integerValue||l.doubleValue);return h<f?-1:h>f?1:h===f?0:isNaN(h)?isNaN(f)?0:-1:1})(n,t);case 3:return oo(n.timestampValue,t.timestampValue);case 4:return oo($n(n),$n(t));case 5:return $r(n.stringValue,t.stringValue);case 6:return(function(o,l){const h=Te(o),f=Te(l);return h.compareTo(f)})(n.bytesValue,t.bytesValue);case 7:return(function(o,l){const h=o.split("/"),f=l.split("/");for(let d=0;d<h.length&&d<f.length;d++){const T=G(h[d],f[d]);if(T!==0)return T}return G(h.length,f.length)})(n.referenceValue,t.referenceValue);case 8:return(function(o,l){const h=G(ut(o.latitude),ut(l.latitude));return h!==0?h:G(ut(o.longitude),ut(l.longitude))})(n.geoPointValue,t.geoPointValue);case 9:return ao(n.arrayValue,t.arrayValue);case 10:return(function(o,l){var C,x,O,L;const h=o.fields||{},f=l.fields||{},d=(C=h[Gr])==null?void 0:C.arrayValue,T=(x=f[Gr])==null?void 0:x.arrayValue,A=G(((O=d==null?void 0:d.values)==null?void 0:O.length)||0,((L=T==null?void 0:T.values)==null?void 0:L.length)||0);return A!==0?A:ao(d,T)})(n.mapValue,t.mapValue);case 11:return(function(o,l){if(o===Cn.mapValue&&l===Cn.mapValue)return 0;if(o===Cn.mapValue)return 1;if(l===Cn.mapValue)return-1;const h=o.fields||{},f=Object.keys(h),d=l.fields||{},T=Object.keys(d);f.sort(),T.sort();for(let A=0;A<f.length&&A<T.length;++A){const C=$r(f[A],T[A]);if(C!==0)return C;const x=we(h[f[A]],d[T[A]]);if(x!==0)return x}return G(f.length,T.length)})(n.mapValue,t.mapValue);default:throw B(23264,{he:e})}}function oo(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return G(n,t);const e=ce(n),s=ce(t),i=G(e.seconds,s.seconds);return i!==0?i:G(e.nanos,s.nanos)}function ao(n,t){const e=n.values||[],s=t.values||[];for(let i=0;i<e.length&&i<s.length;++i){const o=we(e[i],s[i]);if(o)return o}return G(e.length,s.length)}function Ae(n){return Hr(n)}function Hr(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(e){const s=ce(e);return`time(${s.seconds},${s.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(e){return Te(e).toBase64()})(n.bytesValue):"referenceValue"in n?(function(e){return F.fromName(e).toString()})(n.referenceValue):"geoPointValue"in n?(function(e){return`geo(${e.latitude},${e.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(e){let s="[",i=!0;for(const o of e.values||[])i?i=!1:s+=",",s+=Hr(o);return s+"]"})(n.arrayValue):"mapValue"in n?(function(e){const s=Object.keys(e.fields||{}).sort();let i="{",o=!0;for(const l of s)o?o=!1:i+=",",i+=`${l}:${Hr(e.fields[l])}`;return i+"}"})(n.mapValue):B(61005,{value:n})}function On(n){switch(ue(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=fs(n);return t?16+On(t):16;case 5:return 2*n.stringValue.length;case 6:return Te(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(s){return(s.values||[]).reduce(((i,o)=>i+On(o)),0)})(n.arrayValue);case 10:case 11:return(function(s){let i=0;return Se(s.fields,((o,l)=>{i+=o.length+On(l)})),i})(n.mapValue);default:throw B(13486,{value:n})}}function zr(n){return!!n&&"integerValue"in n}function ds(n){return!!n&&"arrayValue"in n}function Mn(n){return!!n&&"mapValue"in n}function Hu(n){var e,s;return((s=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[aa])==null?void 0:s.stringValue)===la}function Ke(n){if(n.geoPointValue)return{geoPointValue:kt({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:kt({},n.timestampValue)};if(n.mapValue){const t={mapValue:{fields:{}}};return Se(n.mapValue.fields,((e,s)=>t.mapValue.fields[e]=Ke(s))),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=Ke(n.arrayValue.values[e]);return t}return kt({},n)}function zu(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Gu}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(t){this.value=t}static empty(){return new Rt({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let s=0;s<t.length-1;++s)if(e=(e.mapValue.fields||{})[t.get(s)],!Mn(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=Ke(e)}setAll(t){let e=ht.emptyPath(),s={},i=[];t.forEach(((l,h)=>{if(!e.isImmediateParentOf(h)){const f=this.getFieldsMap(e);this.applyChanges(f,s,i),s={},i=[],e=h.popLast()}l?s[h.lastSegment()]=Ke(l):i.push(h.lastSegment())}));const o=this.getFieldsMap(e);this.applyChanges(o,s,i)}delete(t){const e=this.field(t.popLast());Mn(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Dt(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let s=0;s<t.length;++s){let i=e.mapValue.fields[t.get(s)];Mn(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},e.mapValue.fields[t.get(s)]=i),e=i}return e.mapValue.fields}applyChanges(t,e,s){Se(e,((i,o)=>t[i]=o));for(const i of s)delete t[i]}clone(){return new Rt(Ke(this.value))}}function ca(n){const t=[];return Se(n.fields,((e,s)=>{const i=new ht([e]);if(Mn(s)){const o=ca(s.mapValue).fields;if(o.length===0)t.push(i);else for(const l of o)t.push(i.child(l))}else t.push(i)})),new Pt(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt{constructor(t,e,s,i,o,l,h){this.key=t,this.documentType=e,this.version=s,this.readTime=i,this.createTime=o,this.data=l,this.documentState=h}static newInvalidDocument(t){return new bt(t,0,Q.min(),Q.min(),Q.min(),Rt.empty(),0)}static newFoundDocument(t,e,s,i){return new bt(t,1,e,Q.min(),s,i,0)}static newNoDocument(t,e){return new bt(t,2,e,Q.min(),Q.min(),Rt.empty(),0)}static newUnknownDocument(t,e){return new bt(t,3,e,Q.min(),Q.min(),Rt.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(Q.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=Rt.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=Rt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Q.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof bt&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new bt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gn{constructor(t,e){this.position=t,this.inclusive=e}}function lo(n,t,e){let s=0;for(let i=0;i<n.position.length;i++){const o=t[i],l=n.position[i];if(o.field.isKeyField()?s=F.comparator(F.fromName(l.referenceValue),e.key):s=we(l,e.data.field(o.field)),o.dir==="desc"&&(s*=-1),s!==0)break}return s}function co(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!Dt(n.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hn{constructor(t,e="asc"){this.field=t,this.dir=e}}function Wu(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ua{}class at extends ua{constructor(t,e,s){super(),this.field=t,this.op=e,this.value=s}static create(t,e,s){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,s):new Qu(t,e,s):e==="array-contains"?new Yu(t,s):e==="in"?new Zu(t,s):e==="not-in"?new th(t,s):e==="array-contains-any"?new eh(t,s):new at(t,e,s)}static createKeyFieldInFilter(t,e,s){return e==="in"?new Xu(t,s):new Ju(t,s)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(we(e,this.value)):e!==null&&ue(this.value)===ue(e)&&this.matchesComparison(we(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return B(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Qt extends ua{constructor(t,e){super(),this.filters=t,this.op=e,this.Pe=null}static create(t,e){return new Qt(t,e)}matches(t){return ha(this)?this.filters.find((e=>!e.matches(t)))===void 0:this.filters.find((e=>e.matches(t)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((t,e)=>t.concat(e.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function ha(n){return n.op==="and"}function fa(n){return Ku(n)&&ha(n)}function Ku(n){for(const t of n.filters)if(t instanceof Qt)return!1;return!0}function Wr(n){if(n instanceof at)return n.field.canonicalString()+n.op.toString()+Ae(n.value);if(fa(n))return n.filters.map((t=>Wr(t))).join(",");{const t=n.filters.map((e=>Wr(e))).join(",");return`${n.op}(${t})`}}function da(n,t){return n instanceof at?(function(s,i){return i instanceof at&&s.op===i.op&&s.field.isEqual(i.field)&&Dt(s.value,i.value)})(n,t):n instanceof Qt?(function(s,i){return i instanceof Qt&&s.op===i.op&&s.filters.length===i.filters.length?s.filters.reduce(((o,l,h)=>o&&da(l,i.filters[h])),!0):!1})(n,t):void B(19439)}function ma(n){return n instanceof at?(function(e){return`${e.field.canonicalString()} ${e.op} ${Ae(e.value)}`})(n):n instanceof Qt?(function(e){return e.op.toString()+" {"+e.getFilters().map(ma).join(" ,")+"}"})(n):"Filter"}class Qu extends at{constructor(t,e,s){super(t,e,s),this.key=F.fromName(s.referenceValue)}matches(t){const e=F.comparator(t.key,this.key);return this.matchesComparison(e)}}class Xu extends at{constructor(t,e){super(t,"in",e),this.keys=pa("in",e)}matches(t){return this.keys.some((e=>e.isEqual(t.key)))}}class Ju extends at{constructor(t,e){super(t,"not-in",e),this.keys=pa("not-in",e)}matches(t){return!this.keys.some((e=>e.isEqual(t.key)))}}function pa(n,t){var e;return(((e=t.arrayValue)==null?void 0:e.values)||[]).map((s=>F.fromName(s.referenceValue)))}class Yu extends at{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return ds(e)&&nn(e.arrayValue,this.value)}}class Zu extends at{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&nn(this.value.arrayValue,e)}}class th extends at{constructor(t,e){super(t,"not-in",e)}matches(t){if(nn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!nn(this.value.arrayValue,e)}}class eh extends at{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!ds(e)||!e.arrayValue.values)&&e.arrayValue.values.some((s=>nn(this.value.arrayValue,s)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nh{constructor(t,e=null,s=[],i=[],o=null,l=null,h=null){this.path=t,this.collectionGroup=e,this.orderBy=s,this.filters=i,this.limit=o,this.startAt=l,this.endAt=h,this.Te=null}}function uo(n,t=null,e=[],s=[],i=null,o=null,l=null){return new nh(n,t,e,s,i,o,l)}function ms(n){const t=z(n);if(t.Te===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map((s=>Wr(s))).join(","),e+="|ob:",e+=t.orderBy.map((s=>(function(o){return o.field.canonicalString()+o.dir})(s))).join(","),us(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map((s=>Ae(s))).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map((s=>Ae(s))).join(",")),t.Te=e}return t.Te}function ps(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!Wu(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!da(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!co(n.startAt,t.startAt)&&co(n.endAt,t.endAt)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jn{constructor(t,e=null,s=[],i=[],o=null,l="F",h=null,f=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=s,this.filters=i,this.limit=o,this.limitType=l,this.startAt=h,this.endAt=f,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function rh(n,t,e,s,i,o,l,h){return new Jn(n,t,e,s,i,o,l,h)}function sh(n){return new Jn(n)}function ho(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function ih(n){return n.collectionGroup!==null}function Qe(n){const t=z(n);if(t.Ie===null){t.Ie=[];const e=new Set;for(const o of t.explicitOrderBy)t.Ie.push(o),e.add(o.field.canonicalString());const s=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(l){let h=new ft(ht.comparator);return l.filters.forEach((f=>{f.getFlattenedFilters().forEach((d=>{d.isInequality()&&(h=h.add(d.field))}))})),h})(t).forEach((o=>{e.has(o.canonicalString())||o.isKeyField()||t.Ie.push(new Hn(o,s))})),e.has(ht.keyField().canonicalString())||t.Ie.push(new Hn(ht.keyField(),s))}return t.Ie}function oe(n){const t=z(n);return t.Ee||(t.Ee=oh(t,Qe(n))),t.Ee}function oh(n,t){if(n.limitType==="F")return uo(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map((i=>{const o=i.dir==="desc"?"asc":"desc";return new Hn(i.field,o)}));const e=n.endAt?new Gn(n.endAt.position,n.endAt.inclusive):null,s=n.startAt?new Gn(n.startAt.position,n.startAt.inclusive):null;return uo(n.path,n.collectionGroup,t,n.filters,n.limit,e,s)}}function Kr(n,t,e){return new Jn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function ga(n,t){return ps(oe(n),oe(t))&&n.limitType===t.limitType}function _a(n){return`${ms(oe(n))}|lt:${n.limitType}`}function He(n){return`Query(target=${(function(e){let s=e.path.canonicalString();return e.collectionGroup!==null&&(s+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(s+=`, filters: [${e.filters.map((i=>ma(i))).join(", ")}]`),us(e.limit)||(s+=", limit: "+e.limit),e.orderBy.length>0&&(s+=`, orderBy: [${e.orderBy.map((i=>(function(l){return`${l.field.canonicalString()} (${l.dir})`})(i))).join(", ")}]`),e.startAt&&(s+=", startAt: ",s+=e.startAt.inclusive?"b:":"a:",s+=e.startAt.position.map((i=>Ae(i))).join(",")),e.endAt&&(s+=", endAt: ",s+=e.endAt.inclusive?"a:":"b:",s+=e.endAt.position.map((i=>Ae(i))).join(",")),`Target(${s})`})(oe(n))}; limitType=${n.limitType})`}function gs(n,t){return t.isFoundDocument()&&(function(s,i){const o=i.key.path;return s.collectionGroup!==null?i.key.hasCollectionId(s.collectionGroup)&&s.path.isPrefixOf(o):F.isDocumentKey(s.path)?s.path.isEqual(o):s.path.isImmediateParentOf(o)})(n,t)&&(function(s,i){for(const o of Qe(s))if(!o.field.isKeyField()&&i.data.field(o.field)===null)return!1;return!0})(n,t)&&(function(s,i){for(const o of s.filters)if(!o.matches(i))return!1;return!0})(n,t)&&(function(s,i){return!(s.startAt&&!(function(l,h,f){const d=lo(l,h,f);return l.inclusive?d<=0:d<0})(s.startAt,Qe(s),i)||s.endAt&&!(function(l,h,f){const d=lo(l,h,f);return l.inclusive?d>=0:d>0})(s.endAt,Qe(s),i))})(n,t)}function ah(n){return(t,e)=>{let s=!1;for(const i of Qe(n)){const o=lh(i,t,e);if(o!==0)return o;s=s||i.field.isKeyField()}return 0}}function lh(n,t,e){const s=n.field.isKeyField()?F.comparator(t.key,e.key):(function(o,l,h){const f=l.data.field(o),d=h.data.field(o);return f!==null&&d!==null?we(f,d):B(42886)})(n.field,t,e);switch(n.dir){case"asc":return s;case"desc":return-1*s;default:return B(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class he{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),s=this.inner[e];if(s!==void 0){for(const[i,o]of s)if(this.equalsFn(i,t))return o}}has(t){return this.get(t)!==void 0}set(t,e){const s=this.mapKeyFn(t),i=this.inner[s];if(i===void 0)return this.inner[s]=[[t,e]],void this.innerSize++;for(let o=0;o<i.length;o++)if(this.equalsFn(i[o][0],t))return void(i[o]=[t,e]);i.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),s=this.inner[e];if(s===void 0)return!1;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],t))return s.length===1?delete this.inner[e]:s.splice(i,1),this.innerSize--,!0;return!1}forEach(t){Se(this.inner,((e,s)=>{for(const[i,o]of s)t(i,o)}))}isEmpty(){return na(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ch=new wt(F.comparator);function zn(){return ch}const ya=new wt(F.comparator);function Vn(...n){let t=ya;for(const e of n)t=t.insert(e.key,e);return t}function Ea(n){let t=ya;return n.forEach(((e,s)=>t=t.insert(e,s.overlayedDocument))),t}function se(){return Xe()}function va(){return Xe()}function Xe(){return new he((n=>n.toString()),((n,t)=>n.isEqual(t)))}const uh=new wt(F.comparator),hh=new ft(F.comparator);function pt(...n){let t=hh;for(const e of n)t=t.add(e);return t}const fh=new ft(G);function dh(){return fh}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _s(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Bn(t)?"-0":t}}function Ta(n){return{integerValue:""+n}}function mh(n,t){return Fu(t)?Ta(t):_s(n,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yn{constructor(){this._=void 0}}function ph(n,t,e){return n instanceof rn?(function(i,o){const l={fields:{[sa]:{stringValue:ra},[oa]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return o&&hs(o)&&(o=fs(o)),o&&(l.fields[ia]=o),{mapValue:l}})(e,t):n instanceof sn?Aa(n,t):n instanceof on?Ia(n,t):(function(i,o){const l=wa(i,o),h=fo(l)+fo(i.Ae);return zr(l)&&zr(i.Ae)?Ta(h):_s(i.serializer,h)})(n,t)}function gh(n,t,e){return n instanceof sn?Aa(n,t):n instanceof on?Ia(n,t):e}function wa(n,t){return n instanceof Wn?(function(s){return zr(s)||(function(o){return!!o&&"doubleValue"in o})(s)})(t)?t:{integerValue:0}:null}class rn extends Yn{}class sn extends Yn{constructor(t){super(),this.elements=t}}function Aa(n,t){const e=ba(t);for(const s of n.elements)e.some((i=>Dt(i,s)))||e.push(s);return{arrayValue:{values:e}}}class on extends Yn{constructor(t){super(),this.elements=t}}function Ia(n,t){let e=ba(t);for(const s of n.elements)e=e.filter((i=>!Dt(i,s)));return{arrayValue:{values:e}}}class Wn extends Yn{constructor(t,e){super(),this.serializer=t,this.Ae=e}}function fo(n){return ut(n.integerValue||n.doubleValue)}function ba(n){return ds(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _h{constructor(t,e){this.field=t,this.transform=e}}function yh(n,t){return n.field.isEqual(t.field)&&(function(s,i){return s instanceof sn&&i instanceof sn||s instanceof on&&i instanceof on?ve(s.elements,i.elements,Dt):s instanceof Wn&&i instanceof Wn?Dt(s.Ae,i.Ae):s instanceof rn&&i instanceof rn})(n.transform,t.transform)}class Eh{constructor(t,e){this.version=t,this.transformResults=e}}class Ot{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new Ot}static exists(t){return new Ot(void 0,t)}static updateTime(t){return new Ot(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Ln(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}class Zn{}function Ra(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new Pa(n.key,Ot.none()):new cn(n.key,n.data,Ot.none());{const e=n.data,s=Rt.empty();let i=new ft(ht.comparator);for(let o of t.fields)if(!i.has(o)){let l=e.field(o);l===null&&o.length>1&&(o=o.popLast(),l=e.field(o)),l===null?s.delete(o):s.set(o,l),i=i.add(o)}return new fe(n.key,s,new Pt(i.toArray()),Ot.none())}}function vh(n,t,e){n instanceof cn?(function(i,o,l){const h=i.value.clone(),f=po(i.fieldTransforms,o,l.transformResults);h.setAll(f),o.convertToFoundDocument(l.version,h).setHasCommittedMutations()})(n,t,e):n instanceof fe?(function(i,o,l){if(!Ln(i.precondition,o))return void o.convertToUnknownDocument(l.version);const h=po(i.fieldTransforms,o,l.transformResults),f=o.data;f.setAll(Sa(i)),f.setAll(h),o.convertToFoundDocument(l.version,f).setHasCommittedMutations()})(n,t,e):(function(i,o,l){o.convertToNoDocument(l.version).setHasCommittedMutations()})(0,t,e)}function Je(n,t,e,s){return n instanceof cn?(function(o,l,h,f){if(!Ln(o.precondition,l))return h;const d=o.value.clone(),T=go(o.fieldTransforms,f,l);return d.setAll(T),l.convertToFoundDocument(l.version,d).setHasLocalMutations(),null})(n,t,e,s):n instanceof fe?(function(o,l,h,f){if(!Ln(o.precondition,l))return h;const d=go(o.fieldTransforms,f,l),T=l.data;return T.setAll(Sa(o)),T.setAll(d),l.convertToFoundDocument(l.version,T).setHasLocalMutations(),h===null?null:h.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map((A=>A.field)))})(n,t,e,s):(function(o,l,h){return Ln(o.precondition,l)?(l.convertToNoDocument(l.version).setHasLocalMutations(),null):h})(n,t,e)}function Th(n,t){let e=null;for(const s of n.fieldTransforms){const i=t.data.field(s.field),o=wa(s.transform,i||null);o!=null&&(e===null&&(e=Rt.empty()),e.set(s.field,o))}return e||null}function mo(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!(function(s,i){return s===void 0&&i===void 0||!(!s||!i)&&ve(s,i,((o,l)=>yh(o,l)))})(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}class cn extends Zn{constructor(t,e,s,i=[]){super(),this.key=t,this.value=e,this.precondition=s,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class fe extends Zn{constructor(t,e,s,i,o=[]){super(),this.key=t,this.data=e,this.fieldMask=s,this.precondition=i,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function Sa(n){const t=new Map;return n.fieldMask.fields.forEach((e=>{if(!e.isEmpty()){const s=n.data.field(e);t.set(e,s)}})),t}function po(n,t,e){const s=new Map;Z(n.length===e.length,32656,{Re:e.length,Ve:n.length});for(let i=0;i<e.length;i++){const o=n[i],l=o.transform,h=t.data.field(o.field);s.set(o.field,gh(l,h,e[i]))}return s}function go(n,t,e){const s=new Map;for(const i of n){const o=i.transform,l=e.data.field(i.field);s.set(i.field,ph(o,l,t))}return s}class Pa extends Zn{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class wh extends Zn{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ah{constructor(t,e,s,i){this.batchId=t,this.localWriteTime=e,this.baseMutations=s,this.mutations=i}applyToRemoteDocument(t,e){const s=e.mutationResults;for(let i=0;i<this.mutations.length;i++){const o=this.mutations[i];o.key.isEqual(t.key)&&vh(o,t,s[i])}}applyToLocalView(t,e){for(const s of this.baseMutations)s.key.isEqual(t.key)&&(e=Je(s,t,e,this.localWriteTime));for(const s of this.mutations)s.key.isEqual(t.key)&&(e=Je(s,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const s=va();return this.mutations.forEach((i=>{const o=t.get(i.key),l=o.overlayedDocument;let h=this.applyToLocalView(l,o.mutatedFields);h=e.has(i.key)?null:h;const f=Ra(l,h);f!==null&&s.set(i.key,f),l.isValidDocument()||l.convertToNoDocument(Q.min())})),s}keys(){return this.mutations.reduce(((t,e)=>t.add(e.key)),pt())}isEqual(t){return this.batchId===t.batchId&&ve(this.mutations,t.mutations,((e,s)=>mo(e,s)))&&ve(this.baseMutations,t.baseMutations,((e,s)=>mo(e,s)))}}class ys{constructor(t,e,s,i){this.batch=t,this.commitVersion=e,this.mutationResults=s,this.docVersions=i}static from(t,e,s){Z(t.mutations.length===s.length,58842,{me:t.mutations.length,fe:s.length});let i=(function(){return uh})();const o=t.mutations;for(let l=0;l<o.length;l++)i=i.insert(o[l].key,s[l].version);return new ys(t,e,s,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ih{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var et,$;function bh(n){switch(n){case S.OK:return B(64938);case S.CANCELLED:case S.UNKNOWN:case S.DEADLINE_EXCEEDED:case S.RESOURCE_EXHAUSTED:case S.INTERNAL:case S.UNAVAILABLE:case S.UNAUTHENTICATED:return!1;case S.INVALID_ARGUMENT:case S.NOT_FOUND:case S.ALREADY_EXISTS:case S.PERMISSION_DENIED:case S.FAILED_PRECONDITION:case S.ABORTED:case S.OUT_OF_RANGE:case S.UNIMPLEMENTED:case S.DATA_LOSS:return!0;default:return B(15467,{code:n})}}function Rh(n){if(n===void 0)return le("GRPC error has no .code"),S.UNKNOWN;switch(n){case et.OK:return S.OK;case et.CANCELLED:return S.CANCELLED;case et.UNKNOWN:return S.UNKNOWN;case et.DEADLINE_EXCEEDED:return S.DEADLINE_EXCEEDED;case et.RESOURCE_EXHAUSTED:return S.RESOURCE_EXHAUSTED;case et.INTERNAL:return S.INTERNAL;case et.UNAVAILABLE:return S.UNAVAILABLE;case et.UNAUTHENTICATED:return S.UNAUTHENTICATED;case et.INVALID_ARGUMENT:return S.INVALID_ARGUMENT;case et.NOT_FOUND:return S.NOT_FOUND;case et.ALREADY_EXISTS:return S.ALREADY_EXISTS;case et.PERMISSION_DENIED:return S.PERMISSION_DENIED;case et.FAILED_PRECONDITION:return S.FAILED_PRECONDITION;case et.ABORTED:return S.ABORTED;case et.OUT_OF_RANGE:return S.OUT_OF_RANGE;case et.UNIMPLEMENTED:return S.UNIMPLEMENTED;case et.DATA_LOSS:return S.DATA_LOSS;default:return B(39323,{code:n})}}($=et||(et={}))[$.OK=0]="OK",$[$.CANCELLED=1]="CANCELLED",$[$.UNKNOWN=2]="UNKNOWN",$[$.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",$[$.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",$[$.NOT_FOUND=5]="NOT_FOUND",$[$.ALREADY_EXISTS=6]="ALREADY_EXISTS",$[$.PERMISSION_DENIED=7]="PERMISSION_DENIED",$[$.UNAUTHENTICATED=16]="UNAUTHENTICATED",$[$.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",$[$.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",$[$.ABORTED=10]="ABORTED",$[$.OUT_OF_RANGE=11]="OUT_OF_RANGE",$[$.UNIMPLEMENTED=12]="UNIMPLEMENTED",$[$.INTERNAL=13]="INTERNAL",$[$.UNAVAILABLE=14]="UNAVAILABLE",$[$.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new ns([4294967295,4294967295],0);class Sh{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function Qr(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function Ph(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function xh(n,t){return Qr(n,t.toTimestamp())}function ye(n){return Z(!!n,49232),Q.fromTimestamp((function(e){const s=ce(e);return new X(s.seconds,s.nanos)})(n))}function xa(n,t){return Xr(n,t).canonicalString()}function Xr(n,t){const e=(function(i){return new J(["projects",i.projectId,"databases",i.database])})(n).child("documents");return t===void 0?e:e.child(t)}function Ch(n){const t=J.fromString(n);return Z(Fh(t),10190,{key:t.toString()}),t}function Jr(n,t){return xa(n.databaseId,t.path)}function Vh(n){const t=Ch(n);return t.length===4?J.emptyPath():Dh(t)}function Nh(n){return new J(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Dh(n){return Z(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function _o(n,t,e){return{name:Jr(n,t),fields:e.value.mapValue.fields}}function kh(n,t){let e;if(t instanceof cn)e={update:_o(n,t.key,t.value)};else if(t instanceof Pa)e={delete:Jr(n,t.key)};else if(t instanceof fe)e={update:_o(n,t.key,t.data),updateMask:Lh(t.fieldMask)};else{if(!(t instanceof wh))return B(16599,{Vt:t.type});e={verify:Jr(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map((s=>(function(o,l){const h=l.transform;if(h instanceof rn)return{fieldPath:l.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(h instanceof sn)return{fieldPath:l.field.canonicalString(),appendMissingElements:{values:h.elements}};if(h instanceof on)return{fieldPath:l.field.canonicalString(),removeAllFromArray:{values:h.elements}};if(h instanceof Wn)return{fieldPath:l.field.canonicalString(),increment:h.Ae};throw B(20930,{transform:l.transform})})(0,s)))),t.precondition.isNone||(e.currentDocument=(function(i,o){return o.updateTime!==void 0?{updateTime:xh(i,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:B(27497)})(n,t.precondition)),e}function Oh(n,t){return n&&n.length>0?(Z(t!==void 0,14353),n.map((e=>(function(i,o){let l=i.updateTime?ye(i.updateTime):ye(o);return l.isEqual(Q.min())&&(l=ye(o)),new Eh(l,i.transformResults||[])})(e,t)))):[]}function Mh(n){let t=Vh(n.parent);const e=n.structuredQuery,s=e.from?e.from.length:0;let i=null;if(s>0){Z(s===1,65062);const T=e.from[0];T.allDescendants?i=T.collectionId:t=t.child(T.collectionId)}let o=[];e.where&&(o=(function(A){const C=Ca(A);return C instanceof Qt&&fa(C)?C.getFilters():[C]})(e.where));let l=[];e.orderBy&&(l=(function(A){return A.map((C=>(function(O){return new Hn(_e(O.field),(function(M){switch(M){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(O.direction))})(C)))})(e.orderBy));let h=null;e.limit&&(h=(function(A){let C;return C=typeof A=="object"?A.value:A,us(C)?null:C})(e.limit));let f=null;e.startAt&&(f=(function(A){const C=!!A.before,x=A.values||[];return new Gn(x,C)})(e.startAt));let d=null;return e.endAt&&(d=(function(A){const C=!A.before,x=A.values||[];return new Gn(x,C)})(e.endAt)),rh(t,i,l,o,h,"F",f,d)}function Ca(n){return n.unaryFilter!==void 0?(function(e){switch(e.unaryFilter.op){case"IS_NAN":const s=_e(e.unaryFilter.field);return at.create(s,"==",{doubleValue:NaN});case"IS_NULL":const i=_e(e.unaryFilter.field);return at.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=_e(e.unaryFilter.field);return at.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const l=_e(e.unaryFilter.field);return at.create(l,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return B(61313);default:return B(60726)}})(n):n.fieldFilter!==void 0?(function(e){return at.create(_e(e.fieldFilter.field),(function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return B(58110);default:return B(50506)}})(e.fieldFilter.op),e.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(e){return Qt.create(e.compositeFilter.filters.map((s=>Ca(s))),(function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return B(1026)}})(e.compositeFilter.op))})(n):B(30097,{filter:n})}function _e(n){return ht.fromServerFormat(n.fieldPath)}function Lh(n){const t=[];return n.fields.forEach((e=>t.push(e.canonicalString()))),{fieldPaths:t}}function Fh(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jh{constructor(t){this.yt=t}}function Uh(n){const t=Mh({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Kr(t,t.limit,"L"):t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bh{constructor(){this.Cn=new $h}addToCollectionParentIndex(t,e){return this.Cn.add(e),R.resolve()}getCollectionParents(t,e){return R.resolve(this.Cn.getEntries(e))}addFieldIndex(t,e){return R.resolve()}deleteFieldIndex(t,e){return R.resolve()}deleteAllFieldIndexes(t){return R.resolve()}createTargetIndexes(t,e){return R.resolve()}getDocumentsMatchingTarget(t,e){return R.resolve(null)}getIndexType(t,e){return R.resolve(0)}getFieldIndexes(t,e){return R.resolve([])}getNextCollectionGroupToUpdate(t){return R.resolve(null)}getMinOffset(t,e){return R.resolve(Kt.min())}getMinOffsetFromCollectionGroup(t,e){return R.resolve(Kt.min())}updateCollectionGroup(t,e,s){return R.resolve()}updateIndexEntries(t,e){return R.resolve()}}class $h{constructor(){this.index={}}add(t){const e=t.lastSegment(),s=t.popLast(),i=this.index[e]||new ft(J.comparator),o=!i.has(s);return this.index[e]=i.add(s),o}has(t){const e=t.lastSegment(),s=t.popLast(),i=this.index[e];return i&&i.has(s)}getEntries(t){return(this.index[t]||new ft(J.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yo={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Va=41943040;class Tt{static withCacheSize(t){return new Tt(t,Tt.DEFAULT_COLLECTION_PERCENTILE,Tt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,s){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Tt.DEFAULT_COLLECTION_PERCENTILE=10,Tt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Tt.DEFAULT=new Tt(Va,Tt.DEFAULT_COLLECTION_PERCENTILE,Tt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Tt.DISABLED=new Tt(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ie{constructor(t){this.ar=t}next(){return this.ar+=2,this.ar}static ur(){return new Ie(0)}static cr(){return new Ie(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eo="LruGarbageCollector",qh=1048576;function vo([n,t],[e,s]){const i=G(n,e);return i===0?G(t,s):i}class Gh{constructor(t){this.Ir=t,this.buffer=new ft(vo),this.Er=0}dr(){return++this.Er}Ar(t){const e=[t,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(e);else{const s=this.buffer.last();vo(e,s)<0&&(this.buffer=this.buffer.delete(s).add(e))}}get maxValue(){return this.buffer.last()[0]}}class Hh{constructor(t,e,s){this.garbageCollector=t,this.asyncQueue=e,this.localStore=s,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(t){V(Eo,`Garbage collection scheduled in ${t}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,(()=>N(this,null,function*(){this.Rr=null;try{yield this.localStore.collectGarbage(this.garbageCollector)}catch(e){ln(e)?V(Eo,"Ignoring IndexedDB error during garbage collection: ",e):yield as(e)}yield this.Vr(3e5)})))}}class zh{constructor(t,e){this.mr=t,this.params=e}calculateTargetCount(t,e){return this.mr.gr(t).next((s=>Math.floor(e/100*s)))}nthSequenceNumber(t,e){if(e===0)return R.resolve(ls.ce);const s=new Gh(e);return this.mr.forEachTarget(t,(i=>s.Ar(i.sequenceNumber))).next((()=>this.mr.pr(t,(i=>s.Ar(i))))).next((()=>s.maxValue))}removeTargets(t,e,s){return this.mr.removeTargets(t,e,s)}removeOrphanedDocuments(t,e){return this.mr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(V("LruGarbageCollector","Garbage collection skipped; disabled"),R.resolve(yo)):this.getCacheSize(t).next((s=>s<this.params.cacheSizeCollectionThreshold?(V("LruGarbageCollector",`Garbage collection skipped; Cache size ${s} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),yo):this.yr(t,e)))}getCacheSize(t){return this.mr.getCacheSize(t)}yr(t,e){let s,i,o,l,h,f,d;const T=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next((A=>(A>this.params.maximumSequenceNumbersToCollect?(V("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${A}`),i=this.params.maximumSequenceNumbersToCollect):i=A,l=Date.now(),this.nthSequenceNumber(t,i)))).next((A=>(s=A,h=Date.now(),this.removeTargets(t,s,e)))).next((A=>(o=A,f=Date.now(),this.removeOrphanedDocuments(t,s)))).next((A=>(d=Date.now(),ge()<=q.DEBUG&&V("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${l-T}ms
	Determined least recently used ${i} in `+(h-l)+`ms
	Removed ${o} targets in `+(f-h)+`ms
	Removed ${A} documents in `+(d-f)+`ms
Total Duration: ${d-T}ms`),R.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:o,documentsRemoved:A}))))}}function Wh(n,t){return new zh(n,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kh{constructor(){this.changes=new he((t=>t.toString()),((t,e)=>t.isEqual(e))),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,bt.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const s=this.changes.get(e);return s!==void 0?R.resolve(s):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qh{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xh{constructor(t,e,s,i){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=s,this.indexManager=i}getDocument(t,e){let s=null;return this.documentOverlayCache.getOverlay(t,e).next((i=>(s=i,this.remoteDocumentCache.getEntry(t,e)))).next((i=>(s!==null&&Je(s.mutation,i,Pt.empty(),X.now()),i)))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next((s=>this.getLocalViewOfDocuments(t,s,pt()).next((()=>s))))}getLocalViewOfDocuments(t,e,s=pt()){const i=se();return this.populateOverlays(t,i,e).next((()=>this.computeViews(t,e,i,s).next((o=>{let l=Vn();return o.forEach(((h,f)=>{l=l.insert(h,f.overlayedDocument)})),l}))))}getOverlayedDocuments(t,e){const s=se();return this.populateOverlays(t,s,e).next((()=>this.computeViews(t,e,s,pt())))}populateOverlays(t,e,s){const i=[];return s.forEach((o=>{e.has(o)||i.push(o)})),this.documentOverlayCache.getOverlays(t,i).next((o=>{o.forEach(((l,h)=>{e.set(l,h)}))}))}computeViews(t,e,s,i){let o=zn();const l=Xe(),h=(function(){return Xe()})();return e.forEach(((f,d)=>{const T=s.get(d.key);i.has(d.key)&&(T===void 0||T.mutation instanceof fe)?o=o.insert(d.key,d):T!==void 0?(l.set(d.key,T.mutation.getFieldMask()),Je(T.mutation,d,T.mutation.getFieldMask(),X.now())):l.set(d.key,Pt.empty())})),this.recalculateAndSaveOverlays(t,o).next((f=>(f.forEach(((d,T)=>l.set(d,T))),e.forEach(((d,T)=>{var A;return h.set(d,new Qh(T,(A=l.get(d))!=null?A:null))})),h)))}recalculateAndSaveOverlays(t,e){const s=Xe();let i=new wt(((l,h)=>l-h)),o=pt();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next((l=>{for(const h of l)h.keys().forEach((f=>{const d=e.get(f);if(d===null)return;let T=s.get(f)||Pt.empty();T=h.applyToLocalView(d,T),s.set(f,T);const A=(i.get(h.batchId)||pt()).add(f);i=i.insert(h.batchId,A)}))})).next((()=>{const l=[],h=i.getReverseIterator();for(;h.hasNext();){const f=h.getNext(),d=f.key,T=f.value,A=va();T.forEach((C=>{if(!o.has(C)){const x=Ra(e.get(C),s.get(C));x!==null&&A.set(C,x),o=o.add(C)}})),l.push(this.documentOverlayCache.saveOverlays(t,d,A))}return R.waitFor(l)})).next((()=>s))}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next((s=>this.recalculateAndSaveOverlays(t,s)))}getDocumentsMatchingQuery(t,e,s,i){return(function(l){return F.isDocumentKey(l.path)&&l.collectionGroup===null&&l.filters.length===0})(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):ih(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,s,i):this.getDocumentsMatchingCollectionQuery(t,e,s,i)}getNextDocuments(t,e,s,i){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,s,i).next((o=>{const l=i-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,s.largestBatchId,i-o.size):R.resolve(se());let h=en,f=o;return l.next((d=>R.forEach(d,((T,A)=>(h<A.largestBatchId&&(h=A.largestBatchId),o.get(T)?R.resolve():this.remoteDocumentCache.getEntry(t,T).next((C=>{f=f.insert(T,C)}))))).next((()=>this.populateOverlays(t,d,o))).next((()=>this.computeViews(t,f,d,pt()))).next((T=>({batchId:h,changes:Ea(T)})))))}))}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new F(e)).next((s=>{let i=Vn();return s.isFoundDocument()&&(i=i.insert(s.key,s)),i}))}getDocumentsMatchingCollectionGroupQuery(t,e,s,i){const o=e.collectionGroup;let l=Vn();return this.indexManager.getCollectionParents(t,o).next((h=>R.forEach(h,(f=>{const d=(function(A,C){return new Jn(C,null,A.explicitOrderBy.slice(),A.filters.slice(),A.limit,A.limitType,A.startAt,A.endAt)})(e,f.child(o));return this.getDocumentsMatchingCollectionQuery(t,d,s,i).next((T=>{T.forEach(((A,C)=>{l=l.insert(A,C)}))}))})).next((()=>l))))}getDocumentsMatchingCollectionQuery(t,e,s,i){let o;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,s.largestBatchId).next((l=>(o=l,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,s,o,i)))).next((l=>{o.forEach(((f,d)=>{const T=d.getKey();l.get(T)===null&&(l=l.insert(T,bt.newInvalidDocument(T)))}));let h=Vn();return l.forEach(((f,d)=>{const T=o.get(f);T!==void 0&&Je(T.mutation,d,Pt.empty(),X.now()),gs(e,d)&&(h=h.insert(f,d))})),h}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jh{constructor(t){this.serializer=t,this.Lr=new Map,this.kr=new Map}getBundleMetadata(t,e){return R.resolve(this.Lr.get(e))}saveBundleMetadata(t,e){return this.Lr.set(e.id,(function(i){return{id:i.id,version:i.version,createTime:ye(i.createTime)}})(e)),R.resolve()}getNamedQuery(t,e){return R.resolve(this.kr.get(e))}saveNamedQuery(t,e){return this.kr.set(e.name,(function(i){return{name:i.name,query:Uh(i.bundledQuery),readTime:ye(i.readTime)}})(e)),R.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yh{constructor(){this.overlays=new wt(F.comparator),this.qr=new Map}getOverlay(t,e){return R.resolve(this.overlays.get(e))}getOverlays(t,e){const s=se();return R.forEach(e,(i=>this.getOverlay(t,i).next((o=>{o!==null&&s.set(i,o)})))).next((()=>s))}saveOverlays(t,e,s){return s.forEach(((i,o)=>{this.St(t,e,o)})),R.resolve()}removeOverlaysForBatchId(t,e,s){const i=this.qr.get(s);return i!==void 0&&(i.forEach((o=>this.overlays=this.overlays.remove(o))),this.qr.delete(s)),R.resolve()}getOverlaysForCollection(t,e,s){const i=se(),o=e.length+1,l=new F(e.child("")),h=this.overlays.getIteratorFrom(l);for(;h.hasNext();){const f=h.getNext().value,d=f.getKey();if(!e.isPrefixOf(d.path))break;d.path.length===o&&f.largestBatchId>s&&i.set(f.getKey(),f)}return R.resolve(i)}getOverlaysForCollectionGroup(t,e,s,i){let o=new wt(((d,T)=>d-T));const l=this.overlays.getIterator();for(;l.hasNext();){const d=l.getNext().value;if(d.getKey().getCollectionGroup()===e&&d.largestBatchId>s){let T=o.get(d.largestBatchId);T===null&&(T=se(),o=o.insert(d.largestBatchId,T)),T.set(d.getKey(),d)}}const h=se(),f=o.getIterator();for(;f.hasNext()&&(f.getNext().value.forEach(((d,T)=>h.set(d,T))),!(h.size()>=i)););return R.resolve(h)}St(t,e,s){const i=this.overlays.get(s.key);if(i!==null){const l=this.qr.get(i.largestBatchId).delete(s.key);this.qr.set(i.largestBatchId,l)}this.overlays=this.overlays.insert(s.key,new Ih(e,s));let o=this.qr.get(e);o===void 0&&(o=pt(),this.qr.set(e,o)),this.qr.set(e,o.add(s.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zh{constructor(){this.sessionToken=Nt.EMPTY_BYTE_STRING}getSessionToken(t){return R.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,R.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Es{constructor(){this.Qr=new ft(ot.$r),this.Ur=new ft(ot.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(t,e){const s=new ot(t,e);this.Qr=this.Qr.add(s),this.Ur=this.Ur.add(s)}Wr(t,e){t.forEach((s=>this.addReference(s,e)))}removeReference(t,e){this.Gr(new ot(t,e))}zr(t,e){t.forEach((s=>this.removeReference(s,e)))}jr(t){const e=new F(new J([])),s=new ot(e,t),i=new ot(e,t+1),o=[];return this.Ur.forEachInRange([s,i],(l=>{this.Gr(l),o.push(l.key)})),o}Jr(){this.Qr.forEach((t=>this.Gr(t)))}Gr(t){this.Qr=this.Qr.delete(t),this.Ur=this.Ur.delete(t)}Hr(t){const e=new F(new J([])),s=new ot(e,t),i=new ot(e,t+1);let o=pt();return this.Ur.forEachInRange([s,i],(l=>{o=o.add(l.key)})),o}containsKey(t){const e=new ot(t,0),s=this.Qr.firstAfterOrEqual(e);return s!==null&&t.isEqual(s.key)}}class ot{constructor(t,e){this.key=t,this.Yr=e}static $r(t,e){return F.comparator(t.key,e.key)||G(t.Yr,e.Yr)}static Kr(t,e){return G(t.Yr,e.Yr)||F.comparator(t.key,e.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tf{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.tr=1,this.Zr=new ft(ot.$r)}checkEmpty(t){return R.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,s,i){const o=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const l=new Ah(o,e,s,i);this.mutationQueue.push(l);for(const h of i)this.Zr=this.Zr.add(new ot(h.key,o)),this.indexManager.addToCollectionParentIndex(t,h.key.path.popLast());return R.resolve(l)}lookupMutationBatch(t,e){return R.resolve(this.Xr(e))}getNextMutationBatchAfterBatchId(t,e){const s=e+1,i=this.ei(s),o=i<0?0:i;return R.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return R.resolve(this.mutationQueue.length===0?cs:this.tr-1)}getAllMutationBatches(t){return R.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const s=new ot(e,0),i=new ot(e,Number.POSITIVE_INFINITY),o=[];return this.Zr.forEachInRange([s,i],(l=>{const h=this.Xr(l.Yr);o.push(h)})),R.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(t,e){let s=new ft(G);return e.forEach((i=>{const o=new ot(i,0),l=new ot(i,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([o,l],(h=>{s=s.add(h.Yr)}))})),R.resolve(this.ti(s))}getAllMutationBatchesAffectingQuery(t,e){const s=e.path,i=s.length+1;let o=s;F.isDocumentKey(o)||(o=o.child(""));const l=new ot(new F(o),0);let h=new ft(G);return this.Zr.forEachWhile((f=>{const d=f.key.path;return!!s.isPrefixOf(d)&&(d.length===i&&(h=h.add(f.Yr)),!0)}),l),R.resolve(this.ti(h))}ti(t){const e=[];return t.forEach((s=>{const i=this.Xr(s);i!==null&&e.push(i)})),e}removeMutationBatch(t,e){Z(this.ni(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let s=this.Zr;return R.forEach(e.mutations,(i=>{const o=new ot(i.key,e.batchId);return s=s.delete(o),this.referenceDelegate.markPotentiallyOrphaned(t,i.key)})).next((()=>{this.Zr=s}))}ir(t){}containsKey(t,e){const s=new ot(e,0),i=this.Zr.firstAfterOrEqual(s);return R.resolve(e.isEqual(i&&i.key))}performConsistencyCheck(t){return this.mutationQueue.length,R.resolve()}ni(t,e){return this.ei(t)}ei(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Xr(t){const e=this.ei(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ef{constructor(t){this.ri=t,this.docs=(function(){return new wt(F.comparator)})(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const s=e.key,i=this.docs.get(s),o=i?i.size:0,l=this.ri(e);return this.docs=this.docs.insert(s,{document:e.mutableCopy(),size:l}),this.size+=l-o,this.indexManager.addToCollectionParentIndex(t,s.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const s=this.docs.get(e);return R.resolve(s?s.document.mutableCopy():bt.newInvalidDocument(e))}getEntries(t,e){let s=zn();return e.forEach((i=>{const o=this.docs.get(i);s=s.insert(i,o?o.document.mutableCopy():bt.newInvalidDocument(i))})),R.resolve(s)}getDocumentsMatchingQuery(t,e,s,i){let o=zn();const l=e.path,h=new F(l.child("__id-9223372036854775808__")),f=this.docs.getIteratorFrom(h);for(;f.hasNext();){const{key:d,value:{document:T}}=f.getNext();if(!l.isPrefixOf(d.path))break;d.path.length>l.length+1||ku(Du(T),s)<=0||(i.has(T.key)||gs(e,T))&&(o=o.insert(T.key,T.mutableCopy()))}return R.resolve(o)}getAllFromCollectionGroup(t,e,s,i){B(9500)}ii(t,e){return R.forEach(this.docs,(s=>e(s)))}newChangeBuffer(t){return new nf(this)}getSize(t){return R.resolve(this.size)}}class nf extends Kh{constructor(t){super(),this.Nr=t}applyChanges(t){const e=[];return this.changes.forEach(((s,i)=>{i.isValidDocument()?e.push(this.Nr.addEntry(t,i)):this.Nr.removeEntry(s)})),R.waitFor(e)}getFromCache(t,e){return this.Nr.getEntry(t,e)}getAllFromCache(t,e){return this.Nr.getEntries(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rf{constructor(t){this.persistence=t,this.si=new he((e=>ms(e)),ps),this.lastRemoteSnapshotVersion=Q.min(),this.highestTargetId=0,this.oi=0,this._i=new Es,this.targetCount=0,this.ai=Ie.ur()}forEachTarget(t,e){return this.si.forEach(((s,i)=>e(i))),R.resolve()}getLastRemoteSnapshotVersion(t){return R.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return R.resolve(this.oi)}allocateTargetId(t){return this.highestTargetId=this.ai.next(),R.resolve(this.highestTargetId)}setTargetsMetadata(t,e,s){return s&&(this.lastRemoteSnapshotVersion=s),e>this.oi&&(this.oi=e),R.resolve()}Pr(t){this.si.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.ai=new Ie(e),this.highestTargetId=e),t.sequenceNumber>this.oi&&(this.oi=t.sequenceNumber)}addTargetData(t,e){return this.Pr(e),this.targetCount+=1,R.resolve()}updateTargetData(t,e){return this.Pr(e),R.resolve()}removeTargetData(t,e){return this.si.delete(e.target),this._i.jr(e.targetId),this.targetCount-=1,R.resolve()}removeTargets(t,e,s){let i=0;const o=[];return this.si.forEach(((l,h)=>{h.sequenceNumber<=e&&s.get(h.targetId)===null&&(this.si.delete(l),o.push(this.removeMatchingKeysForTargetId(t,h.targetId)),i++)})),R.waitFor(o).next((()=>i))}getTargetCount(t){return R.resolve(this.targetCount)}getTargetData(t,e){const s=this.si.get(e)||null;return R.resolve(s)}addMatchingKeys(t,e,s){return this._i.Wr(e,s),R.resolve()}removeMatchingKeys(t,e,s){this._i.zr(e,s);const i=this.persistence.referenceDelegate,o=[];return i&&e.forEach((l=>{o.push(i.markPotentiallyOrphaned(t,l))})),R.waitFor(o)}removeMatchingKeysForTargetId(t,e){return this._i.jr(e),R.resolve()}getMatchingKeysForTargetId(t,e){const s=this._i.Hr(e);return R.resolve(s)}containsKey(t,e){return R.resolve(this._i.containsKey(e))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Na{constructor(t,e){this.ui={},this.overlays={},this.ci=new ls(0),this.li=!1,this.li=!0,this.hi=new Zh,this.referenceDelegate=t(this),this.Pi=new rf(this),this.indexManager=new Bh,this.remoteDocumentCache=(function(i){return new ef(i)})((s=>this.referenceDelegate.Ti(s))),this.serializer=new jh(e),this.Ii=new Jh(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new Yh,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let s=this.ui[t.toKey()];return s||(s=new tf(e,this.referenceDelegate),this.ui[t.toKey()]=s),s}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(t,e,s){V("MemoryPersistence","Starting transaction:",t);const i=new sf(this.ci.next());return this.referenceDelegate.Ei(),s(i).next((o=>this.referenceDelegate.di(i).next((()=>o)))).toPromise().then((o=>(i.raiseOnCommittedEvent(),o)))}Ai(t,e){return R.or(Object.values(this.ui).map((s=>()=>s.containsKey(t,e))))}}class sf extends Mu{constructor(t){super(),this.currentSequenceNumber=t}}class vs{constructor(t){this.persistence=t,this.Ri=new Es,this.Vi=null}static mi(t){return new vs(t)}get fi(){if(this.Vi)return this.Vi;throw B(60996)}addReference(t,e,s){return this.Ri.addReference(s,e),this.fi.delete(s.toString()),R.resolve()}removeReference(t,e,s){return this.Ri.removeReference(s,e),this.fi.add(s.toString()),R.resolve()}markPotentiallyOrphaned(t,e){return this.fi.add(e.toString()),R.resolve()}removeTarget(t,e){this.Ri.jr(e.targetId).forEach((i=>this.fi.add(i.toString())));const s=this.persistence.getTargetCache();return s.getMatchingKeysForTargetId(t,e.targetId).next((i=>{i.forEach((o=>this.fi.add(o.toString())))})).next((()=>s.removeTargetData(t,e)))}Ei(){this.Vi=new Set}di(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return R.forEach(this.fi,(s=>{const i=F.fromPath(s);return this.gi(t,i).next((o=>{o||e.removeEntry(i,Q.min())}))})).next((()=>(this.Vi=null,e.apply(t))))}updateLimboDocument(t,e){return this.gi(t,e).next((s=>{s?this.fi.delete(e.toString()):this.fi.add(e.toString())}))}Ti(t){return 0}gi(t,e){return R.or([()=>R.resolve(this.Ri.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ai(t,e)])}}class Kn{constructor(t,e){this.persistence=t,this.pi=new he((s=>ju(s.path)),((s,i)=>s.isEqual(i))),this.garbageCollector=Wh(this,e)}static mi(t,e){return new Kn(t,e)}Ei(){}di(t){return R.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}gr(t){const e=this.wr(t);return this.persistence.getTargetCache().getTargetCount(t).next((s=>e.next((i=>s+i))))}wr(t){let e=0;return this.pr(t,(s=>{e++})).next((()=>e))}pr(t,e){return R.forEach(this.pi,((s,i)=>this.br(t,s,i).next((o=>o?R.resolve():e(i)))))}removeTargets(t,e,s){return this.persistence.getTargetCache().removeTargets(t,e,s)}removeOrphanedDocuments(t,e){let s=0;const i=this.persistence.getRemoteDocumentCache(),o=i.newChangeBuffer();return i.ii(t,(l=>this.br(t,l,e).next((h=>{h||(s++,o.removeEntry(l,Q.min()))})))).next((()=>o.apply(t))).next((()=>s))}markPotentiallyOrphaned(t,e){return this.pi.set(e,t.currentSequenceNumber),R.resolve()}removeTarget(t,e){const s=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,s)}addReference(t,e,s){return this.pi.set(s,t.currentSequenceNumber),R.resolve()}removeReference(t,e,s){return this.pi.set(s,t.currentSequenceNumber),R.resolve()}updateLimboDocument(t,e){return this.pi.set(e,t.currentSequenceNumber),R.resolve()}Ti(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=On(t.data.value)),e}br(t,e,s){return R.or([()=>this.persistence.Ai(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const i=this.pi.get(e);return R.resolve(i!==void 0&&i>s)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ts{constructor(t,e,s,i){this.targetId=t,this.fromCache=e,this.Es=s,this.ds=i}static As(t,e){let s=pt(),i=pt();for(const o of e.docChanges)switch(o.type){case 0:s=s.add(o.doc.key);break;case 1:i=i.add(o.doc.key)}return new Ts(t,e.fromCache,s,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class of{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class af{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=(function(){return lc()?8:Lu(oc())>0?6:4})()}initialize(t,e){this.ps=t,this.indexManager=e,this.Rs=!0}getDocumentsMatchingQuery(t,e,s,i){const o={result:null};return this.ys(t,e).next((l=>{o.result=l})).next((()=>{if(!o.result)return this.ws(t,e,i,s).next((l=>{o.result=l}))})).next((()=>{if(o.result)return;const l=new of;return this.Ss(t,e,l).next((h=>{if(o.result=h,this.Vs)return this.bs(t,e,l,h.size)}))})).next((()=>o.result))}bs(t,e,s,i){return s.documentReadCount<this.fs?(ge()<=q.DEBUG&&V("QueryEngine","SDK will not create cache indexes for query:",He(e),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),R.resolve()):(ge()<=q.DEBUG&&V("QueryEngine","Query:",He(e),"scans",s.documentReadCount,"local documents and returns",i,"documents as results."),s.documentReadCount>this.gs*i?(ge()<=q.DEBUG&&V("QueryEngine","The SDK decides to create cache indexes for query:",He(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,oe(e))):R.resolve())}ys(t,e){if(ho(e))return R.resolve(null);let s=oe(e);return this.indexManager.getIndexType(t,s).next((i=>i===0?null:(e.limit!==null&&i===1&&(e=Kr(e,null,"F"),s=oe(e)),this.indexManager.getDocumentsMatchingTarget(t,s).next((o=>{const l=pt(...o);return this.ps.getDocuments(t,l).next((h=>this.indexManager.getMinOffset(t,s).next((f=>{const d=this.Ds(e,h);return this.Cs(e,d,l,f.readTime)?this.ys(t,Kr(e,null,"F")):this.vs(t,d,e,f)}))))})))))}ws(t,e,s,i){return ho(e)||i.isEqual(Q.min())?R.resolve(null):this.ps.getDocuments(t,s).next((o=>{const l=this.Ds(e,o);return this.Cs(e,l,s,i)?R.resolve(null):(ge()<=q.DEBUG&&V("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),He(e)),this.vs(t,l,e,Nu(i,en)).next((h=>h)))}))}Ds(t,e){let s=new ft(ah(t));return e.forEach(((i,o)=>{gs(t,o)&&(s=s.add(o))})),s}Cs(t,e,s,i){if(t.limit===null)return!1;if(s.size!==e.size)return!0;const o=t.limitType==="F"?e.last():e.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(i)>0)}Ss(t,e,s){return ge()<=q.DEBUG&&V("QueryEngine","Using full collection scan to execute query:",He(e)),this.ps.getDocumentsMatchingQuery(t,e,Kt.min(),s)}vs(t,e,s,i){return this.ps.getDocumentsMatchingQuery(t,s,i).next((o=>(e.forEach((l=>{o=o.insert(l.key,l)})),o)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lf="LocalStore";class cf{constructor(t,e,s,i){this.persistence=t,this.Fs=e,this.serializer=i,this.Ms=new wt(G),this.xs=new he((o=>ms(o)),ps),this.Os=new Map,this.Ns=t.getRemoteDocumentCache(),this.Pi=t.getTargetCache(),this.Ii=t.getBundleCache(),this.Bs(s)}Bs(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Xh(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(e=>t.collect(e,this.Ms)))}}function uf(n,t,e,s){return new cf(n,t,e,s)}function Da(n,t){return N(this,null,function*(){const e=z(n);return yield e.persistence.runTransaction("Handle user change","readonly",(s=>{let i;return e.mutationQueue.getAllMutationBatches(s).next((o=>(i=o,e.Bs(t),e.mutationQueue.getAllMutationBatches(s)))).next((o=>{const l=[],h=[];let f=pt();for(const d of i){l.push(d.batchId);for(const T of d.mutations)f=f.add(T.key)}for(const d of o){h.push(d.batchId);for(const T of d.mutations)f=f.add(T.key)}return e.localDocuments.getDocuments(s,f).next((d=>({Ls:d,removedBatchIds:l,addedBatchIds:h})))}))}))})}function hf(n,t){const e=z(n);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",(s=>{const i=t.batch.keys(),o=e.Ns.newChangeBuffer({trackRemovals:!0});return(function(h,f,d,T){const A=d.batch,C=A.keys();let x=R.resolve();return C.forEach((O=>{x=x.next((()=>T.getEntry(f,O))).next((L=>{const M=d.docVersions.get(O);Z(M!==null,48541),L.version.compareTo(M)<0&&(A.applyToRemoteDocument(L,d),L.isValidDocument()&&(L.setReadTime(d.commitVersion),T.addEntry(L)))}))})),x.next((()=>h.mutationQueue.removeMutationBatch(f,A)))})(e,s,t,o).next((()=>o.apply(s))).next((()=>e.mutationQueue.performConsistencyCheck(s))).next((()=>e.documentOverlayCache.removeOverlaysForBatchId(s,i,t.batch.batchId))).next((()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(s,(function(h){let f=pt();for(let d=0;d<h.mutationResults.length;++d)h.mutationResults[d].transformResults.length>0&&(f=f.add(h.batch.mutations[d].key));return f})(t)))).next((()=>e.localDocuments.getDocuments(s,i)))}))}function ff(n){const t=z(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",(e=>t.Pi.getLastRemoteSnapshotVersion(e)))}function df(n,t){const e=z(n);return e.persistence.runTransaction("Get next mutation batch","readonly",(s=>(t===void 0&&(t=cs),e.mutationQueue.getNextMutationBatchAfterBatchId(s,t))))}class To{constructor(){this.activeTargetIds=dh()}zs(t){this.activeTargetIds=this.activeTargetIds.add(t)}js(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Gs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class mf{constructor(){this.Mo=new To,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,s){}addLocalQueryTarget(t,e=!0){return e&&this.Mo.zs(t),this.xo[t]||"not-current"}updateQueryState(t,e,s){this.xo[t]=e}removeLocalQueryTarget(t){this.Mo.js(t)}isLocalQueryTarget(t){return this.Mo.activeTargetIds.has(t)}clearQueryState(t){delete this.xo[t]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(t){return this.Mo.activeTargetIds.has(t)}start(){return this.Mo=new To,Promise.resolve()}handleUserChange(t,e,s){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pf{Oo(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wo="ConnectivityMonitor";class Ao{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(t){this.qo.push(t)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){V(wo,"Network connectivity changed: AVAILABLE");for(const t of this.qo)t(0)}ko(){V(wo,"Network connectivity changed: UNAVAILABLE");for(const t of this.qo)t(1)}static v(){return typeof window!="undefined"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Nn=null;function Yr(){return Nn===null?Nn=(function(){return 268435456+Math.round(2147483648*Math.random())})():Nn++,"0x"+Nn.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Or="RestConnection",gf={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class _f{get $o(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Uo=e+"://"+t.host,this.Ko=`projects/${s}/databases/${i}`,this.Wo=this.databaseId.database===qr?`project_id=${s}`:`project_id=${s}&database_id=${i}`}Go(t,e,s,i,o){const l=Yr(),h=this.zo(t,e.toUriEncodedString());V(Or,`Sending RPC '${t}' ${l}:`,h,s);const f={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(f,i,o);const{host:d}=new URL(h),T=ic(d);return this.Jo(t,h,f,s,T).then((A=>(V(Or,`Received RPC '${t}' ${l}: `,A),A)),(A=>{throw rs(Or,`RPC '${t}' ${l} failed with error: `,A,"url: ",h,"request:",s),A}))}Ho(t,e,s,i,o,l){return this.Go(t,e,s,i,o)}jo(t,e,s){t["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Re})(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach(((i,o)=>t[o]=i)),s&&s.headers.forEach(((i,o)=>t[o]=i))}zo(t,e){const s=gf[t];return`${this.Uo}/v1/${e}:${s}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yf{constructor(t){this.Yo=t.Yo,this.Zo=t.Zo}Xo(t){this.e_=t}t_(t){this.n_=t}r_(t){this.i_=t}onMessage(t){this.s_=t}close(){this.Zo()}send(t){this.Yo(t)}o_(){this.e_()}__(){this.n_()}a_(t){this.i_(t)}u_(t){this.s_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mt="WebChannelConnection";class Ef extends _f{constructor(t){super(t),this.c_=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}Jo(t,e,s,i,o){const l=Yr();return new Promise(((h,f)=>{const d=new Wo;d.setWithCredentials(!0),d.listenOnce(Ko.COMPLETE,(()=>{try{switch(d.getLastErrorCode()){case kn.NO_ERROR:const A=d.getResponseJson();V(mt,`XHR for RPC '${t}' ${l} received:`,JSON.stringify(A)),h(A);break;case kn.TIMEOUT:V(mt,`RPC '${t}' ${l} timed out`),f(new k(S.DEADLINE_EXCEEDED,"Request time out"));break;case kn.HTTP_ERROR:const C=d.getStatus();if(V(mt,`RPC '${t}' ${l} failed with status:`,C,"response text:",d.getResponseText()),C>0){let x=d.getResponseJson();Array.isArray(x)&&(x=x[0]);const O=x==null?void 0:x.error;if(O&&O.status&&O.message){const L=(function(D){const U=D.toLowerCase().replace(/_/g,"-");return Object.values(S).indexOf(U)>=0?U:S.UNKNOWN})(O.status);f(new k(L,O.message))}else f(new k(S.UNKNOWN,"Server responded with status "+d.getStatus()))}else f(new k(S.UNAVAILABLE,"Connection failed."));break;default:B(9055,{l_:t,streamId:l,h_:d.getLastErrorCode(),P_:d.getLastError()})}}finally{V(mt,`RPC '${t}' ${l} completed.`)}}));const T=JSON.stringify(i);V(mt,`RPC '${t}' ${l} sending request:`,i),d.send(e,"POST",T,s,15)}))}T_(t,e,s){const i=Yr(),o=[this.Uo,"/","google.firestore.v1.Firestore","/",t,"/channel"],l=Jo(),h=Xo(),f={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(f.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(f.useFetchStreams=!0),this.jo(f.initMessageHeaders,e,s),f.encodeInitMessageHeaders=!0;const T=o.join("");V(mt,`Creating RPC '${t}' stream ${i}: ${T}`,f);const A=l.createWebChannel(T,f);this.I_(A);let C=!1,x=!1;const O=new yf({Yo:M=>{x?V(mt,`Not sending because RPC '${t}' stream ${i} is closed:`,M):(C||(V(mt,`Opening RPC '${t}' stream ${i} transport.`),A.open(),C=!0),V(mt,`RPC '${t}' stream ${i} sending:`,M),A.send(M))},Zo:()=>A.close()}),L=(M,D,U)=>{M.listen(D,(K=>{try{U(K)}catch(lt){setTimeout((()=>{throw lt}),0)}}))};return L(A,ze.EventType.OPEN,(()=>{x||(V(mt,`RPC '${t}' stream ${i} transport opened.`),O.o_())})),L(A,ze.EventType.CLOSE,(()=>{x||(x=!0,V(mt,`RPC '${t}' stream ${i} transport closed`),O.a_(),this.E_(A))})),L(A,ze.EventType.ERROR,(M=>{x||(x=!0,rs(mt,`RPC '${t}' stream ${i} transport errored. Name:`,M.name,"Message:",M.message),O.a_(new k(S.UNAVAILABLE,"The operation could not be completed")))})),L(A,ze.EventType.MESSAGE,(M=>{var D;if(!x){const U=M.data[0];Z(!!U,16349);const K=U,lt=(K==null?void 0:K.error)||((D=K[0])==null?void 0:D.error);if(lt){V(mt,`RPC '${t}' stream ${i} received error:`,lt);const rt=lt.status;let tt=(function(g){const E=et[g];if(E!==void 0)return Rh(E)})(rt),y=lt.message;tt===void 0&&(tt=S.INTERNAL,y="Unknown error status: "+rt+" with message "+lt.message),x=!0,O.a_(new k(tt,y)),A.close()}else V(mt,`RPC '${t}' stream ${i} received:`,U),O.u_(U)}})),L(h,Qo.STAT_EVENT,(M=>{M.stat===Br.PROXY?V(mt,`RPC '${t}' stream ${i} detected buffering proxy`):M.stat===Br.NOPROXY&&V(mt,`RPC '${t}' stream ${i} detected no buffering proxy`)})),setTimeout((()=>{O.__()}),0),O}terminate(){this.c_.forEach((t=>t.close())),this.c_=[]}I_(t){this.c_.push(t)}E_(t){this.c_=this.c_.filter((e=>e===t))}}function Mr(){return typeof document!="undefined"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tr(n){return new Sh(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ka{constructor(t,e,s=1e3,i=1.5,o=6e4){this.Mi=t,this.timerId=e,this.d_=s,this.A_=i,this.R_=o,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(t){this.cancel();const e=Math.floor(this.V_+this.y_()),s=Math.max(0,Date.now()-this.f_),i=Math.max(0,e-s);i>0&&V("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.V_} ms, delay with jitter: ${e} ms, last attempt: ${s} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,i,(()=>(this.f_=Date.now(),t()))),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Io="PersistentStream";class vf{constructor(t,e,s,i,o,l,h,f){this.Mi=t,this.S_=s,this.b_=i,this.connection=o,this.authCredentialsProvider=l,this.appCheckCredentialsProvider=h,this.listener=f,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new ka(t,e)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}stop(){return N(this,null,function*(){this.x_()&&(yield this.close(0))})}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(t){this.Q_(),this.stream.send(t)}k_(){return N(this,null,function*(){if(this.O_())return this.close(0)})}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}close(t,e){return N(this,null,function*(){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,t!==4?this.M_.reset():e&&e.code===S.RESOURCE_EXHAUSTED?(le(e.toString()),le("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):e&&e.code===S.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=t,yield this.listener.r_(e)})}K_(){}auth(){this.state=1;const t=this.W_(this.D_),e=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([s,i])=>{this.D_===e&&this.G_(s,i)}),(s=>{t((()=>{const i=new k(S.UNKNOWN,"Fetching auth token failed: "+s.message);return this.z_(i)}))}))}G_(t,e){const s=this.W_(this.D_);this.stream=this.j_(t,e),this.stream.Xo((()=>{s((()=>this.listener.Xo()))})),this.stream.t_((()=>{s((()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.t_())))})),this.stream.r_((i=>{s((()=>this.z_(i)))})),this.stream.onMessage((i=>{s((()=>++this.F_==1?this.J_(i):this.onNext(i)))}))}N_(){this.state=5,this.M_.p_((()=>N(this,null,function*(){this.state=0,this.start()})))}z_(t){return V(Io,`close with error: ${t}`),this.stream=null,this.close(4,t)}W_(t){return e=>{this.Mi.enqueueAndForget((()=>this.D_===t?e():(V(Io,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class Tf extends vf{constructor(t,e,s,i,o,l){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,s,i,l),this.serializer=o}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(t,e){return this.connection.T_("Write",t,e)}J_(t){return Z(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,Z(!t.writeResults||t.writeResults.length===0,55816),this.listener.ta()}onNext(t){Z(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.M_.reset();const e=Oh(t.writeResults,t.commitTime),s=ye(t.commitTime);return this.listener.na(s,e)}ra(){const t={};t.database=Nh(this.serializer),this.q_(t)}ea(t){const e={streamToken:this.lastStreamToken,writes:t.map((s=>kh(this.serializer,s)))};this.q_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wf{}class Af extends wf{constructor(t,e,s,i){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=s,this.serializer=i,this.ia=!1}sa(){if(this.ia)throw new k(S.FAILED_PRECONDITION,"The client has already been terminated.")}Go(t,e,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,l])=>this.connection.Go(t,Xr(e,s),i,o,l))).catch((o=>{throw o.name==="FirebaseError"?(o.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new k(S.UNKNOWN,o.toString())}))}Ho(t,e,s,i,o){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([l,h])=>this.connection.Ho(t,Xr(e,s),i,l,h,o))).catch((l=>{throw l.name==="FirebaseError"?(l.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),l):new k(S.UNKNOWN,l.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}class If{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(t){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ca("Offline")))}set(t){this.Pa(),this.oa=0,t==="Online"&&(this.aa=!1),this.ca(t)}ca(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}la(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(le(e),this.aa=!1):V("OnlineStateTracker",e)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const un="RemoteStore";class bf{constructor(t,e,s,i,o){this.localStore=t,this.datastore=e,this.asyncQueue=s,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=o,this.Aa.Oo((l=>{s.enqueueAndForget((()=>N(this,null,function*(){fn(this)&&(V(un,"Restarting streams for network reachability change."),yield(function(f){return N(this,null,function*(){const d=z(f);d.Ea.add(4),yield hn(d),d.Ra.set("Unknown"),d.Ea.delete(4),yield er(d)})})(this))})))})),this.Ra=new If(s,i)}}function er(n){return N(this,null,function*(){if(fn(n))for(const t of n.da)yield t(!0)})}function hn(n){return N(this,null,function*(){for(const t of n.da)yield t(!1)})}function fn(n){return z(n).Ea.size===0}function Oa(n,t,e){return N(this,null,function*(){if(!ln(t))throw t;n.Ea.add(1),yield hn(n),n.Ra.set("Offline"),e||(e=()=>ff(n.localStore)),n.asyncQueue.enqueueRetryable((()=>N(null,null,function*(){V(un,"Retrying IndexedDB access"),yield e(),n.Ea.delete(1),yield er(n)})))})}function Ma(n,t){return t().catch((e=>Oa(n,e,t)))}function nr(n){return N(this,null,function*(){const t=z(n),e=Xt(t);let s=t.Ta.length>0?t.Ta[t.Ta.length-1].batchId:cs;for(;Rf(t);)try{const i=yield df(t.localStore,s);if(i===null){t.Ta.length===0&&e.L_();break}s=i.batchId,Sf(t,i)}catch(i){yield Oa(t,i)}La(t)&&Fa(t)})}function Rf(n){return fn(n)&&n.Ta.length<10}function Sf(n,t){n.Ta.push(t);const e=Xt(n);e.O_()&&e.X_&&e.ea(t.mutations)}function La(n){return fn(n)&&!Xt(n).x_()&&n.Ta.length>0}function Fa(n){Xt(n).start()}function Pf(n){return N(this,null,function*(){Xt(n).ra()})}function xf(n){return N(this,null,function*(){const t=Xt(n);for(const e of n.Ta)t.ea(e.mutations)})}function Cf(n,t,e){return N(this,null,function*(){const s=n.Ta.shift(),i=ys.from(s,t,e);yield Ma(n,(()=>n.remoteSyncer.applySuccessfulWrite(i))),yield nr(n)})}function Vf(n,t){return N(this,null,function*(){t&&Xt(n).X_&&(yield(function(s,i){return N(this,null,function*(){if((function(l){return bh(l)&&l!==S.ABORTED})(i.code)){const o=s.Ta.shift();Xt(s).B_(),yield Ma(s,(()=>s.remoteSyncer.rejectFailedWrite(o.batchId,i))),yield nr(s)}})})(n,t)),La(n)&&Fa(n)})}function bo(n,t){return N(this,null,function*(){const e=z(n);e.asyncQueue.verifyOperationInProgress(),V(un,"RemoteStore received new credentials");const s=fn(e);e.Ea.add(3),yield hn(e),s&&e.Ra.set("Unknown"),yield e.remoteSyncer.handleCredentialChange(t),e.Ea.delete(3),yield er(e)})}function Nf(n,t){return N(this,null,function*(){const e=z(n);t?(e.Ea.delete(2),yield er(e)):t||(e.Ea.add(2),yield hn(e),e.Ra.set("Unknown"))})}function Xt(n){return n.fa||(n.fa=(function(e,s,i){const o=z(e);return o.sa(),new Tf(s,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,i)})(n.datastore,n.asyncQueue,{Xo:()=>Promise.resolve(),t_:Pf.bind(null,n),r_:Vf.bind(null,n),ta:xf.bind(null,n),na:Cf.bind(null,n)}),n.da.push((t=>N(null,null,function*(){t?(n.fa.B_(),yield nr(n)):(yield n.fa.stop(),n.Ta.length>0&&(V(un,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))})))),n.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ws{constructor(t,e,s,i,o){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=s,this.op=i,this.removalCallback=o,this.deferred=new ie,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((l=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(t,e,s,i,o){const l=Date.now()+s,h=new ws(t,e,l,i,o);return h.start(s),h}start(t){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new k(S.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((t=>this.deferred.resolve(t)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function ja(n,t){if(le("AsyncQueue",`${t}: ${n}`),ln(n))return new k(S.UNAVAILABLE,`${t}: ${n}`);throw n}class Df{constructor(){this.queries=Ro(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(e,s){const i=z(e),o=i.queries;i.queries=Ro(),o.forEach(((l,h)=>{for(const f of h.Sa)f.onError(s)}))})(this,new k(S.ABORTED,"Firestore shutting down"))}}function Ro(){return new he((n=>_a(n)),ga)}function kf(n){n.Ca.forEach((t=>{t.next()}))}var So,Po;(Po=So||(So={})).Ma="default",Po.Cache="cache";const Of="SyncEngine";class Mf{constructor(t,e,s,i,o,l){this.localStore=t,this.remoteStore=e,this.eventManager=s,this.sharedClientState=i,this.currentUser=o,this.maxConcurrentLimboResolutions=l,this.Pu={},this.Tu=new he((h=>_a(h)),ga),this.Iu=new Map,this.Eu=new Set,this.du=new wt(F.comparator),this.Au=new Map,this.Ru=new Es,this.Vu={},this.mu=new Map,this.fu=Ie.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}function Lf(n,t,e){return N(this,null,function*(){const s=Bf(n);try{const i=yield(function(l,h){const f=z(l),d=X.now(),T=h.reduce(((x,O)=>x.add(O.key)),pt());let A,C;return f.persistence.runTransaction("Locally write mutations","readwrite",(x=>{let O=zn(),L=pt();return f.Ns.getEntries(x,T).next((M=>{O=M,O.forEach(((D,U)=>{U.isValidDocument()||(L=L.add(D))}))})).next((()=>f.localDocuments.getOverlayedDocuments(x,O))).next((M=>{A=M;const D=[];for(const U of h){const K=Th(U,A.get(U.key).overlayedDocument);K!=null&&D.push(new fe(U.key,K,ca(K.value.mapValue),Ot.exists(!0)))}return f.mutationQueue.addMutationBatch(x,d,D,h)})).next((M=>{C=M;const D=M.applyToLocalDocumentSet(A,L);return f.documentOverlayCache.saveOverlays(x,M.batchId,D)}))})).then((()=>({batchId:C.batchId,changes:Ea(A)})))})(s.localStore,t);s.sharedClientState.addPendingMutation(i.batchId),(function(l,h,f){let d=l.Vu[l.currentUser.toKey()];d||(d=new wt(G)),d=d.insert(h,f),l.Vu[l.currentUser.toKey()]=d})(s,i.batchId,e),yield rr(s,i.changes),yield nr(s.remoteStore)}catch(i){const o=ja(i,"Failed to persist write");e.reject(o)}})}function xo(n,t,e){const s=z(n);if(s.isPrimaryClient&&e===0||!s.isPrimaryClient&&e===1){const i=[];s.Tu.forEach(((o,l)=>{const h=l.view.va(t);h.snapshot&&i.push(h.snapshot)})),(function(l,h){const f=z(l);f.onlineState=h;let d=!1;f.queries.forEach(((T,A)=>{for(const C of A.Sa)C.va(h)&&(d=!0)})),d&&kf(f)})(s.eventManager,t),i.length&&s.Pu.H_(i),s.onlineState=t,s.isPrimaryClient&&s.sharedClientState.setOnlineState(t)}}function Ff(n,t){return N(this,null,function*(){const e=z(n),s=t.batch.batchId;try{const i=yield hf(e.localStore,t);Ba(e,s,null),Ua(e,s),e.sharedClientState.updateMutationState(s,"acknowledged"),yield rr(e,i)}catch(i){yield as(i)}})}function jf(n,t,e){return N(this,null,function*(){const s=z(n);try{const i=yield(function(l,h){const f=z(l);return f.persistence.runTransaction("Reject batch","readwrite-primary",(d=>{let T;return f.mutationQueue.lookupMutationBatch(d,h).next((A=>(Z(A!==null,37113),T=A.keys(),f.mutationQueue.removeMutationBatch(d,A)))).next((()=>f.mutationQueue.performConsistencyCheck(d))).next((()=>f.documentOverlayCache.removeOverlaysForBatchId(d,T,h))).next((()=>f.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,T))).next((()=>f.localDocuments.getDocuments(d,T)))}))})(s.localStore,t);Ba(s,t,e),Ua(s,t),s.sharedClientState.updateMutationState(t,"rejected",e),yield rr(s,i)}catch(i){yield as(i)}})}function Ua(n,t){(n.mu.get(t)||[]).forEach((e=>{e.resolve()})),n.mu.delete(t)}function Ba(n,t,e){const s=z(n);let i=s.Vu[s.currentUser.toKey()];if(i){const o=i.get(t);o&&(e?o.reject(e):o.resolve(),i=i.remove(t)),s.Vu[s.currentUser.toKey()]=i}}function rr(n,t,e){return N(this,null,function*(){const s=z(n),i=[],o=[],l=[];s.Tu.isEmpty()||(s.Tu.forEach(((h,f)=>{l.push(s.pu(f,t,e).then((d=>{var T;if((d||e)&&s.isPrimaryClient){const A=d?!d.fromCache:(T=e==null?void 0:e.targetChanges.get(f.targetId))==null?void 0:T.current;s.sharedClientState.updateQueryState(f.targetId,A?"current":"not-current")}if(d){i.push(d);const A=Ts.As(f.targetId,d);o.push(A)}})))})),yield Promise.all(l),s.Pu.H_(i),yield(function(f,d){return N(this,null,function*(){const T=z(f);try{yield T.persistence.runTransaction("notifyLocalViewChanges","readwrite",(A=>R.forEach(d,(C=>R.forEach(C.Es,(x=>T.persistence.referenceDelegate.addReference(A,C.targetId,x))).next((()=>R.forEach(C.ds,(x=>T.persistence.referenceDelegate.removeReference(A,C.targetId,x)))))))))}catch(A){if(!ln(A))throw A;V(lf,"Failed to update sequence numbers: "+A)}for(const A of d){const C=A.targetId;if(!A.fromCache){const x=T.Ms.get(C),O=x.snapshotVersion,L=x.withLastLimboFreeSnapshotVersion(O);T.Ms=T.Ms.insert(C,L)}}})})(s.localStore,o))})}function Uf(n,t){return N(this,null,function*(){const e=z(n);if(!e.currentUser.isEqual(t)){V(Of,"User change. New user:",t.toKey());const s=yield Da(e.localStore,t);e.currentUser=t,(function(o,l){o.mu.forEach((h=>{h.forEach((f=>{f.reject(new k(S.CANCELLED,l))}))})),o.mu.clear()})(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,s.removedBatchIds,s.addedBatchIds),yield rr(e,s.Ls)}})}function Bf(n){const t=z(n);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Ff.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=jf.bind(null,t),t}class Qn{constructor(){this.kind="memory",this.synchronizeTabs=!1}initialize(t){return N(this,null,function*(){this.serializer=tr(t.databaseInfo.databaseId),this.sharedClientState=this.Du(t),this.persistence=this.Cu(t),yield this.persistence.start(),this.localStore=this.vu(t),this.gcScheduler=this.Fu(t,this.localStore),this.indexBackfillerScheduler=this.Mu(t,this.localStore)})}Fu(t,e){return null}Mu(t,e){return null}vu(t){return uf(this.persistence,new af,t.initialUser,this.serializer)}Cu(t){return new Na(vs.mi,this.serializer)}Du(t){return new mf}terminate(){return N(this,null,function*(){var t,e;(t=this.gcScheduler)==null||t.stop(),(e=this.indexBackfillerScheduler)==null||e.stop(),this.sharedClientState.shutdown(),yield this.persistence.shutdown()})}}Qn.provider={build:()=>new Qn};class $f extends Qn{constructor(t){super(),this.cacheSizeBytes=t}Fu(t,e){Z(this.persistence.referenceDelegate instanceof Kn,46915);const s=this.persistence.referenceDelegate.garbageCollector;return new Hh(s,t.asyncQueue,e)}Cu(t){const e=this.cacheSizeBytes!==void 0?Tt.withCacheSize(this.cacheSizeBytes):Tt.DEFAULT;return new Na((s=>Kn.mi(s,e)),this.serializer)}}class Zr{initialize(t,e){return N(this,null,function*(){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=s=>xo(this.syncEngine,s,1),this.remoteStore.remoteSyncer.handleCredentialChange=Uf.bind(null,this.syncEngine),yield Nf(this.remoteStore,this.syncEngine.isPrimaryClient))})}createEventManager(t){return(function(){return new Df})()}createDatastore(t){const e=tr(t.databaseInfo.databaseId),s=(function(o){return new Ef(o)})(t.databaseInfo);return(function(o,l,h,f){return new Af(o,l,h,f)})(t.authCredentials,t.appCheckCredentials,s,e)}createRemoteStore(t){return(function(s,i,o,l,h){return new bf(s,i,o,l,h)})(this.localStore,this.datastore,t.asyncQueue,(e=>xo(this.syncEngine,e,0)),(function(){return Ao.v()?new Ao:new pf})())}createSyncEngine(t,e){return(function(i,o,l,h,f,d,T){const A=new Mf(i,o,l,h,f,d);return T&&(A.gu=!0),A})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}terminate(){return N(this,null,function*(){var t,e;yield(function(i){return N(this,null,function*(){const o=z(i);V(un,"RemoteStore shutting down."),o.Ea.add(5),yield hn(o),o.Aa.shutdown(),o.Ra.set("Unknown")})})(this.remoteStore),(t=this.datastore)==null||t.terminate(),(e=this.eventManager)==null||e.terminate()})}}Zr.provider={build:()=>new Zr};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jt="FirestoreClient";class qf{constructor(t,e,s,i,o){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=s,this.databaseInfo=i,this.user=vt.UNAUTHENTICATED,this.clientId=is.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(s,(l=>N(this,null,function*(){V(Jt,"Received user=",l.uid),yield this.authCredentialListener(l),this.user=l}))),this.appCheckCredentials.start(s,(l=>(V(Jt,"Received new app check token=",l),this.appCheckCredentialListener(l,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new ie;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((()=>N(this,null,function*(){try{this._onlineComponents&&(yield this._onlineComponents.terminate()),this._offlineComponents&&(yield this._offlineComponents.terminate()),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const s=ja(e,"Failed to shutdown persistence");t.reject(s)}}))),t.promise}}function Lr(n,t){return N(this,null,function*(){n.asyncQueue.verifyOperationInProgress(),V(Jt,"Initializing OfflineComponentProvider");const e=n.configuration;yield t.initialize(e);let s=e.initialUser;n.setCredentialChangeListener((i=>N(null,null,function*(){s.isEqual(i)||(yield Da(t.localStore,i),s=i)}))),t.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=t})}function Co(n,t){return N(this,null,function*(){n.asyncQueue.verifyOperationInProgress();const e=yield Gf(n);V(Jt,"Initializing OnlineComponentProvider"),yield t.initialize(e,n.configuration),n.setCredentialChangeListener((s=>bo(t.remoteStore,s))),n.setAppCheckTokenChangeListener(((s,i)=>bo(t.remoteStore,i))),n._onlineComponents=t})}function Gf(n){return N(this,null,function*(){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){V(Jt,"Using user provided OfflineComponentProvider");try{yield Lr(n,n._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!(function(i){return i.name==="FirebaseError"?i.code===S.FAILED_PRECONDITION||i.code===S.UNIMPLEMENTED:!(typeof DOMException!="undefined"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11})(e))throw e;rs("Error using user provided cache. Falling back to memory cache: "+e),yield Lr(n,new Qn)}}else V(Jt,"Using default OfflineComponentProvider"),yield Lr(n,new $f(void 0));return n._offlineComponents})}function Hf(n){return N(this,null,function*(){return n._onlineComponents||(n._uninitializedComponentsProvider?(V(Jt,"Using user provided OnlineComponentProvider"),yield Co(n,n._uninitializedComponentsProvider._online)):(V(Jt,"Using default OnlineComponentProvider"),yield Co(n,new Zr))),n._onlineComponents})}function zf(n){return Hf(n).then((t=>t.syncEngine))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $a(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vo=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wf="firestore.googleapis.com",No=!0;class Do{constructor(t){var e,s;if(t.host===void 0){if(t.ssl!==void 0)throw new k(S.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Wf,this.ssl=No}else this.host=t.host,this.ssl=(e=t.ssl)!=null?e:No;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=Va;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<qh)throw new k(S.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}Cu("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=$a((s=t.experimentalLongPollingOptions)!=null?s:{}),(function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new k(S.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new k(S.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new k(S.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(function(s,i){return s.timeoutSeconds===i.timeoutSeconds})(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class As{constructor(t,e,s,i){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=s,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Do({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new k(S.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new k(S.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Do(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=(function(s){if(!s)return new Tu;switch(s.type){case"firstParty":return new Iu(s.sessionIndex||"0",s.iamToken||null,s.authTokenFactory||null);case"provider":return s.client;default:throw new k(S.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}_restart(){return N(this,null,function*(){this._terminateTask==="notTerminated"?yield this._terminate():this._terminateTask="notTerminated"})}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(e){const s=Vo.get(e);s&&(V("ComponentProvider","Removing Datastore"),Vo.delete(e),s.terminate())})(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Is{constructor(t,e,s){this.converter=e,this._query=s,this.type="query",this.firestore=t}withConverter(t){return new Is(this.firestore,t,this._query)}}class gt{constructor(t,e,s){this.converter=e,this._key=s,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Wt(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new gt(this.firestore,t,this._key)}toJSON(){return{type:gt._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,s){if(an(e,gt._jsonSchema))return new gt(t,s||null,new F(J.fromString(e.referencePath)))}}gt._jsonSchemaVersion="firestore/documentReference/1.0",gt._jsonSchema={type:nt("string",gt._jsonSchemaVersion),referencePath:nt("string")};class Wt extends Is{constructor(t,e,s){super(t,e,sh(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new gt(this.firestore,null,new F(t))}withConverter(t){return new Wt(this.firestore,t,this._path)}}function qa(n,t,...e){if(n=Ze(n),Zo("collection","path",t),n instanceof As){const s=J.fromString(t,...e);return to(s),new Wt(n,null,s)}{if(!(n instanceof gt||n instanceof Wt))throw new k(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=n._path.child(J.fromString(t,...e));return to(s),new Wt(n.firestore,null,s)}}function Kf(n,t,...e){if(n=Ze(n),arguments.length===1&&(t=is.newId()),Zo("doc","path",t),n instanceof As){const s=J.fromString(t,...e);return Zi(s),new gt(n,null,new F(s))}{if(!(n instanceof gt||n instanceof Wt))throw new k(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=n._path.child(J.fromString(t,...e));return Zi(s),new gt(n.firestore,n instanceof Wt?n.converter:null,new F(s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ko="AsyncQueue";class Oo{constructor(t=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new ka(this,"async_queue_retry"),this._c=()=>{const s=Mr();s&&V(ko,"Visibility state changed to "+s.visibilityState),this.M_.w_()},this.ac=t;const e=Mr();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.uc(),this.cc(t)}enterRestrictedMode(t){if(!this.ec){this.ec=!0,this.sc=t||!1;const e=Mr();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this._c)}}enqueue(t){if(this.uc(),this.ec)return new Promise((()=>{}));const e=new ie;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise))).then((()=>e.promise))}enqueueRetryable(t){this.enqueueAndForget((()=>(this.Xu.push(t),this.lc())))}lc(){return N(this,null,function*(){if(this.Xu.length!==0){try{yield this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(t){if(!ln(t))throw t;V(ko,"Operation failed with retryable error: "+t)}this.Xu.length>0&&this.M_.p_((()=>this.lc()))}})}cc(t){const e=this.ac.then((()=>(this.rc=!0,t().catch((s=>{throw this.nc=s,this.rc=!1,le("INTERNAL UNHANDLED ERROR: ",Mo(s)),s})).then((s=>(this.rc=!1,s))))));return this.ac=e,e}enqueueAfterDelay(t,e,s){this.uc(),this.oc.indexOf(t)>-1&&(e=0);const i=ws.createAndSchedule(this,t,e,s,(o=>this.hc(o)));return this.tc.push(i),i}uc(){this.nc&&B(47125,{Pc:Mo(this.nc)})}verifyOperationInProgress(){}Tc(){return N(this,null,function*(){let t;do t=this.ac,yield t;while(t!==this.ac)})}Ic(t){for(const e of this.tc)if(e.timerId===t)return!0;return!1}Ec(t){return this.Tc().then((()=>{this.tc.sort(((e,s)=>e.targetTimeMs-s.targetTimeMs));for(const e of this.tc)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Tc()}))}dc(t){this.oc.push(t)}hc(t){const e=this.tc.indexOf(t);this.tc.splice(e,1)}}function Mo(n){let t=n.message||"";return n.stack&&(t=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),t}class Ga extends As{constructor(t,e,s,i){super(t,e,s,i),this.type="firestore",this._queue=new Oo,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}_terminate(){return N(this,null,function*(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new Oo(t),this._firestoreClient=void 0,yield t}})}}function Qf(n){if(n._terminated)throw new k(S.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Xf(n),n._firestoreClient}function Xf(n){var s,i,o;const t=n._freezeSettings(),e=(function(h,f,d,T){return new qu(h,f,d,T.host,T.ssl,T.experimentalForceLongPolling,T.experimentalAutoDetectLongPolling,$a(T.experimentalLongPollingOptions),T.useFetchStreams,T.isUsingEmulator)})(n._databaseId,((s=n._app)==null?void 0:s.options.appId)||"",n._persistenceKey,t);n._componentsProvider||(i=t.localCache)!=null&&i._offlineComponentProvider&&((o=t.localCache)!=null&&o._onlineComponentProvider)&&(n._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),n._firestoreClient=new qf(n._authCredentials,n._appCheckCredentials,n._queue,e,n._componentsProvider&&(function(h){const f=h==null?void 0:h._online.build();return{_offline:h==null?void 0:h._offline.build(f),_online:f}})(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St{constructor(t){this._byteString=t}static fromBase64String(t){try{return new St(Nt.fromBase64String(t))}catch(e){throw new k(S.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new St(Nt.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:St._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(an(t,St._jsonSchema))return St.fromBase64String(t.bytes)}}St._jsonSchemaVersion="firestore/bytes/1.0",St._jsonSchema={type:nt("string",St._jsonSchemaVersion),bytes:nt("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bs{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new k(S.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ht(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rs{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mt{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new k(S.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new k(S.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return G(this._lat,t._lat)||G(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Mt._jsonSchemaVersion}}static fromJSON(t){if(an(t,Mt._jsonSchema))return new Mt(t.latitude,t.longitude)}}Mt._jsonSchemaVersion="firestore/geoPoint/1.0",Mt._jsonSchema={type:nt("string",Mt._jsonSchemaVersion),latitude:nt("number"),longitude:nt("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(t){this._values=(t||[]).map((e=>e))}toArray(){return this._values.map((t=>t))}isEqual(t){return(function(s,i){if(s.length!==i.length)return!1;for(let o=0;o<s.length;++o)if(s[o]!==i[o])return!1;return!0})(this._values,t._values)}toJSON(){return{type:Lt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(an(t,Lt._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every((e=>typeof e=="number")))return new Lt(t.vectorValues);throw new k(S.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Lt._jsonSchemaVersion="firestore/vectorValue/1.0",Lt._jsonSchema={type:nt("string",Lt._jsonSchemaVersion),vectorValues:nt("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jf=/^__.*__$/;class Yf{constructor(t,e,s){this.data=t,this.fieldMask=e,this.fieldTransforms=s}toMutation(t,e){return this.fieldMask!==null?new fe(t,this.data,this.fieldMask,e,this.fieldTransforms):new cn(t,this.data,e,this.fieldTransforms)}}function Ha(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw B(40011,{Ac:n})}}class Ss{constructor(t,e,s,i,o,l){this.settings=t,this.databaseId=e,this.serializer=s,this.ignoreUndefinedProperties=i,o===void 0&&this.Rc(),this.fieldTransforms=o||[],this.fieldMask=l||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(t){return new Ss(kt(kt({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(t){var i;const e=(i=this.path)==null?void 0:i.child(t),s=this.Vc({path:e,fc:!1});return s.gc(t),s}yc(t){var i;const e=(i=this.path)==null?void 0:i.child(t),s=this.Vc({path:e,fc:!1});return s.Rc(),s}wc(t){return this.Vc({path:void 0,fc:!0})}Sc(t){return Xn(t,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(t){return this.fieldMask.find((e=>t.isPrefixOf(e)))!==void 0||this.fieldTransforms.find((e=>t.isPrefixOf(e.field)))!==void 0}Rc(){if(this.path)for(let t=0;t<this.path.length;t++)this.gc(this.path.get(t))}gc(t){if(t.length===0)throw this.Sc("Document fields must not be empty");if(Ha(this.Ac)&&Jf.test(t))throw this.Sc('Document fields cannot begin and end with "__"')}}class Zf{constructor(t,e,s){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=s||tr(t)}Cc(t,e,s,i=!1){return new Ss({Ac:t,methodName:e,Dc:s,path:ht.emptyPath(),fc:!1,bc:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function td(n){const t=n._freezeSettings(),e=tr(n._databaseId);return new Zf(n._databaseId,!!t.ignoreUndefinedProperties,e)}function ed(n,t,e,s,i,o={}){const l=n.Cc(o.merge||o.mergeFields?2:0,t,e,i);Qa("Data must be an object, but it was:",l,s);const h=Wa(s,l);let f,d;if(o.merge)f=new Pt(l.fieldMask),d=l.fieldTransforms;else if(o.mergeFields){const T=[];for(const A of o.mergeFields){const C=nd(t,A,e);if(!l.contains(C))throw new k(S.INVALID_ARGUMENT,`Field '${C}' is specified in your field mask but missing from your input data.`);sd(T,C)||T.push(C)}f=new Pt(T),d=l.fieldTransforms.filter((A=>f.covers(A.field)))}else f=null,d=l.fieldTransforms;return new Yf(new Rt(h),f,d)}class Ps extends Rs{_toFieldTransform(t){return new _h(t.path,new rn)}isEqual(t){return t instanceof Ps}}function za(n,t){if(Ka(n=Ze(n)))return Qa("Unsupported field value:",t,n),Wa(n,t);if(n instanceof Rs)return(function(s,i){if(!Ha(i.Ac))throw i.Sc(`${s._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Sc(`${s._methodName}() is not currently supported inside arrays`);const o=s._toFieldTransform(i);o&&i.fieldTransforms.push(o)})(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.fc&&t.Ac!==4)throw t.Sc("Nested arrays are not supported");return(function(s,i){const o=[];let l=0;for(const h of s){let f=za(h,i.wc(l));f==null&&(f={nullValue:"NULL_VALUE"}),o.push(f),l++}return{arrayValue:{values:o}}})(n,t)}return(function(s,i){if((s=Ze(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return mh(i.serializer,s);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){const o=X.fromDate(s);return{timestampValue:Qr(i.serializer,o)}}if(s instanceof X){const o=new X(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:Qr(i.serializer,o)}}if(s instanceof Mt)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof St)return{bytesValue:Ph(i.serializer,s._byteString)};if(s instanceof gt){const o=i.databaseId,l=s.firestore._databaseId;if(!l.isEqual(o))throw i.Sc(`Document reference is for database ${l.projectId}/${l.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:xa(s.firestore._databaseId||i.databaseId,s._key.path)}}if(s instanceof Lt)return(function(l,h){return{mapValue:{fields:{[aa]:{stringValue:la},[Gr]:{arrayValue:{values:l.toArray().map((d=>{if(typeof d!="number")throw h.Sc("VectorValues must only contain numeric values.");return _s(h.serializer,d)}))}}}}}})(s,i);throw i.Sc(`Unsupported field value: ${os(s)}`)})(n,t)}function Wa(n,t){const e={};return na(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):Se(n,((s,i)=>{const o=za(i,t.mc(s));o!=null&&(e[s]=o)})),{mapValue:{fields:e}}}function Ka(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof X||n instanceof Mt||n instanceof St||n instanceof gt||n instanceof Rs||n instanceof Lt)}function Qa(n,t,e){if(!Ka(e)||!ta(e)){const s=os(e);throw s==="an object"?t.Sc(n+" a custom object"):t.Sc(n+" "+s)}}function nd(n,t,e){if((t=Ze(t))instanceof bs)return t._internalPath;if(typeof t=="string")return Xa(n,t);throw Xn("Field path arguments must be of type string or ",n,!1,void 0,e)}const rd=new RegExp("[~\\*/\\[\\]]");function Xa(n,t,e){if(t.search(rd)>=0)throw Xn(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new bs(...t.split("."))._internalPath}catch(s){throw Xn(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function Xn(n,t,e,s,i){const o=s&&!s.isEmpty(),l=i!==void 0;let h=`Function ${t}() called with invalid data`;e&&(h+=" (via `toFirestore()`)"),h+=". ";let f="";return(o||l)&&(f+=" (found",o&&(f+=` in field ${s}`),l&&(f+=` in document ${i}`),f+=")"),new k(S.INVALID_ARGUMENT,h+n+f)}function sd(n,t){return n.some((e=>e.isEqual(t)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ja{constructor(t,e,s,i,o){this._firestore=t,this._userDataWriter=e,this._key=s,this._document=i,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new gt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new id(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(Ya("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class id extends Ja{data(){return super.data()}}function Ya(n,t){return typeof t=="string"?Xa(n,t):t instanceof bs?t._internalPath:t._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function od(n,t,e){let s;return s=n?n.toFirestore(t):t,s}class Dn{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Ee extends Ja{constructor(t,e,s,i,o,l){super(t,e,s,i,l),this._firestore=t,this._firestoreImpl=t,this.metadata=o}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new Fn(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const s=this._document.data.field(Ya("DocumentSnapshot.get",t));if(s!==null)return this._userDataWriter.convertValue(s,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new k(S.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,e={};return e.type=Ee._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}}Ee._jsonSchemaVersion="firestore/documentSnapshot/1.0",Ee._jsonSchema={type:nt("string",Ee._jsonSchemaVersion),bundleSource:nt("string","DocumentSnapshot"),bundleName:nt("string"),bundle:nt("string")};class Fn extends Ee{data(t={}){return super.data(t)}}class Ye{constructor(t,e,s,i){this._firestore=t,this._userDataWriter=e,this._snapshot=i,this.metadata=new Dn(i.hasPendingWrites,i.fromCache),this.query=s}get docs(){const t=[];return this.forEach((e=>t.push(e))),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach((s=>{t.call(e,new Fn(this._firestore,this._userDataWriter,s.key,s,new Dn(this._snapshot.mutatedKeys.has(s.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new k(S.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=(function(i,o){if(i._snapshot.oldDocs.isEmpty()){let l=0;return i._snapshot.docChanges.map((h=>{const f=new Fn(i._firestore,i._userDataWriter,h.doc.key,h.doc,new Dn(i._snapshot.mutatedKeys.has(h.doc.key),i._snapshot.fromCache),i.query.converter);return h.doc,{type:"added",doc:f,oldIndex:-1,newIndex:l++}}))}{let l=i._snapshot.oldDocs;return i._snapshot.docChanges.filter((h=>o||h.type!==3)).map((h=>{const f=new Fn(i._firestore,i._userDataWriter,h.doc.key,h.doc,new Dn(i._snapshot.mutatedKeys.has(h.doc.key),i._snapshot.fromCache),i.query.converter);let d=-1,T=-1;return h.type!==0&&(d=l.indexOf(h.doc.key),l=l.delete(h.doc.key)),h.type!==1&&(l=l.add(h.doc),T=l.indexOf(h.doc.key)),{type:ad(h.type),doc:f,oldIndex:d,newIndex:T}}))}})(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new k(S.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=Ye._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=is.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const e=[],s=[],i=[];return this.docs.forEach((o=>{o._document!==null&&(e.push(o._document),s.push(this._userDataWriter.convertObjectMap(o._document.data.value.mapValue.fields,"previous")),i.push(o.ref.path))})),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function ad(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return B(61501,{type:n})}}Ye._jsonSchemaVersion="firestore/querySnapshot/1.0",Ye._jsonSchema={type:nt("string",Ye._jsonSchemaVersion),bundleSource:nt("string","QuerySnapshot"),bundleName:nt("string"),bundle:nt("string")};function Za(n,t){const e=Vu(n.firestore,Ga),s=Kf(n),i=od(n.converter,t);return ld(e,[ed(td(n.firestore),"addDoc",s._key,i,n.converter!==null,{}).toMutation(s._key,Ot.exists(!1))]).then((()=>s))}function ld(n,t){return(function(s,i){const o=new ie;return s.asyncQueue.enqueueAndForget((()=>N(null,null,function*(){return Lf(yield zf(s),i,o)}))),o.promise})(Qf(n),t)}function tl(){return new Ps("serverTimestamp")}(function(t,e=!0){(function(i){Re=i})(cu),Un(new jn("firestore",((s,{instanceIdentifier:i,options:o})=>{const l=s.getProvider("app").getImmediate(),h=new Ga(new wu(s.getProvider("auth-internal")),new bu(l,s.getProvider("app-check-internal")),(function(d,T){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new k(S.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new qn(d.options.projectId,T)})(l,i),l);return o=kt({useFetchStreams:e},o),h._setSettings(o),h}),"PUBLIC").setMultipleInstances(!0)),We(Qi,Xi,t),We(Qi,Xi,"esm2020")})();function cd(n){return N(this,null,function*(){try{const t=yield Za(qa(Lo,"albums"),{owner_id:n.owner_id||null,title:n.title,description:n.description||null,cover_photo:n.cover_photo||null,total_photos:n.total_photos||0,created_at:tl()});return kt({id:t.id},n)}catch(t){return console.error("createAlbumRecord error:",t),{id:`album_demo_${Date.now()}`}}})}function ud(n){return N(this,null,function*(){try{return{id:(yield Za(qa(Lo,"photos"),{album_id:n.album_id||null,owner_id:n.owner_id||null,storage_path:n.storage_path||null,public_url:n.public_url||null,caption:n.caption||null,created_at:tl()})).id,public_url:n.public_url}}catch(t){return console.error("createPhotoRecord error:",t),{id:`photo_demo_${Date.now()}`,public_url:n.public_url}}})}function Rd({category:n,onNavigate:t}){const[e,s]=It.useState(null),[i,o]=It.useState(null),[l,h]=It.useState(""),[f,d]=It.useState(!1),[T,A]=It.useState([]),x=Li.getAlbumsByMatch("").filter(D=>D.title.toLowerCase().includes(l.toLowerCase())||D.description.toLowerCase().includes(l.toLowerCase())),O=()=>{switch(n){case"sports":return"⚽";case"events":return"🎵";case"parties":return"🎉";case"gaming":return"🎮"}},L=()=>{switch(n){case"sports":return"from-emerald-500 to-cyan-500";case"events":return"from-purple-500 to-pink-500";case"parties":return"from-pink-500 to-red-500";case"gaming":return"from-indigo-500 to-purple-500"}},M=()=>n.charAt(0).toUpperCase()+n.slice(1);return I.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-slate-50 to-slate-100",children:[I.jsx("div",{className:"sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-slate-200",children:I.jsxs("div",{className:"max-w-6xl mx-auto px-4 py-4",children:[I.jsxs("div",{className:"flex items-center gap-4 mb-4",children:[I.jsx("button",{onClick:()=>{t({sports:"dashboard",events:"events-dashboard",parties:"party-dashboard",gaming:"gaming-hub"}[n])},className:"p-2 hover:bg-slate-100 rounded-lg transition-colors",children:I.jsx(Di,{className:"w-6 h-6 text-slate-700"})}),I.jsxs("div",{children:[I.jsxs("div",{className:"flex items-center gap-2",children:[I.jsx("span",{className:"text-3xl",children:O()}),I.jsx("h1",{className:"text-2xl font-bold text-slate-900",children:"Photo Albums"})]}),I.jsxs("p",{className:"text-sm text-slate-600",children:["Organize and share your ",M()," memories"]})]})]}),I.jsxs("div",{className:"flex gap-2 flex-wrap",children:[I.jsxs("div",{className:"flex-1 min-w-[200px] relative",children:[I.jsx(Ul,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"}),I.jsx(ki,{placeholder:"Search albums...",value:l,onChange:D=>h(D.target.value),className:"pl-10"})]}),I.jsxs(Ht,{onClick:()=>d(!f),className:`gap-2 ${f?"bg-red-500 hover:bg-red-600":"bg-slate-800 hover:bg-slate-700"} text-white`,children:[f?I.jsx(ql,{className:"w-4 h-4"}):I.jsx(xr,{className:"w-4 h-4"}),f?"Cancel":"New Album"]})]})]})}),I.jsx("div",{className:"max-w-6xl mx-auto px-4 py-8",children:e?I.jsxs("div",{children:[I.jsxs("button",{onClick:()=>s(null),className:"mb-6 flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors",children:[I.jsx(Di,{className:"w-5 h-5"}),"Back to Albums"]}),I.jsxs("div",{className:"bg-white rounded-2xl shadow-lg overflow-hidden mb-6",children:[I.jsx("div",{className:`h-40 bg-gradient-to-r ${L()} flex items-center justify-center`,children:I.jsx("span",{className:"text-8xl",children:e.coverPhoto})}),I.jsxs("div",{className:"p-6",children:[I.jsx("h2",{className:"text-3xl font-bold text-slate-900 mb-2",children:e.title}),I.jsx("p",{className:"text-slate-600 mb-4",children:e.description}),I.jsxs("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-4",children:[I.jsxs("div",{className:"text-center",children:[I.jsx("p",{className:"text-3xl font-bold text-slate-900",children:e.totalPhotos}),I.jsx("p",{className:"text-sm text-slate-600",children:"Photos"})]}),I.jsxs("div",{className:"text-center",children:[I.jsx("p",{className:"text-3xl font-bold text-slate-900",children:e.views}),I.jsx("p",{className:"text-sm text-slate-600",children:"Views"})]}),I.jsxs("div",{className:"text-center",children:[I.jsx("p",{className:"text-3xl font-bold text-slate-900",children:"↑"}),I.jsx("p",{className:"text-sm text-slate-600",children:"Upload More"})]}),I.jsxs("div",{className:"text-center",children:[I.jsx("p",{className:"text-3xl font-bold text-slate-900",children:"⚙️"}),I.jsx("p",{className:"text-sm text-slate-600",children:"Settings"})]})]})]})]}),I.jsxs("div",{children:[I.jsx("h3",{className:"text-xl font-bold text-slate-900 mb-4",children:"Photos in Album"}),e.photos.length===0?I.jsxs("div",{className:"text-center py-12 bg-white rounded-2xl border-2 border-dashed border-slate-300",children:[I.jsx(xr,{className:"w-12 h-12 text-slate-300 mx-auto mb-3"}),I.jsx("p",{className:"text-slate-600",children:"No photos yet"}),I.jsx("p",{className:"text-sm text-slate-500",children:"Upload your first photo to this album"})]}):I.jsx("div",{className:"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",children:e.photos.map((D,U)=>{const K=typeof D.url=="string"&&(D.url.startsWith("http")||D.url.startsWith("data:")||D.url.startsWith("blob:"));return I.jsxs(Ge.div,{whileHover:{scale:1.05},onClick:()=>o(D),className:"aspect-square rounded-xl overflow-hidden cursor-pointer relative group bg-slate-100",children:[K?I.jsx("div",{className:"w-full h-full bg-slate-800 flex items-center justify-center",children:I.jsx("img",{src:D.url,alt:D.caption||`photo-${U}`,className:"w-full h-full object-cover"})}):I.jsx("div",{className:"w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-slate-200 to-slate-300",children:D.url}),I.jsxs("div",{className:"absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100",children:[I.jsx("button",{className:"p-2 bg-white rounded-lg hover:bg-slate-100",children:I.jsx(Oi,{className:"w-5 h-5 text-red-500"})}),I.jsx("button",{className:"p-2 bg-white rounded-lg hover:bg-slate-100",children:I.jsx(Mi,{className:"w-5 h-5 text-blue-500"})})]}),I.jsxs("div",{className:"absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-semibold text-slate-900",children:[D.likes," likes"]})]},U)})})]})]}):f?I.jsxs(Ge.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:"bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto",children:[I.jsx("h2",{className:"text-2xl font-bold text-slate-900 mb-6",children:"Create New Album"}),I.jsxs("div",{className:"space-y-4 mb-6",children:[I.jsxs("div",{children:[I.jsx("label",{className:"block text-sm font-medium text-slate-700 mb-2",children:"Album Title"}),I.jsx(ki,{placeholder:"e.g., Championship Victory Photos"})]}),I.jsxs("div",{children:[I.jsx("label",{className:"block text-sm font-medium text-slate-700 mb-2",children:"Description"}),I.jsx("textarea",{placeholder:"Describe the event or memory...",className:"w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 min-h-[100px]"})]}),I.jsxs("div",{children:[I.jsx("label",{className:"block text-sm font-medium text-slate-700 mb-2",children:"Upload Photos"}),I.jsx(Kl,{onUploaded:D=>A(U=>[...U,D])}),T.length>0&&I.jsx("div",{className:"mt-4 grid grid-cols-3 gap-2",children:T.map((D,U)=>I.jsx("div",{className:"rounded-lg overflow-hidden border bg-slate-800",children:I.jsx("img",{src:D,alt:`uploaded-${U}`,className:"w-full h-24 object-cover"})},U))})]}),I.jsxs("div",{children:[I.jsx("label",{className:"block text-sm font-medium text-slate-700 mb-2",children:"Match/Event"}),I.jsxs("select",{className:"w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400",children:[I.jsx("option",{children:"Select a match or event..."}),I.jsx("option",{children:"Football Championship - Jan 10"}),I.jsx("option",{children:"Gaming Tournament - Jan 12"}),I.jsx("option",{children:"Badminton Match - Jan 15"})]})]})]}),I.jsxs("div",{className:"flex gap-3",children:[I.jsx(Ht,{onClick:()=>N(null,null,function*(){var K,lt;const D=((K=document.querySelector("input[placeholder]"))==null?void 0:K.value)||"New Album",U=((lt=document.querySelector("textarea"))==null?void 0:lt.value)||"";if(Bl)try{const rt=yield cd({owner_id:null,title:D,description:U,cover_photo:T[0]||null,total_photos:T.length});for(const tt of T)yield ud({album_id:rt.id,owner_id:null,public_url:tt,caption:""});Pr.success("Album created and persisted to Supabase! 🎉")}catch(rt){console.error("DB persist error",rt),Pr.error("Album created locally, but failed to persist to DB.")}else{const rt=T.map((tt,y)=>({matchId:"",userId:"user_demo",url:tt,caption:"",uploadedAt:new Date().toISOString(),likes:0,comments:[],tags:[]}));Li.createAlbum({matchId:"",title:D,description:U,photos:rt,createdAt:new Date().toISOString(),coverPhoto:rt.length>0?"📸":"🖼️",totalPhotos:rt.length,views:0}),Pr.success("Album created locally (demo mode) 🎉")}d(!1),A([])}),className:"flex-1 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white",children:"Create Album"}),I.jsx(Ht,{onClick:()=>d(!1),className:"flex-1 bg-slate-100 hover:bg-slate-200 text-slate-900",children:"Cancel"})]})]}):I.jsx("div",{children:x.length===0?I.jsxs("div",{className:"text-center py-12",children:[I.jsx(xr,{className:"w-16 h-16 text-slate-300 mx-auto mb-4"}),I.jsx("p",{className:"text-slate-600 text-lg",children:"No albums yet"}),I.jsx("p",{className:"text-slate-500 text-sm mb-6",children:"Create your first album to organize photos from your events"}),I.jsxs(Ht,{onClick:()=>d(!0),className:"bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white gap-2",children:[I.jsx(Gl,{className:"w-4 h-4"}),"Create First Album"]})]}):I.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:x.map((D,U)=>I.jsxs(Ge.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:U*.1},onClick:()=>s(D),className:"bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer group",children:[I.jsxs("div",{className:`h-40 bg-gradient-to-r ${L()} flex items-center justify-center relative overflow-hidden`,children:[I.jsx("span",{className:"text-6xl group-hover:scale-110 transition-transform",children:D.coverPhoto}),I.jsx("div",{className:"absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center",children:I.jsx(Hl,{className:"w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-all"})})]}),I.jsxs("div",{className:"p-4",children:[I.jsx("h3",{className:"font-bold text-slate-900 line-clamp-2 mb-2",children:D.title}),I.jsx("p",{className:"text-sm text-slate-600 line-clamp-2 mb-4",children:D.description}),I.jsxs("div",{className:"grid grid-cols-2 gap-2 mb-4 text-xs",children:[I.jsxs("div",{className:"bg-slate-50 rounded p-2 text-center",children:[I.jsx("p",{className:"font-bold text-slate-900",children:D.totalPhotos}),I.jsx("p",{className:"text-slate-600",children:"Photos"})]}),I.jsxs("div",{className:"bg-slate-50 rounded p-2 text-center",children:[I.jsx("p",{className:"font-bold text-slate-900",children:D.views}),I.jsx("p",{className:"text-slate-600",children:"Views"})]})]}),I.jsx(Ht,{className:"w-full bg-slate-100 hover:bg-slate-200 text-slate-900 group-hover:bg-slate-800 group-hover:text-white transition-colors",children:"View Album"})]})]},D.id))})})}),I.jsx(Wl,{children:i&&I.jsx(Ge.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:()=>o(null),className:"fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50",children:I.jsxs(Ge.div,{initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.95},onClick:D=>D.stopPropagation(),className:"bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto",children:[I.jsx("div",{className:"w-full h-80 flex items-center justify-center bg-slate-100",children:typeof i.url=="string"&&(i.url.startsWith("http")||i.url.startsWith("data:")||i.url.startsWith("blob:"))?I.jsx("img",{src:i.url,alt:i.caption||"photo",className:"w-full h-full object-contain"}):I.jsx("div",{className:"text-9xl",children:i.url})}),I.jsxs("div",{className:"p-6 space-y-4",children:[I.jsxs("div",{children:[I.jsx("h3",{className:"text-2xl font-bold text-slate-900 mb-2",children:i.caption}),I.jsx("p",{className:"text-sm text-slate-600",children:i.uploadedAt})]}),i.tags.length>0&&I.jsx("div",{className:"flex flex-wrap gap-2",children:i.tags.map((D,U)=>I.jsxs($l,{className:"bg-slate-100 text-slate-700",children:["#",D]},U))}),I.jsxs("div",{className:"grid grid-cols-3 gap-3 pt-4 border-t border-slate-200",children:[I.jsxs(Ht,{className:"flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600",children:[I.jsx(Oi,{className:"w-4 h-4"}),i.likes]}),I.jsxs(Ht,{className:"flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600",children:[I.jsx(Mi,{className:"w-4 h-4"}),i.comments.length]}),I.jsxs(Ht,{className:"flex items-center justify-center gap-2 bg-green-50 hover:bg-green-100 text-green-600",children:[I.jsx(zl,{className:"w-4 h-4"}),"Share"]})]}),i.comments.length>0&&I.jsxs("div",{className:"pt-4 border-t border-slate-200",children:[I.jsx("h4",{className:"font-semibold text-slate-900 mb-3",children:"Comments"}),I.jsx("div",{className:"space-y-3",children:i.comments.map((D,U)=>I.jsxs("div",{className:"bg-slate-50 rounded-lg p-3",children:[I.jsx("p",{className:"font-semibold text-slate-900 text-sm",children:D.userName}),I.jsx("p",{className:"text-slate-700 text-sm",children:D.text}),I.jsx("p",{className:"text-xs text-slate-500 mt-1",children:D.timestamp})]},U))})]})]})]})})})]})}export{Rd as PhotoAlbum};
