
const fs =  require('fs');
const yargs = require('yargs');

const customers = require('./customer.js');

// ------------ Begin - command configuration -----------------


const customerIdOptions = {
    describe: 'Id of the customer',
    demand : true,
    alias : 'CustId'
}

const customerNameOptions = {
    describe: 'Name of the customer',
    demand : true,
    alias : 'CustName'
}

const customerEmailOptions = {
  describe: 'Email of the customer',
  demand : true,
  alias : 'CustEmail'
}

const argv =  yargs

    .command('add','Add a new customer',{
      customer_id:customerIdOptions ,
      customer_name:customerNameOptions,
      customer_email: customerEmailOptions
    })
    .command('list','List all the customers')
    .command('read','Read the customer details',{
      customer_id:customerIdOptions 
    })
    .command('remove','Remove a customer',{
      customer_id:customerIdOptions
    })
    .command('update','Update the customer details',{
      customer_id:customerIdOptions ,
      customer_name:customerNameOptions,
      customer_email: customerEmailOptions
    })
    .help()
    .argv;


// ------------ End - command configuration -----------------


var command = yargs.argv._[0];


if (command === 'add'){
    var customer = customers.addCustomer(argv.customer_id,argv.customer_name,argv.customer_email);
    if (customer){
      customers.logCustomer(customer);                                //add a new note
    } else{
      console.log("customer already exists");
    }
}

else if (command === 'list') {
  var AllCustomers = customers.getAll();
  console.log(`Printing ${AllCustomers.length} customer(s).`);
  AllCustomers.forEach((customer)=>{                                //list all note(s)
    customers.logCustomer(customer);
  });
}

else if (command === 'read') {
   var customer = customers.getCustomer(argv.customer_id);
   if(customer){
    customers.logCustomer(customer);                                //read a note 
          }
   else{
    console.log("customer not found");
   }
}
else if (command === 'remove') {
    var customerRemoved = customers.remove(argv.customer_id);
    var message = customerRemoved ? 'customer was removed' : 'customer not found';
    console.log(message);
}
else if (command === 'update') {
  var customer = customers.update(argv.customer_id,argv.customer_name,argv.customer_email);
  if(customer){
      console.log("Customer Updated successfully");
  }
  else{
      console.log("Customer not found");
  }
}


else{
  console.log('command note recognized'); 
}
