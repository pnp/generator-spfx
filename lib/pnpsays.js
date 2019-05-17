// nodeJS File System
const fs = require('fs');
// requires node path module
const path = require('path');
const util = require('./util');

const chalk = require('chalk');
const updateNotifier = require('update-notifier');

const
    teal = '#03787C',
    white = '#fff',
    black = '#000',
    fgWhite = chalk.bgHex(black).hex(white),
    fgTeal = chalk.bgHex(black).hex(teal),
    fgTealLight = chalk.hex('#52A9DE'),
    tealOnWhite = chalk.bgHex(teal).hex(white),
    whiteOnTeal = chalk.bgHex(white).hex(teal),
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
        fgTeal("▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄") + fgWhite("▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄\r\n") +
        tealOnWhite("    _____       _____     ") + whiteOnTeal("     _____ _____  ______       \r\n") +
        tealOnWhite("   |████▄\\      |████▄\\   ") + whiteOnTeal("   /▄█████|█████\\|██████|      \r\n") +
        tealOnWhite("   |█|__█| __   |█|__█|   ") + whiteOnTeal("   |█(___ |█|__)█|█|____  __   \r\n") +
        tealOnWhite("   |████▀/█▄██▄\\|████▀/   ") + whiteOnTeal("    \\▀██▄\\|█████/|██████\\/▄▀   \r\n") +
        tealOnWhite("   |█|   |█▀  ▀█|█|       ") + whiteOnTeal("    ____)█|█|    |█|   >██<    \r\n") +
        tealOnWhite("   |█|   |█|  |█|█|       ") + whiteOnTeal("   |█████/|█|    |█|  ▄▀/\\▀▄   \r\n") +
        fgTeal("██████████████████████████") + fgWhite("███████████████████████████████\r\n")

    // printing logo
    generator.log(logo);

    // Generator Information
    generator.log(
        fgTealLight.bold(" Generator:    "),
        fgWhite.bold(generator.name)
    )
    // Author Information
    generator.log(
        fgTealLight.bold(" Author:       "),
        fgWhite.bold(pkg.author.name)
    )

    // Get list of maintainer
    let maintainerName = pkg.maintainers.map(element => element.name);
    let maintainerOut = maintainerName.join(', ');

    // Print maintainer informations
    generator.log(
        fgTealLight.bold(" Maintainers:  "),
        fgWhite(maintainerOut)
    )

    // Get list of contributors
    let contributorsName = pkg.contributors.map(element => element.name);
    let contributorsOut = contributorsName.join(', ');

    // Main Contributor informations
    generator.log(
        fgTealLight.bold(" Contributors: "),
        fgWhite(contributorsOut)
    )

    generator.log(
        fgTealLight.bold(" Version:      "),
        fgWhite(pkg.version), "\n"
    )

    generator.log(
        fgTealLight.bold(" Based on "),
        fgWhite("@microsoft/generator-sharepoint"),
        fgTealLight.bold("version:"),
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
