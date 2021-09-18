
/**
 * 
 * @param {string} email Email to be validated 
 * @returns {boolean} true if email is valid else false
 */
export const isEmailValid = function (email) {

	const validationRegex = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g);
	return validationRegex.test(email);

};

/**
 * 
 * @param {string} password Password to be validated
 */
export const isPasswordValid = function (password) {

	const validationRegex = /(^(?=.*[~|`|!|@|#|$|%|^|&|*|(|)|_|=|+|-])[0-9a-zA-Z~`!@#$%^&*()_=+-]{10,})/g;
	return validationRegex.test(password);

};

/**
 * @param {string} text Check if only contain text
 * @returns {boolean} true if text is valid or false
 */
export const isTextValid = function (text) {
	const validationRegex = new RegExp(/[a-zA-Z]{3,}/);
	return text ? validationRegex.test(text) : false;
};

/**
 * @param {Number} number Check if only contain text
 * @returns {boolean} true if text is valid or false
 */
export const isNumberValid = function (number) {
	// console.log(number, "number length");
	if (number) {
		if (number.length == 11) {
			const validationRegex = new RegExp(/[0-9]/);
			return validationRegex.test(number);
		}
		else {
			return false;
		}
	}

};

/**
 * 
 * @param {string} cname Cookie name
 * @param {string} cvalue Cookie value
 * @param {number} exdays Cookie expiration days
 */
export const setCookie = function (cname, cvalue, exdays) {
	// console.log("asdasdasd");
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = `${cname}=${cvalue};${expires};path=/`;
};

/**
 * 
 * @param {string} cname Cookie name
 * @returns 
 */
export const getCookie = function (cname) {

	var ca = document.cookie.split(";");
	const token = ca.find(c => {

		return c.replace(" ", "").split("=")[0] === cname;

	});

	if (!token) {
		return "";
	}

	return token.split("=")[1];

};

/**
	 * 
	 * @param {short date "2020-02-23"} date 
	 * @returns long date string "Wed 2, 2020"
	 */
export const convertToLongDate = function (date) {
	var msec = Date.parse(date);
	return new Date(msec).toDateString();
};

/**
 * 
 * @param {string} cname Cookie name
 */
export const removeCookie = function (cname) {
	document.cookie = cname + "=; Max-Age=-99999999;";
};

function deleteCookie(name) {
	setCookie(name, "", -1);
}

export const removeAllCookies = function () {
	var cookies = document.cookie.split(";");
	cookies.map((cookie) => {
		deleteCookie(cookie.split("=")[0]);
	});
	// for (var i = 0; i < cookies.length; i++)

};


/**
 * 
 * @param {Number} num Number that need to be formated
 * @returns 
 */
export const numberFormatter = function (num) {

	if (num >= 1000000000000000) {
		return (num / 1000000000000000).toFixed(1).replace(/\.0$/, "") + "P";
	}
	if (num >= 1000000000000) {
		return (num / 1000000000000).toFixed(1).replace(/\.0$/, "") + "T";
	}
	if (num >= 1000000000) {
		return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
	}
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
	}
	return num;
};


/**
 * 
 * @summary This function will perform fetch api request and return result or error
 * @param {string} path request url path
 * @param {string} method Request method
 * @param {object} auth AuthContext for the app
 * @param {object} bodyData Request body data
 * @returns 
 */
export const openURL = async function (baseURL, path, method, authContext, bodyData) {

	if (!authContext || !method) {
		return { error: { message: "Unauthorized request" } };
	}

	const requesOptions = {
		method: method,
		headers: {
			"Accept": "application/json",
			"Authorization": `Bearer ${authContext.access_token}`,
		},
	};

	if ((method !== "GET" || method !== "DELETE") && bodyData) {
		if (!(bodyData instanceof FormData)) {
			requesOptions.headers["Content-Type"] = "application/json";
			requesOptions["body"] = JSON.stringify(bodyData);
		} else {
			requesOptions["body"] = bodyData;
		}
	}

	const { expiration_timestamp } = authContext;
	const timestamp = Math.floor(Date.now() / 1000);
	if (timestamp > expiration_timestamp) {
		await authContext.authRefresh();
	}

	try {

		const response = await fetch(`${baseURL}${path}`, requesOptions);
		const json = await response.json();
		if (!response.ok) {
			return { error: json };
		}

		return { result: json };
	}
	catch (err) {
		// console.log("Fetch Error:", err);
		return { error: "Something went wrong" };
	}

};

export const getUnauthorizedURL = async function (baseURL, path, headers) {

	if (!headers) {
		return { error: { message: "Unauthorized request" } };
	}

	const requesOptions = {
		method: "GET",
		headers: {
			"Accept": "application/json",
			"user": JSON.stringify(headers)
		},
	};

	try {

		const response = await fetch(`${baseURL}${path}`, requesOptions);
		const json = await response.json();
		if (!response.ok) {
			return { error: json };
		}

		return { result: json };
	}
	catch (err) {
		return { error: "Something went wrong" };
	}

};


export const imageUploadURL = async function (baseURL, path, authContext, images) {

	if (!authContext) {
		return { error: { message: "Unauthorized request" } };
	}
	// console.log(images, Object.keys(images).length , "Going to Upload");
	const formData = new FormData();
	if (Object.keys(images).length > 0) {
		// eslint-disable-next-line no-unused-vars
		for (const [_, value] of Object.entries(images)) {
			formData.append(`images`, value);
		}
	}
	// console.log(formData.get("images"), "Image");
	const requesOptions = {
		method: "POST",
		headers: {
			"Accept": "application/json",
			"Authorization": `Bearer ${authContext.access_token}`

		},
	};

	requesOptions["body"] = formData;

	const { expiration_timestamp } = authContext;
	const timestamp = Math.floor(Date.now() / 1000);
	if (timestamp > expiration_timestamp) {
		await authContext.authRefresh();
	}

	try {

		const response = await fetch(`${baseURL}${path}`, requesOptions);
		const json = await response.json();
		if (!response.ok) {
			return { error: json };
		}

		return { result: json };
	}
	catch (err) {
		// console.log("Fetch Error:", err);
		return { error: "Something went wrong" };
	}

};