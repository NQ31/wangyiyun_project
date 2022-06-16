// 用fetch获取数据 第一个参数是写地址，第二个是写请求方式，是否跨域
fetch("http://localhost:3000/personalized?limit=6",{
method:"GET",
node:"cors"
}).then(r=>r.json()).then(data=>{
    console.log(data.result)
    data.result.forEach(item => {
        document.querySelector(".remd_music_list").innerHTML+=`

        <div class="remd_music_item">
        <div class="playcount">${(item.playCount/10000).toFixed(1)}万</div>
            <img
                src="${item.picUrl}">
            <div class="remd_t1_item_txt">
                <p>${item.name}</p>
            </div>
        </div>
 `;
    });
   
})
//获取最新音乐
fetch("http://localhost:3000/personalized/newsong?limit=30",{
    method:"GET",
    node:"cors"
}).then(r=>r.json().then(data=>{
    console.log(data.result);
    
    data.result.forEach(item=>{
        let author=""
        //获取作者
        item.song.artists.forEach(d=>{
            author+=d.name+"/"
        })
        author=author.slice(0,author.length-1);
        $(".new_song_list").innerHTML+=`
        <a href="./play.html?id=${item.id}">
        <div class="new_song_item">
                   <div class="new_song_item_left">
                       <div class="new_song_name">
                        ${item.name}
                       </div>
                       <div class="new_song_author">
                        ${item.song.sqMusic==null?author+"-"+item.name:"<div class='sqmusic'></div>"+author+"-"+item.name}
                       </div>
                   </div>
                   <div class="new_song_item_right"></div>
                   </div>
                </a>`;
    });
   
}))