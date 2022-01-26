
/*
The first import brings utilities from the Lightning Messaging Service (LMS). 
This service lets you publish messages across sibling components in a Lightning page over a Lightning message channel.
The second import is Lightning message channel that was included in the base project that you retrieved from GitHub.
*/
import { publish, MessageContext } from 'lightning/messageService';
import BEAR_LIST_UPDATE_MESSAGE from '@salesforce/messageChannel/BearListUpdate__c';

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
    
    //This lines might be replaced 
    //@wire(searchBears, {searchTerm : '$searchTerm'})
    //bears;

    bears;
    // We retrieve the Lightning message context and store it in a messageContext property.
    @wire(MessageContext) messageContext;
    //We use a wired function to capture incoming bear list data and fire a 
    //custom BearListUpdate__c Ligthning message with the list of bear records.
    @wire(searchBears, {searchTerm: '$searchTerm'})
    //We pass searchTerm as a dynamic parameter to our wired searchBears adapter so that each time searchTerm changes, 
    //loadBears is re-executed and we fire a new message with the new search results.
    loadBears(result) {
        this.bears = result;
        if (result.data) {
            const message = {
                bears: result.data
            };
            //We use the publish function that we imported from LMS to fire a 
            //BearListUpdate__c Ligthning message with the bear list.
            publish(this.messageContext, BEAR_LIST_UPDATE_MESSAGE, message);
        }
    }


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