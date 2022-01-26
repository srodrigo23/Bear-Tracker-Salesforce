import { LightningElement, wire } from 'lwc';
import ursusResources from '@salesforce/resourceUrl/ursus_park';
/** BearController.getAllBears() Apex method */
import getAllBears from '@salesforce/apex/BearController.getAllBears';

export default class BearList extends LightningElement {
    @wire(getAllBears) bears;
    appResources = { // bear static image 
		bearSilhouette: `${ursusResources}/img/standing-bear-silhouette.png`,
	};

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