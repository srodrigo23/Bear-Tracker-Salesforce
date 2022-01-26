import { LightningElement, wire } from 'lwc';
import ursusResources from '@salesforce/resourceUrl/ursus_park';
/** BearController.getAllBears() Apex method */
//import getAllBears from '@salesforce/apex/BearController.getAllBears';
import searchBears from '@salesforce/apex/BearController.searchBears';

export default class BearList extends LightningElement {
    searchTerm = ''; //reactive property
    @wire(searchBears, {searchTerm : '$searchTerm'})
    bears;
    //@wire(getAllBears) bears;
    appResources = { // bear static image 
		bearSilhouette: `${ursusResources}/img/standing-bear-silhouette.png`,
	};

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