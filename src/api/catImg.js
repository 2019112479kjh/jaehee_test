import axios from 'axios';

export async function catImg({ setImageList, pageInfo, setPageInfo }) {
    try {
        const response = await axios.get('/mock/mockData.json');
        const data = response.data.data;
        const pageData = data[`page${pageInfo}`];
        if (pageData) {
            setImageList(pageData);
        } else {
            alert('다음 사진이 존재 하지 않으므로 첫사진으로 돌아갑니다.')
            setPageInfo(1)
            setImageList( data[`page1`]);
        }
    } catch (error) {
        console.error(error);
    }   
}
