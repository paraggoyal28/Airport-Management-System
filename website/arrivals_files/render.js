define("render/bi/events.json",[],function(){return{SERVER_SIDE_RENDERING_DEBUG:{eventId:4,reportType:"event",endpoint:"bt",src:29,sampleRatio:1,params:{phaseName:"phaseName",errorType:"errorType",error_message:"error_message",statusid:"statusid"}}}}),define("render/bi/events",["render/bi/events.json","loggingUtils"],function(e,r){"use strict";return r.logger.register("render","event",e),e}),define("render",["lodash","reactDOM","utils","core","render/bi/events","loggingUtils","experiment","animations","tweenEngine","TweenMax","TimelineMax"],function(e,r,n,i,s,t,o,a,d,w,c){"use strict";function u(e,r){window.clientSideRender?r&&r():requirejs(["warmup"],function(r){e(r)})}function p(e){var r=d.create(w,c);return e.fullSiteData.animations=a.create(r),e}function l(e,r){return p(i.renderer.createSitePrivates(e,r))}function f(e){var r=window.document.getElementById("SITE_CONTAINER");r&&(r.dataset?r.dataset.santaRenderStatus=e:r.setAttribute("data-santa-render-status",e))}function m(e,r){var n=r.query,i=(e[n.configName||"fullFunctionality"]||e.fullFunctionality).getConfig();if(n.disableMobileConversion&&(i.disableMobileConversion=!0),!n.dsOrigin)throw new Error("You must define dsOrigin parameter in order to use the documentServices - please speak to html-server team for a key");return i.origin=n.dsOrigin,i}function g(e,r,n,i){t.logger.reportBI(e,s.SERVER_SIDE_RENDERING_DEBUG,{phaseName:"diverge_reporting_failed",statusid:r||0,errorType:n||"noErrorType",error_message:i||"noErrorMessage"})}function v(r,i,s,t,o){r.browser.operaMini||n.ajaxLibrary.ajax({type:"POST",url:"https://jy75p2avi1.execute-api.us-west-2.amazonaws.com/prod/logDiffs",dataType:"json",headers:{"x-api-key":"NrelGcqXZH9pIBYc3zjA77SIpiBKUkp643H7P41F"},success:function(n,i,s){(n.errorType||n.errorMessage)&&g(r,e.get(s,"status",0),n.errorType,n.errorMessage)},data:{vsi:o||"missing vsi",santaVersion:t||"missing santa version",url:window.location.href||"missing url",ssrDiverge:{clientMarkup:i||"missing client markup",serverMarkup:s||"missing server markup"}},error:function(n,i,s){g(r,e.get(n,"status",0),i,s)}})}function S(e,r){u(function(r){r.willRender(e)}),window.clientSideRender&&window.santaRenderingError&&window.parent&&window.parent.postMessage({santaRenderingError:window.santaRenderingError.errorInfo},"*");var n=window.document.getElementById("SITE_CONTAINER").children[0];r.onBeforeLayout=function(){var r=window.document.getElementById("SITE_CONTAINER").children[0],i=r.innerHTML;window.sssr.clientSantaVersion=r.getAttribute("data-santa-version"),u(function(s){if(window.sssr.success=n===r,f(window.sssr.success?"SUCCESS":"DIVERGE"),window.sssr.clientSideRender={sinceInitialTimestamp:Date.now()-window.wixBiSession.initialTimestamp,performanceNow:I()},window.parent)if(window.sssr.success)window.parent.postMessage("sssrSuccess","*");else{window.sssr.clientSantaVersion!==window.sssr.serverSantaVersion&&(i=window.sssr.clientSantaVersion,window.sssr.serverMarkup=window.sssr.serverSantaVersion),window.sssr.clientMarkup=i,window.sssr.serverMarkup=window.sssr.serverMarkup||n.outerHTML;var t=e.wixBiSession.viewerSessionId;window.parent.postMessage({sssrFail:{clientMarkup:window.sssr.clientMarkup,serverMarkup:window.sssr.serverMarkup,vsi:t}},"*"),v(e,window.sssr.clientMarkup,window.sssr.serverMarkup,window.sssr.clientSantaVersion,t)}s.didRender(e,window.sssr.success)},function(){f("CLIENT")})}}function E(n,i){return function(s){window.rendered?window.rendered.forceUpdate():(window.rendered=r.render(s,window.document.getElementById("SITE_CONTAINER")),window.onpopstate=window.rendered.onPopState,window.onhashchange=window.rendered.onHashChange,window.parent!==window&&requirejs(["santaPreview"],function(e){window.rendered.registerAspectToEvent("siteReady",function(){i&&i(window.rendered),window.documentServices&&(window.parent.postMessage("documentServicesLoaded","*"),window.createSantaPreview=e)})}),n.qaAutomation&&(e.set(window,"testApi.domSelectors",n.qaAutomation.getDomSelectors(n.react,n.reactDOM)),window.testApi.domSelectors.setSearchRoot(window.rendered),window.testApi.isReady=!0))}}function y(e,r,n,s,t){S(r,s),i.renderer.renderSite(r,n,s,E(e,t))}function M(r,n){e.forOwn(n,function(e){r.createDisplayedPage(e.structure.id)})}var I=Object.freeze("undefined"!=typeof window&&window.performance&&window.performance.now?window.performance.now.bind(window.performance):Date.now.bind(Date));return{renderClientSide:function(r,s,t,a,d){r.componentsPreviewLayer&&r.componentsPreviewLayer.extendCompClasses();var w=l(s,t),c=r.documentServices;try{c&&e.isUndefined(window.karmaIntegration)&&o.isOpen("sv_fullstory",t)&&n.integrations.fullStory.start(t)}catch(e){}c?(w.siteDataWrapper.dataLoadedRegistrar=w.siteDataAPI.registerDataLoadedCallback.bind(w.siteDataAPI),window.documentServices=new c.Site(m(c.configs,w.siteModel.currentUrl),w.siteDataWrapper,e.partial(i.renderer.fixPages,w.siteModel,w.isServerSideRender),e.partial(y,r,w.displayedSiteData,w.viewerPrivateServices,a),e.partial(M,w.siteDataAPI)),e.set(window,"testApi.documentServices",window.documentServices)):(i.renderer.extendPrivates(w),y(r,w.displayedSiteData,w.viewerPrivateServices,a,d))},renderFromPrepared:function(e,r,n,s,t){p(r),S(r.displayedSiteData,s),i.renderer.doRenderSite(n,s,E(e,t))}}});
//# sourceMappingURL=render.min.js.map