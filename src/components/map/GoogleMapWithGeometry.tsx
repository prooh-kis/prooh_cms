import { useEffect, useRef, useState, useCallback } from "react";
import { Map, InfoWindow } from "@vis.gl/react-google-maps";
import { CustomAdvancedMarker } from "./CustomMarker";
import { Circle } from "./MapCircle";
import { Directions } from "./Direction";
import { DrawPolygon } from "./DrawPolygon";
import {FeatureCollection, Point, GeoJsonProperties} from 'geojson';
import { Heatmap } from "./Heatmap";
import { ToggleSwitch } from "../../components/atoms/ToggleSwitch";
import clsx from "clsx";

type POIProps = {
  id: string;
  mag: number;
  time: number;
  felt: number | null;
  tsunami: 0 | 1;
};

type POIGeojson = FeatureCollection<Point, POIProps>;

export function GoogleMapWithGeometry(props: any) {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [selectedMarkers, setSelectedMarkers] = useState([]);
  const [unSelectedMarkers, setUnselectedMarkers] = useState([]);
  const [screenData, setScreenData] = useState<any>(null);
  const [heatmapOn, setHeatMapOn] = useState<any>(false);
  
  const brandCoor = props?.data?.["brand"]?.map((c: any) => {
    return {
      lat: c[1],
      lng: c[0],
    }
  });

  const compCoor = props?.data?.["comp"]?.map((c: any) => {
    return {
      lat: c[1],
      lng: c[0],
    }
  });

  const [viewState, setViewState] = useState({
    center: {
      lat: props?.geometry?.coordinates[0] || 28.495,
      lng: props?.geometry?.coordinates[1] || 77.0891,
    },
    zoom: props?.zoom || 10,
  });

  const [radiusHeatMap, setRadiusHeatMap] = useState(40);
  const [opacityHeatMap, setOpacityHeatMap] = useState(0.8);

  const [poiGeojson, setPoiGeojson] =
    useState<POIGeojson>();

  async function loadPoiGeojson(heatmap: any[]): Promise<POIGeojson> {
    return Promise.resolve({
      type: "FeatureCollection",
      crs: {
        type: "name",
        properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" }
      },
      features: heatmap
    });
  }

  useEffect(() => {
    loadPoiGeojson(props?.heatmap).then(data => setPoiGeojson(data));
  }, [props?.heatmap]);

  const getSingleScreenData = async (screenId: any) => {
    let data;
    data = props?.allScreens?.find((screen: any) => screen._id == screenId);

    setScreenData(data);
  };

  // Cleanup function to clear any existing routes and buffered regions
  useEffect(() => {
    // Store the current map reference to avoid closure issues
    const currentMap = mapRef.current;
    
    return () => {
      if (!currentMap) return;
      
      // Clear all overlays from the map
      const overlays = currentMap.overlayMapTypes;
      while (overlays.getLength() > 0) {
        overlays.removeAt(0);
      }
      
      // Clear any existing routes and polylines
      currentMap.data.forEach((feature: google.maps.Data.Feature) => {
        currentMap.data.remove(feature);
      });
    };
  }, []);

  useEffect(() => {
    setSelectedMarkers(
      props?.filteredScreens?.map((m: any) => ({
        images: m.images,
        lng: m?.location?.geographicalLocation?.longitude,
        lat: m?.location?.geographicalLocation?.latitude,
        id: m._id,
        details: m.location,
        screenType: m.screenType,
        name: m.screenName,
      }))
    );

    setUnselectedMarkers(
      props.allScreens
        ?.filter(
          (s: any) => !props?.filteredScreens?.map((f: any) => f._id).includes(s._id)
        )
        ?.map((m: any) => ({
          images: m.images,
          lng: m?.location?.geographicalLocation?.longitude,
          lat: m?.location?.geographicalLocation?.latitude,
          id: m._id,
          details: m.location,
          screenType: m.screenType,
          name: m.screenName,
        }))
    );
  }, [props]);

  return (
    <div className="relative h-full w-full items-top">
      <div className="flex flex-col items-end gap-2 right-2 bottom-4 pt-2 absolute z-10">
        <div className="flex items-center gap-2 group">
          <h1 className="text-[10px] text-white group-hover:opacity-100 group-hover:bg-[#00A0FA] group-hover:p-1 group-hover:rounded opacity-0 transition-opacity duration-300">
            Selected Screens
          </h1>
          <div className="h-4 w-4 bg-[#00A0FA] rounded-full"></div>
        </div>
        <div className="flex items-center gap-2 group">
          <h1 className="text-[10px] text-white group-hover:opacity-100 group-hover:bg-[#F94623] group-hover:p-1 group-hover:rounded opacity-0 transition-opacity duration-300">
            Unselected Screens
          </h1>
          <div className="h-4 w-4 bg-[#F94623] rounded-full"></div>
        </div>
        <div className="flex items-center gap-2 group">
          <h1 className="text-[10px] text-white group-hover:opacity-100 group-hover:bg-[#22C55E] group-hover:p-1 group-hover:rounded opacity-0 transition-opacity duration-300">
            Near Brand Store
          </h1>
          <div className="h-4 w-4 bg-[#22C55E] rounded-full"></div>
        </div>
        <div className="flex items-center gap-2 group">
          <h1 className="text-[10px] text-white group-hover:opacity-100 group-hover:bg-[#F59E0B] group-hover:p-1 group-hover:rounded opacity-0 transition-opacity duration-300">
            Near Competitor Store
          </h1>
          <div className="h-4 w-4 bg-[#F59E0B] rounded-full"></div>
        </div>
        <div className="flex items-center gap-2 group">
          <h1 className="text-[10px] text-white group-hover:opacity-100 group-hover:bg-[#8B5CF6] group-hover:p-1 group-hover:rounded opacity-0 transition-opacity duration-300">
            Route Starting Point
          </h1>
          <div className="h-4 w-4 bg-[#8B5CF6] rounded-full"></div>
        </div>
        <div className="flex items-center gap-2 group">
          <h1 className="text-[10px] text-white group-hover:opacity-100 group-hover:bg-[#FF77E9] group-hover:p-1 group-hover:rounded opacity-0 transition-opacity duration-300">
            Route Ending Point
          </h1>
          <div className="h-4 w-4 bg-[#FF77E9] rounded-full"></div>
        </div>
      </div>
      <div className="absolute z-10 bottom-0 left-1">
        <h1 className="text-[8px] font-semibold text-center">POI Heatmap</h1>
        <ToggleSwitch
          value={heatmapOn}
          action={() => setHeatMapOn(!heatmapOn)}
        />
      </div>
      <Map
        // mapContainerStyle={containerStyle}
        defaultCenter={viewState.center}
        defaultZoom={viewState.zoom}
        // onLoad={(map: any) => (mapRef.current = map)}
        mapId="96194b21d9fc00de"
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        {/* circle */}
        {brandCoor?.map((coor: any, i: any) => (
          <Circle
            key={i}
            radius={props?.circleRadius}
            center={coor}
            // onRadiusChanged={props?.setCircleRadius}
            strokeColor={"#22C55E"}
            strokeOpacity={1}
            strokeWeight={3}
            fillColor={"#22C55E90"}
            fillOpacity={0.3}
            // editable
            // draggable
          />
        ))}
        {compCoor?.map((coor: any, i: any) => (
          <Circle
            key={i}
            radius={props?.circleRadius}
            center={coor}
            // onRadiusChanged={props?.setCircleRadius}
            strokeColor={"#F59E0B"}
            strokeOpacity={1}
            strokeWeight={3}
            fillColor={"#F59E0B90"}
            fillOpacity={0.3}
            // editable
            // draggable
          />
        ))}

        {/* <Directions allRoutes={mapRoutes} /> */}
        <Directions
          allRoutes={props?.routes}
          setAllRoutes={props?.setRoutes}
          allScreens={props?.allScreens}
          routeFilteredScreens={props?.routeFilteredScreens}
          routeRadius={props?.routeRadius}
          setRouteFilteredScreens={props?.setRouteFilteredScreens}
          handleFinalSelectedScreens={props?.handleFinalSelectedScreens}
          finalSelectedScreens={props?.finalSelectedScreens}
        />

        <DrawPolygon
          allScreens={props?.allScreens}
          setPolygonScreens={props?.setPolygonFilteredScreens}
          polygons={props?.polygons}
          setPolygons={props?.setPolygons}
          handleFinalSelectedScreens={props?.handleFinalSelectedScreens}
        />

        {heatmapOn && (
          <Heatmap
            geojson={poiGeojson}
            radius={radiusHeatMap}
            opacity={opacityHeatMap}
          />
        )}

        {selectedMarkers.map((marker: any) => (
          <CustomAdvancedMarker
            key={marker.id}
            marker={marker}
            color={"#00A0FA"}
            // color={marker.screenType === "Spectacular" ? "#00A0FA" : marker.screenType === "Large" ? "#00A0FA60" : "#00A0FA20"}
            size={
              marker.screenType == "Spectacular"
                ? 60
                : marker.screenType == "Large"
                ? 44
                : 36
            }
            action={(e: any) => setScreenData(e)}
          />
        ))}

        {unSelectedMarkers.map((marker: any) => (
          <CustomAdvancedMarker
            key={marker.id}
            marker={marker}
            color="#F94623"
            size={
              marker.screenType == "Spectacular"
                ? 44
                : marker.screenType == "Large"
                ? 36
                : 28
            }
            action={(e: any) => setScreenData(e)}
          />
        ))}

        {screenData && (
          <InfoWindow
            position={{
              lat: screenData?.lat || 28.495,
              lng: screenData?.lng,
            }}
            onCloseClick={() => {
              setScreenData(null);
            }}
          >
            <div
              className={clsx(
                "rounded-[4px] p-1 transition-colors cursor-pointer bg-white"
              )}
            >
              <div className="relative rounded w-full h-40">
                <img
                  className="h-40 w-full rounded-lg object-cover"
                  src={screenData.images[0]}
                  alt={screenData.name}
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col justify-center truncate mt-4 gap-1">
                <h1 className="text-[14px] font-semibold w-full truncate text-ellipsis overflow-hidden">
                  {screenData.name}
                </h1>
                <h1 className="text-[12px] w-full truncate text-ellipsis overflow-hidden">
                  {screenData?.details.address}, {screenData?.details?.city}
                </h1>
              </div>
            </div>
          </InfoWindow>
        )}
      </Map>
    </div>
  );
}


