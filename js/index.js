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
        </div>`;
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
//热歌榜
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
// 搜索功能
$(".search").oninput=function(){
    if($("search").value==null){
        $(".default").style.display="block"
        $(".search_remd").style.display="none"
        $(".search_result").style.display="none"
    }else{
        $(".search").onkeyup=function(e){
            if(e.key=="Enter"){
             $(".default").style.display="none"
             $(".search_remd").style.display="none"
             $(".search_result").style.display="block" 
             fetch(`http://localhost:3000/cloudsearch?keywords=${$(#search").value}`,{
                method:"GET",
                node:"cors"
            }).then(r=>r.json().then(data=>{
                console.log(data.result.song)
                data.resulu.songs.forEach(element => {
                    $(".search_redult").innerHTML+=`<a href=".play.html?id=${element.id}"<a><p>${element.name}</p></a>`
                });
            })
        }else{
            $(".default").style.display="none"
            $(".search_remd").style.display="block"
            $(".search_result").style.display="none"
         }
        }
    }
}