type BadgeVariant = 'mandatory' | 'optional';
interface BadgeProps {
    label: string;
    variant: BadgeVariant;
}
declare const Badge: import("svelte").Component<BadgeProps, {}, "">;
type Badge = ReturnType<typeof Badge>;
export default Badge;
