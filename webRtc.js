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
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          // 捕获屏幕
          captureStream = await navigator.mediaDevices.getDisplayMedia();
          // 将MediaStream输出至video标签
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
              let url = URL.createObjectURL(blob);
              let aLink = document.createElement('a')
              aLink.download = 'fileName.png' // 文件名后缀需要和dataurl表示的相同，否则可能乱码
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
