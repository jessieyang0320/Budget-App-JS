
// budget controller
var budgetController = (function(){

// will be a lot of expense and income, so set up a constructor
	var Expense = function(id, description, value){
		this.id = id;
		this.description = description;
		this.value = value; 
		this.percentage= -1;
	};
// calculate %
		Expense.prototype.calcPercentage = function(totalIncome){

			if(totalIncome>0){
				this.percentage = Math.round((this.value/ totalIncome)*100);
			} else {
				this.percentage = -1;
			}
		};
// return %
		Expense.prototype.getPercentage = function(){
			return this.percentage;
		};



	var Income = function(id, description, value){
		this.id = id;
		this.description = description;
		this.value = value; 
	};

	var calculateTotal = function(type){

		var sum = 0;
		data.allItems[type].forEach(function(current, index,array){
			sum += current.value
		});

		data.totals[type] = sum;
	}


// better to make all the data an object instead declare them individually
	var data = {
		allItems: {
			exp: [],
	     	inc: []
		},

		totals: {
			exp: 0,
			inc: 0
		},
		budget: 0,
		percentage: -1
	}

	return {
		addItem: function(type,des,val){

			var newItem, ID;
// create new id, find the last element and got its id, + 1 
// note: at the very beginning, no data`s in the array, will casue error
		if(data.allItems[type].length>0){
			ID = data.allItems[type][data.allItems[type].length - 1].id + 1; 
		}else{
			ID=0;
		}
// create new item based on type

			if(type === 'exp'){
				newItem = new Expense(ID, des,val);


			}else if(type === 'inc'){
				newItem = new Income(ID, des,val);
			}
// allItems object use type name as keys, so it would be esay to do the following: 
// so that if statement wont be needed here, make it simple

// push it to data structore
			data.allItems[type].push(newItem)
// return the new element to expose it
			return newItem;

		},
// note: cannot do: data.allItems[type][3], this way you are deleting the 
// 3rd element not the element whose id number is 3 eg: [1,3,4,5,6] 
// should find the index number of that element to remove it
// map returns a new array

		deleteItem: function(type, id){

			var ids, index
			ids = data.allItems[type].map(function(current){
				return current.id
			});

			index = ids.indexOf(id);

			if(index !== -1){
				// splice() remove els from array, slice: make copy o array
				data.allItems[type].splice(index, 1); 
			}

		},

		calculateBudget: function(){

			// calculate total exp and inc
				calculateTotal('exp');
				calculateTotal('inc');


			// calculate the budget: income-expense
			data.budegt = data.totals.inc - data.totals.exp; 

			// calculate the % of income that we spent
			// if only exps, %will show infinit
			if(data.totals.inc > 0){
			data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100)
		} else {
			data.percentage = -1;
		}
		},
// calculate each expense % 
		calculatePercentages: function(){
			data.allItems.exp.forEach(function(cur){
				cur.calcPercentage(data.totals.inc);
			})
		},

		getPercentages: function(){
			var allPerc = data.allItems.exp.map(function(cur){
				return cur.getPercentage(); 
			})
			return allPerc;
		},

// return budget
		getBudget: function(){
			return {
				budget: data.budegt,
				totalInc: data.totals.inc,
				totalExp: data.totals.exp,
				percentage: data.percentage
			}
		},

		testing: function(){
			console.log(data);
		}
	};


})();



