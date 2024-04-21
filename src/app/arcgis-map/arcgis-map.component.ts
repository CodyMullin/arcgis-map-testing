import { Component, Input } from '@angular/core';
import ArcGISMap from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import { StadiumMarker } from '../stadium-marker';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';

@Component({
  selector: 'arcgis-map',
  standalone: true,
  templateUrl: './arcgis-map.component.html',
  styleUrl: './arcgis-map.component.scss'
})
export class ArcgisMapComponent {
  public map: ArcGISMap | null = null;
  public layer: GeoJSONLayer = new StadiumMarker().generateRenderer();

  public ngOnInit(): void {
    this.generateMap();
  }

  public generateMap(): void {
    this.map = new ArcGISMap({
      basemap: 'dark-gray-vector',
    })

    const view = new MapView({
      map: this.map,
      container: 'viewDiv',
      center: [-118.244, 34.052],
      zoom: 12,
      constraints: {
        minZoom: 2,
        maxZoom: 23,
        snapToZoom: false,
      }
    })

    view.when(() => {
      console.log("map loaded");
    })

    this.map.add(this.layer)
  }
}
