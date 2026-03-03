module.exports = {
    apps: [
        {
            name: "gemini-watermark-remover",
            script: "./server.cjs",
            cwd: "/opt/ai/gemini.autovis.ai",
            env: {
                NODE_ENV: "production",
                PORT: 3006,
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
