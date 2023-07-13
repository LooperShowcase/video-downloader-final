
1. Download the starter code from this [link](https://tinyurl.com/loop-vid-downloader).

2. Install the required packages:
   - `npm install express`
   - `npm install youtube-dl-exec`

3. Run the server:
   ```
   node server.js
   ```

4. Update the `index.html` file by adding the input field and button:
   ```html
   <input type="text" id="videoUrl" placeholder="Enter YouTube Video URL">
   <button onclick="downloadVideo()">Download</button>
   ```

5. The `index.html` file contains a script that handles to send get request to our backend server.

6. Get video information using the `youtubedl` library:
   ```javascript
   const video_data = await youtubedl(videoUrl, { dumpSingleJson: true, noWarnings: true });
   const filePath = video_data.title + ".mp4";
   ```

7. An example video channel to use is `https://www.youtube.com/@loopcs44`.

8. Add the code to download the video.


```javascript
   
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
   ```

   - `output: filePath`: Specifies the output file path for the downloaded video. The `filePath` variable holds the desired file path for the video.

  - `noCheckCertificates: true`: Disables certificate checks during the download process, allowing downloads from URLs with invalid or self-signed certificates.

  - `noWarnings: true`: Suppresses warning messages during the download process.

  - `preferFreeFormats: true`: Instructs `youtube-dl` to prefer free formats when available for the video.

  - `addHeader: ['referer:youtube.com', 'user-agent:googlebot']`: Adds custom headers to the HTTP request made by `youtube-dl`. In this case, the headers include a referer and a user-agent, simulating requests from YouTube and Googlebot.

9. Finally, add the response to complete the download process.

```javascript

if (output) {
    const fileStream = fs.createReadStream(filePath);
    res.setHeader('Content-Disposition', `attachment; filename="${filePath}"`);
    res.setHeader('Content-Type', 'video/mp4');
    fileStream.pipe(res);
    setTimeout(()=>{
      fs.unlinkSync(filePath)
    }, 300) 
  }
```