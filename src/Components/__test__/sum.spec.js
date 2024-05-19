import { sum } from '../sum';

test('Sum function should be ', () => {
  const result = sum(3, 4);

  //assertion
  expect(result).toBe(7);
});
