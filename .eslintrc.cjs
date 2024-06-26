module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:vue/vue3-essential",
        "prettier"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "vue",
        "prettier"
    ],
    "rules": {
        // Чтобы ESLint не спорил с правилами prettier, при использовании плагина prettier
        "prettier/prettier": [
            "error",
            {
                "endOfLine": "auto",
                "singleQuote": false
            }
        ],
        // https://eslint.org/docs/rules/no-unused-vars
        "no-unused-vars": [
            "warn",
            {
                // исключение для JSDoc документации
                "varsIgnorePattern": "^defs"
            }
        ],
        "@typescript-eslint/no-unused-vars": [
            "warn",
            {
                // исключение для JSDoc документации
                "varsIgnorePattern": "^defs"
            }
        ],
    }
}
