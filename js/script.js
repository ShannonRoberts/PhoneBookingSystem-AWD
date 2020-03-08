$('#purchaseDate').datepicker();
$('#repairDate').datepicker();
$('#datepick').datepicker();

$("#repairForm").submit(function (event) {
    event.preventDefault();
    if (validateAll()) {
        getInvoiceData();
    } else {
        return false;
    }
})

function validateAll() {
    if (!validateMandatory()) {
        return false
    } else if (!validateCustomerNames()) {
        return false
    } else if (!validatePostcode()) {
        return false
    } else if (!validateEmail()) {
        return false
    } else if (!validatePhoneNumber()) {
        return false
    } else if (!validateDate()) {
        return false
    } else if (!validateIMEI()) {
        return false
    }
    return true
}

function validateMandatory() {
    var fName = document.forms["repairForm"]["fName"].value;
    var lName = document.forms["repairForm"]["lName"].value;
    var street = document.forms["repairForm"]["street"].value;
    var suburb = document.forms["repairForm"]["suburb"].value;
    var city = document.forms["repairForm"]["city"].value;
    var postcode = document.forms["repairForm"]["postcode"].value;
    var phoneNumber = document.forms["repairForm"]["phoneNumber"].value;
    var email = document.forms["repairForm"]["email"].value;
    var description = document.forms["repairForm"]["description"].value;
    var pDate = document.forms["repairForm"]["purchaseDate"].value;
    var rDate = document.forms["repairForm"]["repairDate"].value;
    var imei = document.forms["repairForm"]["imei"].value;
    if (fName == "") {
        alert("First Name must be filled out");
        return false;
    } else if (lName == "") {
        alert("Last Name must be filled out");
        return false;
    } else if (street == "") {
        alert("Street must be filled out");
        return false;
    } else if (suburb == "") {
        alert("Suburb must be filled out");
        return false;
    } else if (city == "") {
        alert("City must be filled out");
        return false;
    } else if (postcode == "") {
        alert("Postcode must be filled out");
        return false;
    } else if (phoneNumber == "") {
        alert("Phone number must be filled out");
        return false;
    } else if (email == "") {
        alert("Email must be filled out");
        return false;
    } else if (description == "") {
        alert("Desciption must be filled out");
        return false;
    } else if (pDate == "") {
        alert("Purchase Date must be filled out");
        return false;
    } else if (rDate == "") {
        alert("Repair Date must be filled out");
        return false;
    } else if (imei == "") {
        alert("IMEI must be filled out");
        return false;
    }
    return true
}

function validateCustomerNames() {
    var correctInput = /^[a-zA-Z -]+$/
    var fName = document.forms["repairForm"]["fName"].value;
    var lName = document.forms["repairForm"]["lName"].value;

    if (!correctInput.test(fName)) {
        alert('First name only allows alphabetical characters, spaces and the - symbol')
        return false;
    } else if (!correctInput.test(lName)) {
        alert('Last name only allows alphabetical characters, spaces and the - symbol')
        return false;
    }
    return true;

}

function validatePostcode() {
    var postcode = document.forms["repairForm"]["postcode"].value
    if (postcode.length != 4 || isNaN(postcode)) {
        alert("postcode must be 4 numbers")
        return false;
    }
    return true;
}

function validateEmail() {
    var correctInput = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var email = document.forms["repairForm"]["email"].value

    if (!correctInput.test(email)) {
        alert('Incorrect format Email must contain an @ and .')
        return false;
    }
    return true;
}

function validatePhoneNumber() {
    var correctInput = /^[0-9 ()+-]+$/;
    var pn = document.forms["repairForm"]["phoneNumber"].value
    if (!correctInput.test(pn)) {
        alert('Incorrect format for phone number')
        return false;
    }
    return true;
}

