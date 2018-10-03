module.exports = {
  apps: [{
    name: 'AI-ML-Dashboard-Backend',
    script: 'npm',
    args: "start",
    output: './logs/pm2/out.log',
    error: './logs/pm2/error.log',
    log: './logs/pm2/combined.outerr.log',
    merge_logs: true,
    watch: true,
    ignore_watch: ["logs", "node_modules", ".tmp", ".idea"],
    // log_type: 'json',
    env: {
      PORT: 5507,
      NODE_ENV: 'development',
      URL: 'localhost',
      MHOST: "localhost",
      MPORT: "27017",
      DB: "ai-dev",
      get connectionString() {
        return `mongodb://${this.MHOST}:${this.MPORT}/${this.DB}`
      }
    },
    env_production: {
      PORT: 5509,
      NODE_ENV: 'production',
      URL: '0.0.0.0',
      MHOST: "localhost",
      MPORT: "27017",
      DB: "ai-prod",
      get connectionString() {
        return `mongodb://${this.MHOST}:${this.MPORT}/${this.DB}`
      }
    }
  }],

  deploy: {
    production: {
      user: 'node',
      host: '212.83.163.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/production',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
