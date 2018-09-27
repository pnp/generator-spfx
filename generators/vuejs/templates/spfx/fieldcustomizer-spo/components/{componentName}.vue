<template>
    <div :class="$style.<%= componentName %>">
        <div :class="$style.cell">
            {{text}}
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

/**
 * Component's properties
 */
export interface I<%= componentName %>Props {
    text: string;
}

/**
 * Class-component
 */
@Component
export default class <%= componentName %> extends Vue implements I<%= componentName %>Props {

    /**
     * implementing ISimpleWebPartProps interface
     */
    @Prop()
    public text: string;
}
</script>

<style lang="scss" module>
.<%= componentName %> {
  .cell {
    background-color: "[theme:themePrimary, default:#e5e5e5]";
    display: "inline-block";
  }
}
</style>


