/**
 * Created by Terios on 12/9/13.
 */
myMapModule.controller('compteController', function ($scope) {


    $scope.nom = 'Lieu';
    $scope.afficheList = true;

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
                            console.log(dataItem);
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


})
;