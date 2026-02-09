module.exports = {
  apps: [
    {
      name: 'hxl-preview',
      script: 'python3',
      args: '-m http.server 3000',
      cwd: '/home/user/SuperFranchise_SW',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork'
    }
  ]
}
