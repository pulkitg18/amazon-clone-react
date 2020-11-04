import { Button, Input } from "@material-ui/core";
import React, { useState } from "react";
import { db, storage } from "./firebase";
import "./ImageUpload.css";
function AddItems() {
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");

  const [price, setPrice] = useState();
  const [rating, setRating] = useState();

  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uploadImage = storage.ref(`images/${image.name}`).put(image);

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        // when the state of image (uploading...) changes, it takes snapshot and updates the progress
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (err) => {
        alert(err.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // add post to database
            db.collection("products").add({
              title: title,
              id: id,
              description: description,

              price: price,
              rating: rating,
              image: url,
            });

            setProgress(0);

            setImage(null);
          })
          .catch((err) => console.log(err.message));
      }
    );
  };

  return (
    <div className="addItem">
      <div className="addItem__input">
        <form>
          <Input
            placeholder="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <Input
            placeholder="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <Input
            placeholder="ID"
            value={id}
            onChange={(event) => setId(event.target.value)}
          />
          <Input
            type="number"
            placeholder="price"
            value={price}
            onChange={(event) => setPrice(event.target.valueAsNumber)}
          />{" "}
          <Input
            type="number"
            placeholder="rating"
            value={rating}
            onChange={(event) => setRating(event.target.valueAsNumber)}
          />
          <progress
            className="imageUpload__progress"
            value={progress}
            max="100"
          />
          <input type="file" onChange={handleChange} />
          <Button onClick={handleUpload}>Upload Post</Button>
        </form>
      </div>
    </div>
  );
}

export default AddItems;
