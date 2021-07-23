import React, { Component } from 'react';
import previous from '../images/previous.png';
import play1 from '../images/play.png';
import next from '../images/next.png';
import pause1 from '../images/pause.png';
import audio1 from '../songs/adoreyou.mp3';
import audio2 from '../songs/watermelonSugar.mp3';
import audio3 from '../songs/Demons.mp3';
import audio4 from '../songs/Hypnotised.mp3';
import audio5 from '../songs/FireWorks.mp3';
import audio6 from '../songs/LoveYourself.mp3';

const songs = [
    {
        name: "Adore You",
        artist: "Harry Styles",
        imgsrc: "https://i1.sndcdn.com/artworks-L8pQNsEe4uxy3pxT-DOZcVg-t500x500.jpg",
        songlink: audio1
    },
    {
        name: "Watermelon Sugar",
        artist: "Harry Styles",
        imgsrc: "https://i.pinimg.com/originals/68/f0/36/68f03604a985026ec4f3e38b4acca79d.jpg",
        songlink: audio2
    },
    {
        name: "Demons",
        artist: "Imagine Dragons",
        imgsrc: "https://i1.sndcdn.com/artworks-000165749350-1tdw6d-t500x500.jpg",
        songlink: audio3
    },
    {
        name: "Hypnotised",
        artist: "Coldplay",
        imgsrc: "https://upload.wikimedia.org/wikipedia/en/d/da/Coldplay_-_Hypnotised.png",
        songlink: audio4
    },
    {
        name: "FireWorks",
        artist: "Katy Perry",
        imgsrc: "https://upload.wikimedia.org/wikipedia/en/6/60/Firework_cover.png",
        songlink: audio5
    },
    {
        name: "Love Yourself",
        artist: "Justin Bieber",
        imgsrc: "https://upload.wikimedia.org/wikipedia/en/0/0b/JustinBieberLoveYourself.png",
        songlink: audio6
    }
]

function getTime(time) {
    if (!isNaN(time)) {
      return (
        Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
      );
    }
}
class Musicplayer extends Component {
    state = {
        index: 0,
        flag: true,
        imagepath: play1,
        song: new Audio(audio1),
        currentime: 0,
        duration: 207
    }

    increase = () => {
        this.setState({index: (this.state.index + 1)%songs.length});
        if(!this.state.flag){
            this.setState({ imagepath: play1});
            this.state.song.pause();
            this.pausetime();
            this.setState({flag: !this.state.flag});
        }
        this.setState({song: new Audio(songs[(this.state.index + 1)%songs.length].songlink)});
    }
    decrease = () => {
        this.setState({ index: ((this.state.index - 1)%songs.length+songs.length)%songs.length});
        if(!this.state.flag){
            this.setState({ imagepath: play1});
            this.state.song.pause();
            this.pausetime();
            this.setState({flag: !this.state.flag});
        }
        this.setState({song: new Audio(songs[((this.state.index - 1)%songs.length+songs.length)%songs.length].songlink)});
    }
    playmusic = () => {
        if(this.state.flag){
            this.setState({ imagepath: pause1});
            this.state.song.play();
            this.playtime();
        }
        else{
            this.setState({ imagepath: play1});
            this.state.song.pause();
            this.pausetime();
        }
        this.setState({flag: !this.state.flag});
    }
    
    playtime = () => {
        let progresser = document.getElementById("progress");
        this.state.song.addEventListener("timeupdate", (event) => { 
            const {currentTime, duration} =event.srcElement;
            this.setState({currentime: currentTime});
            progresser.style.width=`${(this.state.currentime/duration)*100}%`;
            this.setState({duration: duration});
            if(this.state.currentime===this.state.duration){
                this.increase();
                this.playmusic();
            }
        })
    }

    changeonclick = () => {
        let changes = document.getElementsByClassName("progress_div");
        changes.addEventListener("click" , (event) => {
            let move_progress = event.offsetX/event.srcElement.clientWidth;
            console.log(move_progress);
        })
    }
    
    pausetime = () => {
        this.state.song.removeEventListener("timeupdate", () => {});
    }

    gotclicked = () => {
        console.log("hey");
    }
    render(){
        let current= getTime(this.state.currentime);
        let duration= getTime(this.state.duration);
    return(
        <div className="container">
            <div className="player">
            <h1 id="songname">{songs[this.state.index].name}</h1>  
            <h3 id="artist">{songs[this.state.index].artist}</h3>
            <div className="audioimg">
                <img className="audioimg1" src={songs[this.state.index].imgsrc} alt="img here"/>
            </div>
            <audio src={`${songs[this.state.index].songlink}`} id="audio"></audio>
            <div className="progressbar_container" id="progressbar_container">
                <div className="progress_duration_meter">
                    <div id="current_time">{current}</div>
                    <div id="duration">{duration}</div>
                </div>
                <div onClick={() => {this.gotclicked()}} className="progress_div" id="progress_div">
                    <div className="progress" id="progress" ></div>
                </div>
            </div>
            <div className="container1">
                <img onClick={this.decrease}className="buttons" src={`${previous}`}  alt="previous"></img>
                <img onClick={this.playmusic} className="buttons" src={this.state.imagepath} id="playpause" alt="play"></img>
                <img onClick={this.increase}className="buttons" src={`${next}`} alt="next"></img>
            </div>
            </div>  
        </div>  
    )
    }
}

export default Musicplayer
