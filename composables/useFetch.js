import { ref, computed, reactive } from 'vue'
import axios from 'axios'

export default function apiSetup  () {

    const data = ref()
    const url = ref('https://jsonplaceholder.typicode.com/posts')
    const response = ref()
    const error = ref()
    const loading = ref()
    

    const getData = async (params = {}) => {
        const endpoint = url.value
        loading.value = true
        
        const header = {}
        try {
            const result = await axios.get(endpoint, {
                params,
                header
            } )
            response.value = result
            data.value = result.data
            
        }
        catch (err)
        {
            error.value = err
        }
        finally {
            loading.value = false
        }

    }
    const postData = async (body) => {
        const endpoint = url.value
        loading.value = true

        return await axios.post(endpoint, {
            body
        })
        .then(function (response) {
            console.log('Post: ', response);
           data.value = [...data.value, response?.data?.body]  
        })
        .catch(function (error) {
            console.log(error);
            loading.value = false
        });
       
   
    }
    const deleteData = async (id) => {
        const endpoint = url.value
        loading.value = true

        return await axios.delete(`${endpoint}/${id}`)
        .then(function (response) {
            const currentData = data.value
            currentData.filter(data => data.id !== id )

            console.log('Delete: ', currentData);
         
        })
        .catch(function (error) {
            console.log(error);
            loading.value = false
        });
        
    }

    return {response, error, data, loading, getData, postData, deleteData }
}