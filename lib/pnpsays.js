// nodeJS File System
const fs = require('fs');
// requires node path module
const path = require('path');
const util = require('./util');

const chalk = require('chalk');
const updateNotifier = require('update-notifier');

const bgBlue = chalk.bgHex('#03787C'),
    bgWhite = chalk.bgWhite,
    fgWhite = chalk.white,
    fgBlue = chalk.hex('#03787C'),
    fgBlueLight = chalk.hex('#52A9DE'),
    fgYellow = chalk.yellow;

// Check if version matches to PnP generator version
const checkVersion = (generator, expectedVersion) => {

    if (fs.existsSync(generator.destinationPath('package.json'))) {

        var package = require(
            path.resolve(generator.destinationPath('package.json'))
        );

        return util.projectStatusCheck(
            generator,
            generator.destinationPath(),
            expectedVersion
        )

        // if (package.dependencies["@microsoft/sp-core-library"] !== "1.7.0") {
        //     generator.log('\nSorry this current project does not meet the requirements for this generator\n');
        //     process.exit(1);
        // }

    } else {

        return true;

    }

}

// Greet friendly all users
const pnpSays = (generator) => {

    const pkg = generator.pkg;

    let logo =
        fgBlue("▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄") + ("▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄\r\n") +
        bgBlue.white("    _____       _____     ") + fgBlue.bgWhite("     _____ _____  ______       \r\n") +
        bgBlue.white("   |████▄\\      |████▄\\   ") + fgBlue.bgWhite("   /▄█████|█████\\|██████|      \r\n") +
        bgBlue.white("   |█|__█| __   |█|__█|   ") + fgBlue.bgWhite("   |█(___ |█|__)█|█|____  __   \r\n") +
        bgBlue.white("   |████▀/█▄██▄\\|████▀/   ") + fgBlue.bgWhite("    \\▀██▄\\|█████/|██████\\/▄▀   \r\n") +
        bgBlue.white("   |█|   |█▀  ▀█|█|       ") + fgBlue.bgWhite("    ____)█|█|    |█|   >██<    \r\n") +
        bgBlue.white("   |█|   |█|  |█|█|       ") + fgBlue.bgWhite("   |█████/|█|    |█|  ▄▀/\\▀▄   \r\n") +
        fgBlue("██████████████████████████") + ("███████████████████████████████\r\n")

    // printing logo
    generator.log(logo);

    // Generator Information
    generator.log(
        fgBlueLight.bold(" Generator:    "),
        fgWhite.bold(generator.name)
    )
    // Author Information
    generator.log(
        fgBlueLight.bold(" Author:       "),
        fgWhite.bold(pkg.author.name)
    )

    // Get list of maintainer
    let maintainerName = pkg.maintainers.map(element => element.name);
    let maintainerOut = maintainerName.join(', ');

    // Print maintainer informations
    generator.log(
        fgBlueLight.bold(" Maintainers:  "),
        fgWhite(maintainerOut)
    )

    // Get list of contributors
    let contributorsName = pkg.contributors.map(element => element.name);
    let contributorsOut = contributorsName.join(', ');

    // Main Contributor informations
    generator.log(
        fgBlueLight.bold(" Contributors: "),
        fgWhite(contributorsOut)
    )

    generator.log(
        fgBlueLight.bold(" Version:      "),
        fgWhite(pkg.version), "\n"
    )

    generator.log(
        fgBlueLight.bold(" Based on "),
        fgWhite("@microsoft/generator-sharepoint"),
        fgBlueLight.bold("version:"),
        fgWhite(pkg.dependencies["@microsoft/generator-sharepoint"]), '\n'
    )

    // Check for updates
    const notifier = updateNotifier({
        pkg,
        updateCheckInterval: 1000 * 60 * 60 * 24 // check daily
    });



    if (notifier.update) {
        generator.log(fgYellow.bold(`___________________________________________________________

VERSION UPDATE INFORMATION:

Your Version: ${fgWhite(pkg.version)}
Current Version: ${notifier.update.latest}

To update to the latest version execute:
    ${fgWhite.bold('npm install -g @pnp/generator-spfx@latest')}\n
___________________________________________________________\n\n`));

    }

    return checkVersion(generator, pkg.dependencies["@microsoft/generator-sharepoint"]);

}

module.exports = pnpSays;