// UI CONTROLLER
// will select tags many times, to avoid typos, make all the tags a DOMstring
var UIController = (function(){

	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue:'.add__value',
		inputBtn: '.add__btn',
		incomeContainer: '.income__list',
		expensesContainer:'.expenses__list',
		budgetLabel: '.budget__value',
		incomeLabel: '.budget__income--value',
		expenseLabel: '.budget__expenses--value',
		percentageLabel: '.budget__expenses--percentage',
		container: '.container',
		expensesPercLabel: '.item__percentage',
		dateLabel:'.budget__title--month'


	}
// no need to make a public function 
	var formatNumber = function(num, type){
			/*
			+/- before number,
			exactly 2 decimal points
			comma separating the thousands 
			*/ 

			var numSplite; 

			num = Math.abs(num);
			num = num.toFixed(2); //toFixed is a number prototype method 2.5678=> 2.57
			numSplite = num.split('.')

			int = numSplite[0];
			if(int.length > 3){
				int = int.substr(0, int.length-3) + ',' + int.substr(int.length-3, 3)
			}
			
			dec = numSplite[1];

			

			return (type === 'exp' ? sign = '-' : sign = '+') + ' ' + int + '.' + dec;

		};


// build a forEach fn on node list
			var nodeListForEach = function(list, callback){
				for(var i = 0; i< list.length; i++){
					callback(list[i],i)
				}
			}

// to expose 
	return {
		getInput: function(){
// return an objects with the three input value, so that it can be used by other functions
// not the value is a string, need to convert to number to do calculation

			return {
				type : document.querySelector(DOMstrings.inputType).value,
				description : document.querySelector(DOMstrings.inputDescription).value,
				value : parseFloat(document.querySelector(DOMstrings.inputValue).value)
			};
		},

		addListItem: function(obj, type){
			// step 1: create HTML string with placeholder text
			var html, newHtml, element;
// get the html template from index.html
// replace id, des,value with %% make it easier to find 
// note: leaves no space in the html, or error occurs

		    if(type === 'inc') {
		    	element = DOMstrings.incomeContainer;
		         html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			} else if (type === 'exp'){
			     	element = DOMstrings.expensesContainer;
			     	html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			     }


			// step 2:replace the placeholder txt with some actual data

				newHtml = html.replace('%id%', obj.id);
				newHtml = newHtml.replace('%description%', obj.description);
				newHtml = newHtml.replace('%value%', formatNumber(obj.value,type));

			// step 3: insert the HTML into the DOM
			// use beforeend, will inset it into the element as the last child, see
			// documents for more options

			document.querySelector(element).insertAdjacentHTML('beforeend',newHtml) 

		},

// check docs for more remove el options

		deleteListItem: function(selectorID){
			var el = document.getElementById(selectorID);
			el.parentNode.removeChild(el);
		},

		clearFields: function(){

			var fields, fieldsArr;
// trick slice function to believe fields is an array and use it to return an array
// then use forEach on the returned array
			fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue)
			fieldsArr = Array.prototype.slice.call(fields);

			fieldsArr.forEach(function(current,index,array){
				current.value ='';
			})
// after clear focus back to description 
			fieldsArr[0].focus();
		},

		displayBudget: function(obj){
			var type;
			obj.budget > 0 ? type ='inc' : type = 'exp';

			document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
			document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
			document.querySelector(DOMstrings.expenseLabel).textContent = formatNumber(obj.totalExp, 'exp');
			
			
			if(obj.percentage > 0){

				document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';

			} else {
				document.querySelector(DOMstrings.percentageLabel).textContent = '---';
			}


		},

		displayPercentages: function(percentages){
			// a node list, forEach not working
			var fields = document.querySelectorAll(DOMstrings.expensesPercLabel)
			
		

			nodeListForEach(fields, function(current, index){

				if( percentages[index]>0){

					current.textContent = percentages[index] + '%';
				} else {
					current.textContent = '---';
				}
				
			})

		},

		displayMonth: function(){
			var now, year, month, formatter;

			now = new Date();

			formatter = new Intl.DateTimeFormat('en', { month: 'long'})
			
			year = now.getFullYear(); 
			month = formatter.format(now);
			document.querySelector(DOMstrings.dateLabel).textContent = month + ' ' + year;


		},

		changedType: function(){
			var fields = document.querySelectorAll(
				DOMstrings.inputType + ',' +
				DOMstrings.inputDescription + ',' +
				DOMstrings.inputValue); 

			nodeListForEach(fields, function(cur){
				cur.classList.toggle('red-focus');
			});

			document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
		},
		

		getDOMstrings: function(){
			return DOMstrings;
		}
	}

})()





// publicTest() should return sth so that it can be saved 
// in a variable, or it wont work 


// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl){

	var setupEventListeners = function(){
		// click button or press enter same result
		// older browsers dont have keyCode property, use which

		var DOM = UICtrl.getDOMstrings();

		document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem)

		document.addEventListener('keypress',function(event){
			if(event.keyCode === 13 || event.which === 13){

				ctrlAddItem();
				
			}
		});

		document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);

		document.querySelector(DOM.inputType).addEventListener('change',UICtrl.changedType);
	};

	var updateBudget = function(){

		// 1. calculate the budget
		budgetCtrl.calculateBudget();

		// 2. return the budget
		var budget = budgetCtrl.getBudget();

		// 3. display the budget on the UI 

		UICtrl.displayBudget(budget)

	}

// percentages are updated when add or delete an item
	var updatePercentages = function(){
		// 1. calculate %
		budgetCtrl.calculatePercentages();
		// 2. read percentages from the budget controller
		var percentages = budgetCtrl.getPercentages();

		// 3. update the UI with new % 
		UICtrl.displayPercentages(percentages);
	}

	
	var ctrlAddItem = function(){
		var input, newItem;

		// 1. get input data
		input = UICtrl.getInput();

//check if inputs are valid, isNan()is a fn to check if sth is a number or not 
		if (input.description !=="" && !isNaN(input.value) && input.value > 0){

			// 2. add the item to the budget controller
		newItem = budgetCtrl.addItem(input.type,input.description, input.value);

		// 3. add the item to the UI

		UICtrl.addListItem(newItem, input.type)

		// 4. clear fields 
		UICtrl.clearFields();

		// 5. calculate and update budget 

		updateBudget();

		// 6. calculate and update %
		updatePercentages();

		}	
	}

	var ctrlDeleteItem = function(event){

		var itemID,splitID, type, ID;
		itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

		if(itemID){			
				// id format: 'inc-1'.split('-'); ==> ['inc','1'],then we got type and id
				// note: ID is a string, need to transfer to number 
			splitID = itemID.split('-');
			type = splitID[0];
			ID = parseInt(splitID[1]);

			// 1. delete the item from the data structure
				budgetCtrl.deleteItem(type, ID);

			// 2. delete item from the UI
				UICtrl.deleteListItem(itemID);

			// 3. update and show new budget number
				updateBudget();

			// 4. calculate and update %
				updatePercentages();
		}

	}



// expose it to public

	return {
		init: function(){
			console.log('app started');
			UICtrl.displayMonth();
			UICtrl.displayBudget({
				budget: 0,
				totalInc: 0,
				totalExp: 0,
				percentage: 0
			})
			setupEventListeners();
		}
	}


})(budgetController,UIController);

// without this, there will not be any event listener 
controller.init();













