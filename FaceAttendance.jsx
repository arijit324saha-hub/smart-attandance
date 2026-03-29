const detectFace = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const res = await axios.get("http://localhost:5000/api/users");
  const users = res.data;

  const labeledDescriptors = users
    .filter(u => u.faceDescriptor)
    .map(u =>
      new faceapi.LabeledFaceDescriptors(
        u._id,
        [new Float32Array(u.faceDescriptor)]
      )
    );

  const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors);

  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptors();

    detections.forEach(d => {
      const match = faceMatcher.findBestMatch(d.descriptor);

      if (match.label === user._id) {
        markAttendance();
      }
    });

  }, 3000);
};