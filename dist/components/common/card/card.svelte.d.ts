import type { Snippet } from 'svelte';
interface CardProps {
    error?: boolean;
    children: Snippet;
}
declare const Card: import("svelte").Component<CardProps, {}, "">;
type Card = ReturnType<typeof Card>;
export default Card;
