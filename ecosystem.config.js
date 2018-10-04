module.exports = {
  apps: [{
    name: 'app',
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
      PORT: 8080,
      NODE_ENV: 'production',
      URL: '0.0.0.0',
      USERNAME: 'ai-prod',
      PASSWORD: 'aiProd5',
      MHOST: "ds121593.mlab.com",
      MPORT: "21593",
      DB: "ai-prod",
      get connectionString() {
        return `mongodb://${this.USERNAME}:${this.PASSWORD}@${this.MHOST}:${this.MPORT}/${this.DB}`
      }
    }
  }],

  // deploy: {
  //   production: {
  //     user: 'node',
  //     host: '212.83.163.1',
  //     ref: 'origin/master',
  //     repo: 'git@github.com:repo.git',
  //     path: '/var/www/production',
  //     'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
  //   }
  // }
};

//mongodb://<dbuser>:<dbpassword>@ds121593.mlab.com:21593/ai-prod