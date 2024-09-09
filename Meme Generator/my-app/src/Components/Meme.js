import React, { useState } from "react";
import data from "./Data";

export default function Meme() {
    // State to store the random image
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "https://i.imgflip.com/30b1gx.jpg" // Default meme image
    });

    const [allMemes, setAllMemes] = React.useState([])
    React.useEffect(() => {
        fetch("https://cors-anywhere.herokuapp.com/http://api.imgflip.com/get_memes")
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok' + response.statusText);
                }
                return response.json();
            })
            .then((data) => console.log(data.data.memes))
            .catch((error) => console.error('There was a problem with the fetch operation:', error));

    },)

    // Function to generate a random image
    function randomImagegenerator() {
        const randomNumber = Math.floor(Math.random() * allMemes.length); // Get a random index
        const imageUrl = allMemes[randomNumber].url; // Get the URL of the random meme

        // Update the state with the new image
        setMeme((prevValue) => ({
            ...prevValue,
            randomImage: imageUrl
        }));
    }

    function handleChange(event) {
        const { name, value } = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }
    return (
        <main>
            <div className="form">
                <input
                    type="text"
                    className="form--input"
                    placeholder="Top-Text"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    className="form--input"
                    placeholder="Bottom-Text"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button className="form--button" onClick={randomImagegenerator}>
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme-container1">
                <div className="meme-container2">
                    <img src={meme.randomImage} className="meme-image" alt="Meme" />
                    <h2 className="top-text"> {meme.topText}</h2>
                    <h2 className="bottom-text">{meme.bottomText}</h2>
                </div>
            </div>
        </main>
    );
}
