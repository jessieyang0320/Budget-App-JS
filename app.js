
// budget controller
var budgetController = (function(){

})();



// UI CONTROLLER
// will select tags many times, to avoid typos, make all the tags a DOMstring
var UIController = (function(){

	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue:'.add__value',
		inputBtn: '.add__btn'

	}

	return {
		getInput: function(){
// return an objects with the three input value, so that it can be used by other functions
			return {
				type : document.querySelector(DOMstrings.inputType).value,
				description : document.querySelector(DOMstrings.inputDescription).value,
				value : document.querySelector(DOMstrings.inputValue).value
			};
		},
// expose it
		getDOMstrings: function(){
			return DOMstrings;
		}
	}

})()





// publicTest() should return sth so that it can be saved 
// in a variable, or it wont work 


// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl){
	var DOM = UICtrl.getDOMstrings();

	var ctrlAddItem = function(){
		// 1. get input data

		var input = UICtrl.getInput()

		// 2. add the item to the budget controller

		// 3. add the item to the UI

		// 4. calculate the budget

		// 5. display the budget on the UI  

		console.log(input)
	}

// click button or press enter same result
// older browsers dont have keyCode property, use which
	document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem)

	document.addEventListener('keypress',function(event){
		if(event.keyCode === 13 || event.which === 13){

			ctrlAddItem();
			
		}

	})

})(budgetController,UIController);















