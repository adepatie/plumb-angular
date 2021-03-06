var markdown = require('node-markdown').Markdown;
var fs = require('fs');
var path = require('path');
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-conventional-changelog');
  grunt.loadNpmTasks('grunt-ngdocs');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-wiredep');

  // Project configuration.
  grunt.util.linefeed = '\n';

  grunt.initConfig({
    ngversion: '1.4.4',
    modules: [],//to be filled in by build task
    pkg: grunt.file.readJSON('package.json'),
    dist: 'dist',
    build: 'build',
    styles: 'styles',
    examples: 'examples',
    filename: 'plumb-angular',
    meta: {
      banner: ['/*',
        ' * <%= pkg.name %>',
        ' * <%= pkg.homepage %>\n',
        ' * Version: <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>',
        ' * License: <%= pkg.license %>',
        ' */\n'].join('\n')
    },
    concat: {
      dist: {
        options: {
          banner: '<%= meta.banner %>\n',
          process: function(src, filepath) {
            src = src.replace('//$templateCache', fs.readFileSync(path.join(grunt.config('build'), 'templates.js')));
            return src;
          }
        },
        src: [], //src filled in by build task
        dest: '<%= dist %>/<%= filename %>.js'
      }
    },
    changelog: {
      options: {
        dest: 'CHANGELOG.md',
        templateFile: 'misc/changelog.tpl.md',
        github: 'typefoo/plumb-angular'
      }
    },
    clean: {
      build: ['<%= dist %>', '<%= build %>']
    },
    ngdocs: {
      options: {
        dest: 'dist/docs',
        scripts: [
          'angular.js',
          '<%= concat.dist_tpls.dest %>'
        ],
        styles: [
          'docs/css/style.css'
        ],
        navTemplate: 'docs/nav.html',
        title: 'plumb-angular',
        html5Mode: false
      },
      api: {
        src: ['src/**/*.js', 'src/**/*.ngdoc'],
        title: 'API Documentation'
      }
    },
    watch: {
      site: {
        files: [
          '<%= examples %>/*.html',
          'plumb-templates/**/*.html',
          'src/**/*.js'
        ],
        tasks: ['wiredep', 'build'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      less: {
        files: ['<%= styles %>/**/*.less'],
        tasks: ['build']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= examples %>/*.html',
          'plumb-templates/**/*.html',
          'dist/**/*.css',
          'src/**/*.js'
        ]
      }
    },
    connect: {
      options: {
        port: 9001,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '0.0.0.0',
        livereload: 35730
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('examples'),
              connect.static('.')
            ];
          }
        }
      }
    },
    wiredep: {
      options: {
        cwd: '.'
      },
      app: {
        src: ['examples/index.html'],
        ignorePath:  /\.\.\//
      }
    },
    less: {
      dev: {
        files: {
          '<%= build %>/styles/main.css': '<%= styles %>/main.less'
        }
      },
      dist: {
        files: {
          '<%= dist %>/styles/<%= filename %>.css': '<%= styles %>/main.less'
        }
      }
    },
    ngmin: {
      plumb: {
        src: [
          '<%= dist %>/<%= filename %>.js',
        ],
        dest: '<%= dist %>/<%= filename %>.js'
      }
    },
    uglify: {
      my_target: {
        files: {
          '<%= dist %>/<%= filename %>.min.js': ['<%= dist %>/<%= filename %>.js']
        }
      }
    },
    ngtemplates:  {
      app:        {
        src:      'plumb-templates/**/*.html',
        dest:     '<%= build %>/templates.js',
        options: {
          angular:  'w[PLUMB_CONFIG.ANGULAR]',
          module:   'PlumbApp'
        }
      }
    },
    copy: {
      server: {
        files: [
          {expand: true, src: ['styles/fonts/**'], dest: '<%= build %>/'}
        ]
      },
      dist: {
        files: [
          {expand: true, src: ['styles/fonts/**'], dest: '<%= dist %>/'}
        ]
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['build']);

  grunt.registerTask('server', [
    'build',
    'less:dev',
    'copy:server',
    'connect',
    'watch'
  ]);

  grunt.registerTask('dist', 'Override dist directory', function() {
    var dir = this.args[0];
    if (dir) { grunt.config('dist', dir); }
  });

  grunt.registerTask('build', 'Create plumb build files', function() {
    var _ = grunt.util._;
    grunt.task.run(['clean:build']);
    grunt.task.run(['wiredep']);

    //If arguments define what modules to build, build those. Else, everything
    var modules = [];
    grunt.file.expand({
      filter: 'isDirectory', cwd: '.'
    }, 'src/*').forEach(function(dir) {
      console.log(dir);
      var name = dir.split('/')[1];
      modules.push(grunt.file.expand('src/'+name+'/*.js'));
    });

    //Set the concat task to concatenate the given src modules
    grunt.config('concat.dist.src', grunt.config('concat.dist.src').concat(modules));

    grunt.task.run(['ngtemplates', 'concat', 'ngmin', 'uglify', 'less:dist', 'copy:dist']);
  });

  function setVersion(type, suffix) {
    var file = 'package.json';
    var VERSION_REGEX = /([\'|\"]version[\'|\"][ ]*:[ ]*[\'|\"])([\d|.]*)(-\w+)*([\'|\"])/;
    var contents = grunt.file.read(file);
    var version;
    contents = contents.replace(VERSION_REGEX, function(match, left, center) {
      version = center;
      if (type) {
        version = require('semver').inc(version, type);
      }
      //semver.inc strips our suffix if it existed
      if (suffix) {
        version += '-' + suffix;
      }
      return left + version + '"';
    });
    grunt.log.ok('Version set to ' + version.cyan);
    grunt.file.write(file, contents);
    return version;
  }

  grunt.registerTask('version', 'Set version. If no arguments, it just takes off suffix', function() {
    setVersion(this.args[0], this.args[1]);
  });

  return grunt;
};
