var app=function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=4)}([function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=function(){function e(){var t=this;r(this,e),this.CSS={notesMenuLoading:"notes-list--loading"};var n=document.querySelector('[name="js-notes-menu"]');n.classList.add(this.CSS.notesMenuLoading),window.ipcRenderer.send("load notes list"),window.ipcRenderer.on("update notes list",function(r,o){var i=o.notes;n.classList.remove(t.CSS.notesMenuLoading),i.forEach(e.addMenuItem)}),document.querySelector('[name="js-new-note-button"]').addEventListener("click",function(){return t.newNoteButtonClicked.call(t)})}return o(e,[{key:"newNoteButtonClicked",value:function(){d.clear()}}],[{key:"addMenuItem",value:function(t){var n=document.querySelector('[name="js-notes-menu"]'),r=n.querySelector('[data-id="'+t.id+'"]');if(r)return void(r.textContent=t.title);var o=a.make("li",null,{textContent:t.title});o.dataset.id=t.id,n.insertAdjacentElement("afterbegin",o),o.addEventListener("click",e.menuItemClicked)}},{key:"removeMenuItem",value:function(e){var t=document.querySelector('[name="js-notes-menu"]'),n=t.querySelector('[data-id="'+e+'"]');n&&n.remove()}},{key:"menuItemClicked",value:function(){var e=this,t=e.dataset.id,n=window.ipcRenderer.sendSync("get note",{id:t});d.render(n)}}]),e}();t.default=i;var a=n(5).default,u=n(1).default,d=new u},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=function(){function e(){r(this,e),window.ipcRenderer.on("note saved",this.addToMenu),this.deleteNoteButton=document.getElementById("delete-button"),this.deleteNoteButton.addEventListener("click",this.delete.bind(this))}return o(e,[{key:"save",value:function(){this.deleteNoteButton.classList.remove("hide"),codex.editor.saver.save().then(function(e){window.ipcRenderer.send("save note",{noteData:e})})}},{key:"autosave",value:function(){this.autosaveTimer&&window.clearTimeout(this.autosaveTimer),this.autosaveTimer=window.setTimeout(this.save.bind(this),200)}},{key:"enableAutosave",value:function(){codex.editor.nodes.redactor.addEventListener("keyup",this.autosave.bind(this))}},{key:"disableAutosave",value:function(){codex.editor.nodes.redactor.removeEventListener("keyup",this.autosave.bind(this))}},{key:"addToMenu",value:function(e,t){var n=t.note;codex.editor.state.blocks.id=n.id,a.addMenuItem(n)}},{key:"render",value:function(e){codex.editor.content.clear(!0),codex.editor.content.load(e),this.deleteNoteButton.classList.remove("hide")}},{key:"clear",value:function(){codex.editor.content.clear(!0),codex.editor.ui.addInitialBlock(),this.deleteNoteButton.classList.add("hide")}},{key:"delete",value:function(){var e=codex.editor.state.blocks.id;e&&(this.clear(),a.removeMenuItem(e),window.ipcRenderer.send("delete note",{id:e}))}}]),e}();t.default=i;var a=n(0).default},function(e,t){},function(e,t){e.exports=require("electron")},function(e,t,n){"use strict";var r=n(3);window.ipcRenderer=r.ipcRenderer,r.webFrame.setZoomLevelLimits(1,1),n(2);var o=function(){new(0,n(0).default),(new(0,n(1).default)).enableAutosave()};e.exports=function(){document.addEventListener("DOMContentLoaded",o,!1)}()},function(e,t,n){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=function(){function e(){o(this,e)}return i(e,null,[{key:"make",value:function(e,t,n){var o=document.createElement(e);if(Array.isArray(t)){var i;(i=o.classList).add.apply(i,r(t))}else t&&o.classList.add(t);for(var a in n)o[a]=n[a];return o}},{key:"replace",value:function(e,t){return e.parentNode.replaceChild(t,e)}}]),e}();t.default=a}]);