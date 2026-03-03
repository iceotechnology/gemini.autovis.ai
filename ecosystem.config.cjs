module.exports = {
    apps: [
        {
            name: "gemini-watermark-remover",
            script: "./node_modules/.bin/serve",
            args: "dist -l 3006 --no-clipboard",
            cwd: "/opt/ai/gemini.autovis.ai",
            env: {
                NODE_ENV: "production",
            },
            log_date_format: "YYYY-MM-DD HH:mm:ss",
            error_file: "./logs/error.log",
            out_file: "./logs/output.log",
            merge_logs: true,
            autorestart: true,
            max_restarts: 10,
            restart_delay: 2000,
            max_memory_restart: "200M",
        },
    ],
};
