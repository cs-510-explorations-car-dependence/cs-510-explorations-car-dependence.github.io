(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{107:function(t,e,n){},115:function(t,e,n){},116:function(t,e,n){},118:function(t,e,n){},119:function(t,e,n){"use strict";n.r(e);var a=n(0),c=n.n(a),r=n(26),o=n.n(r),i=(n(107),n(19),n(10)),s=n(13),l=n(6),u=n(11),d=n(12),j=(n(25),n(66),n(1)),b=function(t){Object(u.a)(n,t);var e=Object(d.a)(n);function n(){return Object(i.a)(this,n),e.apply(this,arguments)}return Object(s.a)(n,[{key:"render",value:function(){var t=this;return Object(j.jsx)("nav",{children:Object(j.jsxs)("ul",{className:"navs",children:[Object(j.jsx)("li",{onClick:function(){return t.props.action(1)},children:"About ismyroadfresh"}),Object(j.jsx)("li",{onClick:function(){return t.props.action(55)},children:"Get Started"})]})})}}]),n}(c.a.Component),O=n.p+"static/media/ismyroadfresh.8dd7e4d0.png",f=function(t){Object(u.a)(n,t);var e=Object(d.a)(n);function n(){return Object(i.a)(this,n),e.apply(this,arguments)}return Object(s.a)(n,[{key:"render",value:function(){var t=this;return Object(j.jsxs)("div",{className:"title",children:[Object(j.jsx)("img",{className:"logo",src:O,alt:"ismyroadfreshlogo"}),Object(j.jsx)("div",{children:Object(j.jsx)("button",{className:"btn btn-success",onClick:function(){return t.props.action(55)},children:"Let's roll"})})]})}}]),n}(a.Component),h=n(3),p=n(2),m=n(4),x=n(120),v=n(125),g=(n(109),["children"]);function C(t){var e=t.children,n=Object(m.a)(t,g);return Object(j.jsxs)(x.a,Object(p.a)(Object(p.a)({preferCanvas:!0},n),{},{children:[e,Object(j.jsx)(v.a,{url:"https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png",attribution:'&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>Contributors"'})]}))}var F=c.a.memo(C),y=n(5);var S=function(t){var e=Object(a.useState)(t.getBounds()),n=Object(h.a)(e,2),c=n[0],r=n[1],o=Object(a.useCallback)((function(){var e=t.getCenter();if(e.lng>=-180&&e.lng<=180)r(t.getBounds());else{var n=(e.lng%360+540)%360-180,a=new y.LatLng(e.lat,n);t.setView(a,void 0,{animate:!1})}}),[t]);return Object(a.useEffect)((function(){return t.on("moveend",o),t.on("zoomend",o),function(){t.off("moveend",o),t.off("zoomend",o)}}),[t,o]),c},k=n(29),N=n(124),w=n(121),B=n(122);var z=function(t){var e=t.apiStateData,n=t.visDataField,a=t.determineSegmentColor;return console.log("drawing polylines",n),Object(j.jsx)(j.Fragment,{children:e.map((function(t,c){return t.segments.map((function(r,o){return Object(j.jsx)(w.a,{positions:r.shape,color:a(r[n]),children:Object(j.jsxs)(B.a,{children:[Object(j.jsx)("h3",{className:"road-name",children:t.road}),Object.keys(r).map((function(t,e){return"shape"===t?null:Object(j.jsxs)("div",{children:[Object(j.jsxs)("h4",{className:"field-name",children:[t," (g / mi)"]}),r[t]]},e)}))]})},n+"__"+(c*e.length+o))})).flat()}))})};n(123),n(28);var P={method:"GET",mode:"cors",headers:{Accept:"application/json"}};function M(t){var e=t.url,n=t.dataField,a=t.dataBBox,c=(t.zoom,t.valueToColorFn),r="".concat(e,"/api/v1/bbox?ul=").concat(a.getNorth(),",").concat(a.getWest(),"&br=").concat(a.getSouth(),",").concat(a.getEast()),o=Object(k.c)(r,P);return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(k.a,{state:o,children:Object(j.jsx)(N.a,{bounds:a,fillColor:"grey",fillOpacity:.5})}),Object(j.jsx)(k.b,{state:o,children:"Error Message"}),o.isFulfilled&&o.data&&Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(z,{apiStateData:o.data,visDataField:n,determineSegmentColor:c}),!1]})]})}var E=function(t,e){return t.dataBBox.equals(e.dataBBox)&&t.dataField===e.dataField},T=c.a.memo(M,E);var D,L,V=function(t){var e=Object(a.useState)(t.getZoom()),n=Object(h.a)(e,2),c=n[0],r=n[1],o=Object(a.useCallback)((function(){r(t.getZoom())}),[t]);return Object(a.useEffect)((function(){return t.on("zoom",o),function(){t.off("zoom",o)}}),[t,o]),c},A=n(8);!function(t){t.CO="CO",t.CO2="CO2",t.NOx="NOx",t.PM2P5="PM2.5"}(L||(L={}));var I=(D={},Object(A.a)(D,L.CO,[0,811]),Object(A.a)(D,L.CO2,[0,8e4]),Object(A.a)(D,L.NOx,[0,37.5]),Object(A.a)(D,L.PM2P5,[0,1.38]),D);n(115);var Z=function(t){var e=t.value,n=t.setValue,a=t.allValues;return Object(j.jsx)("div",{className:"field-control-menu",children:Object(j.jsx)("ul",{className:"field-control-list",children:a.map((function(t,a){var c="field-control-button "+(t===e?"field-control-button-selected":"");return Object(j.jsx)("li",{className:"field-control-list-member",children:Object(j.jsx)("button",{className:c,onClick:function(){return n(t)},children:t})},a)}))})})};n(116);var _=function(t){for(var e=t.min,n=t.max,a=t.steps,c=t.valueToColorFn,r=(n-e)/a,o=[],i=0;i<=a;++i){var s=r*i;o.push(c(s))}var l=100/(a+1);return Object(j.jsx)("div",{className:"legend-bg",children:o.map((function(t,e){return Object(j.jsx)("div",{style:{position:"absolute",left:"".concat(l*e,"%"),width:"".concat(l,"%"),background:t,top:0,bottom:"50%"},children:Object(j.jsx)("div",{style:{position:"absolute",top:"100%",left:"5px",right:"5px",textAlign:"center",background:"white",color:"black",fontSize:"12px"},children:(n=r*e,0===n?"0":n<1?n.toFixed(2):n<100?n.toFixed(1):n<1e3?n.toFixed(0):n<1e6?Math.floor(n/1e3)+"k":void 0)})},e);var n}))})},G=n(68);n(118);var J=function(t){var e=t.msg;return Object(j.jsx)("div",{className:"warning-toast ",children:e})};function W(t){var e=t.url,n=t.mapState,c=S(n),r=V(n),o=function(){var t=Object(a.useState)(L.CO2),e=Object(h.a)(t,2);return{currentField:e[0],setField:e[1],fields:[L.CO2,L.CO,L.NOx,L.PM2P5]}}(),i=o.currentField,s=o.setField,l=o.fields,u=Object(a.useState)([c]),d=Object(h.a)(u,2),b=d[0],O=d[1],f=Object(h.a)(I[i],2),p=f[0],m=f[1];Object(a.useEffect)((function(){r<13||O((function(t){return[c]}))}),[c,r]);var x=function(t){return function(t,e,n){var a=(t-e)/(n-e);return Object(G.a)(a)}(t,p,m)};return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)("div",{style:{position:"absolute",width:"500px",left:"60px",top:"10px"},children:Object(j.jsx)(Z,{value:i,setValue:s,allValues:l})}),Object(j.jsx)("div",{style:{position:"absolute",width:"408px",left:"60px",top:"40px",zIndex:1e3,height:"34px"},children:Object(j.jsx)(_,{min:p,max:m,steps:10,valueToColorFn:x})}),r<13&&Object(j.jsx)(J,{msg:"Warning: Zoomed out too far to load new data."}),b.map((function(t,n){return t?Object(j.jsx)(T,{url:e,zoom:r,dataBBox:t,dataField:i,valueToColorFn:x},n):null}))]})}var q=c.a.memo(W),H={width:"100vw",height:"calc(100vh - 70px)"},K=[45.5051,-122.675];var Q=function(){var t=Object(a.useState)(null),e=Object(h.a)(t,2),n=e[0],c=e[1];return Object(j.jsx)(F,{style:H,center:K,zoom:13,whenCreated:c,children:n&&Object(j.jsx)(q,{mapState:n,url:"https://car-dependence-backend.herokuapp.com"})})},R=function(t){Object(u.a)(n,t);var e=Object(d.a)(n);function n(t){var a;return Object(i.a)(this,n),(a=e.call(this,t)).state={intro:!0,about:!1,map:!1},a.handler=a.handler.bind(Object(l.a)(a)),a}return Object(s.a)(n,[{key:"handler",value:function(t){1===t?this.setState({intro:!0,about:!1,map:!1}):2===t?this.setState({intro:!1,about:!0,map:!1}):this.setState({intro:!1,about:!1,map:!0})}},{key:"render",value:function(){return Object(j.jsxs)("div",{children:[Object(j.jsx)(b,{action:this.handler}),!0===this.state.intro&&Object(j.jsx)(f,{action:this.handler}),!0===this.state.map&&Object(j.jsx)(Q,{})]})}}]),n}(a.Component);var U=function(){return Object(j.jsx)("div",{className:"App",children:Object(j.jsx)(R,{})})},X=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,126)).then((function(e){var n=e.getCLS,a=e.getFID,c=e.getFCP,r=e.getLCP,o=e.getTTFB;n(t),a(t),c(t),r(t),o(t)}))};o.a.render(Object(j.jsx)(c.a.StrictMode,{children:Object(j.jsx)(U,{})}),document.getElementById("root")),X()},19:function(t,e,n){},25:function(t,e,n){}},[[119,1,2]]]);
//# sourceMappingURL=main.334c39a2.chunk.js.map