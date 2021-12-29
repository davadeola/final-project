import {
  detectAllFaces,
  loadSsdMobilenetv1Model,
  loadFaceLandmarkModel,
  loadFaceRecognitionModel,
  loadFaceExpressionModel,
  fetchImage,
  detectSingleFace,
  LabeledFaceDescriptors,
  FaceMatcher,
  loadTinyFaceDetectorModel,
} from "face-api.js";

const MODEL_URL = "/models";
loadSsdMobilenetv1Model(MODEL_URL);
loadFaceLandmarkModel(MODEL_URL);
loadFaceRecognitionModel(MODEL_URL);
loadFaceExpressionModel(MODEL_URL);

const loadImage = (img) => {
  const image = new Image();
  image.crossOrigin = true;
  image.src = img;

  return image;
};

const findNewFaces = async (images) => {
  let clientPic = await fetchImage(images);
  let faceDescriptions = await detectAllFaces(clientPic)
    .withFaceLandmarks()
    .withFaceDescriptors();

  console.log(faceDescriptions);
};

const verifyClientFace = async (imageUrl) => {
  let verified = false;

  const img = await fetchImage(imageUrl);

  const clientFaceDescription = await detectSingleFace(img)
    .withFaceLandmarks()
    .withFaceDescriptor();
  if (!clientFaceDescription) {
    console.log(`no faces detected`);
  } else {
    verified = true;
  }

  console.log(verified);
  return verified;
};

//for each image, this is called
const findMatchedFaces = async (clients, imageUrl) => {
  let clientPic = await fetchImage(imageUrl);

  let faceDescriptions = await detectAllFaces(clientPic)
    .withFaceLandmarks()
    .withFaceDescriptors();

  const labeledFaceDescriptors = await Promise.all(
    clients.map(async (client) => {
      const img = await fetchImage(client.profilePhoto);

      const clientFaceDescription = await detectSingleFace(img)
        .withFaceLandmarks()
        .withFaceDescriptor();
      if (!clientFaceDescription) {
        console.log(`no faces detected for ${client.emailAddress}`);
      }

      const clientFaceDescriptors = [clientFaceDescription.descriptor];
      return new LabeledFaceDescriptors(
        client.emailAddress,
        clientFaceDescriptors
      );
    })
  );

  const threshold = 0.6;
  const faceMatcher = new FaceMatcher(labeledFaceDescriptors, threshold);

  const results = faceDescriptions.map((fd) =>
    faceMatcher.findBestMatch(fd.descriptor)
  );

  let faces = [];

  results.forEach((bestMatch, i) => {
    faces.push(bestMatch.label);
  });

  return faces;
};

export { findNewFaces, findMatchedFaces, verifyClientFace };
