import React, { useEffect } from 'react';
import BaseMapStyle from '../constants/base-map-style.json';
// import mapboxgl from 'mapbox-gl';
// import '../../../../src/mapboxgl/core/MapExtend';
// const maplibregl = (window as any).mapboxgl;
export type MapProps = {
  onLoadedMap: (map: any) => void;
}

const Map = (props: MapProps) => {
  const { onLoadedMap } = props;

  useEffect(() => {
    // const map = new (window as any).maplibregl.Map({
    const map = new window.mapboxgl.Map({
      container: 'map',
      style: BaseMapStyle,
      center: [100, 35],
      zoom: 4.36
    });

    map.on('load', async () => {
      (window as any).map = map;
      onLoadedMap(map);
    });
  }, [])

  return <div id="map"></div>
}

export default Map;
