const FOCUSABLE_SELECTOR =
	'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getFocusableElements(node: HTMLElement) {
	return Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
		(element) => element.offsetParent !== null || element === document.activeElement
	);
}

export function focusTrap(node: HTMLElement) {
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

	requestAnimationFrame(() => {
		getFocusableElements(node)[0]?.focus();
	});

	return {
		destroy() {
			node.removeEventListener('keydown', handleKeydown);
		}
	};
}
