let id=location.search.slice(4)
console.log(id)
fetch(`http://localhost:3000/song/url?id=${id}`,{
    method:"GET",
    node:"cors"
}).then(r=>r.json()).then(data=>{
    console.log(data.data[0])
    $(".audio").innerHTML=`<audio src="${data.data[0].url}" controls autoplay></audio>`
})

//获取歌曲详情
fetch(`http://localhost:3000/song/detail?ids=${id}`,{
    method:"GET",
    node:"cors"
}).then(r=>r.json()).then(data=>{
    console.log(data.songs[0])
    $(".song_name").innerHTML=`<h2>${data.songs[0].name}</h2>`;
    $(".bg>img").src=`${data.songs[0].al.picUrl}`;
    $(".disk_img>img").src=`${data.songs[0].al.picUrl}`
})


//获取歌词

fetch(`http://localhost:3000/lyric?id=${id}`,{
    method:"GET",
    node:"cors"
}).then(r=>r.json()).then(data=>{
    console.log(data)
    var lrc=data.lrc.lyric;
    var lyric = new window.Lyric(lrc, function(obj){
        console.log(obj.txt)
        $(".song_lyric").innerHTML=`${obj.txt}`
        
    })
    // 播放效果
    lyric.togglePlay();
    $(".disk").onclick=function(){
        if($(".audio audio").paused){
            $(".audio audio").play()
            $(".disk").classList.add("disk_rotate")//动起来
            lyric.togglePlay()
        }else{
            $(".audio audio").pause()
            $(".disk").classList.remove("disk_rotate")//不动
            lyric.togglePlay()
        }
    }
})
