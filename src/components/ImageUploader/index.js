import React, { useState } from "react";
import firebase from "firebase/app";

import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";

export const writeUserData = (path, obj) => {
  firebase.database().ref(path).update(obj);
};

const ImageUploader = ({ storagePath, quiz }) => {
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(null);

  const handleCapture = ({ target }) => {
    const file = target.files[0];
    console.log("file", file);
    const storageRef = firebase.storage().ref(`${storagePath}/${file.name}`);
    const uploadTask = storageRef.put(file);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function (snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const newProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(newProgress);
      },
      function (error) {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;

          case "storage/canceled":
            // User canceled the upload
            break;

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      function () {
        // Upload completed successfully, now we can get the download URL
        // save this link somewhere, e.g. put it in an input field
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUrl(downloadURL);
          console.log("ref", `quizzes/${quiz.id}`);
          const path = `quizzes/${quiz.id}`;
          firebase
            .database()
            .ref(path)
            .once("value")
            .then((snapshot) => {
              const val = snapshot.val();
              console.log("val", val);
            });
          writeUserData(path, { backgroundImage: downloadURL });
        });
        setProgress(null);
      }
    );
  };
  return (
    <>
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="upload-button-file"
        onChange={handleCapture}
        type="file"
      />
      {typeof progress !== "object" && (
        <LinearProgress variant="determinate" value={progress} />
      )}
      <label htmlFor="upload-button-file">
        <Button variant="raised" component="span">
          Upload
        </Button>
      </label>
      {url && <img width={100} src={url} alt="" />}
    </>
  );
};

export default ImageUploader;