function validateDate() {

    var pDateInput = document.forms["repairForm"]["purchaseDate"].value
    var rDateInput = document.forms["repairForm"]["repairDate"].value

    var purchaseDate = new Date(pDateInput)
    var repairDate = new Date(rDateInput)
    var now = new Date()

    if (!purchaseDate instanceof Date || isNaN(purchaseDate) || purchaseDate >= now) {
        alert("Invalid purchase date")
        return false;
    } else if (!repairDate instanceof Date || isNaN(repairDate) || repairDate >= now || repairDate < purchaseDate) {
        alert("Invalid repair date")
        return false;
    }

    return true;
}

function validateWarranty() {
    var warranty = document.getElementById("warranty");
    var pDateInput = document.forms["repairForm"]["purchaseDate"].value
    var purchaseDate = new Date(pDateInput)
    var warrantyExpire = purchaseDate
    var now = new Date()
    warrantyExpire.setYear(warrantyExpire.getFullYear() + 2)

    if (now > warrantyExpire) {
        warranty.checked = false;
        
    } else {
        warranty.checked = true;
       
    }

    updateCosts();
}

function validateIMEI() {
    var imei = document.forms["repairForm"]["imei"].value
    if (imei.length != 15 || isNaN(imei)) {
        alert("IMEI must be 15 numbers")
        return false
    }
    return true
}

var phonePrice = 0;
var chargerPrice = 0;
var total = 0;
function addItem() {

    var phoneCost = document.getElementById("phonecost");
    var chargerCost = document.getElementById("chargercost");
    var bond = document.getElementById("bond");
    var business = document.getElementById("business");
    var selectedItem = document.forms["repairForm"]["itemSelect"].value;

    if (selectedItem == "iPhone") {
        phoneCost.innerHTML = "$275";
        phonePrice = 275;
    } else if (selectedItem == "otherPhone") {
        phoneCost.innerHTML = "$100";
        phonePrice = 100;
    } else if (selectedItem == "charger") {
        chargerCost.innerHTML = "$30";
        chargerPrice = 30;
    } else if (selectedItem == "none") {
        phoneCost.innerHTML = "$0";
        chargerCost.innerHTML = "$0";
        phonePrice = 0;
        chargerPrice = 0;
    }
    if (business.checked == false) {
        total = phonePrice + chargerPrice;
        bond.value = "$" + total;
    } else {
        bond.value = "$" + 0;
    }
    updateCosts();

}

function customerTypeBusiness() {
    var business = document.getElementById("business");

    if (business.checked == true) {
        consumer.checked = false;

    }

    updateCosts();
}

function customerTypeConsumer() {

    var consumer = document.getElementById("consumer");

    if (consumer.checked == true) {
        business.checked = false;

    }


}

function updateCosts() {
    var bond = document.getElementById("bond");
    var warranty = document.getElementById("warranty");
    var business = document.getElementById("business");
    var serviceFee = document.getElementById("serviceFee");
    var subTotal = document.getElementById("subtotal");
    var gst = document.getElementById("gst");
    var totalGST = document.getElementById("totalGST");
    var sfPrice = 0;
    var subT;
    var gstCost;

    if (warranty.disabled == true || warranty.checked == false) {
        serviceFee.value = "$84";
        sfPrice += 84;
    } else {
        serviceFee.value = "$0";
        if (sfPrice != 0) {
            sfPrice -= 84;
        }
    }

    if (business.checked == false) {
        total = phonePrice + chargerPrice;
        bond.value = "$" + total;
    } else {
        bond.value = "$" + 0;
    }

    subT = total + sfPrice;
    subTotal.value = "$" + subT;

    gstCost = subT * 0.15;
    gst.value = "$" + gstCost;

    totalGST.value = "$" + (subT + gstCost);
}

function loadFAQS() {

    $.getJSON("https://cors-anywhere.herokuapp.com/http://shan.coolpage.biz/JSON/faqs.json", function (result) {

        $.each(result, function (i, item) {
            $('#faqs').append('<div id="qa"><b>' + item.question + '</b><br>' + item.answer + '</div>');
        })
    });
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

var x = document.getElementById("locationDemo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
        4
    }
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
}

