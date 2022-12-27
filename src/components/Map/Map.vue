<template>
    <div class="mapWrapper">
        <p class="coordinate">
            Lat:
            {{ discoLocationLatitudeText }} Lng:
            {{ discoLocationLongitudeText }}
        </p>
        <l-map
            v-model:zoom="zoom"
            :center="mapLocation"
            v-on:ready="onMapLoaded"
            class="map"
            @move="onMapMove"
        >
            <l-tile-layer
                url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                :subdomains="['mt0', 'mt1', 'mt2', 'mt3']"
                :maxZoom="20"
            ></l-tile-layer>

            <l-marker
                :lat-lng="discoLocationForMarker"
                v-if="isDiscoLocationAvailable"
            >
                <l-icon :icon-url="iconUrl" :icon-size="iconSize" />
            </l-marker>

            <l-marker :lat-lng="homeLocationForMarker"> </l-marker>
        </l-map>
        <div class="locateHome" v-if="isDiscoLocationAvailable">
            <img
                :src="arrowIcon"
                :style="`transform: rotate(${homeAngle}deg)`"
                alt="arrow"
            />
        </div>
        <div
            class="followDiscoLocation"
            :style="{ background: setFollowDiscoButtonColor }"
            @click="followDiscoLocation = !followDiscoLocation"
        >
            <img :src="centerIcon" alt="center" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';

import { LMap, LTileLayer, LIcon, LMarker } from '@vue-leaflet/vue-leaflet';
import { LatLng, latLng, marker, icon } from 'leaflet';

import 'leaflet/dist/leaflet.css';
import geometry from 'leaflet-geometryutil';
import { Store } from '@/interfaces/Store';

const Marker = require('@/assets/img/parrot.png');
const Arrow = require('@/assets/img/arrow-bottom.svg');
const Center = require('@/assets/img/center.svg');

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        discoLocation: { latitude: number; longitude: number };
        homeLocation: { latitude: number; longitude: number };
        mapDefaultLocation: number[];
        followDiscoLocation: boolean;
        isDiscoLocationAvailable: boolean;
        mapObject: any;
        isMapLoaded: boolean;
        setDiscoDegressTick: Function;
        setDiscoDegress: Function;
        variableMap: Function;
        discoAngle: number;
        discoDegress: number;
        iconUrl: any;
    }

    interface State {
        count: number;
    }
}

