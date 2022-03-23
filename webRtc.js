ceratewebrtc() {
      let videoController = document.createElement("video");
      videoController.autoplay = true;
      let screenShortController = document.createElement("canvas")
      screenShortController.id = "screenShotContainer";
      screenShortController.width = window.innerWidth
      screenShortController.height = window.innerHeight
      let startCapture = async () => {
        let captureStream = null;
        try {
          captureStream = await navigator.mediaDevices.getDisplayMedia();
          videoController.srcObject = captureStream;
        } catch (err) {
          console.log(err)
        }
        return captureStream;
      }
      startCapture().then(() => {
         //setTimeout确保用户授权后能获取到数据流
        setTimeout(() => {
            // 将获取到的屏幕截图绘制到图片容器里
            screenShortController
              .getContext("2d")
              .drawImage(
                videoController,
                0,
                0
              )
            screenShortController.toBlob(function(blob) {
               // 此处下载仅为实例操作，实际项目可删除
              let url = URL.createObjectURL(blob);
              let aLink = document.createElement('a')
              aLink.download = 'fileName.png'
              aLink.href = url
              aLink.click()
              // 停止捕捉屏幕
              const srcObject = videoController.srcObject;
              if (srcObject && "getTracks" in srcObject) {
                const tracks = srcObject.getTracks();
                tracks.forEach(track => track.stop());
                videoController.srcObject = null;
              }
            });
          }, 500);
      });
