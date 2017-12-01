var codex=codex||{};codex.notes=function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=6)}([function(e,t,n){"use strict";function o(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=function(){function e(){r(this,e)}return i(e,null,[{key:"make",value:function(e,t,n){var r=document.createElement(e);if(Array.isArray(t)){var i;(i=r.classList).add.apply(i,o(t))}else t&&r.classList.add(t);for(var a in n)r[a]=n[a];return r}},{key:"replace",value:function(e,t){return e.parentNode.replaceChild(t,e)}},{key:"get",value:function(e){return document.getElementById(e)}},{key:"loadResource",value:function(e,t,n){return new Promise(function(o,r){e&&["JS","CSS"].includes(e)||r("Unexpected resource type passed. «CSS» or «JS» expected, «"+e+"» passed");var i=void 0;n?document.getElementById("cdx-resourse-"+e.toLowerCase()+"-"+n)&&o(t):r("Instance name is missed"),"JS"===e?(i=document.createElement("script"),i.async=!0,i.defer=!0,i.charset="utf-8"):(i=document.createElement("link"),i.rel="stylesheet"),i.id="cdx-resourse-"+e.toLowerCase()+"-"+n;var a="Resource loading "+e+" "+n;console.time(a),i.onload=function(){console.timeEnd(a),o(t)},i.onerror=function(){console.timeEnd(a),r(t)},"JS"===e?i.src=t:i.href=t,document.head.appendChild(i)})}}]),e}();t.default=a},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=n(0).default,a=n(8).default,l=n(9).default,s=function(){function e(){o(this,e),this.deleteButton=i.get("delete-button"),this.titleEl=document.getElementById("note-title"),this.dateEl=document.getElementById("note-date"),this.showSavedIndicatorTimer=null,this.autoresizedTitle||(this.autoresizedTitle=new a([this.titleEl]))}return r(e,[{key:"save",value:function(){var e=this;this.deleteButton.classList.remove("hide"),codex.editor.saver.save().then(function(t){var n={data:t,title:e.titleEl.value.trim(),folderId:codex.notes.aside.currentFolderId},o=document.getElementById("save-indicator");e.showSavedIndicatorTimer&&window.clearTimeout(e.showSavedIndicatorTimer),o.classList.add("saved"),e.showSavedIndicatorTimer=window.setTimeout(function(){o.classList.remove("saved")},500),window.ipcRenderer.send("save note",{note:n})}).catch(function(e){return console.log("Error while saving note: ",e)})}},{key:"addToMenu",value:function(e){var t=e.note;codex.editor.state.blocks.id=t.id,codex.notes.aside.addMenuItem(t)}},{key:"render",value:function(e){codex.editor.content.clear(!0),this.titleEl.value=e.title;var t=new Date(e.data.time);this.dateEl.textContent=t.toLocaleDateString("en-US",{day:"numeric",month:"short",hour:"numeric",minute:"numeric",hour12:!1}),codex.editor.content.load(e.data),this.deleteButton.classList.remove("hide"),this.autoresizedTitle&&this.autoresizedTitle.destroy(),this.autoresizedTitle=new a([this.titleEl])}},{key:"clear",value:function(){codex.editor.content.clear(!0),this.titleEl.value="",this.dateEl.textContent="",codex.editor.ui.addInitialBlock(),this.deleteButton.classList.add("hide"),this.autoresizedTitle.destroy()}},{key:"delete",value:function(){var e=codex.editor.state.blocks.id;if(e&&l.confirm("Are you sure you want to delete this note?")){if(!window.ipcRenderer.sendSync("delete note",{id:e,folderId:codex.notes.aside.currentFolderId}))return!1;codex.notes.aside.removeMenuItem(e),this.clear()}}},{key:"titleKeydownHandler",value:function(t,n){13==n.keyCode&&(n.preventDefault(),e.focusEditor())}}],[{key:"focusEditor",value:function(){window.setTimeout(function(){document.querySelector(".ce-redactor").click()},10)}}]),e}();t.default=s},function(e,t){e.exports=require("electron")},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=n(11),l=o(a),s=n(1),u=o(s),d=n(10),c=o(d),f=n(7).default,h=n(0).default,v=function(){function e(){var t=this;r(this,e),this.CSS={notesMenuLoading:"notes-list--loading"};var n=document.querySelector('[name="js-notes-menu"]'),o=document.querySelector('[name="js-folders-menu"]');this.swiper=new f,this.currentFolderId=null,n.classList.add(this.CSS.notesMenuLoading),o.classList.add(this.CSS.notesMenuLoading),this.loadNotes(),this.loadFolders(),window.ipcRenderer.on("update folders list",function(e,n){var r=n.userFolders;o.classList.remove(t.CSS.notesMenuLoading),r.forEach(function(e){return t.addFolder(e)})}),window.ipcRenderer.on("update notes list",function(e,o){var r=o.notes;n.classList.remove(t.CSS.notesMenuLoading),r.forEach(function(e){return t.addMenuItem(e)})}),document.querySelectorAll('[name="js-new-note-button"],\n                                                    [name="js-new-note-button-in-folder"]').forEach(function(e){e.addEventListener("click",function(){return t.newNoteButtonClicked(e)})}),this.newFolderButton=document.querySelector('[name="js-new-folder-button"]'),this.newFolderField=document.querySelector('[name="js-new-folder-field"]');var i=this.newFolderField.querySelector("input");this.newFolderButton.addEventListener("click",function(e){return t.newFolderButtonClicked(e)}),i.addEventListener("keydown",function(e){return t.newFolderInputFilled(e)}),h.get("folder-close-zone").addEventListener("click",function(){t.closeFolder()}),this.activateScrollableGradient(),this.folderSettings=new c.default}return i(e,[{key:"loadNotes",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return new Promise(function(t){t(window.ipcRenderer.sendSync("load notes list",e))})}},{key:"loadFolders",value:function(){window.ipcRenderer.send("load folders list")}},{key:"newNoteButtonClicked",value:function(e){var t=e.dataset.folderId;this.currentFolderId=t||null,u.default.focusEditor(),codex.notes.note.clear()}},{key:"newFolderButtonClicked",value:function(e){var t=e.target,n=this.newFolderField.querySelector("input");t.classList.add("hide"),this.newFolderField.classList.remove("hide"),n.focus()}},{key:"newFolderInputFilled",value:function(e){if("Enter"===e.key){var t=e.target,n=t.value.trim();if(n){var o=window.ipcRenderer.sendSync("create folder",n);this.addFolder(o),t.value="",this.newFolderField.classList.add("hide"),this.newFolderButton.classList.remove("hide")}}}},{key:"addMenuItem",value:function(e){var t=this,n=void 0;if(e.folderId){if(e.folderId!==this.currentFolderId)return void console.log("Note added to closed folder: %o",e.folderId);n=document.querySelector('[name="js-folder-notes-menu"]')}else n=document.querySelector('[name="js-notes-menu"]');var o=n.querySelector('[data-id="'+e.id+'"]');if(o)return void(o.textContent=this.createMenuItemTitle(e.title));var r=this.makeMenuItem(e.title,{id:e.id});n.insertAdjacentElement("afterbegin",r),r.addEventListener("click",function(e){return t.menuItemClicked(e)})}},{key:"addFolder",value:function(e){var t=this,n=document.querySelector('[name="js-folders-menu"]'),o=this.makeMenuItem(e.name,{folderId:e.id});n.insertAdjacentElement("afterbegin",o),o.addEventListener("click",function(e){return t.folderClicked(e.target)})}},{key:"makeMenuItem",value:function(e,t){e=this.createMenuItemTitle(e);var n=h.make("li",null,{textContent:e});for(var o in t)n.dataset[o]=t[o];return n}},{key:"createMenuItemTitle",value:function(e){return e.length>68&&(e=e.substring(0,68)+"…"),e}},{key:"removeMenuItem",value:function(e){document.querySelectorAll('[name="js-notes-menu"], [name="js-folder-notes-menu"]').forEach(function(t){var n=t.querySelector('[data-id="'+e+'"]');n&&n.remove()})}},{key:"removeFolderMenu",value:function(e){var t=document.querySelector('[name="js-folders-menu"]');if(!t)return!1;var n=t.querySelector('[data-folder-id="'+e+'"]');n&&n.remove()}},{key:"menuItemClicked",value:function(e){var t=e.target,n=t.dataset.id,o=window.ipcRenderer.sendSync("get note",{id:n});codex.notes.note.render(o),document.querySelector('[name="editor-view"]').scrollIntoView()}},{key:"folderClicked",value:function(e){var t=e.dataset.folderId;new l.default(t,e.textContent),this.currentFolderId=t,this.swiper.open()}},{key:"closeFolder",value:function(){this.swiper.close()}},{key:"activateScrollableGradient",value:function(){var e=function(e){var t=e.target,n=e.target.parentNode;t.scrollTop>5?n.classList.add("aside__scrollable--scrolled"):n.classList.remove("aside__scrollable--scrolled")};document.querySelectorAll('[name="js-scrollable"]').forEach(function(t){t.addEventListener("scroll",e)})}},{key:"currentFolder",get:function(){return this.currentFolderId},set:function(e){this.currentFolderId=e}}]),e}();t.default=v},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=n(0).default,a=function(){function e(){var t=this;o(this,e),this.path="../public/codex.editor/",this.plugins=["paragraph","header"],this.autosaveTimer=null,this.loadEditor().then(function(){return t.loadPlugins()}).then(function(){return t.init()})}return r(e,[{key:"loadEditor",value:function(){return Promise.all([i.loadResource("JS",this.path+"codex-editor.js","codex-editor"),i.loadResource("CSS",this.path+"codex-editor.css","codex-editor")]).catch(function(e){return console.warn("Cannot load Codex Editor sources: ",e)}).then(function(){return console.log("CodeX Editor loaded")})}},{key:"loadPlugins",value:function(){var e=this,t=[];return this.plugins.forEach(function(n){t.push.apply(t,[i.loadResource("JS",e.path+"plugins/"+n+"/"+n+".js",n),i.loadResource("CSS",e.path+"plugins/"+n+"/"+n+".css",n)])}),Promise.all(t).catch(function(e){return console.warn("Cannot load plugin: ",e)}).then(function(){return console.log("Plugins loaded")})}},{key:"init",value:function(){var e=this,t={holderId:"codex-editor",initialBlockPlugin:"paragraph",hideToolbar:!1,placeholder:"Your story",tools:{}};this.plugins.forEach(function(e){if(!window[e])return void console.warn("Plugin "+e+" does not ready");t.tools[e]={type:e,iconClassname:"ce-icon-"+e,render:window[e].render,validate:window[e].validate,save:window[e].save,destroy:window[e].destroy,makeSettings:window[e].makeSettings}}),t.tools.paragraph&&(t.tools.paragraph.allowedToPaste=!0,t.tools.paragraph.showInlineToolbar=!0,t.tools.paragraph.allowRenderOnPaste=!0),t.tools.header&&(t.tools.header.displayInToolbox=!0),codex.editor.start(t),window.setTimeout(function(){e.enableAutosave()},500)}},{key:"autosave",value:function(){this.autosaveTimer&&window.clearTimeout(this.autosaveTimer),this.autosaveTimer=window.setTimeout(function(){codex.notes.note.save()},500)}},{key:"enableAutosave",value:function(){document.getElementById("note-title").addEventListener("keyup",this.autosave.bind(this)),codex.editor.nodes.redactor.addEventListener("keyup",this.autosave.bind(this))}},{key:"disableAutosave",value:function(){codex.editor.nodes.redactor.removeEventListener("keyup",this.autosave.bind(this))}}]),e}();t.default=a},function(e,t){},function(e,t,n){"use strict";var o=n(2),r=n(4).default,i=n(3).default,a=n(1).default;window.ipcRenderer=o.ipcRenderer,o.webFrame.setZoomLevelLimits(1,1),n(5);var l=function(){codex.notes.editor=new r,codex.notes.aside=new i,codex.notes.note=new a,window.ipcRenderer.on("note saved",function(e,t){codex.notes.note.addToMenu(t)})},s=function(e){if("A"===e.target.tagName&&e.target.href)return e.target.closest(".editor")?void((e.metaKey||e.ctrlKey)&&o.shell.openExternal(e.target.href)):void o.shell.openExternal(e.target.href)};e.exports=function(){return document.addEventListener("DOMContentLoaded",l,!1),document.addEventListener("click",s),{}}()},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=n(12).default,a=function(){function e(){var t=this;o(this,e),this.CSS={wrapper:"aside-swiper",toggled:"aside-swiper--toggled",left:"aside-swiper__left",right:"aside-swiper__right"},this.wrapper=document.querySelector("."+this.CSS.wrapper),this.left=this.wrapper.querySelector("."+this.CSS.left),this.right=this.wrapper.querySelector("."+this.CSS.right),new i(this.wrapper,function(e){e?t.open():t.close()})}return r(e,[{key:"open",value:function(){this.wrapper.classList.add(this.CSS.toggled)}},{key:"close",value:function(){this.wrapper.classList.remove(this.CSS.toggled)}}]),e}();t.default=a},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=function(){function e(t){o(this,e),this.elements=t||[];for(var n=0;n<this.elements.length;n++)this.addResizer(this.elements[n])}return r(e,[{key:"addResizer",value:function(e){e.value.trim()?e.style.height=e.scrollHeight+"px":e.style.height="auto",e.addEventListener("keydown",this.enterKeyPressed,!1),e.addEventListener("input",this.resize.bind(this,e),!1)}},{key:"enterKeyPressed",value:function(e){13===e.keyCode&&e.preventDefault()}},{key:"resize",value:function(e){e.style.height="auto",e.style.height=e.scrollHeight+"px"}},{key:"removeResizer",value:function(e){e.removeEventListener("keydown",this.enterKeyPressed),e.removeEventListener("input",this.resize)}},{key:"destroy",value:function(){for(var e=0;e<this.elements.length;e++)this.removeResizer(this.elements[e]),this.elements[e].style.height="auto";this.elements=[]}}]),e}();t.default=i},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=n(2).remote,a=function(){function e(){o(this,e)}return r(e,null,[{key:"confirm",value:function(e){var t=i.getCurrentWindow();return t.setSheetOffset(30,t.width/2),0===i.dialog.showMessageBox(t,{type:"question",buttons:["Yes","No"],title:"Confirm",message:e})}}]),e}();t.default=a},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=function(){function e(){var t=this;o(this,e),this.toggler=document.getElementById("js-folder-settings-toggler"),this.closeButton=document.getElementById("js-close-folder"),this.removeFolderButton=document.getElementById("js-delete-folder"),this.toggler.addEventListener("click",function(){t.toggle()}),this.closeButton.addEventListener("click",function(){t.close()}),this.removeFolderButton.addEventListener("click",function(){t.removeFolderClicked()})}return r(e,[{key:"open",value:function(){document.body.classList.add(e.CSS.panelOpenedModifier),this.opened=!0}},{key:"close",value:function(){document.body.classList.remove(e.CSS.panelOpenedModifier),this.opened=!1}},{key:"toggle",value:function(){this.opened?this.close():this.open()}},{key:"removeFolderClicked",value:function(){console.log("removeFolderClicked")}}],[{key:"CSS",get:function(){return{panelOpenedModifier:"folder-settings-opened"}}}]),e}();t.default=i},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=n(0).default,a=function(){function e(t,n){var r=this;o(this,e),this.id=t,this.name=n,codex.notes.aside.loadNotes(t).then(function(e){var t=e.notes,n=e.folder;r.notes=t,r.name=n.name}).then(function(){return r.fillHeader()}).then(function(){return r.updateNotesList()}),this.notesListWrapper=document.querySelector('[name="js-folder-notes-menu"]'),this.newNoteButton=document.querySelector('[name="js-new-note-button-in-folder"]'),this.newNoteButton.dataset.folderId=this.id}return r(e,[{key:"fillHeader",value:function(){i.get("js-folder-name").textContent=this.name}},{key:"updateNotesList",value:function(){this.notes.length||(this.notesListWrapper.innerHTML="")}}]),e}();t.default=a},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=function(){function e(t,n){var r=this;o(this,e),this.el=t,this.callback=n,this.swiped=!1,this.wheelTimeout=null,this.el.addEventListener("mousewheel",function(e){r.detectSwipe(e)})}return r(e,[{key:"detectSwipe",value:function(e){var t=this,n=0===e.wheelDeltaY,o=e.wheelDeltaX>30||e.wheelDeltaX<-30;n&&o&&(this.swiped||(this.swiped=!0,this.callback(e.deltaX>0),this.wheelTimeout=window.setTimeout(function(){t.swiped=!1},1e3)))}}]),e}();t.default=i}]);