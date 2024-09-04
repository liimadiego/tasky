module.exports = {
    apps: [
        {
            name: 'tasky-manager',
            script: 'serve',
            args: 'build -s',
            env: {
                PORT: 3000,
            },
        },
    ],
};