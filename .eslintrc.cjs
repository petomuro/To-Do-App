module.exports = {
    env: {
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/vue3-recommended",
        "prettier"
    ],
    plugins: [
        "@typescript-eslint"
    ],
    rules: {
        "semi": ["warn", "always"],
        "quotes": ["warn", "double"]
    },
    parserOptions: {
        parser: "@typescript-eslint/parser",
        sourceType: "module"
    }
}