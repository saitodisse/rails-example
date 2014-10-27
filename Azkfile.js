/**
 * Documentation: http://docs.azk.io/Azkfile.js
 */

// Adds the systems that shape your system
systems({
  "rails4-azk-example": {
    // Dependent systems
    depends: [],
    // More images:  http://images.azk.io
    image: "ruby:2.1.3",
    workdir: "/azk/#{manifest.dir}",
    provision: [
      "bundle install --path vendor/bundler",
    ],
    // command: "rails server --port $HTTP_PORT",
    command: [
      "bundle install --path vendor/bundler",
      "bundle exec rackup config.ru --port $HTTP_PORT"
    ].join(';'),
    mounts: {
      '/azk/#{manifest.dir}': path("."),
    },
    http: {
      // rails-example.azk.dev
      hostname: "#{system.name}.#{azk.default_domain}"
    },
    envs: {
      // set instances variables
      RUBY_ENV: "dev",
      // GEM_HOME: "/azk/#{manifest.dir}/vendor/bundler/ruby/2.1.0",
      // BUNDLE_APP_CONFIG: "/azk/#{manifest.dir}/vendor/bundler",
      // BUNDLE_BIN_PATH: "/azk/#{manifest.dir}/vendor/bundler/ruby/2.1.0/bin",
      // GEM_PATH: "/azk/#{manifest.dir}/vendor/bundler/ruby/2.1.0/gems",
    },
  },
});



