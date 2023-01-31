import{m as ee,u as g,p as me,a as b,q as pe,s as C,v as D,r as G,x as he,y as h,z as ye,A as Re,B as W,C as Z,D as H,E as xe}from"./index-1d2aef31.js";function We(e){return e!==""?typeof e=="string"?new Date(e).toLocaleString("sk-SK"):e.toLocaleString("sk-SK"):""}function Ze(e,r){return e.findIndex(t=>parseInt(String(t.id))===parseInt(String(r)))}function He(e,r){return e.findIndex(t=>parseInt(String(t.id))===parseInt(String(r)))}function Ke(e,r){return e.findIndex(t=>parseInt(String(t.id))===parseInt(String(r)))}function Ue(){return ee((e,r)=>({get:()=>(e(),JSON.parse(localStorage.getItem("boards")??"[]")),set:t=>{localStorage.setItem("boards",JSON.stringify(t)),r()}}))}function Qe(e){return ee((r,t)=>({get:()=>(r(),JSON.parse(localStorage.getItem(`${e}lists`)??"[]")),set:n=>{localStorage.setItem(`${e}lists`,JSON.stringify(n)),t()}}))}function _(e){return typeof e=="function"}function q(e){return e!==null&&typeof e=="object"&&!Array.isArray(e)}function A(e){return _(e.$validator)?Object.assign({},e):{$validator:e}}function te(e){return typeof e=="object"?e.$valid:e}function re(e){return e.$validator||e}function be(e,r){if(!q(e))throw new Error(`[@vuelidate/validators]: First parameter to "withParams" should be an object, provided ${typeof e}`);if(!q(r)&&!_(r))throw new Error("[@vuelidate/validators]: Validator must be a function or object with $validator parameter");const t=A(r);return t.$params=Object.assign({},t.$params||{},e),t}function we(e,r){if(!_(e)&&typeof g(e)!="string")throw new Error(`[@vuelidate/validators]: First parameter to "withMessage" should be string or a function returning a string, provided ${typeof e}`);if(!q(r)&&!_(r))throw new Error("[@vuelidate/validators]: Validator must be a function or object with $validator parameter");const t=A(r);return t.$message=e,t}function Oe(e){let r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];const t=A(e);return Object.assign({},t,{$async:!0,$watchTargets:r})}function je(e){return{$validator(r){for(var t=arguments.length,n=new Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];return g(r).reduce((o,m,l)=>{const f=Object.entries(m).reduce((u,d)=>{let[$,p]=d;const v=e[$]||{},s=Object.entries(v).reduce((i,c)=>{let[y,w]=c;const E=re(w).call(this,p,m,l,...n),x=te(E);if(i.$data[y]=E,i.$data.$invalid=!x||!!i.$data.$invalid,i.$data.$error=i.$data.$invalid,!x){let S=w.$message||"";const V=w.$params||{};typeof S=="function"&&(S=S({$pending:!1,$invalid:!x,$params:V,$model:p,$response:E})),i.$errors.push({$property:$,$message:S,$params:V,$response:E,$model:p,$pending:!1,$validator:y})}return{$valid:i.$valid&&x,$data:i.$data,$errors:i.$errors}},{$valid:!0,$data:{},$errors:[]});return u.$data[$]=s.$data,u.$errors[$]=s.$errors,{$valid:u.$valid&&s.$valid,$data:u.$data,$errors:u.$errors}},{$valid:!0,$data:{},$errors:{}});return{$valid:o.$valid&&f.$valid,$data:o.$data.concat(f.$data),$errors:o.$errors.concat(f.$errors)}},{$valid:!0,$data:[],$errors:[]})},$message:r=>{let{$response:t}=r;return t?t.$errors.map(n=>Object.values(n).map(a=>a.map(o=>o.$message)).reduce((a,o)=>a.concat(o),[])):[]}}}const J=e=>{if(e=g(e),Array.isArray(e))return!!e.length;if(e==null)return!1;if(e===!1)return!0;if(e instanceof Date)return!isNaN(e.getTime());if(typeof e=="object"){for(let r in e)return!0;return!1}return!!String(e).length},Ee=e=>(e=g(e),Array.isArray(e)?e.length:typeof e=="object"?Object.keys(e).length:String(e).length);function j(){for(var e=arguments.length,r=new Array(e),t=0;t<e;t++)r[t]=arguments[t];return n=>(n=g(n),!J(n)||r.every(a=>a.test(n)))}var Xe=Object.freeze({__proto__:null,withParams:be,withMessage:we,withAsync:Oe,forEach:je,req:J,len:Ee,regex:j,unwrap:g,unwrapNormalizedValidator:re,unwrapValidatorResponse:te,normalizeValidatorObject:A});j(/^[a-zA-Z]*$/);j(/^[a-zA-Z0-9]*$/);j(/^\d*(\.\d+)?$/);const Se=/^(?:[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;j(Se);function Ie(e){return typeof e=="string"&&(e=e.trim()),J(e)}var Ye={$validator:Ie,$message:"Value is required",$params:{type:"required"}};const Ve=/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;j(Ve);j(/(^[0-9]*$)|(^-[0-9]+$)/);j(/^[-]?\d*(\.\d+)?$/);function K(e){let r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return Object.keys(e).reduce((t,n)=>(r.includes(n)||(t[n]=g(e[n])),t),{})}function z(e){return typeof e=="function"}function Ce(e){return ye(e)||Re(e)}function ne(e,r,t){let n=e;const a=r.split(".");for(let o=0;o<a.length;o++){if(!n[a[o]])return t;n=n[a[o]]}return n}function B(e,r,t){return h(()=>e.some(n=>ne(r,n,{[t]:!1})[t]))}function U(e,r,t){return h(()=>e.reduce((n,a)=>{const o=ne(r,a,{[t]:!1})[t]||[];return n.concat(o)},[]))}function ae(e,r,t,n){return e.call(n,g(r),g(t),n)}function se(e){return e.$valid!==void 0?!e.$valid:!e}function Pe(e,r,t,n,a,o,m){let{$lazy:l,$rewardEarly:f}=a,u=arguments.length>7&&arguments[7]!==void 0?arguments[7]:[],d=arguments.length>8?arguments[8]:void 0,$=arguments.length>9?arguments[9]:void 0,p=arguments.length>10?arguments[10]:void 0;const v=b(!!n.value),s=b(0);t.value=!1;const i=C([r,n].concat(u,p),()=>{if(l&&!n.value||f&&!$.value&&!t.value)return;let c;try{c=ae(e,r,d,m)}catch(y){c=Promise.reject(y)}s.value++,t.value=!!s.value,v.value=!1,Promise.resolve(c).then(y=>{s.value--,t.value=!!s.value,o.value=y,v.value=se(y)}).catch(y=>{s.value--,t.value=!!s.value,o.value=y,v.value=!0})},{immediate:!0,deep:typeof r=="object"});return{$invalid:v,$unwatch:i}}function _e(e,r,t,n,a,o,m,l){let{$lazy:f,$rewardEarly:u}=n;const d=()=>({}),$=h(()=>{if(f&&!t.value||u&&!l.value)return!1;let p=!0;try{const v=ae(e,r,m,o);a.value=v,p=se(v)}catch(v){a.value=v}return p});return{$unwatch:d,$invalid:$}}function ze(e,r,t,n,a,o,m,l,f,u,d){const $=b(!1),p=e.$params||{},v=b(null);let s,i;e.$async?{$invalid:s,$unwatch:i}=Pe(e.$validator,r,$,t,n,v,a,e.$watchTargets,f,u,d):{$invalid:s,$unwatch:i}=_e(e.$validator,r,t,n,v,a,f,u);const c=e.$message;return{$message:z(c)?h(()=>c(K({$pending:$,$invalid:s,$params:K(p),$model:r,$response:v,$validator:o,$propertyPath:l,$property:m}))):c||"",$params:p,$pending:$,$invalid:s,$response:v,$unwatch:i}}function Ae(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const r=g(e),t=Object.keys(r),n={},a={},o={};let m=null;return t.forEach(l=>{const f=r[l];switch(!0){case z(f.$validator):n[l]=f;break;case z(f):n[l]={$validator:f};break;case l==="$validationGroups":m=f;break;case l.startsWith("$"):o[l]=f;break;default:a[l]=f}}),{rules:n,nestedValidators:a,config:o,validationGroups:m}}function Le(){}const Ne="__root";function oe(e,r,t){if(t)return r?r(e()):e();try{var n=Promise.resolve(e());return r?n.then(r):n}catch(a){return Promise.reject(a)}}function Te(e,r){return oe(e,Le,r)}function Fe(e,r){var t=e();return t&&t.then?t.then(r):r(t)}function Be(e){return function(){for(var r=[],t=0;t<arguments.length;t++)r[t]=arguments[t];try{return Promise.resolve(e.apply(this,r))}catch(n){return Promise.reject(n)}}}function De(e,r,t,n,a,o,m,l,f){const u=Object.keys(e),d=n.get(a,e),$=b(!1),p=b(!1),v=b(0);if(d){if(!d.$partial)return d;d.$unwatch(),$.value=d.$dirty.value}const s={$dirty:$,$path:a,$touch:()=>{$.value||($.value=!0)},$reset:()=>{$.value&&($.value=!1)},$commit:()=>{}};return u.length?(u.forEach(i=>{s[i]=ze(e[i],r,s.$dirty,o,m,i,t,a,f,p,v)}),s.$externalResults=h(()=>l.value?[].concat(l.value).map((i,c)=>({$propertyPath:a,$property:t,$validator:"$externalResults",$uid:`${a}-externalResult-${c}`,$message:i,$params:{},$response:null,$pending:!1})):[]),s.$invalid=h(()=>{const i=u.some(c=>g(s[c].$invalid));return p.value=i,!!s.$externalResults.value.length||i}),s.$pending=h(()=>u.some(i=>g(s[i].$pending))),s.$error=h(()=>s.$dirty.value?s.$pending.value||s.$invalid.value:!1),s.$silentErrors=h(()=>u.filter(i=>g(s[i].$invalid)).map(i=>{const c=s[i];return G({$propertyPath:a,$property:t,$validator:i,$uid:`${a}-${i}`,$message:c.$message,$params:c.$params,$response:c.$response,$pending:c.$pending})}).concat(s.$externalResults.value)),s.$errors=h(()=>s.$dirty.value?s.$silentErrors.value:[]),s.$unwatch=()=>u.forEach(i=>{s[i].$unwatch()}),s.$commit=()=>{p.value=!0,v.value=Date.now()},n.set(a,e,s),s):(d&&n.set(a,e,s),s)}function qe(e,r,t,n,a,o,m){const l=Object.keys(e);return l.length?l.reduce((f,u)=>(f[u]=k({validations:e[u],state:r,key:u,parentKey:t,resultsCache:n,globalConfig:a,instance:o,externalResults:m}),f),{}):{}}function ke(e,r,t){const n=h(()=>[r,t].filter(s=>s).reduce((s,i)=>s.concat(Object.values(g(i))),[])),a=h({get(){return e.$dirty.value||(n.value.length?n.value.every(s=>s.$dirty):!1)},set(s){e.$dirty.value=s}}),o=h(()=>{const s=g(e.$silentErrors)||[],i=n.value.filter(c=>(g(c).$silentErrors||[]).length).reduce((c,y)=>c.concat(...y.$silentErrors),[]);return s.concat(i)}),m=h(()=>{const s=g(e.$errors)||[],i=n.value.filter(c=>(g(c).$errors||[]).length).reduce((c,y)=>c.concat(...y.$errors),[]);return s.concat(i)}),l=h(()=>n.value.some(s=>s.$invalid)||g(e.$invalid)||!1),f=h(()=>n.value.some(s=>g(s.$pending))||g(e.$pending)||!1),u=h(()=>n.value.some(s=>s.$dirty)||n.value.some(s=>s.$anyDirty)||a.value),d=h(()=>a.value?f.value||l.value:!1),$=()=>{e.$touch(),n.value.forEach(s=>{s.$touch()})},p=()=>{e.$commit(),n.value.forEach(s=>{s.$commit()})},v=()=>{e.$reset(),n.value.forEach(s=>{s.$reset()})};return n.value.length&&n.value.every(s=>s.$dirty)&&$(),{$dirty:a,$errors:m,$invalid:l,$anyDirty:u,$error:d,$pending:f,$touch:$,$reset:v,$silentErrors:o,$commit:p}}function k(e){const r=Be(function(){return F(),Fe(function(){if(c.$rewardEarly)return M(),Te(H)},function(){return oe(H,function(){return new Promise(R=>{if(!T.value)return R(!N.value);const I=C(T,()=>{R(!N.value),I()})})})})});let{validations:t,state:n,key:a,parentKey:o,childResults:m,resultsCache:l,globalConfig:f={},instance:u,externalResults:d}=e;const $=o?`${o}.${a}`:a,{rules:p,nestedValidators:v,config:s,validationGroups:i}=Ae(t),c=Object.assign({},f,s),y=a?h(()=>{const R=g(n);return R?g(R[a]):void 0}):n,w=Object.assign({},g(d)||{}),L=h(()=>{const R=g(d);return a?R?g(R[a]):void 0:R}),E=De(p,y,a,l,$,c,u,L,n),x=qe(v,y,$,l,c,u,L),S={};i&&Object.entries(i).forEach(R=>{let[I,O]=R;S[I]={$invalid:B(O,x,"$invalid"),$error:B(O,x,"$error"),$pending:B(O,x,"$pending"),$errors:U(O,x,"$errors"),$silentErrors:U(O,x,"$silentErrors")}});const{$dirty:V,$errors:ue,$invalid:N,$anyDirty:le,$error:ce,$pending:T,$touch:F,$reset:de,$silentErrors:$e,$commit:M}=ke(E,x,m),fe=a?h({get:()=>g(y),set:R=>{V.value=!0;const I=g(n),O=g(d);O&&(O[a]=w[a]),D(I[a])?I[a].value=R:I[a]=R}}):null;a&&c.$autoDirty&&C(y,()=>{V.value||F();const R=g(d);R&&(R[a]=w[a])},{flush:"sync"});function ge(R){return(m.value||{})[R]}function ve(){D(d)?d.value=w:Object.keys(w).length===0?Object.keys(d).forEach(R=>{delete d[R]}):Object.assign(d,w)}return G(Object.assign({},E,{$model:fe,$dirty:V,$error:ce,$errors:ue,$invalid:N,$anyDirty:le,$pending:T,$touch:F,$reset:de,$path:$||Ne,$silentErrors:$e,$validate:r,$commit:M},m&&{$getResultsForChild:ge,$clearExternalResults:ve,$validationGroups:S},x))}class Ge{constructor(){this.storage=new Map}set(r,t,n){this.storage.set(r,{rules:t,result:n})}checkRulesValidity(r,t,n){const a=Object.keys(n),o=Object.keys(t);return o.length!==a.length||!o.every(l=>a.includes(l))?!1:o.every(l=>t[l].$params?Object.keys(t[l].$params).every(f=>g(n[l].$params[f])===g(t[l].$params[f])):!0)}get(r,t){const n=this.storage.get(r);if(!n)return;const{rules:a,result:o}=n,m=this.checkRulesValidity(r,t,a),l=o.$unwatch?o.$unwatch:()=>({});return m?o:{$dirty:o.$dirty,$partial:!0,$unwatch:l}}}const P={COLLECT_ALL:!0,COLLECT_NONE:!1},Q=Symbol("vuelidate#injectChildResults"),X=Symbol("vuelidate#removeChildResults");function Je(e){let{$scope:r,instance:t}=e;const n={},a=b([]),o=h(()=>a.value.reduce((d,$)=>(d[$]=g(n[$]),d),{}));function m(d,$){let{$registerAs:p,$scope:v,$stopPropagation:s}=$;s||r===P.COLLECT_NONE||v===P.COLLECT_NONE||r!==P.COLLECT_ALL&&r!==v||(n[p]=d,a.value.push(p))}t.__vuelidateInjectInstances=[].concat(t.__vuelidateInjectInstances||[],m);function l(d){a.value=a.value.filter($=>$!==d),delete n[d]}t.__vuelidateRemoveInstances=[].concat(t.__vuelidateRemoveInstances||[],l);const f=W(Q,[]);Z(Q,t.__vuelidateInjectInstances);const u=W(X,[]);return Z(X,t.__vuelidateRemoveInstances),{childResults:o,sendValidationResultsToParent:f,removeValidationResultsFromParent:u}}function ie(e){return new Proxy(e,{get(r,t){return typeof r[t]=="object"?ie(r[t]):h(()=>r[t])}})}let Y=0;function et(e,r){var t;let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};arguments.length===1&&(n=e,e=void 0,r=void 0);let{$registerAs:a,$scope:o=P.COLLECT_ALL,$stopPropagation:m,$externalResults:l,currentVueInstance:f}=n;const u=f||((t=me())===null||t===void 0?void 0:t.proxy),d=u?u.$options:{};a||(Y+=1,a=`_vuelidate_${Y}`);const $=b({}),p=new Ge,{childResults:v,sendValidationResultsToParent:s,removeValidationResultsFromParent:i}=u?Je({$scope:o,instance:u}):{childResults:b({})};if(!e&&d.validations){const c=d.validations;r=b({}),pe(()=>{r.value=u,C(()=>z(c)?c.call(r.value,new ie(r.value)):c,y=>{$.value=k({validations:y,state:r,childResults:v,resultsCache:p,globalConfig:n,instance:u,externalResults:l||u.vuelidateExternalResults})},{immediate:!0})}),n=d.validationsConfig||n}else{const c=D(e)||Ce(e)?e:G(e||{});C(c,y=>{$.value=k({validations:y,state:r,childResults:v,resultsCache:p,globalConfig:n,instance:u??{},externalResults:l})},{immediate:!0})}return u&&(s.forEach(c=>c($,{$registerAs:a,$scope:o,$stopPropagation:m})),he(()=>i.forEach(c=>c(a)))),h(()=>Object.assign({},g($.value),v.value))}const tt=xe("boards",{state:()=>({}),getters:{},actions:{setBoards:e=>localStorage.setItem("boards",JSON.stringify(e)),setLists:(e,r)=>localStorage.setItem(`${e}lists`,JSON.stringify(r))}});export{tt as a,Ue as b,Xe as c,He as d,Ke as e,Ze as f,Qe as g,We as l,Ye as r,et as u};
