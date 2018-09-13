import { Vue, Component, Prop, Provide } from 'vue-property-decorator';
import styles from './<%= componentClassName %>.module.scss';

/**
 * Component's properties
 */
export interface I<%= componentClassName %>Props {
    text: string;
}

/**
 * Class-component
 */
@Component
export default class <%= componentClassName %> extends Vue implements I<%= componentClassName %>Props {

    /**
     * implementing ISimpleWebPartProps interface
     */
    @Prop()
    public text: string;

    /**
     * Readonly property to return styles
     */
    public get styles(): { [key: string]: string } {
        return styles;
    }
}