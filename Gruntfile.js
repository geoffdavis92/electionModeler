module.exports = function(grunt) {

	grunt.initConfig({
		watch: {
			sass: {
				files: ['static/sass/**/*'],
				tasks: ['sass:dev']
			},
			pages: {
				files: ['static/pages/**/*'],
				tasks: ['copy:dev']
			}
		},
		sass: {
			dev: {
				files: [
					{
						expand: true,
						cwd: 'static/sass',
						src: ['index.sass'],
						dest: 'public/css',
						ext: '.css'
					},
					{
						expand: true,
						cwd: 'static/sass/components',
						src: ['**/index.sass'],
						dest: 'src/css',
						ext: '.css'
					}
				],
			}
		},
		copy: {
			dev: {
				files: [
					{
						expand: true,
						cwd: 'static/pages',
						src: ['**/*'],
						dest: 'public',
					}
				],
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-sass');
	
	grunt.registerTask('default', ['watch']);
}