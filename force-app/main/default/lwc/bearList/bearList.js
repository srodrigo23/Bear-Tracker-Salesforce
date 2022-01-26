/* 
We import a navigation mixin that bundles utility functions dealing with navigation. 
A mixin lets us add functionality to a class without extending it. 
This is useful when a class already extends a parent class (a class can only extend a single parent).
*/
import { NavigationMixin } from 'lightning/navigation';
//This class extends the navigation mixin applied to the LightningElement base class.
import { LightningElement, wire } from 'lwc';
//import ursusResources from '@salesforce/resourceUrl/ursus_park';
/** BearController.getAllBears() Apex method */
//import getAllBears from '@salesforce/apex/BearController.getAllBears';
import searchBears from '@salesforce/apex/BearController.searchBears';

// Our class extends the navigation mixin applied to the LightningElement base class.
export default class BearList extends NavigationMixin(LightningElement) {
    searchTerm = ''; //reactive property
    @wire(searchBears, {searchTerm : '$searchTerm'})
    bears;
    //@wire(getAllBears) bears;
    //appResources = { // bear static image 
	//	bearSilhouette: `${ursusResources}/img/standing-bear-silhouette.png`,
	//};

    handleSearchTermChange(event) {
		// Debouncing this method: do not update the reactive property as
		// long as this function is being called within a delay of 300 ms.
		// This is to avoid a very large number of Apex method calls.
		window.clearTimeout(this.delayTimeout);
		const searchTerm = event.target.value;
		// eslint-disable-next-line @lwc/lwc/no-async-operation
		this.delayTimeout = setTimeout(() => {
			this.searchTerm = searchTerm;
		}, 300);
	}
	get hasResults() {
		return (this.bears.data.length > 0);
	}

    /*
      We handle the bearview event in the handleBearView function. 
      We extract the bear record id from the event detail and we use 
      the navigation mixin to navigate to a bear record page.
     */
    handleBearView(event) {
		// Get bear record id from bearview event
		const bearId = event.detail;
		// Navigate to bear record page
		this[NavigationMixin.Navigate]({
			type: 'standard__recordPage',
			attributes: {
				recordId: bearId,
				objectApiName: 'Bear__c',
				actionName: 'view',
			},
		});
	}
    /*
	//bears; //properties
	error; // to sjow any error

	appResources = { // bear static image 
		bearSilhouette: `${ursusResources}/img/standing-bear-silhouette.png`,
	};

	connectedCallback() { // callback allows execute codeafeter the component is loaded
		this.loadBears();
	}

	loadBears() {
		getAllBears().then( //Imperative apex
            result => {
				this.bears = result;
			})
			.catch(error => {
				this.error = error;
			});
	}
    */
}