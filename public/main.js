console.log('引入了main.js');
getCSS.onclick = () => {
    const request = new XMLHttpRequest() //创建httpRequest对象
    request.open('GET', '/style.css') //调用对象的open方法
    request.onreadystatechange = () => {
        const style = document.createElement('style') //创建style标签
        console.log(request.response);
        style.innerHTML = request.response  //把响应内容插入到style里面
        document.head.appendChild(style)  //把style插入到头部
        console.log('成功了');
    }
    request.send()
}
getJS.onclick = () => {
    const request = new XMLHttpRequest() //readyState==0
    request.open('GET', '/2.js')  //readyState==1
    /* request.onload = () => {
        console.log('请求2.js成功');
        // 创建script标签
        const script = document.createElement('script')
        // 把响应插入到script标签内
        script.innerHTML = request.response
        //console.log(request.response); 2.js里面的内容
        // 把标签插入到body内
        // 有了这三步才能执行2.js里里面的内容
        document.body.appendChild(script)
    }
    request.onerror = () => {
        console.log('请求2.js失败');
    } */
    request.onreadystatechange = () => {
        console.log(request.readyState);
        if (request.readyState === 4) {
            console.log('下载完成');
            //console.log(request.status); 打印状态码
            if (request.status >= 200 && request.status < 300) { //状态码在这个区间，表示下载路径正确,200多的时候是成功的
                // 创建script标签
                const script = document.createElement('script')
                // 把响应插入到script标签内
                script.innerHTML = request.response
                //console.log(request.response); 2.js里面的内容
                // 把标签插入到body内
                // 有了这三步才能执行2.js里里面的内容
                document.body.appendChild(script)
            } else {
                alert('加载js路径失败')
            }
        }
    }
    request.send()  //调用了send时，readyState==2
}
getHTML.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '/3.html')
    request.onreadystatechange = () => {
        console.log('加载3.html成功');
        const div = document.createElement('div')
        div.innerHTML = request.response
        console.log(request.response);
        document.body.appendChild(div)
    }
    request.send()
}
getXML.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', './4.xml')  //注意路径
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 300) {
                /* const message = document.createElement('message')
                message.innerHTML = request.response
                document.body.appendChild(message) */
                const dom = request.responseXML
                // console.log(dom);  dom对象含html和xml
                const text = dom.getElementsByTagName('warning')[0].textContent
                console.log(text.trim()); //去除两头的空格
            } else {
                alert('加载xml失败')
            }
        }
    }
    request.send()
}
getJSON.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '/5.json')  //注意路径
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            // console.log(request.response);
            const object = JSON.parse(request.response)
            console.log(object);
            myName.innerHTML = object.name
        }
    }
    request.send()
}
let n = 1
getPage.onclick = () => {
    n += 1
    const request = new XMLHttpRequest()
    request.open('GET', `/page${n}.json`)
    if (n === 3) {
        getPage.disabled = true
    }
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            const array = JSON.parse(request.response)
            console.log(array);
            array.forEach(item => {
                const li = document.createElement('li')
                li.innerText = item.id
                xxx.appendChild(li)//把创建出的li插入到ul（id='xxx'）里
            });
        }
    }
    request.send()
}
