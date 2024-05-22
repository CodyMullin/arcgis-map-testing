import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';

export class StadiumMarker {

  public renderer!: any;
  public layer!: GeoJSONLayer;

  constructor() {}

  public generateRenderer(): GeoJSONLayer {
    this.renderer = {
      type: "simple",
      symbol: {
        type: "simple-marker",
        size: 8,
        color: [0, 255, 255],
      },
      label: "Major cities"
    };

    const layer = this.createLayer();
    return layer;
  } 


  public createLayer(): GeoJSONLayer {
    this.layer = new GeoJSONLayer({
      url: '/assets/ballparks.geojson',
      renderer: this.renderer,
      popupEnabled: true,
      fields: [{
        name: 'Ballpark',
        type: 'string'
      }, {
        name: 'Teams',
        type: 'string'
      }],
      popupTemplate: {
        title: '{Ballpark}',
        content: '{Teams}',
      }
    });

    return this.layer;
  } 
}
