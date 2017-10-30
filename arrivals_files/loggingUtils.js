define("loggingUtils/bi/errors.json",[],function(){return{SINGLE_PAGE_RETRIEVAL_ATTEMPT_FAILED:{errorCode:111020,severity:"warning",params:{p2:"pageId",p1:"hostname",p3:"url",p4:"responseStatusCode"}},ALL_PAGE_RETRIEVAL_ATTEMPTS_FAILED:{errorCode:111021,severity:"fatal",params:{p1:"pageId"}},UNHANDLED_LINK_TYPE_IN_DATA_FIXER:{errorCode:21067,severity:"fatal",params:{p1:"newLinkDataItem"}},DATA_PLUGIN_ERROR:{errorCode:111029,severity:"fatal",params:{p1:"store",p2:"path",p3:"value",p4:"stack"}}}}),define("loggingUtils/bi/services/wixBI",["lodash","coreUtils","experiment"],function(e,i,t){"use strict";function n(e){window._biCalls.push(i.urlUtils.parseUrl(e)),window._biCalls.length>c&&(window._biCalls=window._biCalls.slice(Math.floor(c/4),window._biCalls.length))}function r(e,i){var t=!1;if(i&&window.navigator&&window.navigator.sendBeacon)try{t=window.navigator.sendBeacon(e)}catch(e){}return t}function o(i,t){var n=a&&"editor"===t.adapter?window.parent.mainLoaded:0;return n=n||i.wixBiSession.initialTimestamp||i.wixBiSession.mainLoaded,e.now()-n}var s="undefined"!=typeof window,a=s&&window.queryUtil&&window.queryUtil.isParameterTrue("isEdited"),u=s&&window.queryUtil&&window.queryUtil.isParameterTrue("isqa"),c=1e3;u&&a&&(window._biCalls=[]);var l={biUrl:"//frog.wixpress.com",adapter:"",params:{}},g=function(){if(!s)return!0;for(var e=[/bot/i,/Google Web Preview/i,/^Mozilla\/4\.0$/],i=window.navigator.userAgent,t=0;t<e.length;++t)if(e[t].test(i))return!0;return!1}()?e.noop:function(e,t,o,s){var c=i.urlUtils.joinURL(e,t);o&&(c+="?"+o),r(c,s)||((new window.Image).src=c),u&&a&&n(c)};return{report:function(n,r){var s=e.get(n,["serviceTopology","biServerUrl"]);s&&(l.biUrl=s),e.defaults(r,l);var a="useBeacon"in r?r.useBeacon:t.isOpen("useBeacon",n),u=e.isString(r.queryString)?r.queryString:i.urlUtils.toQueryString(e.defaults(r.params,{ts:o(n,r)}));g(r.biUrl,r.adapter,u,a)}}}),define("loggingUtils/bi/services/googleAnalytics",["lodash","coreUtils"],function(e,i){"use strict";function t(i,t,n){function r(){var r=window._gaq||[];window._gaq=r,e.forEach(t,function(e,t){var o=0===t?"":"t"+t+".";r.push([o+"_setAccount",e],[o+"_setAllowAnchor",!0]),n&&r.push([o+"_setCustomVar",1,"version",n.ver,1],[o+"_setCustomVar",2,"language",n.lng,1],[o+"_setCustomVar",3,"userType",n.userType,1]),r.push([o+"_trackPageview",i])})}window._gaq?r():requirejs(["https://stats.g.doubleclick.net/dc.js"],r,e.noop)}function n(i,t){e.isEmpty(i)||(window.ga?t():requirejs(["//www.google-analytics.com/analytics.js"],function(){window.ga=window.ga||function(){(window.ga.q=window.ga.q||[]).push(arguments)},window.ga.l=e.now(),window.ga.q=window.ga.q||[],e.forEach(i,function(e){window.ga("create",e,"auto")}),t()},e.noop))}return{reportPageEvent:function(e,r,o,s){"undefined"!=typeof window&&setTimeout(function(){e.isUsingUrlFormat(i.siteConstants.URL_FORMATS.SLASH)?n(o,function(){window.ga("send","pageview",{page:r})}):t(r,o,s)},200)},report:function(i){var t=e.tail(arguments);n(i,function(){window.ga.apply(window.ga,t)})}}}),define("loggingUtils/bi/services/facebookRemarketing",["lodash","coreUtils"],function(e,i){"use strict";function t(e){if(!window._fbq){var i=window._fbq||(window._fbq=[]);if(!i.loaded){var t=window.document.createElement("script");t.async=!0,t.src="//connect.facebook.net/en_US/fbds.js";var n=window.document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n),i.loaded=!0}i.push(["addPixelId",e]),window._fbq.push(["track","PixelInitialized",{}])}}function n(e){var i,t,n;window.fbq||(i=window.fbq=function(){i.callMethod?i.callMethod.apply(i,arguments):i.queue.push(arguments)},window._fbq||(window._fbq=i),i.push=i,i.loaded=!0,i.version="2.0",i.queue=[],(t=window.document.createElement("script")).async=!0,t.src="//connect.facebook.net/en_US/fbevents.js",(n=window.document.getElementsByTagName("script")[0]).parentNode.insertBefore(t,n)),window.fbq("init",e),window.fbq("track","PageView")}function r(i){return Number(i)&&e.isString(i)&&!e.isEmpty(i)}function o(e){return e.isUsingUrlFormat(i.siteConstants.URL_FORMATS.SLASH)}return{initRemarketingPixel:function(e,i){r(i)&&(o(e)?n(i):t(i))},initPixelId:function(e,i){r(i)&&o(e)&&this.initRemarketingPixel(e,i)},fireRemarketingPixel:function(i,t,n){o(i)&&window.fbq&&e.isString(t)&&window.fbq("track",t,n||{})}}}),define("loggingUtils/bi/services/googleRemarketing",["lodash"],function(e){"use strict";function i(i){return e.isArray(i)&&1===i.length&&Number(i[0])}function t(){var e=window.document.createElement("script");e.type="text/javascript",e.src="//www.googleadservices.com/pagead/conversion_async.js",e.async=!0,e.setAttribute("onload","google_trackConversion("+JSON.stringify(r)+")");var i=window.document.getElementsByTagName("script")[0];i.parentNode.insertBefore(e,i)}var n=!1,r={google_custom_params:{},google_remarketing_only:!0};return{initRemarketingPixel:function(o){!n&&i(o)&&(e.assign(r,{google_conversion_id:o[0]}),t(),n=!0)},fireRemarketingPixel:function(){n&&window.google_trackConversion&&window.google_trackConversion(r)}}}),define("loggingUtils/bi/services/yandexMetrika",["lodash"],function(e){"use strict";function i(i){return e.isArray(i)&&e.isFinite(parseInt(i[0],10))}function t(e){s="yaCounter"+e}function n(e){(window[a]=window[a]||[]).push(function(){try{window[s]=new window.Ya.Metrika(o(e))}catch(e){}})}function r(){if(!u){var e=window.document.getElementsByTagName("script")[0],i=window.document.createElement("script");i.type="text/javascript",i.async=!0,i.src="https://mc.yandex.ru/metrika/watch.js",i.addEventListener("load",function(){u=!0}),e.parentNode.insertBefore(i,e)}}function o(e){return{id:parseInt(e,10),clickmap:!0,trackLinks:!0,accurateTrackBounce:!0,webvisor:!0,trackHash:!0}}var s,a="yandex_metrika_callbacks",u=!1;return{initialize:function(e){i(e)&&(t(e[0]),n(e[0]),r())},reportPageHit:function(i){u&&window[s]&&e.isFunction(window[s].hit)&&window[s].hit(i)}}}),define("loggingUtils/bi/bi",["loggingUtils/bi/services/wixBI","loggingUtils/bi/services/googleAnalytics","loggingUtils/bi/services/facebookRemarketing","loggingUtils/bi/services/googleRemarketing","loggingUtils/bi/services/yandexMetrika"],function(e,i,t,n,r){"use strict";return{wixBI:e,googleAnalytics:i,facebookRemarketing:t,googleRemarketing:n,yandexMetrika:r}}),define("loggingUtils/logger/newrelic",["lodash"],function(e){"use strict";if(!("undefined"==typeof window||window.queryUtil&&window.queryUtil.isParameterTrue("suppressbi"))){var i;try{i=window.parent.newrelic}catch(e){i=window.newrelic}if(i){var t=window.performance&&window.performance.now?function(){return Math.round(window.performance.now())}:function(){return 0};return{setCustomAttribute:i.setCustomAttribute.bind(i),addPageAction:function(n,r){var o=t();return r=e.assign({},r,{timeSinceNavigate:o}),i.addPageAction(n,r)},finished:function(){return t()&&this.setCustomAttribute("timeSinceNavigate",t()),i.finished.apply(i,arguments)}}}}return{setCustomAttribute:e.noop,addPageAction:e.noop,finished:e.noop}}),define("loggingUtils/logger/performance",["lodash","loggingUtils/logger/newrelic"],function(e,i){"use strict";function t(){return-1}var n="undefined"!=typeof window&&window.queryUtil;if(!n||n.isParameterTrue("suppressperformance"))return{mark:e.noop,measure:e.noop,start:e.noop,startOnce:e.noop,finish:e.noop,time:function(e,i){return i.apply(this,Array.prototype.slice.call(arguments,2))},getMark:e.noop,getMeasure:e.noop,clearMarks:e.noop,clearMeasures:e.noop,now:e.now,getResourceSize:t};var r,o=window.performance;if(o&&o.now)r=o.now.bind(o);else{var s=window.wixBiSession&&window.wixBiSession.initialTimestamp||0;r=function(){return e.now()-s}}var a,u=function(t,n){t&&(n=e.defaults({measureName:t.name,startTime:Math.round(t.startTime),duration:Math.round(t.duration)},n),i.addPageAction("measure",n))};if(o&&o.measure){var c=function(i,t){return e.find(o.getEntriesByName(t),{entryType:i})};a={mark:o.mark.bind(o),measure:function(e,i,t,n,r){try{o.measure(e,i,t),n&&u(a.getMeasure(e),r)}catch(e){}},getMark:c.bind(this,"mark"),getMeasure:c.bind(this,"measure"),clearMarks:o.clearMarks.bind(o),clearMeasures:o.clearMeasures.bind(o)}}else{var l={domLoading:{name:"domLoading",startTime:0}},g={},d=function(e,i){i?delete e[i]:e={}};a={mark:function(e){l[e]={name:e,startTime:r()}},measure:function(e,i,t,n,r){var o=a.getMark(i),s=a.getMark(t);if(o&&s){var c={name:e,startTime:o.startTime,duration:s.startTime-o.startTime};isNaN(c.duration)||(g[e]=c,n&&u(c,r))}},getMark:function(e){return l[e]},getMeasure:function(e){return g[e]},clearMarks:d.bind(this,l),clearMeasures:d.bind(this,g)}}return a.start=function(e){a.clearMeasures(e),a.mark(e+" start")},a.startOnce=function(e){a.getMark(e+" start")||a.start(e)},a.finish=function(e,i,t){var n=e+" start";if(a.getMark(n)){var r=e+" finish";a.mark(r),a.measure(e,n,r,i,t),a.clearMarks(r),a.clearMarks(n)}return a.getMeasure(e)},a.time=function(e,i,t,n){try{return a.start(e),i.apply(this,Array.prototype.slice.call(arguments,4))}finally{a.finish(e,t,n)}},a.now=r,o&&window.performance.getEntriesByName?a.getResourceSize=function(i){var t=o.getEntriesByName(i);if(t&&t.length){var n=t[0],r=n.transferSize||n.encodedBodySize;if(e.isNumber(r))return r}return-1}:a.getResourceSize=t,a}),define("loggingUtils/logger/services/browsingSession",["lodash","coreUtils"],function(e,i){"use strict";function t(){var e=!1,i=Date.now(),t=o();return(isNaN(t.ts)||i-t.ts>u)&&(e=!0),e}function n(){try{var e=Date.now(),t=i.guidUtils.getGUID();return window.localStorage.setItem(s,e),window.localStorage.setItem(a,t),{ts:e,id:t}}catch(e){return{ts:null,id:null}}}function r(){try{var e=Date.now();return window.localStorage.setItem(s,e),e}catch(e){return null}}function o(){try{return{isNew:!1,ts:parseInt(window.localStorage.getItem(s),10),id:window.localStorage.getItem(a)}}catch(e){return{isNew:!1,ts:null,id:null}}}var s="beatSessionTs",a="beatSessionId",u=18e5;return{SESSION_TS_KEY:s,SESSION_ID_KEY:a,SESSION_TTL_MS:u,get:o,track:function(){var i=!1;return t()&&(n(),i=!0),r(),e.assign(o(),{isNew:i})}}}),define("loggingUtils/logger/beat",["lodash","loggingUtils/bi/bi","coreUtils","loggingUtils/logger/performance","loggingUtils/logger/services/browsingSession","experiment"],function(e,i,t,n,r,o){"use strict";function s(e){return"finish"===e?r.track():r.get()}function a(i){if(e.isString(i)){var t=i.split(".");if(t.length>1)return t[1]}return i}function u(i){var n=t.urlUtils.toQueryString(e.omit(i,N),!0);return e.reduce(N,function(e,n){return e+"&"+t.urlUtils.toQueryParam(n,i[n],!0)},n)}function c(i,t,n,r){var o=l(i),s=g(i,n,r),a={et:w(n)};return e.merge({},t,o,s,a)}function l(i){return{vuuid:f(),vid:i.getSvSession()||P,dc:a(i.serviceTopology.serverName),vsi:C[i.siteId].viewerSessionId,uuid:i.siteHeader.userId,sid:i.siteId,iss:e.invoke(i,"isClientAfterSSR",!1),msid:i.getMetaSiteId()}}function g(i,t,n){var r=i.getBiData(),o=r.getTime(),a=s(t,r);return{pid:n,pn:r.getPageNumber(),st:d(i),sr:p(),wr:v(),isjp:T.maybeBot?"1":"0",isp:i.isPremiumDomain(),url:m(i.currentUrl.full),ref:window.document.referrer,ts:"start"===t?0:o.loadingTime,tts:"start"===t?0:o.totalLoadingTime,c:e.now(),v:i.baseVersion||"unknown",fis:a.isNew,bsi:a.id}}function d(i){var t=i.rendererModel.siteInfo.documentType,n=e.indexOf(R,t);return-1!==n?n:t}function f(){var i=t.cookieUtils.getCookie("_wixUIDX")||"";return i=i.slice(e.lastIndexOf(i,"|")+1),i=i.replace(/^(null-user-id|null)$/g,"")}function w(i){var t=e.indexOf(E,i);return-1!==t?t:i>3?i:-1}function m(e){return e.replace(/^http(s)?:\/\/(www\.)?/,"").substring(0,256)}function p(){return(window.screen&&window.screen.width||0)+"x"+(window.screen&&window.screen.height||0)}function v(){var e=0,i=0;return window.innerWidth?(e=window.innerWidth,i=window.innerHeight):window.document&&(window.document.documentElement&&window.document.documentElement.clientWidth?(e=window.document.documentElement.clientWidth,i=window.document.documentElement.clientHeight):window.document.body&&window.document.body.clientWidth&&(e=window.document.body.clientWidth,i=window.document.body.clientHeight)),e+"x"+i}function h(e,i){T.et=i.et,e.wixBiSession.et=i.et}function S(e){return e>3&&16!==e}function _(e){var i=x[e];return x[e]=!0,i}function I(e,i){return e&&e.wixBiSession.viewerSessionId&&"preview"!==e.viewMode&&!t.stringUtils.isTrue(e.currentUrl.query.suppressbi)&&-1!==w(i)&&(!S(i)||!_(i))}function b(e){C[e.siteId]=C[e.siteId]||{viewerSessionId:e.wixBiSession.viewerSessionId||t.guidUtils.getGUID()}}function y(e,i){var t={queryString:u(i),adapter:M.adapter,biUrl:e.getServiceTopologyProperty("biServerUrl")||M.biUrl};return o.isOpen("beatNotBeacon",e)&&(t.useBeacon=!1),t}function k(i,t){var n=i.currentUrl.query.sampleratio;return!(!(e.result(i,"isDebugMode",!1)&&"force"!==n||"none"===n)&&t)||(o.isOpen("vsiCoin",i)&&i.wixBiSession.viewerSessionId?(e.isUndefined(i.wixBiSession.coin)&&(i.wixBiSession.coin=parseInt(i.wixBiSession.viewerSessionId,16)),i.wixBiSession.coin%t==0):0===Math.floor(i.wixBiSession.random*t))}function U(e,t){if(k(e,q[t.et])){var n=y(e,t);i.wixBI.report(e,n)}}var x=[],T={};"undefined"!=typeof window&&window.wixBiSession&&(T=window.wixBiSession).beat(5);var B,C={},R=["No Site Type","WixSite","UGC","Template"],E=["No Event Type","start","visible","finish"],P="NO_SV",M={adapter:"bt",biUrl:"http://frog.wix.com/"},A={src:29,evid:3},N=["url","ref"],D={6:"packages loaded",7:"load data",8:"render",finish:"layout",16:"TPAs"},q={16:20};return{reportBeatEvent:function(e,i,t){b(e);var r=c(e,A,i,t);if(h(e,r),I(e,i)&&U(e,r),e.isViewerMode()){var o=e.viewMode;o="site"===o?"":" "+o,B||(n.measure("main-r started"+o,"domLoading","beat 4",!0),n.measure("utils loaded"+o,"beat 4","beat 5",!0),B="beat 5");var s="beat "+i;n.mark(s);var a=D[i]||i;n.measure(a+o,B,s,!0),B=s}},shouldIncludeInSampleRatio:k}}),define("loggingUtils/logger/logger",["lodash","loggingUtils/bi/bi","loggingUtils/logger/beat","coreUtils"],function(e,i,t,n){"use strict";function r(e){return"string"==typeof e?T[e]:e}function o(i,t){var o={};return(44===i.src||42===i.src&&t)&&(o.visitor_id=t),e.assign(o,{errn:i.errorName,evid:10,sev:r(i.severity),cat:y?1:2,iss:1,ut:n.cookieUtils.getCookie("userType")})}function s(i,t,n){var r=e.merge({src:44,sev:30,errn:"error_name_not_found"},m(i,x),o(i,n),w(i,t));return t&&t.description&&(r.desc=JSON.stringify(t.description).slice(0,512)),r}function a(i,t){return e.merge({src:42},m(i,B),w(i,t))}function u(i,t,n,r){var o,u=d(i);switch(t){case"error":o=s(n,r,_(i));break;case"event":o=a(n,r)}return e.merge(o,u)}function c(e,i,t){var n=i.reportType||(i.errorCode||i.errc?"error":"event"),r={biUrl:e.serviceTopology.biServerUrl,adapter:i.adapter||i.endpoint||("error"===n?"trg":"ugc-viewer"),params:u(e,n,i,t)};return"useBeacon"in i&&(r.useBeacon=i.useBeacon),r}function l(i){return e.isFunction(i.getMetaSiteId)?i.getMetaSiteId():i.rendererModel.metaSiteId}function g(e){var i=e.santaBase&&e.santaBase.match(/([\d\.]+)\/?$/);return i&&i[1]||""}function d(i){C[i.siteId]=C[i.siteId]||i.wixBiSession.viewerSessionId||n.guidUtils.getGUID();var t=i.serviceTopology.serverName?e.head(i.serviceTopology.serverName.split(".")):"",r={site_id:i.siteId,msid:l(i),majorVer:k,ver:g(i),server:t,viewMode:i.viewMode};return y||(r.vsi=C[i.siteId]),r}function f(e){return"string"==typeof e?encodeURIComponent(e):e}function w(i,t){var n=i.params;return e.isArray(n)?e.pick(t,n):e.isObject(n)?e.mapValues(n,function(e){return f(t[e])}):e.mapValues(t,f)}function m(i,t){return e.transform(i,function(e,i,n){var r=t[n];r&&(e[r]=i)},{})}function p(e){return n.stringUtils.isTrue(e.currentUrl.query.suppressbi)}function v(e){return!!e&&(e.callCount=e.callCount||0,e.callCount++,e.callLimit&&e.callCount>e.callLimit)}function h(i,n){if(i.forceBI)return!0;var r=U;return n&&(e.result(i,"isWixSite",!1)&&"wixSiteSampleRatio"in n?r=n.wixSiteSampleRatio:"sampleRatio"in n?r=n.sampleRatio:("errorCode"in n||"editor"===n.endpoint)&&(r=0)),!(r&&r>=1)||t.shouldIncludeInSampleRatio(i,r)}function S(e,i){return!p(e)&&!v(i)&&h(e,i)}function _(e){return C[e.siteId]||e.wixBiSession&&e.wixBiSession.viewerSessionId}function I(e,i){var t=[],n=e.isPremiumDomain();switch(i){case"googleAnalytics":b(e,i)&&t.push(e.googleAnalytics);break;case"facebookRemarketing":b(e,i)&&n&&t.push(e.facebookRemarketing);break;case"googleRemarketing":b(e,i)&&n&&t.push(e.googleRemarketing);break;case"yandexMetrika":b(e,i)&&n&&t.push(e.yandexMetrika)}return t}function b(i,t){return!e.isEmpty(i[t])}var y="undefined"!=typeof window&&window.queryUtil&&window.queryUtil.isParameterTrue("isEdited"),k="undefined"==typeof window||window.clientSideRender?3:4,U=10,x={errorName:"errn",errorCode:"errc",errc:"errc",src:"src",severity:"sev",sev:"sev",packageName:"errscp"},T={recoverable:10,warning:20,error:30,fatal:40},B={eventId:"evid",evid:"evid",src:"src"},C={};return{reportBI:function(t,n,r){if(t&&e.isObject(n)&&S(t,n)){var o=c(t,n,r);i.wixBI.report(t,o)}},reportGoogleAnalytics:function(t){if(!y){var n=I(t,"googleAnalytics");i.googleAnalytics.report.apply(null,[n].concat(e.tail(arguments)))}},reportPageEvent:function(t,n){t&&e.isString(n)&&!y&&!p(t)&&i.googleAnalytics.reportPageEvent(t,n,I(t,"googleAnalytics"))},register:function(i,t,n){e.forOwn(n,function(e){e.packageName=i})},reportBeatEvent:t.reportBeatEvent,initFacebookRemarketingUserPixel:function(e){if(!y&&!p(e)){var t=I(e,"facebookRemarketing")[0];i.facebookRemarketing.initRemarketingPixel(e,t)}},initFacebookRemarketingPixelId:function(e,t){y||p(e)||i.facebookRemarketing.initPixelId(e,t)},fireFacebookRemarketingPixel:function(e,t,n){i.facebookRemarketing.fireRemarketingPixel(e,t,n)},initGoogleRemarketingPixel:function(e){y||p(e)||i.googleRemarketing.initRemarketingPixel(I(e,"googleRemarketing"))},fireGoogleRemarketingPixel:function(){i.googleRemarketing.fireRemarketingPixel()},initYandexMetrika:function(e){y||p(e)||i.yandexMetrika.initialize(I(e,"yandexMetrika"))},reportYandexPageHit:function(e){i.yandexMetrika.reportPageHit(e)},shouldSendReport:S,getVisitorId:_}}),define("loggingUtils/bi/errors",["loggingUtils/bi/errors.json","lodash","loggingUtils/logger/logger"],function(e,i,t){"use strict";return i.forEach(e,function(e,i){e.errorName=i}),t.register("utils","error",e),e}),define("loggingUtils/logger/services/imageContext",["lodash","loggingUtils/logger/performance","experiment"],function(e,i,t){"use strict";function n(){var e=parseInt(t.getValue("viewPortImageLoadingBi"),10);return e>0?e:5e3}function r(i){if(e.isString(i)){var t=i.match(f);return t||(t=i.match(w))?t[1]:""}return""}function o(i,t,n){return e.filter(i,function(e){var i=e.id;return d[i]?n&&!!d[i][t]:(d[i]={},d[i][t]=!0,!0)})}function s(i,t,n){e.forEach(i,function(e){e.promise.then(t,n)})}function a(){this._current=null}function u(e,i,t){this._siteData=e,this._pageId=i.pageId,this._events=t,this._interval=0,this._finishCount=1,this._failDetailsBuffer=[],this._status=l.INITIAL,this._reason=g.INITIAL,this._images={total:0,success:0,fail:0,failDetails:[],totalSize:0}}var c={SUCCESS:0,FAIL:1},l={INITIAL:0,PROGRESS:1,FINISHED:2},g={INITIAL:0,SUCCESS_OR_FAIL:1,TIMED_OUT:2,DESTROYED:3},d={},f=/\/(v[0-9.]+\/.+)$/,w=/\/([^\/]+)$/;a.prototype={createImageContext:function(e,i,t,n,r){return this._current=new u(i,{pageId:e},{onProgress:t,onSuccess:n,onFail:r})},getCurrentImageContext:function(){return this._current}},u.prototype={_isFinished:function(){return this._images.total===this._images.success+this._images.fail},_isFinishSuccess:function(){return this._isFinished()&&0===this._images.fail},_checkFinished:function(){this._finishCount<=10&&this._isFinished()&&(this._finish(g.SUCCESS_OR_FAIL),this._isFinishSuccess()?this._events.onSuccess(this):this._events.onFail(this),this._finishCount++)},_startProgress:function(){var e=this,i=1;this._status=l.PROGRESS,this._interval=setInterval(function(){e._flushFailDetailsBuffer(),e._events.onProgress(e,i++),i>10&&e._finish(g.TIMED_OUT)},n())},_stopProgress:function(){this._interval&&(clearInterval(this._interval),this._interval=0)},_finish:function(e){this._status=l.FINISHED,this._reason=e,this._failDetailsBuffer.length&&this._flushFailDetailsBuffer(),this._stopProgress()},_onImageStatusChange:function(e,t){if(!(this._status<l.PROGRESS||this._reason>g.SUCCESS_OR_FAIL||t.canceled)){if(e===c.SUCCESS){var n=t.target?i.getResourceSize(t.target.src):0;this._increaseSuccessCount(n)}else{var o=t.target?r(t.target.src):"";this._increaseFailCount(o)}this._checkFinished()}},_increaseSuccessCount:function(e){this._images.success++,this._images.totalSize+=e},_increaseFailCount:function(e){var i=this._siteData.getBiData().getTime();this._images.fail++,this._failDetailsBuffer.push({d:i.totalLoadingTime,url:e})},_flushFailDetailsBuffer:function(){this._images.failDetails.push(this._failDetailsBuffer),this._failDetailsBuffer=[]},getImages:function(){return this._images},getPageId:function(){return this._pageId},setImages:function(e){var i=o(e,this.getPageId(),this._status===l.INITIAL);return this._images.total+=i.length,this._status===l.INITIAL&&(this._startProgress(),this._checkFinished()),s(i,this._onImageStatusChange.bind(this,c.SUCCESS),this._onImageStatusChange.bind(this,c.FAIL)),this},destroy:function(){this._finish(g.DESTROYED)}};var m={_sites:{},get:function(e){return this._sites[e.siteId]=this._sites[e.siteId]||new a}};return{create:function(i,t,n,r,o){return n=n||e.noop,r=r||e.noop,o=o||e.noop,m.get(i).createImageContext(t,i,n.bind(null,i),r.bind(null,i),o.bind(null,i))},getCurrent:function(e){return m.get(e).getCurrentImageContext()}}}),define("loggingUtils/logger/imagesBi",["lodash","loggingUtils/bi/bi","coreUtils","loggingUtils/logger/beat","loggingUtils/logger/services/imageContext"],function(e,i,t,n,r){"use strict";function o(i){return JSON.stringify({a:e.take(i,d)})}function s(e,i){var n=i.getImages(),r=n.totalSize>=0?Math.round(n.totalSize/1024):"",o=e.getBiData();return{src:29,d:o.getTime().totalLoadingTime,tn:n.total,sid:e.siteId,msid:e.getMetaSiteId(),pid:i.getPageId(),pn:o.getPageNumber(),vsi:e.wixBiSession.viewerSessionId,vid:t.cookieUtils.getCookie("svSession"),s:r}}function a(i,n,r){var o=e.defaults(s(i,n),r);return{adapter:"m",queryString:t.urlUtils.toQueryString(o)}}function u(e,t,n){var r=t.getImages();i.wixBI.report(e,a(e,t,{evid:11,i:n,sn:r.success,fn:r.fail,fd:o(r.failDetails[n-1])}))}function c(e,t){i.wixBI.report(e,a(e,t,{evid:12}))}function l(t,n){var r=n.getImages();i.wixBI.report(t,a(t,n,{evid:13,fn:r.fail,fd:o(e.flatten(r.failDetails))}))}function g(e){return e.isViewerMode()&&n.shouldIncludeInSampleRatio(e)&&!t.stringUtils.isTrue(e.currentUrl.query.suppressbi)}var d=8;return function(e,i){if(g(e)){var t=e.getBiData().getPageId(),n=r.getCurrent(e);return n&&n.getPageId()===t||(n&&n.destroy(),n=r.create(e,t,u,c,l)),n=n.setImages(i)}}}),define("loggingUtils",["loggingUtils/bi/errors","loggingUtils/logger/logger","loggingUtils/logger/performance","loggingUtils/logger/newrelic","loggingUtils/logger/imagesBi"],function(e,i,t,n,r){"use strict";return{bi:{errors:e},logger:i,performance:t,newrelic:n,imagesBi:r}});
//# sourceMappingURL=loggingUtils.min.js.map