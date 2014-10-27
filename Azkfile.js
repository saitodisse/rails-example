/**
 * Documentation: http://docs.azk.io/Azkfile.js
 */

// Adds the systems that shape your system
systems({
  "rails-example": {
    // Dependent systems
    depends: [],
    // More images:  http://images.azk.io
    image: "rails:4",
    workdir: "/azk/#{manifest.dir}",
    provision: [
      "bundle install --path vendor/bundler",
    ],
    // command: "rails server --port $HTTP_PORT",
    command: "bundle exec rackup config.ru --port $HTTP_PORT",
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
    },
  },
});



