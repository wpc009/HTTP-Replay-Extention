var devId;
chrome.extension.onMessage.addListener(function(msg,sender){
	//console.debug(sender);
	var args = JSON.parse(unescape(msg.args));
	//console.debug(msg.from);
	devId=msg.from;
	console[args[0]].apply(console,Array.prototype.slice.call(args, 1));
});

function send(str){
	chrome.extension.sendMessage(devId,str);
}