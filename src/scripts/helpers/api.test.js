import { getID } from './api.js';

// const setup = { result: 'Game with ID: Zl4d7IVkemOTTVg2fUdz added.' };
  test('Initialiazes game and gets an ID', async () => {
    const data = await getID();
    expect(data).toHaveProperty('result');
    console.log(data);
  });