import { Component, Input } from '@angular/core';
import ArcGISMap from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import { StadiumMarker } from '../stadium-marker';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import { SketchService } from '../sketch.service';
import Zoom from '@arcgis/core/widgets/Zoom'


@Component({
  selector: 'arcgis-map',
  standalone: true,
  templateUrl: './arcgis-map.component.html',
  styleUrl: './arcgis-map.component.scss'
})
export class ArcgisMapComponent {
  public map: ArcGISMap | null = null;
  public mapView: MapView | null = null;
  public layer: GeoJSONLayer = new StadiumMarker().generateRenderer();

  constructor(
    private readonly _sketchService: SketchService,
  ){}

  public ngOnInit(): void {
    this.generateMap();
  }

  public generateMap(): void {
    this.map = new ArcGISMap({
      basemap: 'dark-gray-vector',
    })

    this.mapView = new MapView({
      map: this.map,
      container: 'viewDiv',
      center: [-118.244, 34.052],
      zoom: 12,
      constraints: {
        minZoom: 2,
        maxZoom: 23,
        snapToZoom: false,
      },
      ui: {
        components: []
      },
    })

    this.mapView.when(() => {
      console.log("map loaded");
      
      const zoom = new Zoom({
        view: this.mapView!,
        visible: true,
      })
      
      this.mapView!.ui.add(zoom, 'top-right')
      this._sketchService.loadSketch(this.mapView!);
    })

    this.map.add(this.layer)
  }

 
}
