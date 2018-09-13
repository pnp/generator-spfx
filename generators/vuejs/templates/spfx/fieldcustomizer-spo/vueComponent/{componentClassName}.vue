<template>
    <div :class="styles.<%= componentClassName %>">
        <div :class="styles.cell">
            {{text}}
        </div>
    </div>
</template>
<script>
    module.exports = require('./<%= componentClassName %>');
</script>

