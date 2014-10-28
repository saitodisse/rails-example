/**
 * Documentation: http://docs.azk.io/Azkfile.js
 */

// Adds the systems that shape your system
systems({
  "rails4-azk-example": {
    // Dependent systems
    depends: [],
    // More images:  http://images.azk.io
    image: "rails:4",
    // Steps to execute before running instances
    provision: [
      "bundle install --path /azk/bundler",
      "bundle exec rake db:create",
      "bundle exec rake db:migrate",
    ],
    workdir : "/azk/#{manifest.dir}",
    command : "bundle exec rails server --pid /tmp/rails.pid --port $HTTP_PORT",
    shell   : "/bin/bash",
    // not expect application response
    wait    : { retry: 3, timeout: 1000 },
    scalable: { "default": 2 },
    // Mounts folders to assigned paths
    mounts: {
      '/azk/#{manifest.dir}': path('.'),
      '/azk/bundler'        : persistent('bundler'),
    },
    http: {
      domains: [ "#{system.name}.#{azk.default_domain}" ]
    },
    envs: {
      // set instances variables
      RUBY_ENV : "development",
      BUNDLE_APP_CONFIG : "/azk/bundler",
    },
    export_envs: {
      HTTP_PORT : "#{azk.default_domain}:#{net.port.http}",
      HTTPS_PORT: "#{azk.default_domain}:#{net.port.http}"
    }
  },
});



