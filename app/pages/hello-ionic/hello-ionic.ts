import {Page} from 'ionic-angular';
import {BikeService} from '../../services/bike.service';
import {ACCESSTOKEN} from '../../services/mapbox-accesstoken';
import mapboxgl = require('mapbox-gl');

@Page({
  templateUrl: 'build/pages/hello-ionic/hello-ionic.html',
  providers: [BikeService]
})
export class HelloIonicPage {

  map:any;
  selected: any = [{
    name: "Noname",
    bikes: 0,
    slots: 0,
    displayed: false
  }];

  constructor(private _bikeservice: BikeService) { }

  ngOnInit() {
    mapboxgl.accessToken = ACCESSTOKEN;
    this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v8',
        center: [1.443641, 43.604370],
        zoom: 12
    });

    this.map.on('load', () => {
      this.map.resize();
      var geojson = {
        "type": "FeatureCollection",
        "features": []
      };
      this.map.addSource('custom', {
        "type": "geojson",
        "data": geojson
      });

      this._bikeservice.getBikes().then(bikes => {
        this.map.getSource('custom').setData(bikes);
        this.map.addLayer({
          "id": "custom",
          "type": "symbol",
          "source": "custom",
          "layout": {
              "icon-image": "bicycle-15",
              "text-field": "{id}",
              "text-offset": [0, 1.2]
          }
        });
      });
    });

    this.map.on('click', (e) => {
      var features = this.map.queryRenderedFeatures(e.point, { layers: ['custom'] });

      if (!features.length) {
          this.selected[0].displayed = false;
          return;
      }

      var feature = features[0];

      this.selected.unshift({
        name: feature.properties.name,
        bikes: feature.properties.bikes,
        slots: feature.properties.slots,
        displayed: true
      })
    });
  }
}
