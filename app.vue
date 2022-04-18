<template>
  <div>
    {{ data }}
  </div>
</template>

<script>

import apiSetup from '~/composables/useFetch'
export default {
 setup() {
  
 const {response, data, error, loading, getData, postData, deleteData} = apiSetup()


 
 getData()
 postData({
   postId: 404,
   title: "Nicklas post data",
  completed: false
 })
 deleteData(1)

 return {data}
}
}

</script>
