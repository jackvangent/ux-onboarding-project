function preparePage() {
	document.getElementById("minimize").onclick = function() {
		if (document.getElementById("innerInfo").style.display === "none") {
			document.getElementById("innerInfo").style.display = "block";
			document.getElementById("minimize").innerHTML = "collapse";
		} else {
			document.getElementById("innerInfo").style.display = "none";
			document.getElementById("minimize").innerHTML = "expand";
		}
	};
	document.getElementById("innerInfo").style.display = "block";
}

window.onload = function() {
	preparePage();
};