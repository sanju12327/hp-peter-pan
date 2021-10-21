hp = "";
pp = "";
leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload()
{
    hp = loadSound("harry_potter.mp3");
    pp = loadSound("harry_potter.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results)
{
     if(results.length > 0)
        {
            console.log(results);
            scoreLeftWrist = results[0].pose.keypoints[9].score;
            console.log("scoreLeftWrist = " + scoreLeftWrist);

            leftWristX = results[0].pose.leftWrist.x
            rightWristX = results[0].pose.rightWrist.x
            leftWristY = results[0].pose.leftWrist.y
            rightWristY = results[0].pose.rightWrist.y
            console.log("Left Wrist X = " + leftWristX + " Left Wrist Y = " + leftWristY);
            console.log("Right Wrist X = " + rightWristX + " Right Wrist Y = " + rightWristY);
        }
}

function modelLoaded()
{
    console.log("PoseNet is Initialized");
}

function draw()
{
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("FF0000");

    circle(rightWristX, rightWristY, 20);
    circle(leftWristX, leftWristY, 20);
    if(rightWristX>0 && rightWristX<=600)
    {
       pp.stop();
       hp.play();
       document.getElementById("song_name").innerHTML = "Harry Potter";
    }

    if(leftWristX>0 && leftWristX<=600)
    {
       hp.stop();
       pp.play();
       document.getElementById("song_name").innerHTML = "Peter Pan";
    }

}

function stop()
{
    pp.stop();
    hp.stop();
}