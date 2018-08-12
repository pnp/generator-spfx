const chalk = require('chalk');
const updateNotifier = require('update-notifier');

const bgBlue = chalk.bgHex('#0070B9'),
    bgWhite = chalk.bgWhite,
    fgWhite = chalk.white,
    fgBlue = chalk.hex('#0070B9'),
    fgBlueLight = chalk.hex('#52A9DE');

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

    // prining logo
    generator.log(logo);

    // AUthor Information
    generator.log(
        fgBlueLight.bold("Author:       "),
        fgWhite.bold(pkg.author.name)
    )

    // Get list of maintainer
    let maintainerName = pkg.maintainers.map(element => element.name);
    let maintainerOut = maintainerName.join(', ');

    // Main Contributor informations
    generator.log(
        fgBlueLight.bold("Contributors: "),
        fgWhite(maintainerOut)
    )

    generator.log(
        fgBlueLight.bold("Version:      "),
        fgWhite(pkg.version), '\n'
    )

    // Check for updates
    const notifier = updateNotifier({
        pkg,
        updateCheckInterval: 1000 * 60 * 60 * 24 * 7 // 1 week
    });
    
    if (notifier.update) {
        generator.log(`Update available: ${notifier.update.latest}`);
    }

}

module.exports = pnpSays;