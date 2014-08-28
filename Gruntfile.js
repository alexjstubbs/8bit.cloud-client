module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
          development: {
            options: {
              compress: true,
              yuicompress: true,
              optimization: 2
            },
            files: {
              "client/client.styles.css" : "client/src/less/ignition.less"
            }
          }
        },
        watch: {
          styles: {
            files: ['client/src/less/*.less'], // which files to watch
            tasks: ['less'],
            options: {
              nospawn: true
            }
          },
          react: {
                files: ['client/src/**/*.jsx', 'client/src/js/**/*.js'],
                tasks: ['browserify']
            },
        },

        browserify: {
                options: {
                    transform: [ require('grunt-react').browserify ]
                },
                client: {
                    src: ['client/src/**/*.jsx', 'client/src/js/**/*.js'],
                    dest: 'client/client.build.js'
                },

            }

        });

        grunt.loadNpmTasks('grunt-browserify');

        grunt.loadNpmTasks('grunt-contrib-less');
        grunt.loadNpmTasks('grunt-contrib-watch');

        grunt.registerTask('default', ['watch']);


};