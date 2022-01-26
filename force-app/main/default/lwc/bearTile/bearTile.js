import { LightningElement, api } from 'lwc';
import ursusResources from '@salesforce/resourceUrl/ursus_park';

export default class BearTile extends LightningElement {
    @api bear; //This exposes the bear property to any parent component.
	appResources = {
		bearSilhouette: `${ursusResources}/img/standing-bear-silhouette.png`,
	};

    /*
    The handleOpenRecordClick function is called when a user clicks 
    on the open record button of a bear tile.
    */
    handleOpenRecordClick() {  
        const selectEvent = new CustomEvent('bearview', {
            detail: this.bear.Id
        });
        this.dispatchEvent(selectEvent);
    }
}