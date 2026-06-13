export function getPurposeDetailsId(purposeId) {
    return `purpose-details-${purposeId}`;
}
export function getBadgeVariant(purpose) {
    return purpose.mandatory ? 'mandatory' : 'optional';
}
export function getCheckboxLabel(purpose) {
    return `Select ${purpose.name}`;
}
