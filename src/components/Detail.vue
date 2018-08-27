<template >
	<div class="ui middle aligned center aligned grid internally celled">
				test {{selected}} dlsd
				test {{selected.statut}} d324
			</div>
</template>

<script>


export default {
  props: ['selected'],
  data() {
        return {
			loader: false,
			tache: null,
			nombre_vue: -1
        }
    },
	mounted() {

                const selectedData = this.selected;
                const selectedDataStringPresentation = selectedData.map(node => node.tache + ' ' + node.statut).join(', ');
				this.tache = node.tache;
             alert(`Selected nodes: ${selectedDataStringPresentation}`);
		
	 },
	 watch: {
	 }
	 }

</script>
