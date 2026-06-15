let lockCount = 0;
let savedOverflow = '';
let savedPaddingRight = '';
function lockBodyScroll() {
    if (typeof document === 'undefined')
        return;
    if (lockCount === 0) {
        savedOverflow = document.body.style.overflow;
        savedPaddingRight = document.body.style.paddingRight;
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }
    }
    lockCount += 1;
}
function unlockBodyScroll() {
    if (typeof document === 'undefined')
        return;
    lockCount = Math.max(0, lockCount - 1);
    if (lockCount === 0) {
        document.body.style.overflow = savedOverflow;
        document.body.style.paddingRight = savedPaddingRight;
    }
}
export function scrollLock(_node) {
    lockBodyScroll();
    return {
        destroy() {
            unlockBodyScroll();
        }
    };
}