var faqs = [

    {
        "question": "Why do I have to pay a service fee?",
        "answer": "A service fee is only charged for repairs to devices that are no longer under warran-ty. Business customers are not charged a service fee in accord with the terms of their contract."
    },

    {
        "question": "What is the bond for?",
        "answer": "The bond is to cover any damage done to the courtesy phone and/or charger. The bond will be refunded upon the safe and undamaged return of the phone and charger."
    },

    {
        "question": "Do I need a charger with my courtesy phone?",
        "answer": "No, a charger is optional. You can add one with the 'Add' button."
    },
    {

        "question": " Why isn't my phone under warranty?",
        "answer": " The length of your phone's warranty depends on the warranty package you chose upon purchase. The standard is 24 months and is calculated from its purchase date."
    },
    {
        "question": " How long will my repair take?",
        "answer": " Depends on your phone broken status. It takes normally 5 to 7 working days."
    },
    {
        "question": " How do you protect the private information in my phone?",
        "answer": " We comply with all relevant laws regarding privacy and client confidentiality."
    },
    {
        "question": " Where do you get your replacement parts?",
        "answer": " We will send you a quote of all possible vendors who supply replacement parts for your references and your choice."
    },
    {
        "question": " What happens if my phone is further damage after leaving it with you?",
        "answer": " We make sure that it never happens."
    },
    {
        "question": " What kind of warranty do you offer and what does it cover?",
        "answer": "1 month is the average warranty period. These warranties covers parts and service only."
    },
    {
        "question": " What does the repair estimate include?",
        "answer": " The repair price estimate includes both replacement parts and labor."
    }

];


function searchFunction() {
    var searchTerm = document.getElementById("searchInput").value;
    var results = faqs.filter(function (faqs) {
        return faqs.question.indexOf(searchTerm) > -1;
    });

    //Loop through all results
    document.getElementById("searchResult").innerHTML = "";
    if (results.length == 0) {
        document.getElementById("searchResult").innerHTML = "Not found!";
    } else {
        for (var i = 0; i < results.length; i++) {
            document.getElementById("searchResult").innerHTML += results[i].question + "<br>";//result.question
            document.getElementById("searchResult").innerHTML += results[i].answer + "<br><br>";//result.answer
        }
    }
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#uploaded').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$("#myFile").change(function () {
    readURL(this);
});




//---------------------------------------------------------------
//Create new database ("PhoneFixBookingSystem") and a new table ("invoice")
//---------------------------------------------------------------
//Declare database variable "db"
var db;

//1: Create or open the database by using indexedDB.open() method:
// window.indexedDB.open(databaseName, version)
var request = window.indexedDB.open("PhoneFixBookingSystem", 1);

//2a: If failed to create/open database, write message to console.

request.onerror = function (event) {
    console.log("error: ");
};
//2b: If database was opened successfully, assign the created database to "db" variable
request.onsuccess = function (event) {
    db = request.result;
    console.log("success: " + db);
};


//3: If the specified version number is greater than the actual version number of the database,
// a database upgrade event "upgradeneeded" occurs.
request.onupgradeneeded = function (event) {
    //Upgrade database version --> create a new database tif the specified database doesn't exist
    var db = event.target.result;
    //Create a new table called "invoice" and assign it to a "objectStore" variable
    // the primary key of the "invoice" table is "id"
    var objectStore;
    if (!db.objectStoreNames.contains('invoice')) {
        //Only create "invoice" table when it doesn't exist
        objectStore = db.createObjectStore('invoice', { keyPath: "id" });
    }

    // //Loop through 2 invoices in "existingInvoices" and add to the "invoice" table
    // for (var i in existingInvoices) {
    //     //Since existingInvoices[i] is already in "objectStore" format, simply use add() method
    //     objectStore.add(existingInvoices[i]);
    // }
}


