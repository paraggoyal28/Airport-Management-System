define("multilingual",["lodash"],function(n){"use strict";var t=null,a=null,e={PointerOperation:{GET:"get",SET:"set"},init:function(n){t=n.siteData,a=n},EMPTY_TRANSLATION_DATA:{data:{document_data:{}}},setCurrentLanguage:function(n){t.multilingual.currentLanguage=n,a.createDisplayedPages()},getCurrentLanguage:function(){return t.multilingual.currentLanguage},getOriginalLanguage:function(){return t.rendererModel.siteMetaData.multilingual.siteOriginalLanguage},getTranslationLanguages:function(){return t.rendererModel.siteMetaData.multilingual.siteLanguages},getTranslationPath:function(t,a){var u=e.getCurrentLanguage();return e.getOriginalLanguage()===u||n.isNull(u)?t:n.concat(n.take(t,a),"translations",u,n.drop(t,a))}};return e});
//# sourceMappingURL=multilingual.min.js.map