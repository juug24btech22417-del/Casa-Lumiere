// @ts-nocheck
"use client";

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MAP_STYLE, MAPBOX_COLORS } from '@/lib/map-config';

interface MapComponentProps {
  accessToken: string;
  plots: any[]; // Replace any with a proper Plot type once schema is defined
}

export const LandMap = ({ accessToken, plots }: MapComponentProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = accessToken;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: MAP_STYLE,
      center: [0, 0], // Will be updated based on plot data
      zoom: 10,
    });

    mapRef.current = map;

    map.on('load', () => {
      // Add source for plots
      map.addSource('plots', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: plots.map(plot => ({
            type: 'Feature',
            properties: {
              id: plot.id,
              status: plot.status,
              plot_number: plot.plot_number
            },
            geometry: plot.geometry // Assuming GeoJSON Polygon
          })),
        },
      });

      // Add layers for different statuses
      Object.entries(MAPBOX_COLORS).forEach(([status, color]) => {
        map.addLayer({
          id: `layer-${status}`,
          type: 'fill',
          source: 'plots',
          paint: {
            'fill-color': color,
            'fill-opacity': 0.6,
            'fill-outline-color': '#fff',
          },
          filter: ['==', ['get', 'status'], status],
        });
      });

      // Add hover interaction
      map.on('mouseenter', 'layer-available', (e) => {
        if (e.features.length > 0) {
          map.getCanvas().style.cursor = 'pointer';
          if (e.features[0]) {
            map.setPaintProperty('layer-available', 'fill-opacity', 0.8);
          }
        }
      });

      map.on('mouseleave', 'layer-available', () => {
        map.getCanvas().style.cursor = '';
        map.setPaintProperty('layer-available', 'fill-opacity', 0.6);
      });
    });

    return () => map.remove();
  }, [accessToken, plots]);

  return (
    <div ref={mapContainerRef} className="w-full h-full" />
  );
};
