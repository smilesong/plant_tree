<template>
	<header id="head-top">
        
         <slot name="work"></slot>
         <slot name="regist"></slot>
         <slot name="attention"></slot>
         <slot name="enroll"></slot>
	</header>
</template>
<script type="text/javascript">
export default {
    	data(){
            return{

            }
        }
 }
 </script>

<style lang="less" scoped>
#head-top{
	height:4rem;
	position: fixed;
    z-index: 100;
    width:100%;
    border-bottom:2px solid #F4DFB4;
    background-color: #FBF1CA;
}

</style>