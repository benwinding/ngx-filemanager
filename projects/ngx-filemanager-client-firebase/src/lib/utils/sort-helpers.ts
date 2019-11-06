export function sortObjectArrayCase(fieldName, direction?: 'asc' | 'desc') {
  return (a, b) => {
    const val_a = (a[fieldName] + '').toLowerCase();
    const val_b = (b[fieldName] + '').toLowerCase();
    if (val_a < val_b) {
      return direction === 'desc' ? 1 : -1;
    }
    if (val_a > val_b) {
      return direction === 'desc' ? -1 : 1;
    }
    return 0;
  };
}
