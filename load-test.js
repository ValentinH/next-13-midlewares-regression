const axios = require('axios');

const NUMBER_OF_REQUESTS = 100;
const targetVersion = process.argv[2];
const targetPort = targetVersion === '13' ? 3003 : 3004;

async function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function singleRun() {
  // make an array of 100 elements
  const arr = Array.from({ length: NUMBER_OF_REQUESTS }, (_, i) => i);
  const promises = arr.map(async (i) => {
    await axios.post(`http://localhost:${targetPort}/api/test`, {
      test: 'ok',
    });
  });
  await Promise.all(promises);
}

async function loadTest() {
  while (true) {
    const start = performance.now();
    await singleRun();
    const end = performance.now();
    console.log(`Took ${Math.round(end - start)}ms to execute ${NUMBER_OF_REQUESTS} requests`);

    await sleep(1000);
  }
}

loadTest();
