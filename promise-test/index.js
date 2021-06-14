function sleep(ms) {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
}

// async function makeError() {
//   await sleep(500);
//   throw new Error();
// }
//
// async function process() {
//   try {
//     await makeError();
//   } catch(e) {
//     console.log(e);
//   }
//   // console.log('hello');
//   // await sleep(1000);
//   // console.log('good to see you');
// }

const getDog = async () => {
  await sleep(1000);
  return 'dog';
}
const getRabbit = async () => {
  await sleep(500);
  return 'rabbit';
}
const getCat = async () => {
  await sleep(3000);
  return 'cat';
}

async function process() {
  // const dog = await getDog();
  // console.log(dog);
  // const rabbit = await getRabbit();
  // console.log(rabbit);
  // const cat = await getCat();
  // console.log(cat);
  // const result = await Promise.all([getDog(), getRabbit(), getCat()]);
  // for(let i=0; i<result.length; i++) {
  //   console.log(result[i]);
  // }
  const result = await Promise.race([getDog(), getRabbit(), getCat()]);
  console.log(result);
}

process();

