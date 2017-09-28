
// budget controller
var budgetController = (function(){

})();



// UI CONTROLLER
var UIController = (function(){

	return {
		getInput: function(){
// return an objects with the three input value, so that it can be used by other functions
			return {
				type : document.querySelector('.add__type').value,
				description : document.querySelector('.add__description').value,
				value : document.querySelector('.add__value').value
			}
			
		}
	}

})()

// publicTest() should return sth so that it can be saved 
// in a variable, or it wont work 


// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl){

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
	document.querySelector('.add__btn').addEventListener('click',ctrlAddItem)

	document.addEventListener('keypress',function(event){
		if(event.keyCode === 13 || event.which === 13){

			ctrlAddItem();
			
		}

	})

})(budgetController,UIController);















