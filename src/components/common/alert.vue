<template>
	<div >

		<!--  <v-touch  class="alert_wrap"  v-if="alertFlag" v-on:tap="$emit('onTap')">
					<div class="alert_wrap_in">{{cxt}}</div>					
				</v-touch> -->
				<transition name="fade">
					<div  class="alert_wrap"  v-if="alertFlag" v-on:click="$emit('onTap')">
						<div class="alert_wrap_in">{{cxt}}</div>
					</div>
				</transition>
			</div>
		</template>
		<script>
		export default {
			data:function(){
				return{
				}
			},
   /* computed:{
    	isShow(){
    		return  this.alertFlag
    	}
    },*/
    props:['alertFlag','cxt'],
}


</script>
<style lang="less" scoped>
   .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>