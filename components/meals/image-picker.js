'use client'
import { useRef , useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
const imageInput = useRef();
const [pickedImage, setPickedImage] = useState();

    function handlePickClick(){
          imageInput.current.click();
    }

    function handleImageChange(event){
       const file = event.target.files[0];

       if (!file) {
          setPickedImage(null);
          return;
       }

       const filReader = new FileReader;
       filReader.onload = () => {
        setPickedImage(filReader.result)
       };
       filReader.readAsDataURL(file);
    }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
             {!pickedImage && <p>No image picked yet.</p>}
             {pickedImage && <Image src={pickedImage}  alt="The image selected by user" fill /> }
        </div>
        <input
        className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref = {imageInput}
          onChange={handleImageChange}
          required
        />
        <button className={classes.button} type="button" onClick={handlePickClick}>
            Pick an Image
        </button>
      </div>
    </div>
  );
}
