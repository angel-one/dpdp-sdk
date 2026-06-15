const FOCUSABLE_SELECTOR =
	'button:not([disabled]):not([aria-disabled="true"]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([aria-disabled="true"])';

function getFocusableElements(node: HTMLElement) {
	return Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
		(element) => !element.hasAttribute('aria-hidden') && element.tabIndex !== -1
	);
}

export function focusTrap(node: HTMLElement, initialSelector?: string) {
	const previouslyFocused =
		typeof document !== 'undefined' ? (document.activeElement as HTMLElement | null) : null;

	function handleKeydown(event: KeyboardEvent) {
		if (event.key !== 'Tab') return;

		const elements = getFocusableElements(node);
		if (!elements.length) return;

		const first = elements[0];
		const last = elements[elements.length - 1];

		if (event.shiftKey && document.activeElement === first) {
			event.preventDefault();
			last.focus();
			return;
		}

		if (!event.shiftKey && document.activeElement === last) {
			event.preventDefault();
			first.focus();
		}
	}

	node.addEventListener('keydown', handleKeydown);

	function focusInitial() {
		const preferred = initialSelector
			? node.querySelector<HTMLElement>(initialSelector)
			: null;
		const target = preferred ?? getFocusableElements(node)[0];
		target?.focus();
	}

	requestAnimationFrame(focusInitial);

	return {
		update(nextInitialSelector?: string) {
			initialSelector = nextInitialSelector;
		},
		destroy() {
			node.removeEventListener('keydown', handleKeydown);
			requestAnimationFrame(() => {
				previouslyFocused?.focus?.();
			});
		}
	};
}

export function focusElement(selector: string, root: ParentNode = document) {
	const element = root.querySelector<HTMLElement>(selector);
	element?.focus();
	return element;
}
