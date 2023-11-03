var buttons = document.getElementsByTagName('button');

for(var i = 0; i < buttons.length; i += 1) {
	var button = buttons[i];
	var buttonName = button.innerHTML;
	button.addEventListener('click', function() {
		console.log(buttonName);
	});
}
