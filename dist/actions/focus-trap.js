const FOCUSABLE_SELECTOR = 'button:not([disabled]):not([aria-disabled="true"]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([aria-disabled="true"])';
function getFocusableElements(node) {
    return Array.from(node.querySelectorAll(FOCUSABLE_SELECTOR)).filter((element) => !element.hasAttribute('aria-hidden') && element.tabIndex !== -1);
}
export function focusTrap(node, initialSelector) {
    const previouslyFocused = typeof document !== 'undefined' ? document.activeElement : null;
    function handleKeydown(event) {
        if (event.key !== 'Tab')
            return;
        const elements = getFocusableElements(node);
        if (!elements.length)
            return;
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
            ? node.querySelector(initialSelector)
            : null;
        const target = preferred ?? getFocusableElements(node)[0];
        target?.focus();
    }
    requestAnimationFrame(focusInitial);
    return {
        update(nextInitialSelector) {
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
export function focusElement(selector, root = document) {
    const element = root.querySelector(selector);
    element?.focus();
    return element;
}
