const axios = require('axios');
const fetchData = () =>{
    return axios.get('https://randomuser.me/api/?results=2')
    .then(res => {
        return res.data.results;
    })
    .catch(err => {
        console.error(err)
    });
}

const getData = () => {
    fetchData()
    .then(data => {
        const keys = getAllElementsKeyFromObject(data[0]);
        console.log(keys);
    })
    .catch(err => {
        console.error(err)
    });
}
// recursive function to get all keys
const getAllElementsKeyFromObject = (obj) => {
    let newKeys = [];

    Object.keys(obj).forEach(key => {
        // if the value is not an object and not null, add to the list (typeof null === 'object') is evalueted to true
        const value = obj[key];
        if (typeof value !== 'object' || !value){
            newKeys.push(key);
        }else{
            let nextKeys = getAllElementsKeyFromObject(value);

            nextKeys = nextKeys.map(newKey => (
                key + '.' + newKey
            ));
                      
            newKeys = [...newKeys, ...nextKeys];
        }
    });

    return newKeys;
}

getData();