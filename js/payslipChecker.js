
//function to validate that all form fields are populated with the correct data types	
function validate()
	{
		//declaring variables from form inputs
		var fName=document.getElementById('fName').value;
		var lName=document.getElementById('lName').value;
		var aSalary=document.getElementById('aSalary').value;
		var pension=document.getElementById('pension').value;
		var startDate=document.getElementById('startDate').value;

		var result = true;
				
		//check the first name has been entered
		if(fName== "")
			{
				alert("Please enter a first name")
				document.getElementById('fName').style.background='yellow';
				document.getElementById('fName').focus();
				result = false;
			}
		//check the last name has been entered
		else if(lName== "")
			{
				alert("Please enter a last name")
				document.getElementById('lName').style.background='yellow';
				document.getElementById('lName').focus();
				result = false;
			}		
		//check salary has been entered
		else if(aSalary== "")
			{
				alert("Please enter annual salary")
				document.getElementById('aSalary').style.background='yellow';
				document.getElementById('aSalary').focus();
				result = false;
			}
		//check if salary is an integer
		else if(!parseInt(aSalary))
			{
				alert("Please use numberic character only for salary")
				document.getElementById('aSalary').style.background='yellow';
				document.getElementById('aSalary').focus();
				result = false;
			}
		//check if pension has been entered
		else if(pension== "")
			{
				alert("Please enter employees pension rate")
				document.getElementById('pension').style.background='yellow';
				document.getElementById('pension').focus();
				result = false;
			}
		//check if pension is an integer
		else if(!parseInt(pension))
			{
				alert("Please use numberic character only for pension rate")
				document.getElementById('pension').style.background='yellow';
				document.getElementById('pension').focus();
				result = false;
			}
		//check if pension is over 50
		else if(pension > 50)
			{
				alert("Please enter a pension rate less then 50%")
				document.getElementById('pension').style.background='yellow';
				document.getElementById('pension').focus();
				result = false;
			}
		//check that a date has been entered
		else if(startDate== "")
			{
				alert("Please enter payment start date")
				document.getElementById('startDate').style.background='yellow';
				document.getElementById('startDate').focus();
				result = false;
			}	
return result;
}

//function used to calulate month, gross, pension and to concat name
function caltotal()
{	
	//check if the validate function returns a true result
	if(validate())
	{
		//declare variables
		var fName=document.getElementById('fName').value;
		var lName=document.getElementById('lName').value;
		var aSalary=document.getElementById('aSalary').value;
		var pension=document.getElementById('pension').value;
		var startDate=document.getElementById('startDate').value;
		var name = fName.concat(" ").concat(lName); //concat fname and lname with a space between them
		var gross = aSalary / 12; //calulate the gross by dividing the salary by 12
		//array used to store the month names
		var monthArray = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
		var date = new Date(startDate); //converts stateDate string in to date type	
		var month=date.getMonth(); //gets the month integer value out of the date
		var grossTotal = Math.round(gross); //rounds off the gross
		var penResult = grossTotal * (pension / 100); //calulates the pension by multipling the gross by pension divided by 100
		var penRound = Math.round(penResult); //rounds off pension
		
		calTax();		
		
		document.getElementById('results').style.display = "block"; //displays payslip
		document.getElementById('employee').innerHTML= name; //passes name to employee div
		document.getElementById('gross').innerHTML= grossTotal; //passes gross to gross div
		document.getElementById('period').innerHTML= "Month of " + monthArray[month]; //passes monthy to period div
		document.getElementById('penResult').innerHTML= penRound; //passes pension value to penResult div
	}
}

//function used to calulate the income tax and net income
function calTax()
{
	//declare variables
	var aSalary=document.getElementById('aSalary').value; // gets salary value
	//sets lumpSum, dollerRate, cutOff and tax to 0
	var lumpSum = 0;
	var dollarRate = 0;
	var tax = 0;
	var cutOff = 0;
	var gross = aSalary / 12; //calulates months gross by divided the salary by 12
	var pension=document.getElementById('pension').value; //gets pension values
	
	//if..else used to work out tax bracket and set the variables accordingly 
	if(aSalary < 18200)
	{
		lumpSum = 0;
	}
	else if((aSalary > 18201)&&(aSalary < 37000))
	{
		lumpSum = 0;
		dollarRate = 0.19;
		cutOff = 18200;
		
	}
	else if((aSalary > 37001)&&(aSalary < 80000))
	{
		lumpSum = 3572;
		dollarRate = 0.325;
		cutOff = 37000;
	}
	else if((aSalary > 80001)&&(aSalary < 180000))
	{
		lumpSum = 17547;
		dollarRate = 0.37;
		cutOff = 80000;
	}
	else if(aSalary > 180001)
	{
		lumpSum = 54547;
		dollarRate = 0.45;
		cutOff = 180000;
	}
	
	//calulates the monthly tax by added the lumpSum to Salary minius cutoff multipled by the dollarrate and then divided by 12
	tax = (lumpSum + (aSalary - cutOff) * dollarRate) / 12;
	taxTotal = Math.round(tax);
	
	//rounds off the gross
	var grossTotal = Math.round(gross);
	
	//calulates the net income by subtracting the tax from the gross
	var netIncome = grossTotal - taxTotal;
	
	//passes values back to form
	document.getElementById('tax').innerHTML= taxTotal;	
	document.getElementById('net').innerHTML= netIncome;

}


