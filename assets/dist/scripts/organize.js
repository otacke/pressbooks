(()=>{"use strict";var t=function(){return(t=Object.assign||function(t){for(var e,n=1,a=arguments.length;n<a;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t}).apply(this,arguments)},e=function(){function e(e,n,a){var i=this;this.endVal=n,this.options=a,this.version="2.2.0",this.defaults={startVal:0,decimalPlaces:0,duration:2,useEasing:!0,useGrouping:!0,smartEasingThreshold:999,smartEasingAmount:333,separator:",",decimal:".",prefix:"",suffix:"",enableScrollSpy:!1,scrollSpyDelay:200,scrollSpyOnce:!1},this.finalEndVal=null,this.useEasing=!0,this.countDown=!1,this.error="",this.startVal=0,this.paused=!0,this.once=!1,this.count=function(t){i.startTime||(i.startTime=t);var e=t-i.startTime;i.remaining=i.duration-e,i.useEasing?i.countDown?i.frameVal=i.startVal-i.easingFn(e,0,i.startVal-i.endVal,i.duration):i.frameVal=i.easingFn(e,i.startVal,i.endVal-i.startVal,i.duration):i.countDown?i.frameVal=i.startVal-(i.startVal-i.endVal)*(e/i.duration):i.frameVal=i.startVal+(i.endVal-i.startVal)*(e/i.duration),i.countDown?i.frameVal=i.frameVal<i.endVal?i.endVal:i.frameVal:i.frameVal=i.frameVal>i.endVal?i.endVal:i.frameVal,i.frameVal=Number(i.frameVal.toFixed(i.options.decimalPlaces)),i.printValue(i.frameVal),e<i.duration?i.rAF=requestAnimationFrame(i.count):null!==i.finalEndVal?i.update(i.finalEndVal):i.callback&&i.callback()},this.formatNumber=function(t){var e,n,a,r,o=t<0?"-":"";e=Math.abs(t).toFixed(i.options.decimalPlaces);var s=(e+="").split(".");if(n=s[0],a=s.length>1?i.options.decimal+s[1]:"",i.options.useGrouping){r="";for(var l=0,c=n.length;l<c;++l)0!==l&&l%3==0&&(r=i.options.separator+r),r=n[c-l-1]+r;n=r}return i.options.numerals&&i.options.numerals.length&&(n=n.replace(/[0-9]/g,(function(t){return i.options.numerals[+t]})),a=a.replace(/[0-9]/g,(function(t){return i.options.numerals[+t]}))),o+i.options.prefix+n+a+i.options.suffix},this.easeOutExpo=function(t,e,n,a){return n*(1-Math.pow(2,-10*t/a))*1024/1023+e},this.options=t(t({},this.defaults),a),this.formattingFn=this.options.formattingFn?this.options.formattingFn:this.formatNumber,this.easingFn=this.options.easingFn?this.options.easingFn:this.easeOutExpo,this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.endVal=this.validateValue(n),this.options.decimalPlaces=Math.max(this.options.decimalPlaces),this.resetDuration(),this.options.separator=String(this.options.separator),this.useEasing=this.options.useEasing,""===this.options.separator&&(this.options.useGrouping=!1),this.el="string"==typeof e?document.getElementById(e):e,this.el?this.printValue(this.startVal):this.error="[CountUp] target is null or undefined",void 0!==window&&this.options.enableScrollSpy&&(this.error?console.error(this.error,e):(window.onScrollFns=window.onScrollFns||[],window.onScrollFns.push((function(){return i.handleScroll(i)})),window.onscroll=function(){window.onScrollFns.forEach((function(t){return t()}))},this.handleScroll(this)))}return e.prototype.handleScroll=function(t){if(t&&window&&!t.once){var e=window.innerHeight+window.scrollY,n=t.el.offsetTop+t.el.offsetHeight;n<e&&n>window.scrollY&&t.paused?(t.paused=!1,setTimeout((function(){return t.start()}),t.options.scrollSpyDelay),t.options.scrollSpyOnce&&(t.once=!0)):window.scrollY>n&&!t.paused&&t.reset()}},e.prototype.determineDirectionAndSmartEasing=function(){var t=this.finalEndVal?this.finalEndVal:this.endVal;this.countDown=this.startVal>t;var e=t-this.startVal;if(Math.abs(e)>this.options.smartEasingThreshold){this.finalEndVal=t;var n=this.countDown?1:-1;this.endVal=t+n*this.options.smartEasingAmount,this.duration=this.duration/2}else this.endVal=t,this.finalEndVal=null;this.finalEndVal?this.useEasing=!1:this.useEasing=this.options.useEasing},e.prototype.start=function(t){this.error||(this.callback=t,this.duration>0?(this.determineDirectionAndSmartEasing(),this.paused=!1,this.rAF=requestAnimationFrame(this.count)):this.printValue(this.endVal))},e.prototype.pauseResume=function(){this.paused?(this.startTime=null,this.duration=this.remaining,this.startVal=this.frameVal,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count)):cancelAnimationFrame(this.rAF),this.paused=!this.paused},e.prototype.reset=function(){cancelAnimationFrame(this.rAF),this.paused=!0,this.resetDuration(),this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.printValue(this.startVal)},e.prototype.update=function(t){cancelAnimationFrame(this.rAF),this.startTime=null,this.endVal=this.validateValue(t),this.endVal!==this.frameVal&&(this.startVal=this.frameVal,this.finalEndVal||this.resetDuration(),this.finalEndVal=null,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count))},e.prototype.printValue=function(t){var e=this.formattingFn(t);"INPUT"===this.el.tagName?this.el.value=e:"text"===this.el.tagName||"tspan"===this.el.tagName?this.el.textContent=e:this.el.innerHTML=e},e.prototype.ensureNumber=function(t){return"number"==typeof t&&!isNaN(t)},e.prototype.validateValue=function(t){var e=Number(t);return this.ensureNumber(e)?e:(this.error="[CountUp] invalid start or end value: ".concat(t),null)},e.prototype.resetDuration=function(){this.startTime=null,this.duration=1e3*Number(this.options.duration),this.remaining=this.duration},e}();var n=window.jQuery,a={organize:{bulkToggle:[],oldParent:null,newParent:null,oldOrder:null,newOrder:null,sortableOptions:{revert:!0,helper:"clone",zIndex:2700,distance:3,opacity:.6,placeholder:"ui-state-highlight",dropOnEmpty:!0,cursor:"crosshair",items:"tbody > tr",start:function(t,e){a.organize.oldParent=n(e.item).parents("table").attr("id")},stop:function(t,e){a.organize.newParent=n(e.item).parents("table").attr("id"),p(n(e.item))}}}};function i(t){n.blockUI.defaults.applyPlatformOpacityRules=!1;var e,a=n('[role="alert"]');if("book"===t)e=PB_OrganizeToken.updating.book;else{var i=t.post_type.replace("-","");e=PB_OrganizeToken.updating[i]}a.children("p").text(e),a.addClass("loading-content").removeClass("visually-hidden"),n.blockUI({message:n(a),baseZ:1e5})}function r(t,e){var a,i=n('[role="alert"]');if("book"===t)a=PB_OrganizeToken[e].book;else{var r=t.post_type.replace("-","");a=PB_OrganizeToken[e][r]}n.unblockUI({onUnblock:function(){i.removeClass("loading-content").addClass("visually-hidden"),i.children("p").text(a)}})}function o(t,e){return"prev"===e?n(t).prev("[id^=part]"):"next"===e?n(t).next("[id^=part]"):void 0}function s(t){return{id:(t=n(t).attr("id").split("_"))[t.length-1],post_type:t[0]}}function l(t){var e=[];return t.children("tbody").children("tr").each((function(t,a){var i=s(n(a));e.push(i.id)})),e}function c(t){t.children("tbody").children("tr").each((function(e,a){var i="",r='<button class="move-up">Move Up</button>',o='<button class="move-down">Move Down</button>';n(a).is("tr:only-of-type")?t.is("[id^=part]")&&t.prev("[id^=part]").length&&t.next("[id^=part]").length?i=" | ".concat(r," | ").concat(o):t.is("[id^=part]")&&t.next("[id^=part]").length?i=" | ".concat(o):t.is("[id^=part]")&&t.prev("[id^=part]").length&&(i=" | ".concat(r)):i=n(a).is("tr:first-of-type")?t.is("[id^=part]")&&t.prev("[id^=part]").length?" | ".concat(r," | ").concat(o):" | ".concat(o):n(a).is("tr:last-of-type")?t.is("[id^=part]")&&t.next("[id^=part]").length?" | ".concat(r," | ").concat(o):" | ".concat(r):" | ".concat(r," | ").concat(o),n(a).children(".has-row-actions").children(".row-title").children(".row-actions").children(".reorder").html(i)}))}function p(t){var e=s(t);n.ajax({url:ajaxurl,type:"POST",data:{action:"pb_reorder",id:e.id,old_order:n("#".concat(a.organize.oldParent)).sortable("serialize"),new_order:n("#".concat(a.organize.newParent)).sortable("serialize"),old_parent:a.organize.oldParent.replace(/^part_([0-9]+)$/i,"$1"),new_parent:a.organize.newParent.replace(/^part_([0-9]+)$/i,"$1"),_ajax_nonce:PB_OrganizeToken.reorderNonce},beforeSend:function(){i(e),a.organize.oldParent!==a.organize.newParent&&c(n("#".concat(a.organize.oldParent))),c(n("#".concat(a.organize.newParent)))},success:function(){r(e,"success")},error:function(){r(e,"failure")}})}function u(t,a,o,s){var l,c,p,u={action:"pb_update_post_visibility",post_ids:t,_ajax_nonce:PB_OrganizeToken.postVisibilityNonce};n.ajax({url:ajaxurl,type:"POST",data:Object.assign(u,(l={},c=o,p=s,c in l?Object.defineProperty(l,c,{value:p,enumerable:!0,configurable:!0,writable:!0}):l[c]=p,l)),beforeSend:function(){i({post_type:a})},success:function(t){r({post_type:a},"success"),function(){var t={action:"pb_update_word_count_for_export",_ajax_nonce:PB_OrganizeToken.wordCountNonce};n.post(ajaxurl,t,(function(t){var a=parseInt(n("#wc-selected-for-export").text(),10);new e("wc-selected-for-export",t,{startVal:a,separator:""}).start()}))}()},error:function(){r({post_type:a},"failure")}})}function d(t,e,a){n.ajax({url:ajaxurl,type:"POST",data:{action:"pb_update_post_title_visibility",post_ids:t,show_title:a,_ajax_nonce:PB_OrganizeToken.showTitleNonce},beforeSend:function(){i({post_type:e})},success:function(t){r({post_type:e},"success")},error:function(){r({post_type:e},"failure")}})}n(document).ready((function(){n(".allow-bulk-operations #front-matter").sortable(a.organize.sortableOptions).disableSelection(),n(".allow-bulk-operations table#back-matter").sortable(a.organize.sortableOptions).disableSelection(),n(".allow-bulk-operations table.chapters").sortable(Object.assign(a.organize.sortableOptions,{connectWith:".chapters"})).disableSelection(),n("input[name=blog_public]").on("change",(function(t){var e,a=n(".publicize-alert"),o=n(".publicize-alert > span");e=1===parseInt(t.currentTarget.value,10)?1:0,n.ajax({url:ajaxurl,type:"POST",data:{action:"pb_update_global_privacy_options",blog_public:e,_ajax_nonce:PB_OrganizeToken.privacyNonce},beforeSend:function(){i("book")},success:function(){0===e?(a.removeClass("public").addClass("private"),o.text(PB_OrganizeToken.bookPrivate)):1===e&&(a.removeClass("private").addClass("public"),o.text(PB_OrganizeToken.bookPublic)),r("book","success")},error:function(){r("book","failure")}})})),n(".web_visibility, .export_visibility").on("change",(function(){var t,e=s(n(this).parents("tr")),a=0;n(this).is(":checked")&&(a=1),n(this).is('[id^="export_visibility"]')?t="export":n(this).is('[id^="web_visibility"]')&&(t="web"),u(e.id,e.post_type,t,a)})),n(".show_title").on("change",(function(t){var e=s(n(t.target).parents("tr")),a="";n(t.currentTarget).is(":checked")&&(a="on"),d(e.id,e.post_type,a)})),n(document).on("click",".move-up",(function(t){var e=n(t.target).parents("tr"),i=n(t.target).parents("table");if(a.organize.oldParent=i.attr("id"),e.is("tr:first-of-type")&&i.is("[id^=part]")&&i.prev("[id^=part]").length){var r=o(i,"prev");a.organize.newParent=r.attr("id"),r.append(e),p(e)}else a.organize.newParent=i.attr("id"),e.prev().before(e),p(e)})),n(document).on("click",".move-down",(function(t){var e=n(t.target).parents("tr"),i=n(t.target).parents("table");if(a.organize.oldParent=i.attr("id"),e.is("tr:last-of-type")&&i.is("[id^=part]")&&i.next("[id^=part]").length){var r=o(i,"next");a.organize.newParent=r.attr("id"),r.prepend(e),p(e)}else a.organize.newParent=i.attr("id"),e.next().after(e),p(e)})),n('.allow-bulk-operations table thead th span[id$="show_title"]').on("click",(function(t){var e=n(t.target).attr("id");e=e.replace("-","");var i=n(t.target).parents("table"),r=i.attr("id").split("_")[0];"part"===r&&(r="chapter");var o=l(i);a.organize.bulkToggle[e]?(i.find('tr td.column-showtitle input[type="checkbox"]').prop("checked",!1),a.organize.bulkToggle[e]=!1,d(o.join(),r,"")):(i.find('tr td.column-showtitle input[type="checkbox"]').prop("checked",!0),a.organize.bulkToggle[e]=!0,d(o.join(),r,"on"))})),n('.allow-bulk-operations table thead th span[id$="visibility"]').on("click",(function(t){var e=n(t.target).attr("id"),i=(e=e.replace("-","")).split("_");i=i[i.length-2];var r=n(t.target).parents("table"),o=r.attr("id").split("_")[0];"part"===o&&(o="chapter");var s=l(r);a.organize.bulkToggle[e]?(r.find("tr td.column-".concat(i," input[type=checkbox]")).prop("checked",!1),a.organize.bulkToggle[e]=!1,u(s.join(),o,i,0)):(r.find("tr td.column-".concat(i,' input[type="checkbox"]')).prop("checked",!0),a.organize.bulkToggle[e]=!0,u(s.join(),o,i,1))})),n(window).on("beforeunload",(function(){if(n.active>0)return"Changes you made may not be saved..."}))}))})();