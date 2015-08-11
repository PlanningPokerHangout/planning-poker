module.exports = function(grunt) {

    grunt.initConfig({
        copy: {
            main: {
                files: [
                    {expand: true, src: ['build/**', 'foundation/**', 'img/**', '*.css'], dest: 'publish/'},
                ]
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-copy');

};