function getInvoiceData() {
    var customerType;
    if (document.getElementById("consumer").checked == true) {
        customerType = "Consumer";
    } else {
        customerType = "Business";
    }
    var title = document.getElementById("title").value;
    var fName = document.getElementById("fName").value;
    var lName = document.getElementById("lName").value;
    var street = document.getElementById("street").value;
    var suburb = document.getElementById("suburb").value;
    var city = document.getElementById("city").value;
    var postcode = document.getElementById("postcode").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var email = document.getElementById("email").value;
    var dateNow = new Date();
    var pDate = document.getElementById("purchaseDate").value;
    var rDate = document.getElementById("repairDate").value;
    var warranty;
    if (document.getElementById("warranty").checked == true) {
        warranty = "Yes &#10004;"
    } else if (document.getElementById("warranty").checked == false) {
        warranty = "No &#10006;"
    }
    var imei = document.getElementById("imei").value;
    var make = document.getElementById("makeSelect").value;
    var modelNumber = document.getElementById("modelNumber").value;
    var fault = document.getElementById("faultSelect").value;
    var description = document.getElementById("description").value;
    var table = $('#phoneTable').prop('outerHTML');
    var bond = document.getElementById("bond").value;
    var serviceFee = document.getElementById("serviceFee").value;
    var total = document.getElementById("subtotal").value;
    var gst = document.getElementById("gst").value;
    var totalGST = document.getElementById("totalGST").value;

    createInvoice(customerType, title, fName, lName, street, suburb, city, postcode, phoneNumber, email, dateNow, pDate, rDate, warranty, imei, make, modelNumber, fault, description, table, bond, serviceFee, total, gst, totalGST);
}
//---------------------------------------------------------------
//Add a new invoice: customer_type: "business", fullname: "Daniel Dang", phone_number: "06 974 8000",
// email: "ddang@eit.ac.nz", courtesy_phone: "iPhone7", charger: "yes", total_cost: 305.00, GST: 45.75
// to the "invoice" table by using "transaction"
//---------------------------------------------------------------
function createInvoice(customerType, title, fName, lName, street, suburb, city, postcode, phoneNumber, email, dateNow, pDate, rDate, warranty, imei, make, modelNumber, fault, description, table, bond, serviceFee, total, gst, totalGST) {

    let displayInvoice = window.open('', '_blank');

    var months = ["January", "February", "March",
        "April", "May", "June", "July", "August", "September",
        "October", "November", "December"
    ];

    //Calculate the new invoiceID
    let invoiceID = 0;
    //ASYNCHRONOOUS TRANSACTION: ISSUE                                 
    //Traverse all the records of the data table by using the pointer object IDBCursor     
    var tx = db.transaction("invoice", "readwrite");
    //                 
    tx.objectStore("invoice").openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        //For each cursor (each invoice object) 
        if (cursor) {
            //Get id 
            let id = cursor.key;
            if (id >= invoiceID) {
                invoiceID = id;
            }
            //Move to next object                         
            cursor.continue();
        }
    };

    //WAIT UNTIL THE TRANSACTION COMPLETE ==> ADD NEW INVOICE
    tx.oncomplete = function () {
        //Read back updated data
        db.transaction("invoice").objectStore("invoice").get(0).onsuccess = function (event) {
            //Increase the invoiceID by 1
            invoiceID++;
            //alert("invoiceID =" + invoiceID);


            //Open a transaction to access to table "invoice" in the mode of "readwrite" & add a new invoice
            //Adds all invoice details
            var request = db.transaction(["invoice"], "readwrite").objectStore("invoice").add({ id: invoiceID});
            //If the addition was successful, alert an successful message                         
            request.onsuccess = function (event) {
                displayInvoice.document.write(
                    `<html>
        <head>
            <title>Booking Invoice</title>
            <link rel="stylesheet" href="css/invoiceStyle.css">
        </head>
    
        <div class="invoiceDocument">
        <header>
            <div id="invoiceTitle">
                <h1>Repair Booking</h1>
            </div>
                
            
            <div id="due">
                <p>Amount Due:</p>
                <h2>${totalGST}</h2>
            </div>
            
            
        </header>
        
        <body>
            <main>
                <section id="topInfo">
                <div id="customerInfo">
                    <h3>Customer</h3><br>
                    <p>Customer Type: ${customerType}<br>
                    ${title} ${fName} ${lName}<br>
                    ${street}<br>
                    ${suburb}, ${city} ${postcode}<br>
                    ${phoneNumber}<br>
                    ${email}</p>
                
                <br>
                    </div>
                <div id="jobInfo">
                    <h3>Repair Job</h3><br>
                    
                    <label for="jobN"><b>Job Number:</b></label>
                    <p name="jobN">${invoiceID}</p> <br>
                    <label for="iDate"><b>Invoice Date:</b></label>
                    <p name="iDate">${months[dateNow.getMonth()] + " " + dateNow.getDate() + ", " + dateNow.getFullYear() + " - " + dateNow.getHours() + ":" + dateNow.getMinutes()}</p> <br>
                    <label for="pDate"><b>Payment Due:</b></label>
                    <p name="pDate">${months[dateNow.getMonth()] + " " + dateNow.getDate() + ", " + dateNow.getFullYear()}</p>  <br>
                        
                        
                </div>
                </section>

                
                <section id="bottomInfo">
                <div id="repairInfo">
                    <h2>Repair Details</h2><br>
                    
                    <label for="pDate"><b>Purchase Date:</b></label>
                    <p name="pDate">${pDate}</p> <br>
                    <label for="rDate"><b>Repair Date/Time:</b></label>
                    <p name="rDate">${rDate}</p> <br>
                    <label for="warr"><b>Under Warranty:</b></label>
                    <p name = "warr">${warranty}</p> <br>
                    <label for="imei"><b>IMEI Number:</b></label>
                    <p name="imei">${imei}</p> <br>
                    <label for="make"><b>Device Make:</b></label>
                    <p name="make">${make}</p> <br>
                    <label for="model"><b>Model Number:</b></label>
                    <p name="model">${modelNumber}</p> <br>
                    <label for="fault"><b>Fault Category:</b></label>
                    <p name="fault">${fault}</p> <br>
                    <label for="desc"><b>Description:</b></label>
                    <p name="desc">${description}</p> <br>
              
                </div>
                <br>
                <div id="deviceLoanInfo">
                    <h2>Courtesy Loan Device Details</h2>
                    <br>
                    <div id="deviceTable">
                    ${table}
                    </div>
                </div>
                <br>
                <br>
                <div id="costInfo">
                    <br>
                    <h2>Totals</h2><br>
                    
                    <label for="bond"><b>Bond:</b></label>
                    <p name="bond">${bond}</p> <br>
                    <label for="serviceF"><b>Service Fee:</b></label>
                    <p name="serviceF">${serviceFee}</p> <br>
                    <label for="total"><b>Total:</b></label>
                    <p name="total">${total}</p> <br>
                    <label for="gst"><b>GST:</b></label>
                    <p name="gst">${gst}</p> <br>
                    <label for="tgst"><b>Total inc GST:</b></label>
                    <p name="tgst">${totalGST}</p> <br>
                  
                </div>
                </section>
        
        </main>
        </body>
    
    <section id="invoiceFooter">
        <footer>
            
            <div id="footerAddress">
                <h3>Phone Fix Services</h3><br>
                <p>
                    42 Fixed It Drive<br>
                    Alexander<br>
                    New Zealand<br>
                </p>
            </div>
            <br>
            <div id="footerContact">
                <h3>Contact Us</h3><br>
                <p>
                    <b>Phone:</b> 06 844 2983<br>
                    <b>Email:</b> phonefix@email.com
                </p>
            </div>
        
        </footer>

    </section>
    </div>
    
    
    </html>
                    `
                );
            };
            //If the addition failed, alert an error message
            request.onerror = function (event) {
                alert("ERROR! Unable to add a new invoice to your database! invoiceID =" + invoiceID);
            }
        }
    }
}