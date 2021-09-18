// eslint-disable-next-line no-undef
module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended"
	],
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 12,
		"sourceType": "module"
	},
	"plugins": [
		"react"
	],
	"rules": {
		"indent": [
			"warn",
			"tab", { "SwitchCase": 1 }
		],
		"linebreak-style": [
			"warn",
			"unix"
		],
		"quotes": [
			"error",
			"double",
			{ "avoidEscape": true , "allowTemplateLiterals": true}
		],
		"semi": [
			"warn",
			"always",
		],
		"prefer-const": [
			"warn"
		],
		"no-unused-vars": [
			"warn", {"vars": "all"}
		],
		"init-declarations": [
			"warn", "always"
		]
	}
};