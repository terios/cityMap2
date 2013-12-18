/**
 * Created by Terios on 12/9/13.
 */
myMapModule.controller('compteController', function ($scope, localisation) {


        $scope.nom = 'Lieu';
        $scope.afficheList = true;
        $scope.activeItem = [];
        $scope.activeItem['listVisite'] = "active";
        $scope.activeItem['contribution'] = "";
        $scope.activeItem['personnalisation'] = "";
        $scope.activeItem['parametre'] = "";
        $scope.lat;
        $scope.lon;


        $scope.data = [
            {'nom': 'anas', 'ville': 'anas', 'categorie': 'oujda', 'id': 12},
            {'nom': 'oko', 'ville': 'uu', 'categorie': 'casablanca', 'id': 13}
        ]
        $scope.init = function () {
            $("#grid").kendoGrid({
                dataSource: {
                    data: $scope.data,
                    pageSize: 10
                },
                groupable: true,
                sortable: true,
                pageable: {
                    refresh: true,
                    pageSizes: true,
                    buttonCount: 5
                },
                columns: [
                    {
                        field: "nom",
                        title: "Nom",
                        width: 250
                    },
                    {
                        field: "ville",
                        title: "Ville",
                        width: 190
                    },
                    {
                        field: "categorie",
                        title: "Categorie"
                    },
                    { command: [
                        {
                            name: "details",
                            click: function (e) {
                                e.preventDefault();
                                // e.target is the DOM element representing the button
                                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                                console.debug(dataItem);
                            }
                        },
                        {
                            name: "suprime",
                            click: function (e) {
                                e.preventDefault();
                                // e.target is the DOM element representing the button
                                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                                console.log(dataItem);
                            }
                        }
                    ], width: 200
                    }
                ]
            });
        }

        function getlocation() {

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(createMap, displayError);
            } else {
                alert("no geolocation supported");
            }
        }

        function createMap(position) {
            // Set static latitude, longitude value

            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            var latlng = new google.maps.LatLng(latitude, longitude);
            // Set map options
            var myOptions = {
                zoom: 14,
                center: latlng,
                panControl: true,
                zoomControl: true,
                scaleControl: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            // Create map object with options
            map = new google.maps.Map(document.getElementById("map_contribution"), myOptions);
            // Create and set the marker
            marker = new google.maps.Marker({
                map: map,
                draggable: true,
                position: latlng
            });

            google.maps.event.addListener(map, 'click', function (event) {
                marker.setPosition(event.latLng);
                var point = marker.getPosition();
                map.panTo(point);
                $scope.lat = point.lat();
                $scope.lon = point.lng();
                document.getElementById('lat').value = point.lat();
                document.getElementById('lon').value = point.lng();
            });
            // Register Custom "dragend" Event
            /* google.maps.event.addListener(marker, 'dragend', function () {
             // Get the Current position, where the pointer was dropped
             var point = marker.getPosition();
             // Center the map at given point
             map.panTo(point);
             // Update the textbox
             document.getElementById('txt_latlng').value = point.lat() + ", " + point.lng();
             });*/
        }

        $scope.parametre = function () {
            for (tmp in $scope.activeItem) {
                $scope.activeItem[tmp] = "";
            }
            $scope.activeItem["parametre"] = "active";
        }
        $scope.personnalisation = function () {
            for (tmp in $scope.activeItem) {
                $scope.activeItem[tmp] = "";
            }
            $scope.afficheContribution = false;
            $scope.afficheList = false;
            $scope.affichePersonalisation = true;
            $scope.activeItem["personnalisation"] = "active";

        }
        $scope.contribution = function () {
            for (tmp in $scope.activeItem) {
                $scope.activeItem[tmp] = "";
            }
            $scope.activeItem["contribution"] = "active";
            $scope.afficheContribution = true;
            $scope.afficheList = false;
            $scope.affichePersonalisation = false;
            tmp = getlocation();

        }
        $scope.listVisite = function () {
            for (tmp in $scope.activeItem) {
                $scope.activeItem[tmp] = "";
            }
            $scope.activeItem["listVisite"] = "active";
            $scope.affichePersonalisation = false;
            $scope.afficheContribution = false;
            $scope.afficheList = true;
        }


        function displayError(error) {
            var errorTypes = {
                0: "Unknown error",
                1: "Permission denied by user",
                2: "Position is not available",
                3: "Request timed out"
            };
            var errorMessage = errorTypes[error.code];
            if (error.code == 0 || error.code == 2) {
                errorMessage = errorMessage + " " + error.message;
            }
            var div = document.getElementById("location");
            div.innerHTML = errorMessage;
        }


    }

)
;