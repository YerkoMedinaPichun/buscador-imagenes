import { useState } from "react";
import "./App.css";
import { Formik, Form, Field } from "formik";
import "./header.css";
import "./content.css";
import "./article.css";

function App() {
  const [photos, setPhotos] = useState([]);
  console.log(photos);

  const open = (url) => window.open(url);
  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: "" }}
          onSubmit={async (values) => {
            //llamar a api de unsplash
            const response = await fetch(
              `https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
              {
                headers: {
                  Authorization:
                    "Client-ID 2Fke888frolnpGDxDbgoFBpqNO9bPOel-34NnmiMXLo",
                },
              }
            );

            const data = await response.json();
            setPhotos(data.results);
            console.log(data);

            console.log(values);
          }}
        >
          <Form>
            <Field name="search"></Field>
          </Form>
        </Formik>
      </header>
      <div className="container">
        <div className="center">
          {photos.map((photo) => (
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img src={photo.urls.regular} />
              <p>{[photo.description, photo.alt_description].join(" - ")}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
