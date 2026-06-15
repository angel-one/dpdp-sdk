type PortalTarget = HTMLElement | string;

function resolveTarget(target: PortalTarget) {
	if (typeof target === 'string') {
		return document.querySelector<HTMLElement>(target);
	}

	return target;
}

export function portal(node: HTMLElement, target: PortalTarget = 'body') {
	if (typeof document === 'undefined') {
		return {};
	}

	const targetElement = resolveTarget(target);
	if (!targetElement) {
		return {};
	}

	const placeholder = document.createComment('dpdp-portal');
	const parent = node.parentNode;

	parent?.insertBefore(placeholder, node);
	targetElement.appendChild(node);

	return {
		destroy() {
			if (placeholder.parentNode) {
				placeholder.parentNode.insertBefore(node, placeholder);
				placeholder.remove();
				return;
			}

			node.remove();
		}
	};
}
