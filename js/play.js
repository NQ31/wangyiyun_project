let id=location.search.slice(4)
console.log(id)
fetch(`http://localhost:3000/song/url?id=${id}`,{
    method:"GET",
    node:"cors"
}).then(r=>r.json()).then(data=>{
    console.log(data.data[0])
    $(".audio").innerHTML=`<audio src="${data.data[0].url}" controls autoplay></audio>`
})
// 播放效果
$(".disk").onclick=function(){
    if($(".audio audio").paused){
        $(".audio audio").play()
        $(".disk").classList.add("disk_rotate")//动起来
    }else{
        $(".audio audio").pause()
        $(".disk").classList.remove("disk_rotate")//不动
    }
}
