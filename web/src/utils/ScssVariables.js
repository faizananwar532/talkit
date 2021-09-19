const themeChanger = (theme) => {

	const r = document.querySelector(":root");
	console.log(theme, r.style.getPropertyValue("--primaryColor"));
	if (theme === "dark") {
		// r.style.setProperty("--primaryColor", "white");
		// r.style.setProperty("secondaryColor", "lightblue");
		r.style.setProperty("textColor", "lightblue");
		r.style.setProperty("--grey9", "#ffffff");
		r.style.setProperty("--grey8", "#f8f9fa");
		r.style.setProperty("--grey7", "#e9ecef");
		r.style.setProperty("--grey6", "#dee2e6");
		r.style.setProperty("--grey5", "#ced4da");
		r.style.setProperty("--grey4", "#adb5bd");
		r.style.setProperty("--grey3", "#6c757d");
		r.style.setProperty("--grey2", "#495057");
		r.style.setProperty("--grey1", "#343a40");
		r.style.setProperty("--grey0", "#212529");
	}
	else if (theme === "light") {
		// r.style.setProperty("--primaryColor", "red");
		// r.style.setProperty("secondaryColor", "lightblue");
		r.style.setProperty("textColor", "lightblue");
		r.style.setProperty("--grey0", "#ffffff");
		r.style.setProperty("--grey1", "#f8f9fa");
		r.style.setProperty("--grey2", "#e9ecef");
		r.style.setProperty("--grey3", "#dee2e6");
		r.style.setProperty("--grey4", "#ced4da");
		r.style.setProperty("--grey5", "#adb5bd");
		r.style.setProperty("--grey6", "#6c757d");
		r.style.setProperty("--grey7", "#495057");
		r.style.setProperty("--grey8", "#343a40");
		r.style.setProperty("--grey9", "#212529");

	}
};

export {
	themeChanger
};