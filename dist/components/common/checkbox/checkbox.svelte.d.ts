interface CheckboxProps {
    checked: boolean;
    disabled?: boolean;
    label: string;
    onchange?: () => void;
}
declare const Checkbox: import("svelte").Component<CheckboxProps, {}, "">;
type Checkbox = ReturnType<typeof Checkbox>;
export default Checkbox;
