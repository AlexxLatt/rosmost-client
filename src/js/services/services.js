const postData = async (url, data) => {// сдесь мы создаем функцию в которой через fetch будем отправлять данные на db.json
    try {
        let res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error('Error during request:', error);
        throw error; // Повторное возбуждение ошибки для того, чтобы ее могли обработать в вызывающем коде
    }
};

const getRes = async (url) => { // создали функцию в которой есть fetch и аргумент в виде url 
    const res = await fetch(url)// создали промис из fetch

    if(!res.ok){// показывает что промис выдал сбой в подключении
        throw new Error(`Could not fetch ${url}, status ${res.status}`);// ошибка где есть url и код ошибки throw (возвращает то что там было)
    }
    
    return await res.json();// сдесь если не произошло сбоев то мы возращаем полученый json и сразу парсим его в объект 
};




export {postData};
export{getRes};