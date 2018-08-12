const chalk = require('chalk'),
    bgBlue = chalk.bgHex('#0070B9'),
    bgWhite = chalk.bgWhite,
    fgBlue = chalk.hex('#0070B9');

    const fs = require('fs');

const pnpSays = () => {

    var logo =
        fgBlue("▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄") + ("▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄\r\n") +
        bgBlue.white("    _____       _____     ") + fgBlue.bgWhite("     _____ _____  ______       \r\n") +
        bgBlue.white("   |████▄\\      |████▄\\   ") + fgBlue.bgWhite("   /▄█████|█████\\|██████|      \r\n") +
        bgBlue.white("   |█|__█| __   |█|__█|   ") + fgBlue.bgWhite("   |█(___ |█|__)█|█|____  __   \r\n") +
        bgBlue.white("   |████▀/█▄██▄\\|████▀/   ") + fgBlue.bgWhite("    \\▀██▄\\|█████/|██████\\/▄▀   \r\n") +
        bgBlue.white("   |█|   |█▀  ▀█|█|       ") + fgBlue.bgWhite("    ____)█|█|    |█|   >██<    \r\n") +
        bgBlue.white("   |█|   |█|  |█|█|       ") + fgBlue.bgWhite("   |█████/|█|    |█|  ▄▀/\\▀▄   \r\n") +
        fgBlue("██████████████████████████") + ("███████████████████████████████\r\n")
    
    console.log(logo);
    

}

module.exports = pnpSays;

