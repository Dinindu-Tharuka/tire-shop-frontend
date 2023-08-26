const getCategoryCutUrl = (url :string | null) => {
    const target = 'http://127.0.0.1:8000/api/item-categories/';
    const totalIndex = target.length;

    return url?.slice(totalIndex)        
}

export default getCategoryCutUrl