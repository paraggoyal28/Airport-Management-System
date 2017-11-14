define(["lodash","coreUtils"],function(n,t){return function(n){function t(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return n[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var e={};return t.m=n,t.c=e,t.i=function(n){return n},t.d=function(n,e,r){t.o(n,e)||Object.defineProperty(n,e,{configurable:!1,enumerable:!0,get:r})},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},t.p="",t(t.s=31)}({0:function(t,e){t.exports=n},1:function(n,t,e){"use strict";function r(n){return U.get(n,["conversionData","desktopOnly"],!1)}function o(n){return"text"===U.get(n,["conversionData","category"])}function i(n){return"graphic"===U.get(n,["conversionData","category"])||c(n)}function u(n){return n&&"wysiwyg.viewer.components.Group"===n.componentType}function a(n){return"columns"===U.get(n,["conversionData","category"])}function c(n){return"photo"===U.get(n,["conversionData","category"])}function s(n){return"masterPage"===U.get(n,"id")}function f(n){var t=function(n){return U.get(n.conversionData,"isScreenWidth",!1)||U.get(n.conversionData,"stretchHorizontally",!1)||U.some(n.components,t)};return T(n)||t(n)}function l(n){return U.get(n.conversionData,"isScreenWidth",!1)||U.some(n.components,l)}function m(n,t,e){void 0===t&&(t=0),void 0===e&&(e=0),U.forEach(n,function(n){n.layout.x+=t,n.layout.y+=e})}function p(n,t,e){v(n,[t],e),m([t],-n.layout.x,-n.layout.y)}function v(n,t,e){var r=S(n);t.length&&r&&(e=void 0!==e?e:r.length,r.splice.apply(r,[e,0].concat(t)))}function g(n,t){var e=S(n);U.remove(e,function(n){return U.includes(t,n)})}function y(n,t){if(u(n)){var e=U.findIndex(t.components,{id:n.id});U.forEach(n.components.reverse(),function(r){v(t,[r],e),m([r],n.layout.x,n.layout.y)}),U.remove(t.components,n)}}function d(n,t){return U.some(S(n),function(n){return t(n)||n&&d(n,t)})}function E(n,t,e){if(!s(n)&&t&&(e||!U.isEmpty(t))){var r=U(t).reject(["conversionData.isInvisible",!0]).reduce(function(n,t){return U.max([n,t.layout.y+t.layout.height,0])},0);if(U.get(n,["conversionData","hasTightYMargin"])||U.get(n,["conversionData","hasTightBottomMargin"]))return r;return r+(f(n)?w.conversionConfig.SECTION_MOBILE_MARGIN_Y:w.conversionConfig.COMPONENT_MOBILE_MARGIN_Y+U.get(n.conversionData,"borderWidth",0))}}function h(n,t,e,r){void 0===r&&(r=0);var o=E(n,t,e);if(U.isNumber(o)){var i=U.get(n,["conversionData","minHeight"],r);n.layout.height=Math.max(i,o)}}function T(n){return C(n)||x(n)}function C(n){return"Page"===n.type}function _(n){return"Container"===n.type}function x(n){return U.has(n.conversionData,"siteSegmentRole")}function D(n){var t=H.objectUtils.cloneDeep(n),e=U.has(t,"components")?"components":"children";return U.set(t,e,n.mobileComponents||[])}function R(n,t){if(t.id===n)return t;var e=null;return U.find(S(t),function(t){return e=R(n,t)}),e}function I(n,t){if(n.length>t)return void(n.length=0);for(var e=function(n,t){return U.size(U.intersection(n,t))>0},r=n.length-1;r>=0;r--)!function(t){var r=U.findLastIndex(n,function(r,o){return o<t&&e(n[t],r)});-1!==r&&(n[r]=n[r].concat(U.difference(n[t],n[r])),n.splice(t,1))}(r)}function N(n,t){var e=S(n);return U.map(t,function(n){return U.find(e,{id:n})||null})}function O(n,t){var e=S(t);if(U.find(e,{id:n}))return t;var r=null;return U.find(e,function(t){return r=O(n,t)}),r}function P(n){if(n&&0!==n.length){var t=U.min(U.map(n,"layout.x")),e=U.min(U.map(n,"layout.y"));return{x:t,y:e,width:U.max(U.map(n,function(n){return n.layout.x+n.layout.width}))-t,height:U.max(U.map(n,function(n){return n.layout.y+n.layout.height}))-e,rotationInDegrees:0}}}function M(){return{x:w.conversionConfig.MOBILE_WIDTH-(w.conversionConfig.TINY_MENU_SIZE+w.conversionConfig.SITE_SEGMENT_PADDING_X),y:w.conversionConfig.SECTION_MOBILE_MARGIN_Y,rotationInDegrees:0}}function S(n){return n.components||n.children}function A(n,t){void 0===n&&(n=[]),void 0===t&&(t=[]);var e=function(n,t){return Math.min(n[1],t[1])-t[0]};return n[0]<=t[0]?e(n,t):e(t,n)}function G(n,t){var e=function(n){return[n.layout.y,n.layout.height+n.layout.y]};return A(e(n),e(t))}function L(n,t){if(l(n))return t.layout.width;if(l(t))return n.layout.width;var e=function(n){return[n.layout.x,n.layout.width+n.layout.x]};return A(e(n),e(t))}function B(n,t){return l(n)?n.layout.height>=t.layout.height||X(n)>X(t):!l(t)&&X(n)>X(t)}function V(n,t,e){var r=L(n,t),o=G(n,t);if(r<=0||o<=0)return!1;var i=r*o,u=Math.min(X(n),X(t));return i>0&&i/u>=e}function b(n){return!!_(n)&&("columns"===n.conversionData.category?1===U.size(n.components)&&U.isEmpty(n.components[0].components):U.isEmpty(n.components))}function F(n,t){return a(t)&&U.get(n,["conversionData","isInvisible"],!1)}function z(n,t,e){void 0===t&&(t=!1);for(var r=[[n]],o=0;o<r.length;o++){var i=r[o];U.forEach(i,function(n){var e=t?U.get(n,"mobileComponents"):S(n);U.isEmpty(e)||r.push(e)})}return U(r).flatten().remove(e).keyBy("id").value()}Object.defineProperty(t,"__esModule",{value:!0});var U=e(0),w=e(2),H=e(3),Y=function(n){return U.get(n,"componentType")===w.conversionConfig.VIRTUAL_GROUP_TYPES.MERGE};t.isMergeVirtualGroup=Y;var W=function(n){return U.get(n,"componentType")===w.conversionConfig.VIRTUAL_GROUP_TYPES.RESCALE};t.isRescaleVirtualGroup=W;var j=function(n){return W(n)||Y(n)};t.isVirtualGroup=j,t.isDesktopOnlyComponent=r,t.isTextComponent=o,t.isGraphicComponent=i,t.isGroupComponent=u,t.isColumnsContainerComponent=a,t.isImageComponent=c,t.isMasterPage=s,t.shouldStretchToScreenWidth=f,t.isScreenWidthComponent=l,t.translateComps=m,t.reparentComponent=p,t.addComponentsTo=v,t.removeChildrenFrom=g,t.removeGroup=y,t.containsComponent=d,t.getHeightAccordingToChildren=E,t.ensureContainerTightlyWrapsChildren=h,t.isSiteSegmentOrPage=T,t.isPageComponent=C,t.isContainerComponent=_,t.isSiteSegment=x,t.extractMobilePage=D,t.getComponentByIdFromStructure=R,t.unifyGroups=I,t.getComponentsByIds=N,t.getParent=O,t.getSnugLayout=P,t.getTinyMenuDefaultPosition=M,t.getChildren=S,t.getRangesOverlap=A,t.getYOverlap=G,t.getXOverlap=L;var X=function(n){return n.layout.width*n.layout.height};t.hasGreaterArea=B,t.haveSufficientOverlap=V,t.isEmptyContainer=b,t.shouldReparentCompToChildOfContainer=F,t.getAllCompsInStructure=z},2:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={MOBILE_WIDTH:320,MARGIN_BETWEEN_TEXT_AND_NON_TEXT:20,COMPONENT_MOBILE_MARGIN_X:10,COMPONENT_MOBILE_MARGIN_Y:10,SECTION_MOBILE_MARGIN_Y:20,SITE_SEGMENT_PADDING_X:20,TINY_MENU_SIZE:50,TEXT_MAX_LENGTH_FOR_RESCALING:25,MIN_WIDTH_FOR_ENLARGE:140,DEFAULT_TEXT_HEIGHT:10,VIRTUAL_GROUP_TYPES:{RESCALE:"RESCALE_VIRTUAL_GROUP",MERGE:"MERGE_VIRTUAL_GROUP"}};t.conversionConfig=r},3:function(n,e){n.exports=t},31:function(n,t,e){"use strict";function r(n,t){var e=o.createEventsQueue(n,t);return o.createFragments(e)}var o=e(6),i=e(1),u={translateComponents:i.translateComps,getSnugLayout:i.getSnugLayout,splitToFragments:r};n.exports=u},4:function(n,t,e){"use strict";function r(n,t,e,r){void 0===r&&(r=m);var o=f.get(n,["layout",e]),i=f.get(t,["layout",e]);return Math.abs(o-i)<=r*f.min([v(n,e),v(t,e)])}function o(n,t,e,r){void 0===r&&(r=m);var o=f.get(n,e),i=f.get(t,e);return Math.abs(o-i)<=r*f.min([o,i])}function i(n,t,e){return n===t||f.size(n)===f.size(t)&&!u(n,e)&&!u(t,e)&&f.every(n,function(n,i){var u=t[i];return n.componentType===u.componentType&&r(n,u,e)&&("text"===n.conversionData.category?o(n,u,["conversionData","averageNormalizedFontSize"]):o(n,u,["layout","height"])&&o(n,u,["layout","width"]))})}function u(n,t){var e=f.findIndex(n,function(e,r){if(0===r)return!1;var o=g(n[r-1],t),i=e.layout[t]-o;return i<0||i>f.min([v(n[r-1],t),v(e,t)])});return-1!==e&&e!==n.length-1}function a(n){var t=l.getChildren(n);return f.map(n.conversionData.componentsOrder,function(n){return f.find(t,{id:n})})}function c(n,t){var e=f.map(l.getChildren(n),"id");return f.sortBy(t,function(n){return e.indexOf(n.id)})}function s(n){var t=f.pick(n.conversionData.mobileHints,["recommendedWidth","recommendedHeight","recommendedScale","recommendedOrder"]);return!f.isEmpty(t)}Object.defineProperty(t,"__esModule",{value:!0});var f=e(0),l=e(1),m=.1,p=function(n){return 0===n?0:n/Math.abs(n)};t.getSign=p;var v=function(n,t){return"x"===t?n.layout.width:n.layout.height},g=function(n,t){return n.layout[t]+v(n,t)};t.getComponentEndCoordinate=g;var y=function(n,t){return p(n.layout.y-t.layout.y)};t.compareComponentsByY=y,t.areSimilarFragments=i,t.getOrderedComponents=a;var d=function(n){return l.isRescaleVirtualGroup(n)&&"reorder"!==n.conversionData.rescaleMethod||n.conversionData.structuralContainer};t.shouldUseNaturalOrder=d,t.sortComponentsByNaturalOrder=c,t.hasMobileHintsPresets=s},6:function(n,t,e){"use strict";function r(n,t){var e=x(t.y).partition({eventType:I.START_EVENT}).map(function(n){return x.map(n,"coordinate")}).value(),r=x.max(e[0]),o=x.min(e[1]);return x.findIndex(n,function(n){var t=n.comps[0];return 1===n.comps.length&&t.conversionData.keepIfVerticalDivider&&t.layout.y<=o&&D.getComponentEndCoordinate(t,"y")>=r})}function o(n,t){return x.transform(n,function(n,e,r){var o=t(r);return n[o]=n[o]||{comps:[],distanceToPreviousFragment:e.distanceToPreviousFragment},n[o].comps=n[o].comps.concat(e.comps),n},[])}function i(n,t,e){return x.assign(e,{fragments:[{comps:n,distanceToPreviousFragment:-1}],fragmentsEvents:[t]})}function u(n,t){var e=n.coordinate-t.coordinate;return 0!==e?D.getSign(e):n.compRef===t.compRef?n.eventType===I.START_EVENT?-1:1:n.eventType===I.END_EVENT?-1:1}function a(n,t){var e=x.transform(n,function(n,e){var r=e.layout[t],o=D.getComponentEndCoordinate(e,t);return n.push({eventType:I.START_EVENT,compRef:e,coordinate:r}),n.push({eventType:I.END_EVENT,compRef:e,coordinate:o}),n},[]);return e.sort(u),e}function c(n){var t=[],e=[];return x.forEach(n,function(n){var r=x.last(e);if(n.eventType===I.START_EVENT){if(x.isEmpty(t)){var o=r?n.coordinate-x.last(r.events).coordinate:-1,i={events:[n],distanceToPreviousFragment:o};e.push(i)}else r.events.push(n);t.push(n)}else x.remove(t,{compRef:n.compRef}),r.events.push(n)}),x.map(e,function(n){return{comps:M(n.events),distanceToPreviousFragment:n.distanceToPreviousFragment}})}function s(n,t,e){var r=x.maxBy(n,"distanceToPreviousFragment"),i=x.findIndex(n,r),u=function(n){return n<i?0:1},a=o(n,u),c=[n[i-1],r],s=x.filter(t[S(e)],function(n){return x.some(c,function(t){return x.includes(t.comps,n.compRef)})}),f={fragmentsEvents:p(t,a),fragments:a},m=l(c,s,e);return x.assign(f,{maxCompsDistance:m})}function f(n,t){return x(n).map(function(n,e){return e?x.map(n,function(n){return x.defaults({closestPoint:n.compRef.layout[t]},n)}):x.map(n,function(n){return x.defaults({closestPoint:D.getComponentEndCoordinate(n.compRef,t)},n)})}).map(function(n,t){return x.reduce(n,function(n,e){var r=x.last(n);return r&&r.eventType!==I.END_EVENT?r.compRef===e.compRef?n.concat([e]):((t&&e.closestPoint<r.closestPoint||!t&&e.closestPoint>r.closestPoint)&&n.splice(n.length-1,1,e),n):n.concat(e.eventType===I.START_EVENT?[e]:[])},[])}).value()}function l(n,t,e){for(var r=x.partition(t,function(t){return x.includes(n[0].comps,t.compRef)}),o=f(r,e),i=[0,0],u=[[],[]],a=-1/0;i[0]<o[0].length||i[1]<o[1].length;){var c=function(){return i[0]===o[0].length||i[1]===o[1].length?i[0]===o[0].length?1:0:o[0][i[0]].coordinate<=o[1][i[1]].coordinate?0:1}(),s=o[c][i[c]++];if(s.eventType!==I.END_EVENT){u[c].push(s);var l=[x.maxBy(u[0],"closestPoint"),x.minBy(u[1],"closestPoint")],m=x.get(l,[1,"closestPoint"])-x.get(l,[0,"closestPoint"]);!x.isNaN(m)&&m>a&&(a=m)}else x.remove(u[c],{compRef:s.compRef})}return a}function m(n,t){return x.transform(n,function(n,e){var r=x.findIndex(t,function(n){return x.includes(n.comps,e.compRef)});return n[r]=(n[r]||[]).concat([e]),n},[])}function p(n,t){var e=m(n.x,t),r=m(n.y,t);return x.map(x.keys(t),function(n){return x.assign({},{x:e[n],y:r[n]})})}function v(n,t,e){var r=null;return x.forEach(P,function(o,i){if(!e[i])return!0;var u=o(t.y,n,"y"),a=o(t.x,n,"x");return null===(r=u&&a?null:u||a)}),r}function g(n,t){var e=x.size(t.x)>1?s(t.x,n,"x"):null,r=x.size(t.y)>1?s(t.y,n,"y"):null;if(e&&r){var o=O.HORIZONTAL*e.maxCompsDistance>O.VERTICAL*r.maxCompsDistance?e:r;return x.pick(o,["fragments","fragmentsEvents"])}return e||r}function y(n,t,e){return v(n,t,e)||g(n,t)}function d(n,t){t=D.sortComponentsByNaturalOrder(n,t),t=x.sortBy(t,"layout.y");var e="overlayGroup_"+t[0].id;return x.forEach(t,function(n){return x.set(n,["conversionData","overlayGroupId"],e)}),t}function E(n,t,e,r){if(x.size(t)<2)return t||[];var o=x.mapValues(e,c);if(1===x.size(o.x)&&1===x.size(o.y))return r.detectSemanticGroups&&r.useOverlapRules?d(n,t):h(n,t,r);var i=y(e,o,{mirrorPattern:!0,verticalDivider:!0,chessPattern:!0,singleCompRow:!0});return 1===x.size(i.fragments)?i.fragments[0].comps:x.flatMap(i.fragments,function(t,e){return E(n,t.comps,i.fragmentsEvents[e],r)})}function h(n,t,e){var r=function(n){return x.some(n,"conversionData.originalLayout")};if(r(t)||x.some(t,function(n){return r(n)}))return C(t),t;T(t);var o=a(t,"y"),i=a(t,"x"),u=E(n,t,{y:o,x:i},e);return C(u),u}function T(n){x.forEach(n,function(n){var t=n.layout,e=x.assign(R.objectUtils.cloneDeep(t),{height:t.height*N,width:t.width*N});n.layout=e,x.set(n,["conversionData","originalLayout"],t)})}function C(n,t){void 0===t&&(t=!0),x.forEach(n,function(n){var t=x.get(n,["conversionData","originalLayout"]);t&&(n.layout=R.objectUtils.cloneDeep(t),delete n.conversionData.originalLayout)}),t&&x.forEach(n,function(n){return C(n.components,!1)})}function _(n,t,e){var r=a(t,"y"),o=a(t,"x"),i=E(n,t,{y:r,x:o},e);n.conversionData.componentsOrder=x.map(i,"id")}Object.defineProperty(t,"__esModule",{value:!0});var x=e(0),D=e(4),R=e(3),I={START_EVENT:"start",END_EVENT:"end"},N=.9,O={HORIZONTAL:1,VERTICAL:1.25},P={singleCompRow:function(n,t,e){if("x"===e)return null;var r=x.findIndex(n,function(n){return 1===x.size(n.comps)});if(-1===r)return null;var i=function(n){return D.getSign(n-r)+D.getSign(r)},u=o(n,i);return{type:"singleCompRow",fragments:u,fragmentsEvents:p(t,u)}},verticalDivider:function(n,t,e){var i=function(n){return 1===x.size(n.comps)};if(x.size(n)<3||x.every(n,i)||"y"===e)return null;var u=r(n,t);if(-1===u)return null;x.set(n[u].comps[0],["conversionData","isVerticalDivider"],!0);var a=function(n){return D.getSign(n-u)+D.getSign(u)},c=o(n,a);return{type:"verticalDivider",fragments:c,fragmentsEvents:p(t,c)}},mirrorPattern:function(n,t,e){if(x.size(n)<2)return null;var r=p(t,n),o=S(e),u=x.map(r,function(n){return M(n[o])}),a=x.every(u,function(n){return D.areSimilarFragments(n,u[0],o)});return a&&a?i(x.flatten(u),t,{type:"mirrorPattern"}):null},chessPattern:function(n,t,e){var r=function(n){return 2===x.size(n.comps)};if("y"!==e||x.size(n)<2||!x.every(n,r))return null;var o=p(t,n),u=x.map(o,function(n){return M(n.x)}),a=x.flatMap(u,function(n,t){return A(t)?n:x.reverse(n)}),c=a[0].conversionData.category,s="text"===c?"photo":"text",f=function(n,t){return n.conversionData.category===(A(t)?c:s)};return x.every(a,f)?i(a,t,{type:"chessPattern"}):null}},M=function(n){return x(n).map("compRef").uniq().value()};t.extractCompsFromEvents=M;var S=function(n){return"x"===n?"y":"x"},A=function(n){return n%2==0};t.createEventsQueue=a,t.createFragments=c,t.splitAxisEventsByFragments=m,t.setComponentsOrder=_;var G={isEven:A,transformLayouts:T,restoreLayouts:C,extractCompsFromEvents:M,getPerpendicularAxis:S,compareEvents:u,refragment:o,splitAxisEventsByFragments:m,splitAllEventsByFragments:p,calculateMaxCompsDistance:l,sortComponentsByNaturalOrder:D.sortComponentsByNaturalOrder};t.testAPI=G}})});
//# sourceMappingURL=mobileLayoutUtils.js.map