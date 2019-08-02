export function ConvertToTitleCase(input: string): string {
  const capitalsWithSpaces = input.replace(/([A-Z])/g, ' $1').trim();
  const underscoresToSpaces = capitalsWithSpaces.replace(/_/g, ' ');
  return underscoresToSpaces
    .split(' ')
    .map(p => p.charAt(0).toUpperCase() + p.substr(1).toLowerCase())
    .join(' ');
}
