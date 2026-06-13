import type { Snippet } from 'svelte';
type ButtonVariant = 'primary' | 'secondary';
interface ButtonProps {
    variant?: ButtonVariant;
    label: string;
    inactive?: boolean;
    fullWidth?: boolean;
    ariaDescribedBy?: string;
    onclick?: () => void;
    children?: Snippet;
}
declare const Button: import("svelte").Component<ButtonProps, {}, "">;
type Button = ReturnType<typeof Button>;
export default Button;
