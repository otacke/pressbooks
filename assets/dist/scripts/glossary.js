!function(e){var t={};function r(a){if(t[a])return t[a].exports;var n=t[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=t,r.d=function(e,t,a){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(a,n,function(t){return e[t]}.bind(null,n));return a},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/",r(r.s=11)}({11:function(e,t,r){e.exports=r("VGC3")},VGC3:function(module,exports){!function(){tinymce.create("tinymce.plugins.glossary",{init:function init(ed,url){var glossaryTermValues=jQuery.parseJSON(PB_GlossaryToken.listbox_values);function termValue(e){for(var t in glossaryTermValues)if(glossaryTermValues.hasOwnProperty(t)&&glossaryTermValues[t].text.toLowerCase().trim()===e.toLowerCase().trim())return glossaryTermValues[t].value;return""}function termName(e){for(var t in glossaryTermValues)if(glossaryTermValues.hasOwnProperty(t)&&glossaryTermValues[t].value===e)return glossaryTermValues[t].text;return""}ed.addButton("glossary",{title:PB_GlossaryToken.glossary_button_title,text:"GL",icon:!1,onclick:function onclick(){var mySelection=ed.selection.getContent(),listValue=termValue(mySelection),termExistsMessage="",termExists=""!==listValue,termAutofillValue=termExists?"":mySelection,myActiveTab;if(listValue)myActiveTab=1;else if(myActiveTab=0,mySelection){var templateString1=mySelection.trim();termExistsMessage=eval("`"+PB_GlossaryToken.not_found.replace(/`/g,"")+"`")}var myWindow=tinymce.activeEditor.windowManager.open({title:PB_GlossaryToken.window_title,bodyType:"tabpanel",body:[{title:PB_GlossaryToken.tab0_title,type:"form",items:[{type:"container",name:"container",html:termExistsMessage},{name:"title",type:"textbox",label:PB_GlossaryToken.term_title,value:termAutofillValue},{name:"body",type:"textbox",label:PB_GlossaryToken.description,multiline:!0,minHeight:100}]},{title:PB_GlossaryToken.tab1_title,type:"form",items:[{type:"listbox",name:"term",label:PB_GlossaryToken.select_a_term,values:glossaryTermValues,value:listValue}]}],buttons:[{text:PB_GlossaryToken.cancel,onclick:"close"},{text:PB_GlossaryToken.insert,subtype:"primary",onclick:"submit"}],onsubmit:function(e){if("t0"===this.find("tabpanel")[0].activeTabId){if(!e.data.title||0===e.data.title.length)return alert(PB_GlossaryToken.term_is_empty),!1;if(termValue(e.data.title))return alert(PB_GlossaryToken.term_already_exists),!1;wp.api.loadPromise.done((function(){var t=new wp.api.models.Glossary({title:e.data.title,content:e.data.body,status:"publish"});t.save().done((function(){mySelection?ed.selection.setContent('[pb_glossary id="'+t.id+'"]'+mySelection+"[/pb_glossary]"):ed.selection.setContent('[pb_glossary id="'+t.id+'"]'+e.data.title+"[/pb_glossary]"),glossaryTermValues.push({text:e.data.title,value:t.id})}))}))}else{if(!e.data.term||0===e.data.term.length)return alert(PB_GlossaryToken.term_not_selected),!1;mySelection?ed.selection.setContent('[pb_glossary id="'+e.data.term+'"]'+mySelection+"[/pb_glossary]"):ed.selection.setContent('[pb_glossary id="'+e.data.term+'"]'+termName(e.data.term)+"[/pb_glossary]")}}});myWindow.find("tabpanel")[0].activateTab(myActiveTab)}})},createControl:function(e,t){return null}}),tinymce.PluginManager.add("glossary",tinymce.plugins.glossary)}()}});