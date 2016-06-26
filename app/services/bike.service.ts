import {Injectable} from '@angular/core';
import {BIKESTATIONS} from './bike_data';

@Injectable()
export class BikeService {

  bikedata: any;

  constructor() {
    this.toGeoJson();
  }

  getBikes() {
    return Promise.resolve(this.bikedata);
  }

  toGeoJson() {
    let geojson = {
      "type": "FeatureCollection",
      "features": []
    };
    for(let bikestation of BIKESTATIONS) {
      geojson.features.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
            bikestation.position.lng,
            bikestation.position.lat
          ]
        },
        properties: {
          id: bikestation.number,
          name:bikestation.name,
          bikes:bikestation.available_bikes,
          slots:bikestation.available_bike_stands
        }
      });
    }
    this.bikedata = geojson;
  }
}
