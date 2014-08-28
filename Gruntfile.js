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
              "public/components/bootstrap/css/bootstrap.css": "public/components/bootstrap/less/bootstrap.less"
            }
          }
        },
        watch: {
          styles: {
            files: ['public/components/**/*.less'], // which files to watch
            tasks: ['less'],
            options: {
              nospawn: true
            }
          },
          react: {
                files: ['public/client/**/*.jsx', 'public/js/**/*.js'],
                tasks: ['browserify']
            },
        },

        browserify: {
                options: {
                    transform: [ require('grunt-react').browserify ]
                },
                client: {
                    src: ['public/client/**/*.jsx', 'public/js/**/*.js'],
                    dest: 'public/client/app.built.js'
                },

            }

        });

        grunt.loadNpmTasks('grunt-browserify');

        grunt.loadNpmTasks('grunt-contrib-less');
        grunt.loadNpmTasks('grunt-contrib-watch');

        grunt.registerTask('default', ['watch']);


};