/**
 * StyleLinter configuration
 * Reference and custom gulp task
 */
const stylelint = require('gulp-stylelint');

/* Stylelinter sub task */
let styleLintSubTask = build.subTask('stylelint', (gulp) => {

    console.log('[stylelint]: By default style lint errors will not break your build. If you want to change this behaviour, modify failAfterError parameter in gulpfile.js.');

    return gulp
        .src('src/**/*.scss')
        .pipe(stylelint({
            failAfterError: false,
            reporters: [{
                formatter: 'string',
                console: true
            }]
        }));
});
/* end sub task */

build.rig.addPreBuildTask(styleLintSubTask);
