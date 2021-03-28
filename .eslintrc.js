module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "airbnb"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
      "linebreak-style": 0,
      "global-require": 0,
      "import/no-named-as-default-member":0,
      "import/no-named-as-default": 0,
      "no-undef": 0,
      "arrow-body-style":["error", "always"],
      "import/no-unresolved": [
        2, 
        { "caseSensitive": false }
      ],
      "object-shorthand": [2, "consistent"],
      "key-spacing": ["error", { "align": "colon" }],
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "no-multi-spaces": ["error", { exceptions: { "VariableDeclarator": true } }],
      "no-param-reassign": ["error", { "props": false }],
    }
};
