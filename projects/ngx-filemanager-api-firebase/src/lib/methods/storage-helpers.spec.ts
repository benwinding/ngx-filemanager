
test('test for multiple paths with slash', () => {
  const result = EnsureTrailingSlash('/abc/assaca/acsasc/');
  return expect(result).toBe('/abc/assaca/acsasc/');
});
