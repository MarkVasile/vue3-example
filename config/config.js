/*
 * these variables are exported and made available to Vue scripts, via the DEFINE webpack plugin
 * (for example see dev_local exports in webpack.base.conf
 */
module.exports = {
  dev: { // prod server built, but running on dev server
    env: 'dev',
    local: false,
  },
  dev_local: { // local dev env
    env: 'dev',
    local: true,
  },
  prod: { // prod server
    env: 'prod',
    local: false,
  },
  uat: { // test server
    env: 'uat',
    local: false,
  },
}
