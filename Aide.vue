<template>
    <div>
	    <!-- div v-for="data in rowData">{{data}}</div -->
        <button @click="getSelectedRows()">Get Selected Rows</button>
        <ag-grid-vue 
					class="ag-theme-balham"
                     gridAutoHeight=true
                     :columnDefs="columnDefs"
                     :rowData="rowData"
                     :enableSorting="true"
                     :enableFilter="true"
                     rowSelection="multiple"
                     :gridReady="onGridReady">
        </ag-grid-vue>
    </div>
</template>

<script>
    import {AgGridVue} from "ag-grid-vue";
	import json from 'C:/Users/x107979/Desktop/test.json';
    export default {
        name: 'App',
        data() {
            return {
                columnDefs: null,
                rowData: json,
                gridApi: null,
                columnApi: null,
                autoGroupColumnDef: null
            }
        },
        components: {
            AgGridVue
        },
        methods: {
            onGridReady(params) {
                this.gridApi = params.api;
                this.columnApi = params.columnApi;
            },
            getSelectedRows() {
                const selectedNodes = this.gridApi.getSelectedNodes();
                const selectedData = selectedNodes.map(node => node.data);
                const selectedDataStringPresentation = selectedData.map(node => node.tache + ' ' + node.statut).join(', ');
                alert(`Selected nodes: ${selectedDataStringPresentation}`);
            },
			
			
			
        },
        beforeMount() {
            this.columnDefs = [
                {headerName: 'Categories', field: 'categorie', rowGroupIndex: 0},
                {headerName: 'Taches', field: 'tache', editable: true},
				{
				headerName: 'Statut', 
				field: 'statut', 
				editable: true,
				cellEditor : 'agSelectCellEditor',
				cellEditorParams : {  values: ['Ouvert', 'Démarré', 'Bloqué', 'Annulé', 'Clos']},		
				  cellStyle: function(params) {
						if (params.value=='Clos') {
							return {color: 'red', backgroundColor: 'green'};
						} else {
							return null;

				}
				}
				},
                {headerName: 'Commentaires', field: 'commentaire', editable: true},
				{headerName: 'Date MAJ', field: 'date'}
				
            ];

            this.autoGroupColumnDef = {
                headerName: 'Categories',
                field: 'categorie',
                cellRenderer: 'agGroupCellRenderer',
                cellRendererParams: {
                    checkbox: true
                }
            };
			
        }
    }
</script>

<style>
</style>