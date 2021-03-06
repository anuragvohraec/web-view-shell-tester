import{_Σ as o}from"./lit-html.js";
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{et:t}=o,i=o=>null===o||"object"!=typeof o&&"function"!=typeof o,n={HTML:1,SVG:2},v=(o,t)=>{var i,n;return void 0===t?void 0!==(null===(i=o)||void 0===i?void 0:i._$litType$):(null===(n=o)||void 0===n?void 0:n._$litType$)===t},l=o=>{var t;return void 0!==(null===(t=o)||void 0===t?void 0:t._$litDirective$)},r=o=>{var t;return null===(t=o)||void 0===t?void 0:t._$litDirective$},d=o=>void 0===o.strings,e=()=>document.createComment(""),u=(o,i,n)=>{var v;const l=o.A.parentNode,r=void 0===i?o.B:i.A;if(void 0===n){const i=l.insertBefore(e(),r),v=l.insertBefore(e(),r);n=new t(i,v,o,o.options)}else{const t=n.B.nextSibling,i=n.M!==o;if(i&&(null===(v=n.Q)||void 0===v||v.call(n,o),n.M=o),t!==r||i){let o=n.A;for(;o!==t;){const t=o.nextSibling;l.insertBefore(o,r),o=t}}}return n},c=(o,t,i=o)=>(o.I(t,i),o),s={},f=(o,t=s)=>o.H=t,a=o=>o.H,m=o=>{var t;null===(t=o.P)||void 0===t||t.call(o,!1,!0);let i=o.A;const n=o.B.nextSibling;for(;i!==n;){const o=i.nextSibling;i.remove(),i=o}},p=o=>{o.R()};export{n as TemplateResultType,p as clearPart,a as getCommittedValue,r as getDirectiveClass,u as insertPart,l as isDirectiveResult,i as isPrimitive,d as isSingleExpression,v as isTemplateResult,m as removePart,c as setChildPartValue,f as setCommittedValue};

