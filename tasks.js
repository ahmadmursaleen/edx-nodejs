const customers = require("./m3-customer-data.json");
const customerAddresses = require("./m3-customer-address-data.json");
const async = require("async");

// this is the array to store async tasks
let tasks = [];

const limit = parseInt(process.argv[2], 10) || 1000;

console.log(`The limit is ${limit}`);

customers.forEach((element, index) => {
  // joining adresses
  customers[index] = Object.assign(element, customerAddresses[index]);

  //assigning tasks

  if (index % limit == 0) {
    const start = index;
    const end =
      start + limit > customers.length ? customers.length - 1 : start + limit;
    //console.log(`start ${start}`);
    //console.log(`end ${end}`);

    //pushing the tasks

    tasks.push(done => {
      console.log(`Processing ${start}-${end} out of ${customers.length}`);
      done("done");
    });
  }
});
console.log(tasks);
console.log("No Errors");
