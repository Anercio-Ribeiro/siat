// declare module 'react-leaflet-markercluster' {
//     import { ComponentType } from 'react';
//     import { MarkerClusterGroupProps } from 'leaflet';
  
//     const MarkerClusterGroup: ComponentType<MarkerClusterGroupProps & {
//       iconCreateFunction?: (cluster: any) => any;
//       maxClusterRadius?: number;
//     }>;
  
//     export default MarkerClusterGroup;
//   }




declare module 'react-leaflet-markercluster' {
    import { ComponentType } from 'react';
    import { MarkerClusterGroupProps } from 'leaflet';
  
    const MarkerClusterGroup: ComponentType<MarkerClusterGroupProps & {
      iconCreateFunction?: (cluster: any) => any;
      maxClusterRadius?: number;
    }>;
  
    export default MarkerClusterGroup;
  }