const themeChanger = (theme) => {

	const r = document.querySelector(":root");
	console.log(theme, r.style.getPropertyValue("--primaryColor"));
	if (theme === "dark") {
		r.style.setProperty("--primaryColor", "white");
		r.style.setProperty("secondaryColor", "lightblue");
		r.style.setProperty("textColor", "lightblue");
	}
	else if (theme === "light") {
		r.style.setProperty("--primaryColor", "red");
		r.style.setProperty("secondaryColor", "lightblue");
		r.style.setProperty("textColor", "lightblue");
	}
};

export {
	themeChanger
};