'use strict';
function setText(el, text) {
	var te = document.createEvent('TextEvent');
	te.initTextEvent('textInput', true, true, window, text);
	el.dispatchEvent(te);
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
	if (msg.method === "getActive") {
		setText(document.activeElement, " " + msg.data + " ");
		sendResponse(msg);
	}
});
