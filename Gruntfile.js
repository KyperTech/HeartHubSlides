module.exports = function(grunt) {
    grunt.registerTask('watch', ['watch']);
    grunt.registerTask('dist', ['shell:home']);
    grunt.registerTask('test', ['shell:test']);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //Trying for storing variables else where,
        connect: {
            server: {
                options: {
                    port: 8080,
                    //keepalive: true, keeping grunt running
                    //livereload:true,
                    base: '.',
                    open: {
                        target: 'http://localhost:8080',
                        appName: 'Google Chrome',
                    }
                }
            }
        },
        less: {
            style: {
                files: {
                    "css/styles.css": "less/styles.less"
                },
            }
        },
        watch: {
            less: {
                files: ["app/less/*.less"],
                tasks: ["less:style"],
                options:{
                    //debounceDelay:1000,
                    livereload: true
                }
            },
            html: {
                files: ['app/index.html'],
                options: {
                    livereload: true
                }
            }
        },
        shell:{
            home:{
                command:"s3cmd sync --exclude './node_modules/' --exclude '*.less' --exclude './app/less/' --exclude '.DS_Store' --exclude '.buildignore' --exclude '.htaccess' --acl-public . s3://hearthub-presentation"
            },
            test:{
                command:"s3cmd sync --exclude './app/bower_components/' --exclude '*.less' --exclude './app/less/' --exclude '.DS_Store' --exclude '.buildignore' --exclude '.htaccess' --acl-public . s3://kyper-test"
            },
            options:{
                stdout:true
            }
        }

    });

    //Plugin for "watch"
    grunt.loadNpmTasks('grunt-contrib-watch');

    //Connect plugin
    grunt.loadNpmTasks('grunt-contrib-connect');

    //Open plugin
    grunt.loadNpmTasks('grunt-open');

    //Watch files for reload
    grunt.loadNpmTasks('grunt-contrib-watch');

    //Less Plugin
    grunt.loadNpmTasks('grunt-contrib-less');

    //Grunt-Shell Plugin (for creating and pushing to production)
    grunt.loadNpmTasks('grunt-shell');

    // Default task(s).
    grunt.registerTask('default', ['connect', 'less', 'watch']);

    grunt.registerTask('serve', ['connect'], function() {
        grunt.task.run('connect');
    });
};