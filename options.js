'use strict';
function save_options() {
	var size = document.getElementById('size').value;
	var number = document.getElementById('number').value;
	chrome.storage.sync.set({
		emotesSize: size,
		numberOfEmotes: number
	}, function () {
		var status = document.getElementById('status');
		status.textContent = 'Options saved.';
		setTimeout(function () {
			status.textContent = '';
		}, 750);
	});
}

function restore_options() {
	chrome.storage.sync.get({
		emotesSize: 'small',
		numberOfEmotes: 10
	}, function (items) {
		document.getElementById('size').value = items.emotesSize;
		document.getElementById('number').value = items.numberOfEmotes;
	});
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
	save_options);
