export function isSecondaryInactive(inactive, secondaryAction) {
    return secondaryAction === 'reject' ? false : inactive;
}
