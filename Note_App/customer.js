const fs =  require('fs');


// ------------------Begin of Reusable functions ---------------------

var fetchCustomer = () => {
  try {                          //if file won't exist
    var customerString = fs.readFileSync('customers.json')
    return JSON.parse(customerString);
  } catch(e){
    return [];
  }
};

var saveCustomers = (customers) => {
  fs.writeFileSync('customers.json',JSON.stringify(customers));
};


// ------------------End of Reusable functions ---------------------


//  to add a new note

var addCustomer = (custid,custname,custemail) => {   
    var customers = fetchCustomer();
    var customer = {custid,custname,custemail}

    var duplicateCustomers =  customers.filter((customer) => { // to check if note already exists
      return customer.custid === custid;
    });

    if (duplicateCustomers.length === 0){
      customers.push(customer);
      saveCustomers(customers);
      return customer
    }

  };


//to list all the notes

var getAll = () => {
    return fetchCustomer();
};


// to read a note

var getCustomer = (title) => {
    
    var customers = fetchCustomer();

    var getCustomer =  customers.filter((customer) => {  // to check if note exists and return note
      return customer.custid === custid;
    });

    return getCustomer[0]

};


// to delete a note

var remove = (custid) => {

    var customers = fetchCustomer(); // reusable func

    var filteredCustomers =  customers.filter((customer) => { // will return all other notes other than "note to be removed"
      return customer.custid !== custid;
    });

    saveCustomers(filteredCustomers); //save new notes array

    return customers.length !== filteredCustomers.length
    
};

var update = (custid, custname, custemail) => {
  var totalCustomers = fetchCustomer();
   for (var i = 0; i < totalCustomers.length; i++) {
     if (totalCustomers[i].custid === custid) {
       totalCustomers[i].custname = custname;
       totalCustomers[i].custemail = custemail;
     }
   }
   saveCustomers(totalCustomers);
   return totalCustomers;
};

// function just to print out note to screen

var logCustomer = (customer) => { 
  console.log('--');
  console.log(`Id: ${customer.custid}`);
  console.log(`Name: ${customer.custname}`);
  console.log(`EmailId: ${customer.custemail}`);
};

// add new function names here to be accessible from other modules

module.exports = {
  addCustomer, getAll, remove, update, getCustomer,logCustomer
};
