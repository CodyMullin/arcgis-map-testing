import { Injectable } from '@angular/core';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import MapView from '@arcgis/core/views/MapView';
import Sketch from '@arcgis/core/widgets/Sketch';
import * as webMercatorUtils from '@arcgis/core/geometry/support/webMercatorUtils';


@Injectable({
  providedIn: 'root'
})
export class SketchService {

  constructor() { }

  public graphicsLayer: GraphicsLayer = new GraphicsLayer();

  public loadSketch(mapView: MapView): void {
    const sketch = new Sketch({
      layer: this.graphicsLayer,
      view: mapView,
      visibleElements: {
        createTools: {
          polyline: false,
          point: false,
          polygon: false,
        },
        settingsMenu: false,
        undoRedoMenu: false,
        selectionTools: {
          "lasso-selection": false,
          "rectangle-selection": false
        }
      }
    });
    
    sketch.on('create', (res) => {
      if (res.state === 'complete') {
        console.log(res)
        console.log(res.graphic.geometry.extent)
        console.log(res.graphic.geometry.extent.center.latitude)
        console.log(res.graphic.geometry.extent.center.longitude)
        const latLngBounds = webMercatorUtils.webMercatorToGeographic(res.graphic.geometry.extent);
        const nwBound = [latLngBounds.extent.xmin, latLngBounds.extent.ymax];
        const seBound = [latLngBounds.extent.xmax, latLngBounds.extent.ymin];

        console.log(nwBound, seBound);
      }
    })

    mapView.ui.add(sketch, 'top-right')
  }
}
