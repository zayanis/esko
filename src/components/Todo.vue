<template>
    <div>
	    <!-- div v-for="data in rowData">{{data}}</div -->
        <button @click="getSelectedRows()">Get Selected Rows</button>
        <ag-grid-vue 
					class="ag-theme-balham-dark"
                     gridAutoHeight=true
                     :columnDefs="columnDefs"
                     :rowData="rowData"
                     :enableSorting="true"
                     :enableFilter="true"
                     rowSelection="multiple"
                     :gridReady="onGridReady">
        </ag-grid-vue>
		
		<modal name="detail" height="auto" :scrollable="true"  :draggable = "true">
		<app-detail :selected="this.selected"></app-detail>
	</modal>
	
    </div>
</template>

<script>
    import {AgGridVue} from "ag-grid-vue";
	import Detail from './Detail.vue';
    export default {
        name: 'App',
        data() {
            return {
                columnDefs: null,
                rowData: null,
                gridApi: null,
                columnApi: null,
				selected: null,
                autoGroupColumnDef: null
            }
        },
        components: {
		'app-detail': Detail,
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
				this.selected=  selectedData.map(node => node);;
					this.$modal.show('detail');
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
				cellEditorParams : {  values: ['Ouvert', 'D�marr�', 'Bloqu�', 'Annul�', 'Clos']},		
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
			fetch('http://www.mocky.io/v2/5b84451e310000c4350d22f3')
                .then(result => result.json())
                .then(rowData => this.rowData = rowData);
			
        }
    }
</script>

<style>
</style>