export default defineComponent({
    components: {
        LMap,
        LTileLayer,
        LIcon,
        LMarker,
    },
    data() {
        return {
            mapDefaultLocation: [53.34937, 17.64097],
            zoom: 15,
            followDiscoLocation: true,
            mapObject: null,
            isMapLoaded: false,
        };
    },
    computed: {
        ...mapState({
            flights: state => {
                return (state as Store).flights;
            },
            discoLocationForMarker: state => [
                (state as Store).gps.latitude,
                (state as Store).gps.longitude,
            ],
            discoLocation: state => ({
                latitude: (state as Store).gps.latitude,
                longitude: (state as Store).gps.longitude,
            }),
            homeLocationForMarker: state => [
                (state as Store).home.latitude,
                (state as Store).home.longitude,
            ],
            homeLocation: state => ({
                latitude: (state as Store).home.latitude,
                longitude: (state as Store).home.longitude,
            }),
            discoAngle: state => (state as Store).orientation.yaw,
        }),
        discoLocationLatitudeText() {
            return this.discoLocation.latitude.toFixed(6);
        },
        discoLocationLongitudeText() {
            return this.discoLocation.longitude.toFixed(6);
        },
        isDiscoLocationAvailable() {
            return (
                !!this.discoLocation.latitude && !!this.discoLocation.longitude
            );
        },
        homeAngle() {
            if (!this.isDiscoLocationAvailable) return 0;

            const discoLatLng: LatLng = latLng(
                this.discoLocation.latitude,
                this.discoLocation.longitude,
            );

            const homeLatLng: LatLng = latLng(
                this.homeLocation.latitude,
                this.homeLocation.longitude,
            );

            if (!this.mapObject) return 0;

            return geometry.angle(this.mapObject, homeLatLng, discoLatLng);
        },
        mapLocation() {
            return this.followDiscoLocation && this.isDiscoLocationAvailable
                ? [this.discoLocation.latitude, this.discoLocation.longitude]
                : this.mapDefaultLocation;
        },
        iconUrl() {
            return Marker;
        },
        iconSize() {
            return [50, 50];
        },
        arrowIcon() {
            return Arrow;
        },
        centerIcon() {
            return Center;
        },
        setFollowDiscoButtonColor() {
            if (this.followDiscoLocation) return '#27ae60';
        },
    },
    watch: {
        flights: {
            handler(flights) {
                const discoIcon = icon({
                    iconUrl: this.iconUrl,
                    iconSize: [64, 64],
                });

                if (this.isMapLoaded) {
                    const layers: string[] = Object.keys(
                        this.mapObject._layers,
                    );

                    const flightIds: string[] = Object.keys(flights);

                    const flightToLayer: { [key: string]: string } = {};

                    for (const layerId of layers) {
                        const layer = this.mapObject._layers[layerId];

                        const isMarker: boolean =
                            !!layer._icon && layer._icon.alt !== '';

                        if (isMarker) {
                            const markerId: string = layer._icon.alt;

                            if (flightIds.includes(markerId)) {
                                flightToLayer[markerId] = layerId;
                            } else {
                                this.mapObject.removeLayer(layer);
                            }
                        }
                    }

                    for (const flightId of flightIds) {
                        const flight = flights[flightId];

                        if (!flight.location) continue;

                        const location = [
                            flight.location.latitude,
                            flight.location.longitude,
                        ];

                        if (!flightToLayer[flightId]) {
                            marker(
                                [
                                    flight.location.latitude,
                                    flight.location.longitude,
                                ],
                                {
                                    icon: discoIcon,
                                    alt: flightId,
                                },
                            ).addTo(this.mapObject);
                        } else {
                            const layerId = flightToLayer[flightId];

                            this.mapObject._layers[layerId].setLatLng(location);

                            this.mapObject._layers[layerId]._icon.style[
                                'transform-origin'
                            ] = '50% 50%';

                            if (
                                !this.mapObject._layers[
                                    layerId
                                ]._icon.style.transform.includes('rotate')
                            ) {
                                this.mapObject._layers[
                                    layerId
                                ]._icon.style.transform += ` rotate(${flight.angle}deg)`;
                            } else {
                                this.mapObject._layers[
                                    layerId
                                ]._icon.style.transform = this.mapObject._layers[
                                    layerId
                                ]._icon.style.transform.replace(
                                    /rotate\(([0-9]+)deg\)/,
                                    `rotate(${flight.angle}deg)`,
                                );
                            }
                        }
                    }
                }
            },
            deep: true,
        },
    },
    methods: {
        setDiscoDegress(deg: number) {
            const icon: any = document.querySelector(
                '.leaflet-marker-icon[src*=parrot][alt=""]',
            );

            if (icon) {
                this.discoDegress = deg;

                if (!icon.style.transform.includes('rotate')) {
                    icon.style.transform += ` rotate(${deg}deg)`;
                } else {
                    icon.style.transform = icon.style.transform.replace(
                        /rotate\(([0-9]+)deg\)/,
                        `rotate(${deg}deg)`,
                    );
                }
            }
        },
        onMapLoaded(map) {
            this.mapObject = map;
            this.isMapLoaded = true;
        },
        onMapMove() {},
        variableMap: (value, inMin, inMax, outMin, outMax) =>
            ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin,
        setDiscoDegressTick() {
            let degress =
                Number(
                    this.variableMap(
                        this.discoAngle,
                        -180,
                        180,
                        0,
                        360,
                    ).toFixed(0),
                ) - 180;

            if (degress > 360) degress -= 360;
            if (degress < 0) degress = 360 - degress * -1;

            this.setDiscoDegress(degress);

            setTimeout(this.setDiscoDegressTick, 50);
        },
    },
    created() {
        setImmediate(this.setDiscoDegressTick);
    },
});
</script>

<style lang="scss">
.mapWrapper {
    grid-column: 1/2;
    background-color: white;
    aspect-ratio: 1;
    margin-top: auto;
    opacity: 0.4;
    transition: 0.2s all ease-in-out;
    // z-index: 1;
    border-radius: 0 8px 0 0;
    // overflow: hidden;
    position: relative;
    &:hover {
        opacity: 1;
    }
}

.map {
    z-index: 0;
}

.coordinate {
    font-size: 0.8rem;
    line-height: 1.2rem;
    font-weight: 600;
}

.locateHome,
.followDiscoLocation {
    position: absolute;
    bottom: 10px;
    z-index: 5;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
}

.locateHome {
    left: 10px;
    background: #3498db;
}

.followDiscoLocation {
    right: 10px;
    background: #3d3d3d;
    cursor: pointer;
    transition: 0.2s all ease-in-out;
    &::before {
        content: 'Follow disco position';
        color: #fff;
        position: absolute;
        top: -90%;
        background: #3d3d3d;
        padding: 4px 8px;
        width: auto;
        font-size: 0.8rem;
        font-weight: 600;
        border-radius: 5px;
        width: 150px;
        opacity: 0;
        transition: 0.2s all ease-in-out;
    }
    &:hover:before {
        opacity: 1;
    }
}
</style>
