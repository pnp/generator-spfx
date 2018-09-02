<template>
    <div :class="styles.<%= componentName %>">
        <div :class="styles.cell">
            {{text}}
        </div>
    </div>
</template>
<script>
    module.exports = require('./<%= componentName %>');
</script>

