const express = require('express');
const youtubedl = require('youtube-dl-exec');
const fs = require('fs');


const app = express();

app.use(express.static('public'));


app.get('/download', async (req, res) => {
  const videoUrl = req.query.videoUrl;

  const video_data = await youtubedl(videoUrl, { dumpSingleJson: true, noWarnings: true })
  
  const filePath = video_data.title + ".mp4";

  const output = await youtubedl(videoUrl, {
    output: filePath,
    noCheckCertificates: true,
    noWarnings: true,
    preferFreeFormats: true,
    addHeader: [
      'referer:youtube.com',
      'user-agent:googlebot'
    ]
  });
  
  if (output) {
    const fileStream = fs.createReadStream(filePath);
    res.setHeader('Content-Disposition', `attachment; filename="${filePath}"`);
    res.setHeader('Content-Type', 'video/mp4');
    fileStream.pipe(res);
    setTimeout(()=>{
      fs.unlinkSync(filePath)
    }, 300) 
  }
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});