module.exports = {
    "extends": ["standard", "plugin:jest/recommended"],
    rules: {
        'indent': [4, 4, {
            'SwitchCase': 2 // 针对switch case的缩进
        }],
    }
};
