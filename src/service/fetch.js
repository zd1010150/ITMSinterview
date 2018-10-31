
export const fetchData = async (url) => {
    try{
        const response = await fetch(url);
        const result = await response.json();
        return result;
    }catch(ex){
        console.log('error', ex);
    }
};