module.exports = function (grunt) {
    "use strict";

    const fs = require('fs');
    var EXPORT_PATH = "dist";
    var DATE = new Date().getTime().toString();

    grunt.initConfig(
        {
            clean: {
                app: [
                    EXPORT_PATH
                ]
            },

            copy: {
                app: {
                    files:
                    [
                        {
                            cwd: './src/libs/scripts/',
                            src: '**/*.*',
                            dest: EXPORT_PATH + "/libs",
                            expand: true
                        },
                        {
                            src: './index.html',
                            dest: EXPORT_PATH + "/index.html"
                        }
                    ]
                }
            },

            webpack: {
                options: require("./webpack.config.js"),
            },

            "local-googlefont": {
                lato: {
                    options: {
                        family: "Lato",
                        sizes: [
                            300,400,700,900
                        ],
                        cssDestination: "./src/styles/fonts/lato",
                        fontDestination: "./src/styles/fonts/lato"
                    }
                },

                source_sans_pro: {
                    options: {
                        family: "Source Sans Pro",
                        sizes: [
                            400,700
                        ],
                        cssDestination: "./src/styles/fonts/source_sans_pro",
                        fontDestination: "./src/styles/fonts/source_sans_pro"
                    }
                },

                quicksand: {
                    options: {
                        family: "Quicksand",
                        sizes: [
                            400,500
                        ],
                        cssDestination: "./src/styles/fonts/quicksand",
                        fontDestination: "./src/styles/fonts/quicksand"
                    }
                }
            }

        });

    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-local-googlefont');

    grunt.registerTask("print-time", function () {
        var today = new Date();
        grunt.log.writeln("\nTime: " + today.toLocaleTimeString());
    });

    grunt.registerTask("default", [
        "clean:app",
        "copy:app",
        "webpack",
        "print-time"
    ]);
};
