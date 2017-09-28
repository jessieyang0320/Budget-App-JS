
// budget controller
var budgetController = (function(){

})();



// UI CONTROLLER
var UIController = (function(){

})()

// publicTest() should return sth so that it can be saved 
// in a variable, or it wont work 


// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl){

	var ctrlAddItem = function(){
		// 1. get input data

		// 2. add the item to the budget controller

		// 3. add the item to the UI

		// 4. calculate the budget

		// 5. display the budget on the UI  

		console.log('hit')
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















