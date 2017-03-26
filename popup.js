'use strict';
document.addEventListener('DOMContentLoaded', function () {
	var options = {};
	function clickHandler(arg) {
		return function () {
			chrome.tabs.query({
				active: true,
				windowId: chrome.windows.WINDOW_ID_CURRENT
			}, function (tab) {
				chrome.tabs.sendMessage(tab[0].id, {
					method: "getActive",
					data: arg
				}, function (response) {});
			});
		};
	}
	function getOptions() {
		chrome.storage.sync.get({
			emotesSize: 'small',
			numberOfEmotes: 10
		}, function (items) {
			options = Object.assign({}, items);
		});
	}
	function generatePopUp() {
		if (xmlHttp.readyState !== 4 || xmlHttp.status !== 200) {
			var error = document.createTextNode("Can't get emotes list");
			document.body.appendChild(error);
			return;
		}

		var json = JSON.parse(xmlHttp.responseText);
		var template = json.template[options.emotesSize];
		var table = document.createElement('table');
		var row = document.createElement('tr');
		var i = 0;
		var emoteName;
		for (emoteName in json.emotes) {
			var cell = document.createElement('td');
			var emote = json.emotes[emoteName];
			var emoteInput = document.createElement('input');
			if (i % options.numberOfEmotes === 0) {
				table.appendChild(row);
				row = document.createElement('tr');
			}
			i++;
			emoteInput.src = template.replace("{image_id}", emote.image_id);
			emoteInput.type = "image";
			emoteInput.onclick = clickHandler(emoteName);
			cell.appendChild(emoteInput);
			row.appendChild(cell);
		}
		document.body.appendChild(table);
	}
	getOptions();
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onload = generatePopUp;
	xmlHttp.open("GET", "https://twitchemotes.com/api_cache/v2/global.json", true);
	xmlHttp.send(null);
});
