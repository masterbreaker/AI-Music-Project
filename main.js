song1="";
song2="";

leftWristX=0
leftWristY=0
rightWristX=0
rightWristY=0
scoreleftwrist=0
song1_status=""
song2_status=""


function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");

}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw(){
    image(video,0,0,600,500);
    fill("#ffb303")
    stroke("#ffb303")
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();
    if(scoreleftwrist>0.2){
        circle(leftWristX,leftWristY,20)
        song2.stop();
        if(song1_status==false){
            song1.play();
            document.getElementById("song_name").innerHTML="playing-harrypotter song"
        }

    }

}

function modelLoaded(){
    console.log("posenet model is initialized")
}

function gotPoses(results){
if(results.length>0)
{
    console.log(results);
    scoreleftwrist=results[0].pose.keypoints[9].score;
    leftWristX= results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("lefwristX = " + leftWristX + "leftWristY = " + leftWristY );

    rightWristX= results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightwristX = " + rightWristX + "rightWristY = " + rightWristY );
}
}