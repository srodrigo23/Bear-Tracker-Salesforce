import { LightningElement, api, wire } from 'lwc';
import {  getRecord, getFieldValue } from 'lightning/uiRecordApi';

// Set Bear object fields
const NAME_FIELD = 'Bear__c.Name';
const LOCATION_LATITUDE_FIELD = 'Bear__c.Location__Latitude__s';
const LOCATION_LONGITUDE__FIELD = 'Bear__c.Location__Longitude__s';

const bearFields = [
    NAME_FIELD,
    LOCATION_LATITUDE_FIELD,
    LOCATION_LONGITUDE__FIELD
];

// Approach with out REFERENCIAL INTEGRITIY, to this use another approach
export default class BearLocation extends LightningElement {
    @api recordId;
    name;
    mapMarkers=[];

    @wire (getRecord, {recordId: '$recordId', fields: bearFields})
    loadBear({error, data}){
        if (error){
            // TODO: handle error
        }else if(data){
            //Get bear data
            this.name = getFieldValue(data, NAME_FIELD);
            const Latitude = getFieldValue(data, LOCATION_LATITUDE_FIELD);
            const Longitude = getFieldValue(data, LOCATION_LONGITUDE__FIELD);
            //Transform bear data into map markers
            this.mapMarkers[
                {
                    location : { Latitude, Longitude },
                    title : this.name,
                    description : `Coords: ${Latitude}, ${Longitude}`
                }
            ]
        }
    }

    get cardTitle(){
        return (this.name)? `${this.name}'s location` : 'Bear Location';
    }
}




